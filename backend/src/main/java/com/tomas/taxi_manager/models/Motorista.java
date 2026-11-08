package com.tomas.taxi_manager.models;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.NoArgsConstructor;

@Entity
@DiscriminatorValue("MOTORISTA")
@NoArgsConstructor
public class Motorista extends User {
}