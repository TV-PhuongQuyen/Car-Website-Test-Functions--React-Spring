package com.example.search_history_service.controller;

import com.example.search_history_service.dto.request.SearchHistoryRequest;
import com.example.search_history_service.dto.response.ApiResponse;
import com.example.search_history_service.dto.response.KeywordStat;
import com.example.search_history_service.dto.response.SearchHistoryResponse;
import com.example.search_history_service.dto.response.TopUserSearchResponse;
import com.example.search_history_service.entity.SearchHistory;
import com.example.search_history_service.service.SearchHistoryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/searchHistory")
public class SearchHistoryController {
    SearchHistoryService searchHistoryService;
    @PostMapping("/create")
    public ApiResponse<SearchHistoryResponse> createSearchHistory(
            @RequestBody SearchHistoryRequest request) {

        SearchHistoryResponse response = searchHistoryService.createSearchHistory(request);
        return ApiResponse.<SearchHistoryResponse>builder()
                .message("Created search history successfully")
                .result(response)
                .build();
    }
    @GetMapping("/getHistory")
    public ApiResponse<List<SearchHistory>> getRecentKeywords() {
        return ApiResponse.<List<SearchHistory>>builder()
                .result(searchHistoryService.getRecentKeywords())
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> softDelete(
            @PathVariable Long id

    ) {
        searchHistoryService.softDelete(id);
        return ApiResponse.<Void>builder()
                .message("Xóa mềm thành công")
                .build();
    }

    @GetMapping("/statistics/hourly")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getStatisticsByMonthAndHour(
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) Integer month
    ) {
        List<Map<String, Object>> result = searchHistoryService.getSearchStatsByMonthAndHour(year, month);

        ApiResponse<List<Map<String, Object>>> response = ApiResponse.<List<Map<String, Object>>>builder()
                .message("Hiển thị dữ liệu thành công")
                .result(result)
                .build();

        return ResponseEntity.ok(response);
    }
    @GetMapping("/top-users")
    public ApiResponse<List<Map<String, Object>>> getTopUsersByMonth(@RequestParam(required = false) Integer year) {
        return ApiResponse.<List<Map<String, Object>>>builder()
                .message("Hiển thị dữ liệu thành công")
                .result(searchHistoryService.getTopUsersByMonthAsMap(year))
                .build();
    }



}
