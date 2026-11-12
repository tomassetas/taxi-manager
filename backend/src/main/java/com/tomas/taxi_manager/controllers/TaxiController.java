package com.tomas.taxi_manager.controllers;

import com.tomas.taxi_manager.services.TaxiService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class TaxiController {

    private final TaxiService taxiService;

  
    
}
