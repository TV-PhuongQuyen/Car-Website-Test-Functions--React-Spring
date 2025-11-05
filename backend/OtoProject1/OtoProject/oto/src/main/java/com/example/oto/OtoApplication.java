package com.example.oto;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class OtoApplication {

    public static void main(String[] args) {
        SpringApplication.run(OtoApplication.class, args);
    }

}
