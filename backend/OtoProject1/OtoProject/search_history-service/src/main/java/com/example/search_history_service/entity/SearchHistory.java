package com.example.search_history_service.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import jakarta.persistence.Id;


import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "search_history")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SearchHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "user_id")
   Long userId;

    @Column(name = "query_text", length = 255)
    String queryText;


    @Column(name = "deleted", nullable = false)
    Boolean deleted = false;

    @Column(name = "created_at")
    LocalDateTime createdAt;


}
