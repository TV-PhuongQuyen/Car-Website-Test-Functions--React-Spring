package com.example.oto.controller;

import com.example.oto.dto.request.UserRequest;
import com.example.oto.dto.response.ApiResponse;
import com.example.oto.dto.response.UserResponse;
import com.example.oto.exception.TrueCode;
import com.example.oto.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserCotroller {
    UserService userService;

    @PostMapping("/registration")
    public ApiResponse<UserResponse> create(@RequestBody @Valid UserRequest userRequest,
                                            HttpServletRequest request){
//        ApiResponse apiResponse = new ApiResponse<>(TrueCode.ADD, userService.create(userRequest), request.getRequestURI());
        ApiResponse<UserResponse> response = ApiResponse.of(TrueCode.ADD, userService.create(userRequest), request.getRequestURI());
        return response;
    }

    @PreAuthorize("hasAuthority('APPROVE_POST')")
    @GetMapping
    public ResponseEntity<List<UserResponse>> getAll(){
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        log.info("Username: {}", authentication.getName());
        authentication.getAuthorities().forEach(grantedAuthority -> log.info(grantedAuthority.getAuthority()));
        List<UserResponse> userResponses = userService.getAll();
        return ResponseEntity.ok(userResponses);
    }

    @PostMapping("/username")
    public ApiResponse<UserResponse> getUserName(HttpServletRequest request){

        ApiResponse<UserResponse> response = ApiResponse.of(TrueCode.CHECK, userService.getUser(), request.getRequestURI());
        return response;
    }

    @GetMapping("/id")
    public ResponseEntity<Long> getUserId(@RequestParam String username) {
        log.info("Received request to get user ID for username: {}", username);
        Long userId = userService.getUserIdByUsername(username);
        return ResponseEntity.ok(userId);
    }
}
