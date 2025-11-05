package com.example.search_history_service.mapper;

import com.example.search_history_service.dto.request.SearchHistoryRequest;
import com.example.search_history_service.dto.response.SearchHistoryResponse;
import com.example.search_history_service.entity.SearchHistory;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SearchHistoryMapper {
    SearchHistory toEntity(SearchHistoryRequest searchHistoryRequest);
    SearchHistoryResponse toDto(SearchHistory searchHistory);

}
