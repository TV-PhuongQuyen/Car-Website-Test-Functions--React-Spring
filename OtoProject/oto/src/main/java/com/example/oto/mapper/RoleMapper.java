package com.example.oto.mapper;

import com.example.oto.dto.request.RolesRequest;
import com.example.oto.dto.response.RolesResponse;
import com.example.oto.entity.Roles;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RoleMapper {
    @Mapping(target = "permissionSet", ignore = true)
    Roles toEntity(RolesRequest request);
    RolesResponse toRespome(Roles roles);
}
