package com.devteria.chat.repository.httpclient;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.devteria.chat.dto.ApiResponse;
import com.devteria.chat.dto.request.IntrospectRequest;
import com.devteria.chat.dto.response.IntrospectResponse;

// QUAN TRỌNG: Không có AuthenticationRequestInterceptor
@FeignClient(name = "oto-service-socket", url = "${app.services.oto}")
public interface OtoSocketClient {
    @PostMapping(value = "/auth/introspect")
    ApiResponse<IntrospectResponse> introspect(@RequestBody IntrospectRequest introspectRequest);

    @GetMapping(value = "/users/id", produces = MediaType.APPLICATION_JSON_VALUE)
    Long getUserId(@RequestParam("username") String username);
}
