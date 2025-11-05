package com.example.oto.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.Set;

@Data
@Builder
public class UserResponse {
    private  Long id;
    private  String username;
    private Set<RolesResponse> roles;
}
