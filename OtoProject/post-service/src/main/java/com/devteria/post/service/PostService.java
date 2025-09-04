package com.devteria.post.service;

import com.devteria.post.dto.response.PageResponse;
import com.devteria.post.dto.response.PostResponse;
import com.devteria.post.entity.Post;
import com.devteria.post.entity.Privacy;
import com.devteria.post.mapper.PostMapper;
import com.devteria.post.repository.PostRepository;
import com.devteria.post.repository.httpclient.FileClient;
import com.devteria.post.repository.httpclient.OtoClient;
import com.devteria.post.repository.httpclient.ProfileClient;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class PostService {
        PostRepository postRepository;
        OtoClient  otoClient;
        FileClient  fileClient;
        ProfileClient profileClient;
        PostMapper postMapper;
        TimeAgo timeAgo;



        public  PostResponse create(String context, Privacy privacy, MultipartFile file){
            var authentication = SecurityContextHolder.getContext().getAuthentication();
            Long id = otoClient.getUserId(authentication.getName());
            var response = fileClient.uploadMedia(file);
            Post post = Post.builder()
                    .usersId(id)
                    .context(context)
                    .mediaUrl(response.getResult().getUrl())
                    .createdAt(LocalDateTime.now())
                    .modifiedDate(LocalDateTime.now())
                    .privacy(privacy)
                    .build();
            postRepository.save(post);

            return  postMapper.toPostResponse(post);
        }

        public PageResponse<PostResponse> getAll(int page, int size){
            Sort sort  = Sort.by(Sort.Direction.DESC, "createdAt");
            Pageable pageable = PageRequest.of(page -1, size, sort);
            var pageData = postRepository.findAll(pageable);

            return  PageResponse.<PostResponse>builder()
                    .currentPage(page)
                    .pageSize(pageData.getSize())
                    .totalPages(pageData.getTotalPages())
                    .totalElements(pageData.getTotalElements())
                    .data(pageData.getContent().stream().map(post -> {
                        PostResponse response = postMapper.toPostResponse(post);
                        var profile = profileClient.getProfileById(response.getUsersId());
                        response.setFirstname(profile.getResult().getFirstname());
                        response.setLastname(profile.getResult().getLastname());
                        response.setAvatar(profile.getResult().getAvatar());
                        response.setTimeAgo(timeAgo.formatTimeAgo(response.getCreatedAt()));
                        return  response;
                    }).collect(Collectors.toList()))
                    .build();
        }

}
