package com.devteria.chat.repository.httpclient;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.devteria.chat.dto.ApiResponse;
import com.devteria.chat.dto.response.UserProfileResponse;

@FeignClient(name = "profile-service", url = "${app.services.profile.url}")
public interface ProfileClient {

    @GetMapping(value = "/profile/internal/profileId/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    ApiResponse<UserProfileResponse> getProfileById(@PathVariable("id") Long id);
}
