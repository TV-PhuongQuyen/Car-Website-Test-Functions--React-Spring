package com.devteria.post.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import java.time.LocalDateTime;

import java.time.Instant;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "posts")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    Long usersId;

    String context;

    String mediaUrl;

    @Enumerated(EnumType.STRING)   // 👈 lưu enum dưới dạng chuỗi "PUBLIC", "PRIVATE"...
    Privacy privacy;

    LocalDateTime createdAt ;
    LocalDateTime modifiedDate ;
}
