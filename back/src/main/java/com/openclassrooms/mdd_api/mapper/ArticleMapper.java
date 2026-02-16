package com.openclassrooms.mdd_api.mapper;
import com.openclassrooms.mdd_api.dto.ArticleResponse;
import com.openclassrooms.mdd_api.model.Article;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")

public interface ArticleMapper  {
    @Mapping(source = "author.username", target ="authorName")
    @Mapping(source = "author.id", target = "authorId")
    @Mapping(source = "theme.name", target = "themeName")
    @Mapping(source = "theme.id", target = "themeId")
    ArticleResponse

    toDto(Article article);
    List<ArticleResponse> toDtoList(List<Article> articles);
}
