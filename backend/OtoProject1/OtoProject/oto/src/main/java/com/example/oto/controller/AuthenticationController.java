package com.example.oto.controller;

import com.example.oto.dto.request.AuthenticationRequest;
import com.example.oto.dto.request.IntrospectRequest;
import com.example.oto.dto.request.LogoutRequest;
import com.example.oto.dto.request.RefreshRequest;
import com.example.oto.dto.response.*;
import com.example.oto.exception.TrueCode;
import com.example.oto.service.AuthenticationService;
import com.nimbusds.jose.JOSEException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/auth")
public class AuthenticationController {

    AuthenticationService authenticationService;

    @PostMapping("/introspect")
    ApiIntrospect<IntrospectResponse> authenticationResponse(@RequestBody  IntrospectRequest  request) throws ParseException {
        return ApiIntrospect.<IntrospectResponse>builder()
                .result(authenticationService.introspect(request))
                .build();
    }
    @PostMapping("/outbound/authentication")
    ApiResponse<AuthenticationResponse> outboundAuthenticate(
            @RequestParam("code") String code
    ){
        var result = authenticationService.outboundAuthenticate(code);
        return ApiResponse.<AuthenticationResponse>builder()
                .result(result)
                .build();
    }

    @PostMapping("/token")
    ApiResponse<AuthenticationResponse> authenticationResponse(@RequestBody @Valid AuthenticationRequest authenticationRequest
    , HttpServletRequest request){
        ApiResponse apiResponse = ApiResponse.of(TrueCode.CHECK,authenticationService.authentication(authenticationRequest), request.getRequestURI());
        return apiResponse;
    }
    @PostMapping("/refresh")
    ApiResponse<RefreshResponse> RefreshToken(@RequestBody @Valid RefreshRequest refreshRequest
            , HttpServletRequest request) throws ParseException, JOSEException {
        ApiResponse apiResponse = ApiResponse.of(TrueCode.UPDATE,authenticationService.refreshToken(refreshRequest), request.getRequestURI());
        return apiResponse;
    }



    @PostMapping("/logout")
    ApiResponse<Void> logout(@RequestBody @Valid LogoutRequest logoutRequest, HttpServletRequest request) throws ParseException, JOSEException {
        authenticationService.logout(logoutRequest); // thực thi
        return ApiResponse.of(TrueCode.LOGOUT, null, request.getRequestURI()); // không có result
    }
}
