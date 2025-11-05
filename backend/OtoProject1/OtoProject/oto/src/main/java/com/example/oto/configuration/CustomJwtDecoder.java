package com.example.oto.configuration;

import com.example.oto.service.AuthenticationService;
import com.nimbusds.jwt.SignedJWT;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import java.text.ParseException;




public class CustomJwtDecoder implements JwtDecoder {
    private final AuthenticationService authenticationService;
    private final String signerKey;
    private NimbusJwtDecoder nimbusJwtDecoder = null;

    public CustomJwtDecoder(AuthenticationService authenticationService, String signerKey) {
        this.authenticationService = authenticationService;
        this.signerKey = signerKey;
    }

    @Override
    public Jwt decode(String token) throws JwtException {
        try {
            SignedJWT signedJWT = SignedJWT.parse(token);

            return new Jwt(token,
                    signedJWT.getJWTClaimsSet().getIssueTime().toInstant(),
                    signedJWT.getJWTClaimsSet().getExpirationTime().toInstant(),
                    signedJWT.getHeader().toJSONObject(),
                    signedJWT.getJWTClaimsSet().getClaims()
                    );

        } catch (ParseException e) {
            throw new JwtException("Invalid JWT token");
        }

    }
}
