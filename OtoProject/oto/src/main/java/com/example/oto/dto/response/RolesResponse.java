package com.example.oto.dto.response;

import com.example.oto.entity.Permission;
import lombok.Data;

import java.util.Set;

@Data
public class RolesResponse {
    private Long id;
    private String name;
    Set<Permission> permissionSet;
}
