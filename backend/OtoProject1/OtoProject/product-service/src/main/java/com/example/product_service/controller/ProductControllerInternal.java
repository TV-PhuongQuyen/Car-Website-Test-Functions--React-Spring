package com.example.product_service.controller;

import com.example.product_service.dto.ApiResponse;
import com.example.product_service.dto.request.ProductRequest;
import com.example.product_service.dto.response.ProductResponse;
import com.example.product_service.service.ProductService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/productInternal")
public class ProductControllerInternal {

    ProductService productService;

    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<ProductResponse> createProduct(
            @RequestPart("productRequest") @Valid ProductRequest productRequest,
            @RequestPart("file") List<MultipartFile> files) {

        return ApiResponse.<ProductResponse>builder()
                .message("Product created successfully")
                .result(productService.createProduct(productRequest, files))
                .build();
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Boolean>> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok(
                ApiResponse.<Boolean>builder()
                        .code(200)
                        .message("Product deleted successfully")
                        .result(true)
                        .build()
        );
    }
    @GetMapping("/count")
    public ApiResponse<Long> getTotalProducts() {
        long total = productService.getTotalProducts();
        return ApiResponse.<Long>builder()
                .message("Tổng sản phẩm")
                .result(total)
                .build();
    }
}
