package com.devteria.chat.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;

import org.hibernate.annotations.CreationTimestamp;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "chat_message")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "conversation_id", nullable = false)
    String conversationId;

    @Column(name = "message", nullable = false)
    String message;

    @Column(name = "sender_id", nullable = false)
    Long senderId;

    @CreationTimestamp
    @Column(name = "created_date", nullable = false, updatable = false)
    LocalDateTime createdDate;
}
