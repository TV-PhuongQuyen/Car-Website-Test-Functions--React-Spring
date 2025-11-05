package com.devteria.post.service;

import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.LocalDateTime;


@Component

public class TimeAgo {
    public String formatTimeAgo(LocalDateTime createdAt) {
        if (createdAt == null) return "";

        LocalDateTime now = LocalDateTime.now();

        Duration duration = Duration.between(createdAt, now);
        long seconds = duration.getSeconds();

        if (seconds < 60) return seconds + " giây trước";
        long minutes = duration.toMinutes();
        if (minutes < 60) return minutes + " phút trước";
        long hours = duration.toHours();
        if (hours < 24) return hours + " giờ trước";
        long days = duration.toDays();
        if (days < 30) return days + " ngày trước";

        // Dùng Period để tính tháng/năm
        java.time.Period period = java.time.Period.between(createdAt.toLocalDate(), now.toLocalDate());
        if (period.getYears() > 0) {
            return period.getYears() + " năm trước";
        }
        if (period.getMonths() > 0) {
            return period.getMonths() + " tháng trước";
        }

        return days + " ngày trước"; // fallback
    }
}
