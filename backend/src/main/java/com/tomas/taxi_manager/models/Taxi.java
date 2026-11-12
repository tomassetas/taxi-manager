package com.tomas.taxi_manager.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "taxis")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Taxi {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String matricula;
    private int ano;
    private String marca;
    private String modelo;

    @Enumerated(EnumType.STRING)
    private NivelConforto nivelConforto;

    @Enumerated(EnumType.STRING)
    private TipoMotor tipoMotor;

    public enum NivelConforto {
        LUXUOSO,
        BASICO
    }

    public enum TipoMotor {
        ELETRICO,
        COMBUSTAO
    }
}
