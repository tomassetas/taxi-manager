package com.tomas.taxi_manager.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import com.tomas.taxi_manager.models.User;
import com.tomas.taxi_manager.services.UserProfileService;




@RestController
public class UserController {

    private final UserProfileService userProfileService;

    public UserController(UserProfileService userProfileService) {
        this.userProfileService = userProfileService;
    }

    @GetMapping("/api/me")
    public Map<String, String> currentUser(@AuthenticationPrincipal Jwt jwt) {
        User profile = userProfileService.findByKeycloakSubject(jwt.getSubject());

        return Map.of(
                "id", profile.getId().toString(),
                "name", profile.getName() == null ? "" : profile.getName()
        );
    }


}
