package com.example.oto.controller;

import com.example.oto.dto.request.PermissionRequest;
import com.example.oto.dto.response.ApiResponse;
import com.example.oto.dto.response.PermissionResponse;
import com.example.oto.exception.TrueCode;
import com.example.oto.service.PermissionService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/permission")
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class PermissionController {
    PermissionService permissionService;

    @PostMapping
    ApiResponse<PermissionResponse> creat(@RequestBody PermissionRequest permissionRequest, HttpServletRequest request){
        ApiResponse apiResponse = ApiResponse.of(TrueCode.ADD,permissionService.create(permissionRequest),request.getRequestURI());
        return apiResponse;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    ResponseEntity<List<PermissionResponse>> getAll(){
        List<PermissionResponse> list = permissionService.getAll();
        return ResponseEntity.ok(list);
    }

    @DeleteMapping("/{id}")
    ApiResponse<Boolean> delete(@PathVariable Long id, HttpServletRequest request){
        ApiResponse apiResponse = ApiResponse.of(TrueCode.DELETE,permissionService.Delete(id),request.getRequestURI());
        return apiResponse;
    }
}
