    package com.example.oto.dto.request;

    import com.fasterxml.jackson.annotation.JsonFormat;
    import lombok.AccessLevel;
    import lombok.Builder;
    import lombok.Data;
    import lombok.experimental.FieldDefaults;

    import java.time.LocalDate;

    @Data
    @Builder
    @FieldDefaults(level = AccessLevel.PRIVATE)
    public class ProfileCreateRequest {
        String firstname;
        String lastname;
        @JsonFormat(pattern = "yyyy-MM-dd")
        LocalDate dob;
        String city;
        String avatar;
        Long userId;

    }
