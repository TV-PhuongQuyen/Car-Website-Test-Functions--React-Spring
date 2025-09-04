package com.devteria.post.dto.response;

import com.devteria.post.entity.Privacy;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.time.Instant;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PostResponse {
    String id;
    Long usersId;
    String context;
    String mediaUrl;
    Privacy privacy;
    LocalDateTime createdAt;
    LocalDateTime modifiedDate ;
    String firstname;
    String lastname;
    String avatar;
    String timeAgo;
}
