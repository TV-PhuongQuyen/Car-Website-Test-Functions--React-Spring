package com.example.product_service.repository.es;

import com.example.product_service.entity.Product;
import com.example.product_service.entity.ProductDocument;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.data.elasticsearch.annotations.Query;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductElasticRepository  extends ElasticsearchRepository<ProductDocument,Long> {

    /**
     * AUTOCOMPLETE – gợi ý khi người dùng nhập từ khóa
     */
    @Query("""
    {
      "bool": {
        "should": [
          { "prefix": { "name.keyword": "?0" } },
          { "match_phrase_prefix": { "name": "?0" } }
        ]
      }
    }
    """)
    List<ProductDocument> autoCompleteByPrefix(String prefix, Pageable pageable);


    /**
     * SEARCH – tìm kiếm nâng cao khi người dùng nhấn Enter
     */
    @Query("""
        {
          "bool": {
            "should": [
              { "match": { "name": { "query": "?0", "boost": 3 } } },
              { "match_phrase_prefix": { "description": "?0" } },
              { "match": { "brand": { "query": "?0", "boost": 2 } } }
            ]
          }
        }
        """)
    List<ProductDocument> searchProductsAdvanced(String keyword, Pageable pageable);

}
