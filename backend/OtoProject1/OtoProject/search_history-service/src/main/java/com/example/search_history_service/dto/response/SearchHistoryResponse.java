package com.example.search_history_service.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SearchHistoryResponse {
    Long id;
    Long userId;
    String queryText;
    Boolean deleted;
    LocalDateTime createdAt;
}
