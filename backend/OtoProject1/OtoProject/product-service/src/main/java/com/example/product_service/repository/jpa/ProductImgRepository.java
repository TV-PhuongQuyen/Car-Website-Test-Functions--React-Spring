package com.example.product_service.repository.jpa;

import com.example.product_service.entity.ProductImg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductImgRepository extends JpaRepository<ProductImg,Long> {
    List<ProductImg> findAllByProductId(Long productId);
    void deleteAllByProductId(Long productId);
}
