package com.example.profileservice.mapper;

import com.example.profileservice.dto.request.UserProfileRequest;
import com.example.profileservice.dto.response.ProfileResponse;
import com.example.profileservice.entity.UserProfile;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserProfileMapper {
    UserProfile toEntity(UserProfileRequest request);
    ProfileResponse toResponse(UserProfile userProfile);
}
