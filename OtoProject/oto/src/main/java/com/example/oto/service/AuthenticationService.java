package com.example.oto.service;

import com.example.oto.dto.request.*;
import com.example.oto.dto.response.*;
import com.example.oto.entity.InvalidatedToken;
import com.example.oto.entity.User;
import com.example.oto.exception.AppException;
import com.example.oto.exception.ErrorCode;
import com.example.oto.mapper.ProfileMapper;
import com.example.oto.repository.InvalidatedTokenRepository;
import com.example.oto.repository.RoleRepository;
import com.example.oto.repository.httpclient.GoogleUserInfoClient;
import com.example.oto.repository.httpclient.OutboundIdentityClient;
import com.example.oto.repository.UserRepository;
import com.example.oto.repository.httpclient.ProfileClient;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationService {

    UserRepository userRepository;
    PasswordEncoder passwordEncoder;
    InvalidatedTokenRepository invalidatedTokenRepository;
    GoogleUserInfoClient googleUserInfoClient;
    RoleRepository roleRepository;
    ProfileClient profileClient;
    ProfileMapper profileMapper;
    OutboundIdentityClient outboundIdentityClient;
    private Long idRole = 2L;

    @NonFinal
    @Value("${jwt.signerKey}")
    protected String SIGNER_KEY;

    @NonFinal
    @Value("${jwt.valid-duration}")
    protected Long VALID_DURATION;

    @NonFinal
    @Value("${jwt.refreshable-duration}")
    protected Long REFRESHABLE_DURATION;

    @NonFinal
    @Value("${outbound.identity.client-id}")
    protected String CLIENT_ID;

    @NonFinal
    @Value("${outbound.identity.client-secret}")
    protected String CLIENT_SECRET;

    @NonFinal
    @Value("${outbound.identity.redirect-uri}")
    protected String REDIRECT_URI;

    @NonFinal
    protected final String GRANT_TYPE = "authorization_code";


    public IntrospectResponse introspect(IntrospectRequest request) throws ParseException {
        var token = request.getToken();
        boolean isValid = true;
        SignedJWT jwt = null;
        try {
            jwt= verifyToken(token,false);
        }catch (AppException | JOSEException | ParseException e){
            isValid = false;
        }

        return IntrospectResponse.builder()
                .username(
                        Objects.nonNull(jwt)?jwt.getJWTClaimsSet().getSubject():null )

                .valid(isValid).build();
    }

    public AuthenticationResponse outboundAuthenticate(String code){
        var response = outboundIdentityClient.exchangeToken(ExchangeTokenRequest.builder()
                .code(code)
                .clientId(CLIENT_ID)
                .clientSecret(CLIENT_SECRET)
                .redirectUri(REDIRECT_URI)
                .grantType(GRANT_TYPE)
                .build());

        String accessToken = response.getAccessToken();
        if (accessToken == null) {
            throw new RuntimeException("Access token is null");
        }else {
            log.info("Outbound Authentication Response: {}", accessToken);
        }

        // B2: gọi Google lấy thông tin user
        GoogleUserInfoResponse userInfo =
                googleUserInfoClient.getUserInfo("Bearer " + accessToken);

        if (userInfo == null || userInfo.getEmail() == null) {
            throw new RuntimeException("Failed to fetch user info from Google");
        }
        // B3: kiểm tra DB
        User user = userRepository.findByEmail(userInfo.getEmail())
                .orElseGet(() -> {
                    // nếu chưa có thì lưu mới
                    var requestRole = roleRepository.findAllById(List.of(idRole));


                    User newUser = new User();
                    newUser.setGoogleId(userInfo.getId());
                    newUser.setEmail(userInfo.getEmail());
                    newUser.setUsername(userInfo.getName());
                    newUser.setRoles(new HashSet<>(requestRole));
                    newUser = userRepository.save(newUser);

                    ProfileCreateResponse response1 = new ProfileCreateResponse();

                    ProfileCreateRequest profileRequest = profileMapper.toProfileCreateResponse(response1);
                    profileRequest.setUserId(newUser.getId());


                    profileClient.createProfile(profileRequest);
                    return newUser; // 👈 thêm dòng này
                });

        var token =generateToken(user);



        return AuthenticationResponse.builder()
                .token(token) // trả token của app bạn
                .build();
    }

    public AuthenticationResponse authentication(AuthenticationRequest request) {

        var user = userRepository.findByUsername(request.getUsername()).orElseThrow(() -> AppException.off(ErrorCode.USER_NOT_EXISTED));

        boolean authentication = passwordEncoder.matches(request.getPassword(), user.getPassword());

        if (!authentication) throw AppException.off(ErrorCode.UNAUTHENTICATION);

        var token = generateToken(user);

        return AuthenticationResponse.builder().token(token).authenticated(true).build();
    }

    public void logout(LogoutRequest request) throws ParseException, JOSEException {
        try {
            var signToken = verifyToken(request.getToken(), true);
            String jit = signToken.getJWTClaimsSet().getJWTID();
            Date expiryTime = signToken.getJWTClaimsSet().getExpirationTime();
            InvalidatedToken invalidatedToken = InvalidatedToken.builder().id(jit).expirytime(expiryTime).build();
            invalidatedTokenRepository.save(invalidatedToken);
        } catch (AppException e) {
            log.info("Token already expired");
        }



    }

    public RefreshResponse refreshToken(RefreshRequest resquest) throws ParseException, JOSEException {
        var signJWT = verifyToken(resquest.getToken(), true);

        var jit = signJWT.getJWTClaimsSet().getJWTID();
        var expiryTime = signJWT.getJWTClaimsSet().getExpirationTime();

        InvalidatedToken invalidatedToken = InvalidatedToken.builder().id(jit).expirytime(expiryTime).build();
        invalidatedTokenRepository.save(invalidatedToken);

        var username = signJWT.getJWTClaimsSet().getSubject();
        var user = userRepository.findByUsername(username).orElseThrow(() -> AppException.off(ErrorCode.USER_NOT_FOUND));
        var token = generateToken(user);

        return RefreshResponse.builder().token(token).authenticated(true).build();

    }

    private SignedJWT verifyToken(String token, boolean isRefresh) throws JOSEException, ParseException {
        JWSVerifier verifier = new MACVerifier(SIGNER_KEY.getBytes());

        SignedJWT signedJWT = SignedJWT.parse(token);

        var verified = signedJWT.verify(verifier);

        Date expiryTime = (isRefresh)
                ? new Date(signedJWT.getJWTClaimsSet().getExpirationTime().toInstant()
                    .plus(REFRESHABLE_DURATION,ChronoUnit.SECONDS).toEpochMilli())
                : signedJWT.getJWTClaimsSet().getExpirationTime();

        if (!verified && expiryTime.after(new Date())) throw AppException.off(ErrorCode.UNAUTHENTICATION);

        if (invalidatedTokenRepository.existsById(signedJWT.getJWTClaimsSet().getJWTID()))
            throw AppException.off(ErrorCode.HET_HAN_TOKEN);

        return signedJWT;
    }

    private String generateToken(User user) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);
        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(user.getUsername())
                .issuer("devteria.com")
                .issueTime(new Date())
                .expirationTime(new Date(Instant.now().plus(VALID_DURATION, ChronoUnit.SECONDS).toEpochMilli())).jwtID(UUID.randomUUID().toString())
                .claim("scope", buildScope(user))
                .build();
        Payload payload = new Payload(jwtClaimsSet.toJSONObject());
        JWSObject jwsObject = new JWSObject(header, payload);
        try {

            jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes()));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            log.error("Cannot ceate token", e);
            throw new RuntimeException(e);
        }
    }

    private String buildScope(User user) {
        StringJoiner stringJoiner = new StringJoiner(" ");

        if (!CollectionUtils.isEmpty(user.getRoles())) user.getRoles().forEach(roles -> {
            stringJoiner.add("ROLE_" + roles.getName());
            if (!CollectionUtils.isEmpty(roles.getPermissionSet()))
                roles.getPermissionSet().forEach(permission -> stringJoiner.add(permission.getName()));
        });

        return stringJoiner.toString();
    }

}
