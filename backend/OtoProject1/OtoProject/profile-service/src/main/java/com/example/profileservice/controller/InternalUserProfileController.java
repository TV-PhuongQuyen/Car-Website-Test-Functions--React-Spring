package com.example.profileservice.controller;

import com.example.profileservice.dto.request.UpdataProfileRequest;
import com.example.profileservice.dto.response.ApiResponse;
import com.example.profileservice.dto.response.ProfileResponse;
import com.example.profileservice.service.UserProfileService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/internal")
@Slf4j
public class InternalUserProfileController {
    UserProfileService userProfileService;

    @GetMapping("/myProfile")
    public ApiResponse<ProfileResponse> getUserProfile(HttpServletRequest request) {
        return ApiResponse.<ProfileResponse>builder()
                .result(userProfileService.getUserProfile())
                .path(request.getRequestURI()).build();
    }

    @PutMapping("/updateProfile")
    public ApiResponse<ProfileResponse> updateUserProfile(@RequestBody UpdataProfileRequest updataProfileRequest, HttpServletRequest request) {
            return  ApiResponse.<ProfileResponse>builder()
                    .message("Cập nhật thành công")
                    .result(userProfileService.updateUserProfile(updataProfileRequest))
                    .path(request.getRequestURI())
                    .build();
    }

    @PutMapping("/avatar")
    ApiResponse<ProfileResponse> updateAvatar(@RequestParam("file") MultipartFile file) {
        return ApiResponse.<ProfileResponse>builder()
                .result(userProfileService.updateAvatar(file))
                .build();
    }

    @GetMapping("/profileId/{id}")
    public ApiResponse<ProfileResponse> getUserProfileById(@PathVariable Long id) {
        return ApiResponse.<ProfileResponse>builder()
                .result(userProfileService.getProfileById(id))
                .build();
    }


}
