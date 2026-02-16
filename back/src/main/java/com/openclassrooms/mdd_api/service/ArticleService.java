package com.openclassrooms.mdd_api.service;
import com.openclassrooms.mdd_api.model.Article;
import com.openclassrooms.mdd_api.model.Theme;
import com.openclassrooms.mdd_api.model.User;
import com.openclassrooms.mdd_api.repository.ArticleRepository;
import com.openclassrooms.mdd_api.repository.UserRepository;
import com.openclassrooms.mdd_api.repository.ThemeRepository;
import com.openclassrooms.mdd_api.mapper.ArticleMapper;
import com.openclassrooms.mdd_api.dto.ArticleRequest;
import com.openclassrooms.mdd_api.dto.ArticleResponse;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;


@Service

public class ArticleService {
    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private ThemeRepository themeRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    private ArticleMapper articleMapper;
    @Transactional

    public ArticleResponse createArticle(ArticleRequest request, String authorEmail){
    // Récupérer l'auteur depuis son email (vient du token JWT)
    User author = userRepository.findByEmail(authorEmail)
            .orElseThrow(() -> new RuntimeException("Utilisateur introuvable : " + authorEmail));

    // Recuperer le thème depuis son ID
    Theme theme = themeRepository.findById(request.getThemeId())
            .orElseThrow(() -> new RuntimeException("Theme not found"));

//3. creer l'article
    Article article = Article.builder()

        .title(request.getTitle())
        .content(request.getContent())
        .author(author)
        .theme(theme)
        .build();

    //4. Sauvegarder en base
    Article savedArticle = articleRepository.save(article);

    //5. Convertir en DTO et retourner
    return articleMapper.toDto(savedArticle);

}

public List<ArticleResponse> getFeedForUser(String userEmail){
// 1 recuperer l'utulisateur
    User user = userRepository.findByEmail(userEmail)
            .orElseThrow(() -> new RuntimeException("User not found"));

    //2 Recuperer ses abonnements(themes)
    Set<Theme> subbcriptions = user.getSubscriptions();

    // 3 Si pas d'abonnement retourner liste vide
    if (subbcriptions.isEmpty()){
        return  List.of();
    }

    //4 Récuperer les articles des themes abonnés, trié par date
    List<Article> articles = articleRepository.findBythemeIn(
            List.copyOf(subbcriptions)
    );

    //5 convertir en DTOs
    return articleMapper.toDtoList(articles);
}

public ArticleResponse getArticleById(Long id){
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Article not found"));

        return articleMapper.toDto(article);
}

    public List<ArticleResponse> getAllArticles() {
        List<Article> articles = articleRepository.findAllByOrderByCreatedAtDesc();
        return articleMapper.toDtoList(articles);
    }

}
