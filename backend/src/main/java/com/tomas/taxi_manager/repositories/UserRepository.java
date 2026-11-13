package com.tomas.taxi_manager.repositories;

import com.tomas.taxi_manager.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
     Optional<User> findByNif(String nif);
     Optional<User> findByKeycloakSubject(String keycloakSubject);

    boolean existsByNif(String nif);
    boolean existsByPhoneNumber(String phoneNumber);
    boolean existsByEmailIgnoreCase(String email);
    
}
