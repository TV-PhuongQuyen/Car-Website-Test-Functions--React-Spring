package com.example.product_service.entity;


import jakarta.persistence.Entity;
import lombok.experimental.FieldDefaults;
import org.springframework.data.annotation.Id;
import lombok.*;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@Document(indexName = "product")
public class ProductDocument {
    @Id
    Long id;

    @Field(type = FieldType.Text, analyzer = "standard")
    String name;
}
