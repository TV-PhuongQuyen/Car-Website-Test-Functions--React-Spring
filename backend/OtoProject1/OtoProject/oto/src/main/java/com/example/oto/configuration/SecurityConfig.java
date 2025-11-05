//httpSecurity
//        .authorizeHttpRequests(...)        // Phân quyền
//        .oauth2ResourceServer(...)         // Xác thực token
//        .formLogin(...)                    // Login bằng form (nếu có)
//        .httpBasic()                       // Basic Auth
//        .csrf(AbstractHttpConfigurer::disable)  // Tắt CSRF cho API
//        .sessionManagement(...)            // Quản lý session
//        .headers(...)                      // Bảo mật headers
//        .exceptionHandling(...)            // Xử lý lỗi xác thực
//        .logout(...);                      // Cấu hình logout

package com.example.oto.configuration;

import com.example.oto.service.AuthenticationService;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    private final String[] PUBLIC_ENDPOINTS = {"/users/registration",
            "/auth/token",
            "/auth/introspect",
            "/auth/logout",
            "/auth/refresh",
            "/roles",
            "/permission",
            "/auth/outbound/authentication"
            };

    @NonFinal
    @Value("${app.default-roles.admin}")
    private String roleAdmin;

    @Value("${jwt.signerKey}")
    private String signerKey;



    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity, JwtDecoder customJwtDecoder) throws Exception {
        httpSecurity.authorizeHttpRequests(
                request -> request
                        .requestMatchers(HttpMethod.GET, "/users/id").permitAll()
                        .requestMatchers(HttpMethod.POST, PUBLIC_ENDPOINTS).permitAll()
                        .anyRequest().authenticated());

        httpSecurity.oauth2ResourceServer(oauth2 -> oauth2
                .jwt(jwtConfigurer -> jwtConfigurer
                        .decoder(customJwtDecoder)
                        .jwtAuthenticationConverter(jwtAuthenticationConverter()))
                .authenticationEntryPoint(new JwtAuthenticationEntryPoint())
        );

        httpSecurity.csrf(AbstractHttpConfigurer::disable);
        return httpSecurity.build();
    }

    @Bean
    public JwtDecoder customJwtDecoder(AuthenticationService authenticationService) {
        return new CustomJwtDecoder(authenticationService, signerKey);
    }
    @Bean
    JwtAuthenticationConverter jwtAuthenticationConverter(){
        JwtGrantedAuthoritiesConverter jwtGrantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
        jwtGrantedAuthoritiesConverter.setAuthorityPrefix("");
        JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
        jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(jwtGrantedAuthoritiesConverter);

        return  jwtAuthenticationConverter;
    }

    @Bean
    PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder(10);
    }
}
