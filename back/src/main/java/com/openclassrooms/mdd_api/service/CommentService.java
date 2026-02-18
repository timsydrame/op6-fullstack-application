package com.openclassrooms.mdd_api.service;
import com.openclassrooms.mdd_api.dto.CommentRequest;
import com.openclassrooms.mdd_api.dto.CommentResponse;
import com.openclassrooms.mdd_api.mapper.CommentMapper;
import com.openclassrooms.mdd_api.model.Comment;
import  com.openclassrooms.mdd_api.model.Article;
import  com.openclassrooms.mdd_api.model.User;
import com.openclassrooms.mdd_api.repository.CommentRepository;
import com.openclassrooms.mdd_api.repository.ArticleRepository;
import com.openclassrooms.mdd_api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service

public class CommentService {
    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private  CommentMapper  commentMapper;

    @Transactional
    public CommentResponse createComment(CommentRequest request, String authorEmail){
        User author = userRepository.findByEmail(authorEmail)
                .orElseThrow(() -> new RuntimeException("Article not found"));

        Article article = articleRepository.findById(request.getArticleId())
                .orElseThrow(() -> new RuntimeException("Article not found"));
     Comment comment =Comment.builder()
             .content(request.getContent())
             .author(author)
             .article(article)
             .build();

     Comment savedComment = commentRepository.save(comment);

     return commentMapper.toDto(savedComment);


    }
    public List<CommentResponse> getCommentsByArticleId(Long articleId) {
        List<Comment> comments = commentRepository.findByArticleIdOrderByCreatedAtAsc(articleId);
        return commentMapper.toDtoList(comments);
    }
}