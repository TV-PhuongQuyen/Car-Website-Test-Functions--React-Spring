package com.example.profileservice.controller;

import com.example.profileservice.dto.request.SearchUserRequest;
import com.example.profileservice.dto.request.UserProfileRequest;
import com.example.profileservice.dto.response.ApiResponse;
import com.example.profileservice.dto.response.ProfileResponse;
import com.example.profileservice.service.UserProfileService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user_profile")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class UserProfileController {
    UserProfileService userProfileService;


    @GetMapping("/allProfile")
    public ResponseEntity<List<ProfileResponse>> getAllUserProfiles() {
        List<ProfileResponse> userProfileRespones = userProfileService.getAllUserProfiles();
        return ResponseEntity.ok(userProfileRespones);
    }

    @PostMapping("/save_user")
    public ApiResponse<ProfileResponse> saveUserProfile(@RequestBody UserProfileRequest userProfileRequest, HttpServletRequest request) {
        log.info("DOB in request: {}", userProfileRequest.getDob());
        return ApiResponse.<ProfileResponse>builder()
                .result(userProfileService.createUserProfile(userProfileRequest))
                .path(request.getRequestURI())
                .build();
    }
    @PostMapping("/users/search")
    ApiResponse<List<ProfileResponse>> search(@RequestBody SearchUserRequest request) {
        return ApiResponse.<List<ProfileResponse>>builder()
                .result(userProfileService.search(request))
                .build();
    }
}
