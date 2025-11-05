package com.example.product_service.service;

import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch._types.query_dsl.QueryBuilders;
import com.example.product_service.entity.Product;
import com.example.product_service.entity.ProductDocument;
import com.example.product_service.repository.es.ProductElasticRepository;
import lombok.AccessLevel;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProductElasticService {

    ProductElasticRepository productElasticRepository;

    public void indexProduct(Product product) {
        try {
            ProductDocument productDocument = new ProductDocument();
            productDocument.setId(product.getId());
            productDocument.setName(product.getName());
            productElasticRepository.save(productDocument);
            System.out.println("Đã index sản phẩm ID: " + product.getId() + " vào Elasticsearch");
        } catch (Exception e) {
            System.err.println("Lỗi khi index sản phẩm: " + e.getMessage());
        }
    }

    public List<String> autoCompleteSuggestions(String prefix, int limit) {
        if (prefix == null || prefix.trim().isEmpty() || prefix.length() < 2) {
            return List.of();
        }

        try {
            // Gợi ý autocomplete dựa trên name
            List<ProductDocument> docs = productElasticRepository
                    .autoCompleteByPrefix(prefix.toLowerCase(), PageRequest.of(0, limit * 2));

            return docs.stream()
                    .map(ProductDocument::getName)
                    .filter(Objects::nonNull)
                    .distinct()
                    .limit(limit)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            System.err.println("Lỗi autocomplete: " + e.getMessage());
            return List.of();
        }
    }


    public List<Long> searchProducts(String keyword, int limit) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return List.of();
        }

        try {
            // Tìm kiếm nâng cao trong Elasticsearch
            List<ProductDocument> docs = productElasticRepository
                    .searchProductsAdvanced(keyword.toLowerCase(), PageRequest.of(0, limit));

            return docs.stream()
                    .map(ProductDocument::getId)
                    .filter(Objects::nonNull)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            System.err.println("Lỗi search: " + e.getMessage());
            return List.of();
        }
    }


    public void deleteProduct(Long productId) {
        try {
            productElasticRepository.deleteById(productId);
            System.out.println("Đã xóa sản phẩm ID: " + productId + " khỏi Elasticsearch");
        } catch (Exception e) {
            System.err.println("Lỗi khi xóa sản phẩm: " + e.getMessage());
        }
    }

}