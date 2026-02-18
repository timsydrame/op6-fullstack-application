package com.openclassrooms.mdd_api.mapper;
import com.openclassrooms.mdd_api.model.Comment;
import com.openclassrooms.mdd_api.dto.CommentResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;
@Mapper(componentModel = "spring")

public interface CommentMapper {

    @Mapping(source = "author.username", target = "authorName")
    @Mapping(source = "author.id",target = "authorId")

    @Mapping(source = "article.id",target = "articleId")
    CommentResponse toDto(Comment comment);

    List<CommentResponse> toDtoList(List<Comment> comments);
}
