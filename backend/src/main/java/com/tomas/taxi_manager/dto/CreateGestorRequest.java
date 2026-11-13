package com.tomas.taxi_manager.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record CreateGestorRequest(
        @NotBlank @Size(max = 60) String firstName,
        @NotBlank @Size(max = 60) String lastName,
        @NotBlank @Email @Size(max = 254) String email,
        @NotBlank @Pattern(
                regexp = "\\d{9}",
                message = "O NIF deve ter 9 dígitos."
        ) String nif,
        @NotBlank @Size(max = 32) String phoneNumber
) {
}