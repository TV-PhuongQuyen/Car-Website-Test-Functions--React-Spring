package com.example.oto.dto.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PermissionRequest {
    String name;
    String description;
}
