package com.example.oto.service;


import com.example.oto.dto.request.ProfileCreateRequest;
import com.example.oto.dto.request.UserRequest;
import com.example.oto.dto.response.UserResponse;
import com.example.oto.entity.User;
import com.example.oto.exception.AppException;
import com.example.oto.exception.ErrorCode;
import com.example.oto.mapper.ProfileMapper;
import com.example.oto.mapper.UserMapper;
import com.example.oto.repository.RoleRepository;
import com.example.oto.repository.UserRepository;
import com.example.oto.repository.httpclient.ProfileClient;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserService {

    UserMapper userMapper;
    UserRepository userRepository;
    RoleRepository roleRepository;
    PasswordEncoder passwordEncoder;
    ProfileClient profileClient;
    ProfileMapper profileMapper;
    private Long idRole = 2L;


    public UserResponse create(UserRequest request) {
        User user = userMapper.toUser(request);

        user.setPassword(passwordEncoder.encode(request.getPassword()));


        var requestRole = roleRepository.findAllById(List.of(idRole));

        user.setRoles(new HashSet<>(requestRole));

        if (userRepository.existsByUsername(request.getUsername()))
            throw AppException.off(ErrorCode.USER_EXISTED);

        user = userRepository.save(user);

        var profileRequest = profileMapper.toProfileCreateRequest(request);

        profileRequest.setUserId(user.getId());


        profileClient.createProfile(profileRequest);

        return userMapper.toRespone(user);
    }
    public List<UserResponse> getAll() {
        List<User> listUser = userRepository.findAll();
        return listUser.stream()
                .map(user -> userMapper.toRespone(user)) // ✅ OK
                .collect(Collectors.toList());

    }
    public UserResponse getUser(){
        var authenticaiton = SecurityContextHolder.getContext().getAuthentication();
        return userRepository.findByUsername(authenticaiton.getName())
                .map(user -> userMapper.toRespone(user))
                .orElseThrow(() -> AppException.off(ErrorCode.USER_NOT_FOUND));
    }



    public Long getUserIdByUsername(String username) {
        log.info("Finding user ID for username: {}", username);
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found with username: " + username));

        log.info("Found user ID: {} for username: {}", user.getId(), username);
        return user.getId();
    }
    public Long countUsers() {
        return userRepository.count(); // built-in
    }
}
