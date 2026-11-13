package com.tomas.taxi_manager.dto;

public record CreatedUserResponse(
        Long id,
        String name,
        String email,
        String tipoUtilizador
) {
}