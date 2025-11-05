package com.example.oto.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProfileCreateResponse {
    String firstname;
    String lastname ;
    @JsonFormat(pattern = "yyyy-MM-dd")
    LocalDate dob;
    String city ;
    String avatar ;


}
