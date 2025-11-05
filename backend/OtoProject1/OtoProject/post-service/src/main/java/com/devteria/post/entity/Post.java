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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    Long usersId;

    String context;

    String mediaUrl;

    @Enumerated(EnumType.STRING)
    Privacy privacy;

    LocalDateTime createdAt ;
    LocalDateTime modifiedDate ;
}
