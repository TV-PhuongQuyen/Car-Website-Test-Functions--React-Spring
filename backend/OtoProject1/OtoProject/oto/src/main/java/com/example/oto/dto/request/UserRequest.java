package com.example.oto.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.util.Set;

@Data
@Builder
public class UserRequest {
    private  String username;
    @Size(min = 8, message = "INVALID_PASSWORD")
    private String password;
    String firstname ="";
    String lastname = "";
    @JsonFormat(pattern = "yyyy-MM-dd")
    LocalDate dob;
    String city = "";
    String avatar = "";
    private Set<Long> roles;
}
