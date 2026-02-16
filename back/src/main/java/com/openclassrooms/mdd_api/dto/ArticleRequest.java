package com.openclassrooms.mdd_api.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class ArticleRequest {
    @NotBlank(message = "le titre est obligatoire ")
    @Size(max = 200 , message = "Le titre ne peut pas 200 carcatères")
    private String title;

    @NotBlank (message = "Le contenu est obligatoire ")
    private  String content;

    @NotNull
    @Positive
    private Long themeId;
}
