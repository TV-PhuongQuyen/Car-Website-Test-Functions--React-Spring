package com.devteria.chat.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.corundumstudio.socketio.SocketIOServer;
import com.devteria.chat.dto.request.ChatMessageRequest;
import com.devteria.chat.dto.response.ChatMessageResponse;
import com.devteria.chat.entity.ChatMessage;
import com.devteria.chat.entity.ParticipantInfo;
import com.devteria.chat.entity.WebSocketSession;
import com.devteria.chat.exception.AppException;
import com.devteria.chat.exception.ErrorCode;
import com.devteria.chat.mapper.ChatMessageMapper;
import com.devteria.chat.repository.ChatMessageRepository;
import com.devteria.chat.repository.ConversationParticipantRepository;
import com.devteria.chat.repository.ConversationRepository;
import com.devteria.chat.repository.WebSocketSessionRepository;
import com.devteria.chat.repository.httpclient.OtoClient;
import com.devteria.chat.repository.httpclient.ProfileClient;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ChatMessageService {
    ChatMessageRepository chatMessageRepository;
    ProfileClient profileClient;
    ConversationRepository conversationRepository;
    ConversationParticipantRepository conversationParticipantRepository;
    OtoClient otoClient;
    WebSocketSessionRepository webSocketSessionRepository;
    ChatMessageMapper chatMessageMapper;
    SocketIOServer socketIOServer;
    ObjectMapper objectMapper;

    public List<ChatMessageResponse> getMessages(String conversationId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Long userId = otoClient.getUserId(username);
        var userResponse = profileClient.getProfileById(userId);
        var userInfo = userResponse.getResult();

        conversationRepository
                .findById(conversationId)
                .orElseThrow(() -> new AppException(ErrorCode.CONVERSATION_NOT_FOUND))
                .getParticipants_User()
                .stream()
                .filter(participantInfo -> userId.equals(participantInfo.getUserId()))
                .findAny()
                .orElseThrow(() -> new AppException(ErrorCode.CONVERSATION_NOT_FOUND));

        var messages = chatMessageRepository.findAllByConversationIdOrderByCreatedDateAsc(conversationId);

        return messages.stream()
                .map(messagesUser -> {
                    ChatMessageResponse response = chatMessageMapper.toChatMessageResponse(messagesUser);

                    Long senderId = messagesUser.getSenderId();

                    var senderResponse = profileClient.getProfileById(senderId);

                    var senderInfo = senderResponse.getResult();

                    ParticipantInfo participantInfo = ParticipantInfo.builder()
                            .userId(senderId)
                            .firstName(senderInfo.getFirstname())
                            .lastName(senderInfo.getLastname())
                            .avatar(senderInfo.getAvatar())
                            .build();
                    response.setSender(participantInfo);
                    response.setMe(senderId.equals(userId));
                    return response;
                })
                .toList();
    }
    //    public ChatMessageResponse create(ChatMessageRequest request) {
    //
    //        String username = SecurityContextHolder.getContext().getAuthentication().getName();
    //        Long userId = otoClient.getUserId(username);
    //
    //        conversationRepository.findById(request.getConversationId())
    //                .orElseThrow(() -> new AppException(ErrorCode.CONVERSATION_NOT_FOUND))
    //                .getParticipants_User()
    //                .stream()
    //                .filter(participantInfo -> userId.equals(participantInfo.getUserId()))
    //                .findAny()
    //                .orElseThrow(() -> new AppException(ErrorCode.CONVERSATION_NOT_FOUND));
    //
    //        ChatMessage chatMessage = chatMessageMapper.toChatMessage(request);
    //        chatMessage.setSenderId(userId);
    //        chatMessage.setCreatedDate(LocalDateTime.now());
    //
    //        // Lưu vào final variable để dùng trong lambda
    //        final ChatMessage savedMessage = chatMessageRepository.save(chatMessage);
    //
    //        // Lấy danh sách participants
    //        List<Long> participantUserIds =
    // conversationParticipantRepository.findUserIdsByConversationId(request.getConversationId());
    //
    //        // Lấy tất cả WebSocket sessions của participants
    //        List<WebSocketSession> webSocketSessions =
    // webSocketSessionRepository.findAllByUserIdIn(participantUserIds);
    //
    //        // Gửi tin nhắn RIÊNG cho từng client với 'me' phù hợp
    //        socketIOServer.getAllClients().forEach(client -> {
    //            String sessionId = client.getSessionId().toString();
    //
    //            // Tìm WebSocketSession tương ứng với client này
    //            webSocketSessions.stream()
    //                    .filter(session -> session.getSocketSessionId().equals(sessionId))
    //                    .findFirst()
    //                    .ifPresent(session -> {
    //                        try {
    //                            Long clientUserId = session.getUserId();
    //
    //                            // Tạo response RIÊNG cho client này
    //                            ChatMessageResponse personalizedResponse = createPersonalizedResponse(savedMessage,
    // clientUserId);
    //
    //                            String message = objectMapper.writeValueAsString(personalizedResponse);
    //                            client.sendEvent("message", message);
    //
    //                            log.debug("Sent personalized message to user {} (me={})", clientUserId,
    // clientUserId.equals(savedMessage.getSenderId()));
    //
    //                        } catch (JsonProcessingException e) {
    //                            log.error("Error converting message to JSON for client {}", sessionId, e);
    //                        }
    //                    });
    //        });
    //
    //
    //        return createPersonalizedResponse(savedMessage, userId);
    //    }
    //
    //    // Method tạo response riêng cho từng user
    //    private ChatMessageResponse createPersonalizedResponse(ChatMessage chatMessage, Long forUserId) {
    //        Long senderId = chatMessage.getSenderId();
    //        var senderResponse = profileClient.getProfileById(senderId);
    //        if (Objects.isNull(senderResponse)) {
    //            throw new AppException(ErrorCode.UNCATEGORIZED_EXCEPTION);
    //        }
    //        var senderInfo = senderResponse.getResult();
    //
    //        ParticipantInfo sender = ParticipantInfo.builder()
    //                .userId(senderId)
    //                .firstName(senderInfo.getFirstname())
    //                .lastName(senderInfo.getLastname())
    //                .avatar(senderInfo.getAvatar())
    //                .build();
    //
    //        ChatMessageResponse response = chatMessageMapper.toChatMessageResponse(chatMessage);
    //        response.setSender(sender);
    //
    //        response.setMe(forUserId.equals(senderId));
    //
    //        return response;
    //    }
    //
    //
    //    private Map<String, Long> getSessionUserMap(List<WebSocketSession> sessions) {
    //        return sessions.stream()
    //                .collect(Collectors.toMap(
    //                        WebSocketSession::getSocketSessionId,
    //                        WebSocketSession::getUserId
    //                ));
    //    }

    public ChatMessageResponse create(ChatMessageRequest request) {

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Long userId = otoClient.getUserId(username);

        conversationRepository
                .findById(request.getConversationId())
                .orElseThrow(() -> new AppException(ErrorCode.CONVERSATION_NOT_FOUND))
                .getParticipants_User()
                .stream()
                .filter(participantInfo -> userId.equals(participantInfo.getUserId()))
                .findAny()
                .orElseThrow(() -> new AppException(ErrorCode.CONVERSATION_NOT_FOUND));

        ChatMessage chatMessage = chatMessageMapper.toChatMessage(request);
        chatMessage.setSenderId(userId);
        chatMessage.setCreatedDate(LocalDateTime.now());
        chatMessage = chatMessageRepository.save(chatMessage);

        ChatMessageResponse chatMessageResponse = chatMessageMapper.toChatMessageResponse(chatMessage);

        List<Long> ParticaipantUserId =
                conversationParticipantRepository.findUserIdsByConversationId(request.getConversationId());

        Map<String, WebSocketSession> webSocketSessions =
                webSocketSessionRepository.findAllByUserIdIn(ParticaipantUserId).stream()
                        .collect(Collectors.toMap(WebSocketSession::getSocketSessionId, Function.identity()));

        socketIOServer.getAllClients().forEach(client -> {
            var webSocketSession = webSocketSessions.get(client.getSessionId().toString());
            if (Objects.nonNull(webSocketSession)) {
                String message = null;
                try {
                    chatMessageResponse.setMe(webSocketSession.getUserId().equals(userId));
                    var senderResponse = profileClient.getProfileById(userId);
                    var senderInfo = senderResponse.getResult();
                    ParticipantInfo sender = ParticipantInfo.builder()
                            .userId(userId)
                            .firstName(senderInfo.getFirstname())
                            .lastName(senderInfo.getLastname())
                            .avatar(senderInfo.getAvatar())
                            .build();
                    chatMessageResponse.setSender(sender);
                    message = objectMapper.writeValueAsString(chatMessageResponse);
                } catch (JsonProcessingException e) {
                    throw new RuntimeException(e);
                }
                client.sendEvent("message", message);
            }
        });

        return toChatMessageResponse(chatMessage);
    }

    private ChatMessageResponse toChatMessageResponse(ChatMessage chatMessage) {

        Long senderId = chatMessage.getSenderId();
        var senderResponse = profileClient.getProfileById(senderId);
        if (Objects.isNull(senderResponse)) {
            throw new AppException(ErrorCode.UNCATEGORIZED_EXCEPTION);
        }
        var senderInfo = senderResponse.getResult();

        ParticipantInfo sender = ParticipantInfo.builder()
                .userId(senderId)
                .firstName(senderInfo.getFirstname())
                .lastName(senderInfo.getLastname())
                .avatar(senderInfo.getAvatar())
                .build();

        ChatMessageResponse response = chatMessageMapper.toChatMessageResponse(chatMessage);
        response.setSender(sender);

        return response;
    }
}
