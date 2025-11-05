package com.example.oto.repository.httpclient;

import com.example.oto.dto.request.ProfileCreateRequest;
import com.example.oto.dto.response.ApiResponse;
import com.example.oto.dto.response.UserProfileResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "profile-service", url = "${app.services.profile}")
public interface ProfileClient {
    @PostMapping(value = "/user_profile/save_user", produces = MediaType.APPLICATION_JSON_VALUE)
    Object createProfile(@RequestBody ProfileCreateRequest  request);
}
