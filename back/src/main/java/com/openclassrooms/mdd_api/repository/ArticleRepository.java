package com.openclassrooms.mdd_api.repository;

import com.openclassrooms.mdd_api.model.Article;
import  com.openclassrooms.mdd_api.model.Theme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface ArticleRepository  extends JpaRepository<Article,Long>{
    //Trouvé tous les articles d'un thème specifique
    List<Article> findByTheme(Theme theme);

    //Trouvé tous les articles dont le theme est dans une liste
    List<Article> findBythemeIn(List<Theme> themes);

    //Trouvé tous les article d'un auteur
    List<Article> findByAuthorId(long authorId);

    //Trouvé tous les articles, trié par date de creation decroissante
    List<Article> findBallByOrderByCreatedAtDesc();

    List<Article> findAllByOrderByCreatedAtDesc();
}
