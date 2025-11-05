package com.example.product_service.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.Column;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProductResponse {
    Long id;
    String name;
    BigDecimal price;
    String imageUrl;
    Long categoryId;
    Long usersId;
    LocalDateTime createdAt;
    String nameCategory;
    String logo;



}
