package com.iuroc;

import org.springframework.boot.SpringApplication;

/**
 * Hello world!
 *
 */
public class App {
    public static void main(String[] args) {
        SpringApplication.run(Router.class, args);
        System.out.println("http://localhost:8080");
    }
}
