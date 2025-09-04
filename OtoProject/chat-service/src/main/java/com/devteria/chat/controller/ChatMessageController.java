package com.devteria.chat.controller;

import java.util.List;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;

import com.devteria.chat.dto.ApiResponse;
import com.devteria.chat.dto.request.ChatMessageRequest;
import com.devteria.chat.dto.response.ChatMessageResponse;
import com.devteria.chat.service.ChatMessageService;
import com.devteria.chat.service.IdentityService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@RestController
@RequiredArgsConstructor
@RequestMapping("/messages")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ChatMessageController {
    ChatMessageService chatMessageService;
    IdentityService identityService;

    @PostMapping("/create")
    ApiResponse<ChatMessageResponse> create(@RequestBody @Valid ChatMessageRequest request) {
        return ApiResponse.<ChatMessageResponse>builder()
                .result(chatMessageService.create(request))
                .build();
    }

    @GetMapping("/{conversationId}")
    public ApiResponse<List<ChatMessageResponse>> getMessages(@PathVariable String conversationId) {
        return ApiResponse.<List<ChatMessageResponse>>builder()
                .result(chatMessageService.getMessages(conversationId))
                .build();
    }

    //    @PostMapping("/introspect")
    //    ApiResponse<IntrospectResponse> authenticationResponse(@RequestBody IntrospectRequest request){
    //        return  ApiResponse.<IntrospectResponse>builder()
    //                .result(identityService.introspect(request))
    //                .build();
    //    }
}
