package com.tomas.taxi_manager.services;

import com.tomas.taxi_manager.models.User;
import com.tomas.taxi_manager.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User findByKeycloakSubject(String keycloakSubject) {
        return userRepository.findByKeycloakSubject(keycloakSubject)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Não existe um perfil ligado a esta conta."
                ));
    }
}