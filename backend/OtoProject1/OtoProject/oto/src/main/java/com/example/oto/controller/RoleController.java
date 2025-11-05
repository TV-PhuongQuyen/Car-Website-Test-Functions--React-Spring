package com.example.oto.controller;

import com.example.oto.dto.request.RolesRequest;
import com.example.oto.dto.response.RolesResponse;
import com.example.oto.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/roles")

public class RoleController {

    @Autowired
    private RoleService roleService;

    @PostMapping
    public ResponseEntity<RolesResponse> createRole(@RequestBody RolesRequest request) {
        RolesResponse response = roleService.create(request);
        return ResponseEntity.ok(response);
    }
    @GetMapping
    public ResponseEntity<List<RolesResponse>> getAllRoles() {
        List<RolesResponse> roles = roleService.getAll();
        return ResponseEntity.ok(roles);
    }
}
