package com.openclassrooms.mdd_api.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {

    @NotBlank(message = "L'identifiant est obligatoire")
    private String identifier; // Peut être email ou username

    @NotBlank(message = "Le mot de passe est obligatoire")
    private String password;
}