package com.example.profileservice.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)

public class UserProfileRequest {
    String firstname;
    String lastname;
    @JsonFormat(pattern = "yyyy-MM-dd")
    LocalDate dob;
    String city;
    String avatar;
    Long userId;
}
