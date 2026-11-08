package com.tomas.taxi_manager.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;

@RestController
public class HomeController {
    @GetMapping("/")
    public String home() {
        return "Taxi Manager API está online";
    }


}
