package com.opus.controllers;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("/api")
public class BaseController {

    @GetMapping("/home")
    public String home() {
        return "Welcome to Opus";
    }
}
