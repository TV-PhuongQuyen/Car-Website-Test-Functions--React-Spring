package com.example.oto.dto.response;

import lombok.Data;

@Data
public class GoogleUserInfoResponse {
    private String id;
    private String email;
    private boolean verified_email;
    private String name;
    private String given_name;
    private String family_name;
    private String picture;
}
