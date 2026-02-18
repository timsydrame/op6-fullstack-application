package com.openclassrooms.mdd_api.dto;
import com.openclassrooms.mdd_api.model.Article;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class CommentRequest {
    @NotBlank(message = "le commentaire est obligatoire")
    private String content;

    @NotNull(message = "l'article est Obligatoire")
    private Long articleId;
}
