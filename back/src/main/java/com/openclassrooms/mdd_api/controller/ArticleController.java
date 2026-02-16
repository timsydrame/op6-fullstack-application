package com.openclassrooms.mdd_api.controller;
import com.openclassrooms.mdd_api.dto.ArticleRequest;
import com.openclassrooms.mdd_api.dto.RegisterRequest;
import com.openclassrooms.mdd_api.dto.ArticleResponse;
import com.openclassrooms.mdd_api.service.ArticleService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("api/articles")


public class ArticleController {

    @Autowired
    private ArticleService articleService;

    @PostMapping
    public  ResponseEntity<ArticleResponse> createArticle(
            @Valid  @RequestBody ArticleRequest request,
            Authentication authentication
            ){
        String email = authentication.getName();
        ArticleResponse article =    articleService.createArticle(request,email);
        return ResponseEntity.ok(article);
    }

    @GetMapping("/feed")
    public ResponseEntity<List<ArticleResponse>> getFeed(Authentication authentication) {
        String email = authentication.getName();
        List<ArticleResponse> articles = articleService.getFeedForUser(email);
        return ResponseEntity.ok(articles);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ArticleResponse> getArticleById(@PathVariable Long id){
        ArticleResponse article = articleService.getArticleById(id);
        return ResponseEntity.ok(article);
    }


    @GetMapping
    private ResponseEntity<List<ArticleResponse>> getAllArtiles(){
        List<ArticleResponse> articles = articleService.getAllArticles();
        return ResponseEntity.ok(articles);
    }

}
