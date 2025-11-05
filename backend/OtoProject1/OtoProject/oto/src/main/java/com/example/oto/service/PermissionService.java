package com.example.oto.service;

import com.example.oto.dto.request.PermissionRequest;
import com.example.oto.dto.response.PermissionResponse;
import com.example.oto.entity.Permission;
import com.example.oto.mapper.PermissionMapper;
import com.example.oto.repository.PermissionRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
@RequiredArgsConstructor
@Slf4j
public class PermissionService {
    PermissionRepository permissionRepository;
    PermissionMapper permissionMapper;

    public PermissionResponse create(PermissionRequest permissionRequest){
        Permission save   = permissionRepository.save(permissionMapper.toPermission(permissionRequest));
        PermissionResponse response = permissionMapper.toResponse(save);
        return response;
    }

    public List<PermissionResponse> getAll(){
        List<Permission> permission = permissionRepository.findAll();
        return permission.stream()
                .map(permissionMapper::toResponse)
                .toList();

    }
    public boolean Delete(Long id){
        if (!permissionRepository.existsById(id)) {
            return false;
        }
        permissionRepository.deleteById(id);
        return true;
    }
}
