package com.example.profileservice.dto.request;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UpdataProfileRequest {
    String firstname;
    String lastname;
    @JsonFormat(pattern = "yyyy-MM-dd")
    LocalDate dob;
    String city;

}
