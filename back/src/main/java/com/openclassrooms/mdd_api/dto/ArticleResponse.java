package com.openclassrooms.mdd_api.dto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data@NoArgsConstructor
@AllArgsConstructor
@Builder

public class ArticleResponse {
    private Long id;
    private String title;
    private String authorName;
    private Long authorId;
    private String themeName;
    private Long themeId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
