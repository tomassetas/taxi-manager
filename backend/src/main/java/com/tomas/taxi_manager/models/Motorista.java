package com.tomas.taxi_manager.models;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.NoArgsConstructor;

@Entity
@DiscriminatorValue("MOTORISTA")
@NoArgsConstructor
public class Motorista extends User {
    private String nrCartaConducao;

    public String getNrCartaConducao() {
        return nrCartaConducao;
    }

    public void setNrCartaConducao(String nrCartaConducao) {
        this.nrCartaConducao = nrCartaConducao;
    }

}