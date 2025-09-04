package com.devteria.chat.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.devteria.chat.entity.Conversation;
import com.devteria.chat.entity.ConversationParticipant;

@Repository
public interface ConversationParticipantRepository extends JpaRepository<ConversationParticipant, Long> {

    List<ConversationParticipant> findByConversationId(String conversationId);

    @Query("SELECT cp.conversation FROM ConversationParticipant cp WHERE cp.userId = :userId")
    List<Conversation> findConversationsByUserId(@Param("userId") Long userId);

    @Query("SELECT cp.userId FROM ConversationParticipant cp WHERE cp.conversation.id = :conversationId")
    List<Long> findUserIdsByConversationId(@Param("conversationId") String conversationId);
}
