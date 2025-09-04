package com.devteria.post.controller;

import com.devteria.post.dto.ApiResponse;
import com.devteria.post.dto.response.PageResponse;
import com.devteria.post.dto.response.PostResponse;
import com.devteria.post.entity.Privacy;
import com.devteria.post.service.PostService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/post")
public class PostController {
    PostService postService;


    @PostMapping("/create")
    public  ApiResponse<PostResponse> createPost( @RequestParam("context") String context,
                                                  @RequestParam("privacy") Privacy privacy,
                                                  @RequestParam(value = "file") MultipartFile file){
        return ApiResponse.<PostResponse>builder()
                .message("Thêm thành công")
                .result(postService.create(context,privacy,file))
                .build();

    }
    @GetMapping("/getAllpost" )
    public ApiResponse<PageResponse<PostResponse>> getAllPost(
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
             @RequestParam(value = "size", required = false, defaultValue = "10") int size
        ){
        return ApiResponse.<PageResponse<PostResponse>>builder()
                .result(postService.getAll(page,size))
                .build();
    }

}