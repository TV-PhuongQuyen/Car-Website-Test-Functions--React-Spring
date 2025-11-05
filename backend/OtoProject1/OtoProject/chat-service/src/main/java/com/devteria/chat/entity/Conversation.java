package com.devteria.chat.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "conversation")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Conversation {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @Column(nullable = false)
    String type;

    @Column(name = "participants_hash", unique = true, nullable = false)
    String participantsHash;

    @Column(name = "created_date", nullable = false)
    LocalDateTime createdDate;

    @Column(name = "modified_date")
    LocalDateTime modifiedDate;

    @OneToMany(mappedBy = "conversation", cascade = CascadeType.ALL, orphanRemoval = true)
    List<ConversationParticipant> participants_User = new ArrayList<>();

    @Transient
    List<ParticipantInfo> participants;
}
