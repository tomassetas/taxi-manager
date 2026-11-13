package com.tomas.taxi_manager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@ConfigurationPropertiesScan
@SpringBootApplication
public class TaxiManagerApplication {

	public static void main(String[] args) {
		SpringApplication.run(TaxiManagerApplication.class, args);
	}

}
