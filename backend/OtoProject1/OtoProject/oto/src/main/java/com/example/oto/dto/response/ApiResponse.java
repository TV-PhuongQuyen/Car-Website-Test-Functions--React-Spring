package com.example.oto.dto.response;

import com.example.oto.exception.TrueCode;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse <T> {
    private TrueCode trueCode;
    private int code;
    private String message;
    private T result;
    private String timestamp;
    private String path;



    public static <T> ApiResponse<T> of(TrueCode code, T result, String path) {
        ApiResponse<T> response = new ApiResponse<>();
        response.setTrueCode(code);
        response.setResult(result);
        response.setTimestamp(Instant.now().toString());
        response.setPath(path);
        return response;
    }

}
