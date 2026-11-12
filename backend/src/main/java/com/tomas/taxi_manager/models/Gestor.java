package com.tomas.taxi_manager.models;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.NoArgsConstructor;

@Entity
@DiscriminatorValue("GESTOR")
@NoArgsConstructor
public class Gestor extends User {
}
