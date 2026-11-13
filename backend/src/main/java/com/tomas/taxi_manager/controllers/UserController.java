package com.tomas.taxi_manager.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import com.tomas.taxi_manager.models.User;
import com.tomas.taxi_manager.services.UserService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;


    @GetMapping("/api/me")
    public Map<String, String> currentUser(@AuthenticationPrincipal Jwt jwt) {
        User user = userService.findByKeycloakSubject(jwt.getSubject());

        return Map.of(
                "id", user.getId().toString(),
                "name", user.getName() == null ? "" : user.getName(),
                "tipo_utilizador", user.getClass().getSimpleName().toUpperCase()
        );
    }

}
