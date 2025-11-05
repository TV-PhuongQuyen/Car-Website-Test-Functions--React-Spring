package com.example.oto.mapper;

import com.example.oto.dto.request.UserRequest;
import com.example.oto.dto.response.UserResponse;
import com.example.oto.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "roles", ignore = true)
    User toUser(UserRequest request);
    UserResponse toRespone(User user);
}
