package com.example.product_service.service;

import com.example.product_service.dto.request.ProductRequest;
import com.example.product_service.dto.response.PageResponse;
import com.example.product_service.dto.response.ProductResponse;
import com.example.product_service.entity.Product;
import com.example.product_service.entity.ProductImg;
import com.example.product_service.exception.AppException;
import com.example.product_service.exception.ErrorCode;
import com.example.product_service.mapper.ProductMapper;
import com.example.product_service.repository.jpa.ProductImgRepository;
import com.example.product_service.repository.jpa.ProductRepository;
import com.example.product_service.repository.httpclient.CategoryClient;
import com.example.product_service.repository.httpclient.FileClient;
import com.example.product_service.repository.httpclient.OtoClient;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AccessLevel;
import lombok.extern.slf4j.Slf4j;
import org.springframework.transaction.annotation.Transactional;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Set;

@Slf4j
@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ProductService {
    ProductRepository productRepository;
    ProductElasticService productElasticService;
    ProductMapper  productMapper;
    OtoClient otoClient;
    FileClient fileClient;
    ProductImgRepository productImgRepository;
    NavigationPythonService navigationPythonService;
    RedisTemplate<String, Object> redisTemplate;
    ObjectMapper objectMapper;
    CategoryClient categoryClient;

    private final static String PRODUCT_KEY = "product_id:";

    public List<ProductResponse> cacheAllProducts() {
        List<Product> products = productRepository.findAll();
        if (products.isEmpty()) {
            throw new AppException(ErrorCode.PRODUCT_NOT_FOUND);
        }

        List<ProductResponse> responses = new ArrayList<>();

        for (Product product : products) {
            ProductResponse response = productMapper.toResponse(product);

            // Gọi category service
            var categoryResponse = categoryClient.getCategoryById(product.getCategoryId());
            if (categoryResponse.getResult() != null) {
                response.setNameCategory(categoryResponse.getResult().getName());
                response.setLogo(categoryResponse.getResult().getLogo());
            }
            productElasticService.indexProduct(product);
            // Lưu vào Redis
            String key = PRODUCT_KEY + product.getId();
            redisTemplate.opsForValue().set(key, response);

            responses.add(response);
        }
        products.stream().forEach(product -> System.out.println(product));
        System.out.println("Đã lưu " + products.size() + " sản phẩm vào Redis");



        return responses;
    }

    public PageResponse<ProductResponse> getProducts(int page, int size) {
        //Lấy toàn bộ key sản phẩm trong Redis (product:1, product:2, ...)
        Set<String> keys = redisTemplate.keys(PRODUCT_KEY+"*");

        List<ProductResponse> allProducts = new ArrayList<>();

        if (keys != null && !keys.isEmpty()) {
            for (String key : keys) {
                Object obj = redisTemplate.opsForValue().get(key);
                if (obj != null) {
                    // Dùng ObjectMapper inject vào, đã hỗ trợ LocalDateTime
                    ProductResponse product = objectMapper.convertValue(obj, ProductResponse.class);
                    allProducts.add(product);
                }
            }
            System.out.println("Lấy dữ liệu từ Redis (" + allProducts.size() + " sản phẩm)");
        } else {
            System.out.println(" Redis trống — tải dữ liệu từ DB...");
            allProducts = cacheAllProducts(); //vừa cache vừa lấy danh sách
        }
        allProducts.sort(Comparator.comparing(ProductResponse::getCreatedAt).reversed());

        int totalElements = allProducts.size();
        int totalPages = (int) Math.ceil((double) totalElements / size);

        int fromIndex = Math.max(0, (page - 1) * size);
        int toIndex = Math.min(fromIndex + size, totalElements);

        List<ProductResponse> pagedProducts = new ArrayList<>();
        if (fromIndex < totalElements) {
            pagedProducts = allProducts.subList(fromIndex, toIndex);
        }

        return PageResponse.<ProductResponse>builder()
                .currentPage(page)
                .pageSize(size)
                .totalPages(totalPages)
                .totalElements(totalElements)
                .data(pagedProducts)
                .build();
    }

    public ProductResponse createProduct (ProductRequest request, List<MultipartFile> files) {
       try{
           var authentication = SecurityContextHolder.getContext().getAuthentication();
           Long userId = otoClient.getUserId(authentication.getName());
           var categoryResponse = categoryClient.getCategoryById(request.getCategoryId());

           MultipartFile mainFile = (files != null && !files.isEmpty()) ? files.get(0) : null;
           String mainImageUrl = null;
           if (mainFile != null) {
               var responseUrl = fileClient.uploadMedia(mainFile);
               mainImageUrl = responseUrl.getResult().getUrl();
           }

           Product product = productMapper.toEntity(request);
           product.setCreatedAt(LocalDateTime.now());
           product.setUpdateAt(LocalDateTime.now());
           product.setImageUrl(mainImageUrl); // Ảnh chính
           product.setUsersId(userId);

           productRepository.save(product);

           if (files != null && !files.isEmpty()) {
               for (MultipartFile file : files) {
                   var res = fileClient.uploadMedia(file);
                   String imageUrl = res.getResult().getUrl();

                   ProductImg productImage = new ProductImg();
                   productImage.setProduct(product);
                   productImage.setImageUrl(imageUrl);
                   productImgRepository.save(productImage);

                   // Gửi sang Python FAISS để tạo vector
                   navigationPythonService.sendVector(product.getId(), file, null);
               }
           }

           // Lưu vào Redis
           String redisKey = PRODUCT_KEY + product.getId();
           ProductResponse response = productMapper.toResponse(product);
           response.setImageUrl(product.getImageUrl());
           response.setNameCategory(categoryResponse.getResult().getName());
           response.setLogo(categoryResponse.getResult().getLogo());
           redisTemplate.opsForValue().set(redisKey, response);

           productElasticService.indexProduct(product);




           return productMapper.toResponse (product);
       }catch (Exception e){
           e.printStackTrace();
           throw  e;
       }
    }

    public List<ProductResponse> searchProductByImage(MultipartFile file, int k) {
        try {

            // Gọi service Python để tìm sản phẩm tương tự
            String pythonResult = navigationPythonService.searchImageProducts(file, k, null);

            ObjectMapper mapper = new ObjectMapper();
            var jsonNode = mapper.readTree(pythonResult);
            var resultsNode = jsonNode.get("results");
            if (resultsNode == null || !resultsNode.isArray()) {
                return new ArrayList<>();
            }

            List<ProductResponse> detailedResults = new ArrayList<>();

            // Lặp qua từng product_id lấy thông tin từ Redis
            for (var itemNode : resultsNode) {
                Long productId = itemNode.get("product_id").asLong();
                String redisKey = PRODUCT_KEY + productId;
                Object redisObj = redisTemplate.opsForValue().get(redisKey);

                if (redisObj != null) {
                    ProductResponse product = objectMapper.convertValue(redisObj, ProductResponse.class);
                    detailedResults.add(product);
                }
            }


            return detailedResults;
        } catch (Exception e) {
            e.printStackTrace();
            throw new AppException(ErrorCode.INTERNAL_ERROR);
        }
    }

    public List<ProductResponse> searchProductText(String keyword, int limit) {
        try {
            List<ProductResponse> detailedResults = new ArrayList<>();
            List<Long> product_id = productElasticService.searchProducts(keyword, limit);
            for (Long id : product_id) {
                String redisKey = PRODUCT_KEY + id;
                Object redisObj = redisTemplate.opsForValue().get(redisKey);

                if (redisObj != null) {
                    ProductResponse product = objectMapper.convertValue(redisObj, ProductResponse.class);
                    detailedResults.add(product);
                }
            }
            return detailedResults;
        }catch (Exception e){
            e.printStackTrace();
            throw new AppException(ErrorCode.INTERNAL_ERROR);
        }
    }
    public long getTotalProducts() {
        return productRepository.count();
    }


    @Transactional
    public boolean deleteProduct(Long id) {
        try {
            // Kiểm tra sản phẩm tồn tại
            Product product = productRepository.findById(id)
                    .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_EXISTS));

            // Xóa trong DB
            productRepository.deleteById(id);

            // Xóa mềm vector bên Python Service
            navigationPythonService.deleteVector(id, null);

            // Xóa cache Redis liên quan
            String redisKey = PRODUCT_KEY + id;
            if (redisTemplate.hasKey(redisKey)) {
                redisTemplate.delete(redisKey);
            }

            //Xóa trong ES
            productElasticService.deleteProduct(id);

            System.out.println("Sản phẩm " + id + " đã được soft delete và xóa cache Redis.");

            return true;
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }


}
