package com.example.oto.configuration;

import com.example.oto.entity.Roles;
import com.example.oto.entity.User;
import com.example.oto.exception.AppException;
import com.example.oto.exception.ErrorCode;
import com.example.oto.repository.RoleRepository;
import com.example.oto.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;
import java.util.Set;

@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ApplicationInitConfig {

    PasswordEncoder passwordEncoder;

    @NonFinal
    @Value("${app.default-roles.user}")
    private String roleUser;

    @NonFinal
    @Value("${app.default-roles.admin}")
    private String roleAdmin;

    @NonFinal
    @Value("${app.default-user.username}")
    private String username;

    @NonFinal
    @Value("${app.default-user.password}")
    private String password;



    @Bean
    ApplicationRunner applicationRunner(UserRepository userRepository, RoleRepository roleRepository) {
        return args -> {
            // Tạo role nếu chưa có
            if (roleRepository.findByName(roleAdmin).isEmpty()) {
                roleRepository.save(Roles.builder().name(roleAdmin).build());
                log.info("Created missing role: {}", roleAdmin);
            }

            if (roleRepository.findByName(roleUser).isEmpty()) {
                roleRepository.save(Roles.builder().name(roleUser).build());
                log.info("Created missing role: {}", roleUser);
            }

            // Tạo user admin nếu chưa có
            if (userRepository.findByUsername(username).isEmpty()) {
                Roles adminRole = roleRepository.findByName(roleAdmin)
                        .orElseThrow(() -> AppException.off(ErrorCode.ROLE_NOT_FOUND));

                Set<Roles> rolesSet = new HashSet<>();
                rolesSet.add(adminRole);

                User user = User.builder()
                        .username(username)
                        .password(passwordEncoder.encode(password))
                        .roles(rolesSet)
                        .build();

                userRepository.save(user);
                log.warn("Admin user has been created with default password: {}, please change it.", password);
            }
        };
    }

}
