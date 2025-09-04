package com.example.oto.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PermissionResponse {
    Long id;

    String name;

    String description;
}
