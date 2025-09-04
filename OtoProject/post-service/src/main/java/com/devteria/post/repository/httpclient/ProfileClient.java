package com.devteria.post.repository.httpclient;

import com.devteria.post.configuration.AuthenticationRequestInterceptor;
import com.devteria.post.dto.ApiResponse;
import com.devteria.post.dto.response.ProfileResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name ="profile-service", url = "${app.services.profile}", configuration = {AuthenticationRequestInterceptor.class })
public interface ProfileClient {
    @GetMapping(value = "/profile/internal/profileId/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    ApiResponse<ProfileResponse> getProfileById(@RequestParam("id") Long id);
}
