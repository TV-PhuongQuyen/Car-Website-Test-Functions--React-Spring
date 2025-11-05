package com.example.product_service.controller;

import com.example.product_service.dto.ApiResponse;
import com.example.product_service.dto.request.ProductRequest;
import com.example.product_service.dto.response.PageResponse;
import com.example.product_service.dto.response.ProductResponse;
import com.example.product_service.entity.Product;
import com.example.product_service.service.ProductElasticService;
import com.example.product_service.service.ProductService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/productPublic")
public class ProductController {
    ProductService productService;
    ProductElasticService productElasticService;

    @GetMapping("/getAllProduct" )
    public ApiResponse<PageResponse<ProductResponse>> getAllPost(
            @RequestParam(value = "page", required = false, defaultValue = "1") int page,
            @RequestParam(value = "size", required = false, defaultValue = "12") int size
    ){
        return ApiResponse.<PageResponse<ProductResponse>>builder()
                .result(productService.getProducts(page,size))
                .build();
    }

    @PostMapping("/search")
    public ApiResponse<List<ProductResponse>> searchProductByImage(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "k", defaultValue = "5") int k) {
        List<ProductResponse> detailedResults = productService.searchProductByImage(file,k);
        return ApiResponse.<List<ProductResponse>>builder()
                .message("Product searched successfully")
                .result(detailedResults)
                .build();
    }

    @GetMapping("/autocomplete")
    public ResponseEntity<List<String>> autoComplete(@RequestParam String prefix,
                                                     @RequestParam(defaultValue = "5") int limit) {
        List<String> suggestions = productElasticService.autoCompleteSuggestions(prefix, limit);
        return ResponseEntity.ok(suggestions);
    }

    @GetMapping("/searchText")
    public ApiResponse<List<ProductResponse>> searchProducts(@RequestParam String keyword,
                                                     @RequestParam(defaultValue = "10") int limit) {
        return ApiResponse.<List<ProductResponse>>builder()
                .message("Tìm thành công")
                .result(productService.searchProductText(keyword, limit))
                .build();
    }

}
