package com.tomas.taxi_manager.services;

import com.tomas.taxi_manager.models.User;
import com.tomas.taxi_manager.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String nif) throws UsernameNotFoundException {
        return userRepository.findByNif(nif)
                .orElseThrow(() -> new UsernameNotFoundException("Utilizador com o NIF " + nif + " não encontrado."));
    }
}
