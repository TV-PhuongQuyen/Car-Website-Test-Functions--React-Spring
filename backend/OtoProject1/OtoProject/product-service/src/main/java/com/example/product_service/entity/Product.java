package com.example.product_service.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.elasticsearch.annotations.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@Table(name = "products")
@AllArgsConstructor
@NoArgsConstructor
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)

public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(nullable = false, length = 255)
    String name;

    @Column(nullable = false, precision = 15, scale = 2)
    BigDecimal price;

    @Column(name = "image_url", nullable = false, length = 500)
    String imageUrl;

    @Column(name = "category_id")
    Long categoryId;

    @Column(name = "users_id")
    Long usersId;


    @Column(name = "created_at", nullable = false, updatable = false)
    LocalDateTime createdAt;


    @Column(name = "update_at")
    LocalDateTime updateAt;


    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ProductImg> images = new ArrayList<>();

}
