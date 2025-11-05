package com.example.search_history_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class SearchHistoryServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(SearchHistoryServiceApplication.class, args);
	}

}
