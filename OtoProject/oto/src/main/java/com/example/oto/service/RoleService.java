package com.example.oto.service;

import com.example.oto.dto.request.RolesRequest;
import com.example.oto.dto.response.RolesResponse;
import com.example.oto.entity.Roles;
import com.example.oto.mapper.RoleMapper;
import com.example.oto.repository.PermissionRepository;
import com.example.oto.repository.RoleRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class RoleService {

    RoleMapper roleMapper;
    PermissionRepository permissionRepository;
    RoleRepository roleRepository;

    public RolesResponse create(RolesRequest request){
        var role = roleMapper.toEntity(request);
        var permission = permissionRepository.findAllById(request.getPermissionSet());
        role.setPermissionSet(new HashSet<>(permission));
        Roles saved = roleRepository.save(role);
        return roleMapper.toRespome(saved);
    }
    public List<RolesResponse> getAll(){
        List<Roles> roles = roleRepository.findAll();
        return roles.stream()
                .map(roleMapper::toRespome)
                .collect(Collectors.toList());
    }
}
