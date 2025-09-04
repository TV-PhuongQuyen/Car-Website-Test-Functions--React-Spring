package com.example.oto.dto.request;

import lombok.Data;

import java.util.Set;

@Data
public class RolesRequest {
    private String name;
    Set<Long> permissionSet;
}
