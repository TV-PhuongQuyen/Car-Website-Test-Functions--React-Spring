package com.devteria.chat.mapper;

import org.mapstruct.Mapper;

import com.devteria.chat.dto.response.ConversationResponse;
import com.devteria.chat.entity.Conversation;

@Mapper(componentModel = "spring")
public interface ConversationMapper {
    ConversationResponse toConversationResponse(Conversation conversation);
}
