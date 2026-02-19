package com.openclassrooms.mdd_api.dto;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class UpdateUserRequest {
    @Size(min = 3, max = 50, message = "le nom d'utulisateur doit conteneir entre 3 et 50 caractère ")
    private String username;

    @Email(message = "Format d'email invalide")
    private String email;
}

