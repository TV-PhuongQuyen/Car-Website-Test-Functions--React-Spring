package com.devteria.chat.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "web_socket_session")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class WebSocketSession {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @Column(nullable = false, name = "socket_session_id")
    String socketSessionId;

    @Column(nullable = false, name = "user_id")
    Long userId;

    @Column(nullable = false, name = "created_at")
    LocalDateTime createdAt;
}
