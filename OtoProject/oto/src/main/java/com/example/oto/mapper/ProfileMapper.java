package com.example.oto.mapper;

import com.example.oto.dto.request.ProfileCreateRequest;
import com.example.oto.dto.request.UserRequest;
import com.example.oto.dto.response.ProfileCreateResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProfileMapper {
    ProfileCreateRequest toProfileCreateResponse(ProfileCreateResponse profileCreateResponse);
    ProfileCreateRequest toProfileCreateRequest(UserRequest request);
}
