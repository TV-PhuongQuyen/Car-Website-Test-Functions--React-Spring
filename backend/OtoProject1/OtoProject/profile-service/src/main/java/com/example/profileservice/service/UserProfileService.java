package com.example.profileservice.service;

import com.example.profileservice.dto.request.SearchUserRequest;
import com.example.profileservice.dto.request.UpdataProfileRequest;
import com.example.profileservice.dto.request.UserProfileRequest;
import com.example.profileservice.dto.response.ProfileResponse;
import com.example.profileservice.entity.UserProfile;
import com.example.profileservice.exception.AppException;
import com.example.profileservice.exception.ErrorCode;
import com.example.profileservice.mapper.UserProfileMapper;
import com.example.profileservice.repository.UserProfileRepository;
import com.example.profileservice.repository.httpclient.FileClient;
import com.example.profileservice.repository.httpclient.OtoClient;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class UserProfileService {

    UserProfileRepository userProfileRepository;
    OtoClient  otoClient;
    UserProfileMapper userProfileMapper;
    FileClient fileClient;

    public ProfileResponse createUserProfile(UserProfileRequest userProfileRequest) {
        UserProfile userProfile = userProfileMapper.toEntity(userProfileRequest);
        userProfileRepository.save(userProfile);
        return userProfileMapper.toResponse(userProfile);

    }
    public List<ProfileResponse> getAllUserProfiles() {
        List<UserProfile> userProfiles = userProfileRepository.findAll();
        List<ProfileResponse> userProfileRespones = new ArrayList<>();
        userProfiles.forEach(userProfile -> userProfileRespones.add(userProfileMapper.toResponse(userProfile)));
        return  userProfileRespones;
    }
    public ProfileResponse updateUserProfile(UpdataProfileRequest request) {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        // Lấy userId từ oto-service
        Long userId = otoClient.getUserId(username);
        log.info("UserId from oto-service: {}", userId);

        // Tìm profile theo userId
        UserProfile userProfile = userProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        // Update field từ request -> entity
        userProfile.setFirstname(request.getFirstname());
        userProfile.setLastname(request.getLastname());
        userProfile.setDob(request.getDob());
        userProfile.setCity(request.getCity());
        // … thêm field khác nếu có

        // Lưu lại DB
        userProfileRepository.save(userProfile);

        return userProfileMapper.toResponse(userProfile);
    }

    public ProfileResponse getProfileById(Long id) {
        UserProfile userProfile = userProfileRepository.findByUserId(id)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        return userProfileMapper.toResponse(userProfile);
    }

    public ProfileResponse getUserProfile() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        // Gọi oto-service trực tiếp để lấy userId
        Long userId = otoClient.getUserId(username);
        log.info("UserId from oto-service: {}", userId);

        UserProfile userProfile = userProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        return userProfileMapper.toResponse(userProfile);
    }
    public ProfileResponse updateAvatar(MultipartFile file) {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Long userId = otoClient.getUserId(username);

        UserProfile userProfile = userProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        var response = fileClient.uploadMedia(file);

        userProfile.setAvatar(response.getResult().getUrl());

        UserProfile updatedUserProfile = userProfileRepository.save(userProfile);

        return  userProfileMapper.toResponse(updatedUserProfile);

    }
    public List<ProfileResponse> search(SearchUserRequest request) {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        Long userId = otoClient.getUserId(username);
        List<UserProfile> userProfiles = userProfileRepository
                .findByFirstnameContainingIgnoreCaseOrLastnameContainingIgnoreCase(
                        request.getKeyword(),
                        request.getKeyword()
                );
        return userProfiles.stream()
                .filter(userProfile -> !userId.equals(userProfile.getUserId())) // So sánh trực tiếp
                .map(userProfileMapper::toResponse)
                .toList();
    }
}
