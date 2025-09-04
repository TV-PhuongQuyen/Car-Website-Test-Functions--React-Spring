package com.devteria.chat.controller;

import java.time.LocalDateTime;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;

import org.springframework.stereotype.Component;

import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.annotation.OnConnect;
import com.corundumstudio.socketio.annotation.OnDisconnect;
import com.devteria.chat.dto.request.IntrospectRequest;
import com.devteria.chat.entity.WebSocketSession;
import com.devteria.chat.repository.httpclient.OtoSocketClient;
import com.devteria.chat.service.IdentityService;
import com.devteria.chat.service.WebSocketSessionService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SocketHandler {
    SocketIOServer server;
    IdentityService identityService;
    OtoSocketClient otoClient;
    WebSocketSessionService webSocketSessionService;

    @OnConnect
    public void clientConnected(SocketIOClient client) {
        String token = client.getHandshakeData().getSingleUrlParam("token");
        Long userId;
        log.info("token={}", token);
        var introspectResponse = identityService.introspect(
                IntrospectRequest.builder().token(token).build());
        if (introspectResponse.isValid()) {
            log.info("introspect successful: {}", client.getSessionId());
            WebSocketSession webSocketSession = WebSocketSession.builder()
                    .socketSessionId(client.getSessionId().toString())
                    .userId(userId = otoClient.getUserId(introspectResponse.getUsername()))
                    .createdAt(LocalDateTime.now())
                    .build();
            webSocketSession = webSocketSessionService.create(webSocketSession);
            log.info("WebSocketSession created with id: {}", webSocketSession.getId());
        } else {
            log.error("Authentication failed: {}", client.getSessionId());
            client.disconnect();
        }
    }

    @OnDisconnect
    public void clientDisconected(SocketIOClient client) {
        log.info("client disconnected: {}", client.getSessionId());
        webSocketSessionService.delete(client.getSessionId().toString());
    }

    @PostConstruct
    public void startServer() {
        server.start();
        server.addListeners(this);
        log.info("Socket Server started");
    }

    @PreDestroy
    public void stopServer() {
        server.stop();
        log.info("Socket Server stopped");
    }
}
