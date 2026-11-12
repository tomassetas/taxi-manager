package com.tomas.taxi_manager.services;

import com.tomas.taxi_manager.models.Taxi;
import com.tomas.taxi_manager.repositories.TaxiRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TaxiService {
    
    private final TaxiRepository taxiRepository;

    public Taxi findTaxiById(Long id) {
        return taxiRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Não existe um táxi com este id."
                ));
    }
}
 