package com.devteria.chat.dto.response;

import java.time.LocalDateTime;
import java.util.List;

import com.devteria.chat.entity.ParticipantInfo;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ConversationResponse {
    String id;
    String type;
    String participantsHash;
    LocalDateTime createdDate;
    LocalDateTime modifiedDate;
    List<ParticipantInfo> participants;
    String conversationAvatar;
    String conversationName;
}
