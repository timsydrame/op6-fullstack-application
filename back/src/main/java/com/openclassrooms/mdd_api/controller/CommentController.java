package com.openclassrooms.mdd_api.controller;

import com.openclassrooms.mdd_api.dto.CommentRequest;
import com.openclassrooms.mdd_api.dto.CommentResponse;
import com.openclassrooms.mdd_api.service.CommentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping
    public ResponseEntity<CommentResponse> createComment(
            @Valid @RequestBody CommentRequest request,
            Authentication authentication
    ) {
        String email = authentication.getName();
        CommentResponse comment = commentService.createComment(request, email);
        return ResponseEntity.ok(comment);
    }

    @GetMapping("/article/{articleId}")
    public ResponseEntity<List<CommentResponse>> getCommentsByArticle(@PathVariable Long articleId) {
        List<CommentResponse> comments = commentService.getCommentsByArticleId(articleId);
        return ResponseEntity.ok(comments);
    }
}