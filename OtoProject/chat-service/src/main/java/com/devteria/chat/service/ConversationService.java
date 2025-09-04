package com.devteria.chat.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.devteria.chat.dto.request.ConversationRequest;
import com.devteria.chat.dto.response.ConversationResponse;
import com.devteria.chat.entity.Conversation;
import com.devteria.chat.entity.ConversationParticipant;
import com.devteria.chat.entity.ParticipantInfo;
import com.devteria.chat.exception.AppException;
import com.devteria.chat.exception.ErrorCode;
import com.devteria.chat.mapper.ConversationMapper;
import com.devteria.chat.repository.ConversationParticipantRepository;
import com.devteria.chat.repository.ConversationRepository;
import com.devteria.chat.repository.httpclient.OtoClient;
import com.devteria.chat.repository.httpclient.ProfileClient;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ConversationService {
    ConversationRepository conversationRepository;
    ConversationMapper conversationMapper;
    ProfileClient profileClient;
    ConversationParticipantRepository conversationParticipantRepository;
    OtoClient otoClient;

    public ConversationResponse create(ConversationRequest request) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        long userId = otoClient.getUserId(username);
        var userInfoResponse = profileClient.getProfileById(userId);
        var participantInfoResponse =
                profileClient.getProfileById(request.getUserIds().getFirst());
        if (Objects.isNull(userInfoResponse) || Objects.isNull(participantInfoResponse)) {
            throw new AppException(ErrorCode.UNCATEGORIZED_EXCEPTION);
        }
        var userInfo = userInfoResponse.getResult();
        var participantInfo = participantInfoResponse.getResult();

        List<Long> userIds = List.of(userId, participantInfo.getUserId());
        var sortedIds = userIds.stream().sorted().toList();
        String userIdHash = generateParticipantHash(sortedIds);
        log.info("userIdHash: {}", userIdHash);

        Conversation conversation = conversationRepository
                .findByParticipantsHash(userIdHash)
                .orElseGet(() -> {
                    List<ParticipantInfo> participantInfos = List.of(
                            ParticipantInfo.builder()
                                    .userId(userInfo.getUserId())
                                    .firstName(userInfo.getFirstname())
                                    .lastName(userInfo.getLastname())
                                    .avatar(userInfo.getAvatar())
                                    .build(),
                            ParticipantInfo.builder()
                                    .userId(participantInfo.getUserId())
                                    .firstName(participantInfo.getFirstname())
                                    .lastName(participantInfo.getLastname())
                                    .avatar(participantInfo.getAvatar())
                                    .build());
                    Conversation newConversation = Conversation.builder()
                            .type(request.getType())
                            .participantsHash(userIdHash)
                            .createdDate(LocalDateTime.now())
                            .modifiedDate(LocalDateTime.now())
                            .participants(participantInfos)
                            .build();

                    conversationRepository.save(newConversation);

                    ConversationParticipant p1 = ConversationParticipant.builder()
                            .conversation(newConversation)
                            .userId(userId)
                            .role("MEMBER")
                            .joinedAt(LocalDateTime.now())
                            .build();

                    ConversationParticipant p2 = ConversationParticipant.builder()
                            .conversation(newConversation)
                            .userId(participantInfo.getUserId())
                            .role("MEMBER")
                            .joinedAt(LocalDateTime.now())
                            .build();

                    conversationParticipantRepository.saveAll(List.of(p1, p2));

                    return newConversation;
                });

        // FIX: Kiểm tra và tái tạo participants nếu null
        if (conversation.getParticipants() == null) {
            log.warn(
                    "Conversation {} has null participants, rebuilding from ConversationParticipant table",
                    conversation.getId());
            conversation = rebuildConversationParticipants(conversation);
        }

        return toConversationResponse(conversation);
    }

    /**
     * Tái tạo participants từ ConversationParticipant table khi participants bị null
     */
    private Conversation rebuildConversationParticipants(Conversation conversation) {
        // Lấy participants từ ConversationParticipant table
        List<ConversationParticipant> conversationParticipants =
                conversationParticipantRepository.findByConversationId(conversation.getId());

        List<ParticipantInfo> participantInfos = new ArrayList<>();

        for (ConversationParticipant cp : conversationParticipants) {
            try {
                var userProfile = profileClient.getProfileById(cp.getUserId());
                if (userProfile != null && userProfile.getResult() != null) {
                    var profile = userProfile.getResult();
                    participantInfos.add(ParticipantInfo.builder()
                            .userId(profile.getUserId())
                            .firstName(profile.getFirstname())
                            .lastName(profile.getLastname())
                            .avatar(profile.getAvatar())
                            .build());
                }
            } catch (Exception e) {
                log.error("Error fetching profile for userId: {}", cp.getUserId(), e);
            }
        }
        conversation.setParticipants(participantInfos);

        // Save lại để update database
        conversationRepository.save(conversation);

        return conversation;
    }

    private ConversationResponse toConversationResponse(Conversation conversation) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        long currentUserId = otoClient.getUserId(username);
        ConversationResponse conversationResponse = conversationMapper.toConversationResponse(conversation);

        // FIX: Kiểm tra null trước khi stream
        if (conversation.getParticipants() != null) {
            conversation.getParticipants().stream()
                    .filter(participantInfo -> !participantInfo.getUserId().equals(currentUserId))
                    .findFirst()
                    .ifPresent(participantInfo -> {
                        conversationResponse.setConversationName(
                                participantInfo.getFirstName() + " " + participantInfo.getLastName());
                        conversationResponse.setConversationAvatar(participantInfo.getAvatar());
                    });
        } else {
            log.warn("Conversation {} still has null participants after rebuild attempt", conversation.getId());
        }

        return conversationResponse;
    }

    private String generateParticipantHash(List<Long> ids) {
        return ids.stream().map(String::valueOf).collect(Collectors.joining("_"));
    }

    public List<ParticipantInfo> getAllMyConversation() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Long userId = otoClient.getUserId(username);
        List<ParticipantInfo> participantInfos = new ArrayList<>();
        List<Conversation> myConversations = conversationParticipantRepository.findConversationsByUserId(userId);

        List<Long> otherUserIds = new ArrayList<>();

        for (Conversation conversation : myConversations) {
            List<Long> userIds = conversationParticipantRepository.findUserIdsByConversationId(conversation.getId());
            // Lọc bỏ chính mình
            otherUserIds.addAll(
                    userIds.stream().filter(id -> !id.equals(userId)).toList());
        }

        for (Long id : otherUserIds) {
            var response = profileClient.getProfileById(id);
            participantInfos.add(ParticipantInfo.builder()
                    .userId(response.getResult().getUserId())
                    .firstName(response.getResult().getFirstname())
                    .lastName(response.getResult().getLastname())
                    .avatar(response.getResult().getAvatar())
                    .build());
        }
        return participantInfos;
    }
}
