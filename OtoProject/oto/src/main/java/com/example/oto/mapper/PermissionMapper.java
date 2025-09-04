package com.example.oto.mapper;

import com.example.oto.dto.request.PermissionRequest;
import com.example.oto.dto.response.PermissionResponse;
import com.example.oto.entity.Permission;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PermissionMapper {
    Permission toPermission(PermissionRequest request);
    PermissionResponse toResponse (Permission permission);
}
