package com.example.search_history_service.service;

import com.example.search_history_service.dto.request.SearchHistoryRequest;
import com.example.search_history_service.dto.response.KeywordStat;
import com.example.search_history_service.dto.response.SearchHistoryResponse;
import com.example.search_history_service.dto.response.TopUserSearchResponse;
import com.example.search_history_service.entity.SearchHistory;
import com.example.search_history_service.mapper.SearchHistoryMapper;
import com.example.search_history_service.repository.SearchHistoryRepository;
import com.example.search_history_service.repository.httpclient.OtoClient;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Slf4j
@Service
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SearchHistoryService {
    SearchHistoryRepository repository;
    OtoClient otoClient;
    SearchHistoryMapper mapper;

    private Long getUserId(){
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        Long userId = otoClient.getUserId(authentication.getName());
        return userId;
    }

    public SearchHistoryResponse createSearchHistory(SearchHistoryRequest searchHistoryRequest) {
        SearchHistory searchHistory = mapper.toEntity(searchHistoryRequest);

        searchHistory.setUserId(getUserId());

        //Gán thời gian tạo
        searchHistory.setDeleted(false);
        searchHistory.setCreatedAt(LocalDateTime.now());

        // Lưu vào database
        SearchHistory saved = repository.save(searchHistory);

        // Trả về DTO phản hồi (Response)
        return mapper.toDto(saved);
    }

    public List<SearchHistory> getRecentKeywords() {

        List<SearchHistory> histories =
                repository.getRecentKeywords(getUserId());

        log.debug("histories = {}", histories);


        return histories;
    }


    public void softDelete(Long id) {
        int updated = repository.softDeleteByIdAndUserId(id,getUserId());

        if (updated > 0) {
            log.info("🗑️ Đã soft delete SearchHistory id = {}, userId = {}", id,getUserId());
        } else {
            log.warn("⚠️ Không tìm thấy SearchHistory để xóa: id = {}, userId = {}", id, getUserId());
        }
    }

    public List<Map<String, Object>> getSearchStatsByMonthAndHour(Integer year, Integer month) {
        List<Object[]> results = repository.getSearchCountByMonthAndHour(year, month);

        Map<String, Map<String, Object>> grouped = new LinkedHashMap<>();

        for (Object[] row : results) {
            Integer rowYear = ((Number) row[0]).intValue();
            Integer rowMonth = ((Number) row[1]).intValue();
            Integer hour = ((Number) row[2]).intValue();
            Long total = ((Number) row[3]).longValue();

            String label = rowMonth + "/" + rowYear; // ví dụ: "10/2025"

            // Nếu chưa có tháng/năm đó thì tạo mới
            grouped.putIfAbsent(label, new HashMap<>(Map.of(
                    "label", label,
                    "hours", new ArrayList<Map<String, Object>>(),
                    "totalMonth", 0L
            )));

            Map<String, Object> monthData = grouped.get(label);

            // Cộng tổng tháng
            Long currentTotal = (Long) monthData.get("totalMonth");
            monthData.put("totalMonth", currentTotal + total);

            // Thêm chi tiết theo giờ
            List<Map<String, Object>> hours = (List<Map<String, Object>>) monthData.get("hours");
            hours.add(Map.of(
                    "hour", hour,
                    "count", total
            ));
        }

        return new ArrayList<>(grouped.values());
    }

    public List<Map<String, Object>> getTopUsersByMonthAsMap(Integer year) {
        Pageable top10 = PageRequest.of(0, 10);
        List<TopUserSearchResponse> results = repository.getTopUsersByMonth(year,top10);

        List<Map<String, Object>> list = new ArrayList<>();
        for (TopUserSearchResponse r : results) {
            list.add(Map.of(
                    "userId", r.getUserId(),
                    "year", r.getYear(),
                    "month", r.getMonth(),
                    "totalSearches", r.getTotalSearches()
            ));
        }
        return list;
    }



}
