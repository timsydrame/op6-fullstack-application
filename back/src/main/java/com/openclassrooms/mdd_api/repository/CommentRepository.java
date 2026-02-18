package com.openclassrooms.mdd_api.repository;

import com.openclassrooms.mdd_api.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    // Trouver tous les commentaires d'un article
    List<Comment> findByArticleIdOrderByCreatedAtAsc(Long articleId);
}