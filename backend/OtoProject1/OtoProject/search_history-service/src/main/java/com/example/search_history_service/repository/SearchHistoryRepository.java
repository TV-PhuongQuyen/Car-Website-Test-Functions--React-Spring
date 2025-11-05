package com.example.search_history_service.repository;

import com.example.search_history_service.dto.response.SearchHistoryResponse;
import com.example.search_history_service.dto.response.TopUserSearchResponse;
import com.example.search_history_service.entity.SearchHistory;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface SearchHistoryRepository extends JpaRepository<SearchHistory, Long> {


    @Query(value = """
    SELECT sh.* FROM search_history sh
    JOIN (
        SELECT query_text, MAX(created_at) AS newest
        FROM search_history
        WHERE user_id = :userId
          AND deleted = false
        GROUP BY query_text
    ) t ON sh.query_text = t.query_text AND sh.created_at = t.newest
    ORDER BY sh.created_at DESC
    LIMIT 10
    """, nativeQuery = true)
    List<SearchHistory> getRecentKeywords(Long userId);



    @Modifying
    @Transactional
    @Query("UPDATE SearchHistory s SET s.deleted = true WHERE s.id = :id AND s.userId = :userId")
    int softDeleteByIdAndUserId(@Param("id") Long id, @Param("userId") Long userId);

    @Query(value = """
    SELECT 
        YEAR(s.created_at) AS year,
        MONTH(s.created_at) AS month,
        HOUR(s.created_at) AS hour,
        COUNT(*) AS totalSearches
    FROM search_history s
    WHERE (:year IS NULL OR YEAR(s.created_at) = :year)
      AND (:month IS NULL OR MONTH(s.created_at) = :month)
    GROUP BY 
        YEAR(s.created_at),
        MONTH(s.created_at),
        HOUR(s.created_at)
    ORDER BY year, month, hour
""", nativeQuery = true)
    List<Object[]> getSearchCountByMonthAndHour(
            @Param("year") Integer year,
            @Param("month") Integer month
    );


    @Query("""
    SELECT new com.example.search_history_service.dto.response.TopUserSearchResponse(
        s.userId, 
        YEAR(s.createdAt), 
        MONTH(s.createdAt), 
        COUNT(s)
    )
    FROM SearchHistory s
    WHERE (:year IS NULL OR YEAR(s.createdAt) = :year)
    GROUP BY s.userId, YEAR(s.createdAt), MONTH(s.createdAt)
    ORDER BY COUNT(s) DESC
""")
    List<TopUserSearchResponse> getTopUsersByMonth(@Param("year") Integer year, Pageable pageable);









}
