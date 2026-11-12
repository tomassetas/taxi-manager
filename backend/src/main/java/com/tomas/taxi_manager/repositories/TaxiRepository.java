package com.tomas.taxi_manager.repositories;

import com.tomas.taxi_manager.models.Taxi;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaxiRepository extends JpaRepository<Taxi, Long> {
    boolean existsByMatricula(String matricula);
}
