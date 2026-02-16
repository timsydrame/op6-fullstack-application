package com.openclassrooms.mdd_api.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;

import  org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

import static jakarta.persistence.GenerationType.IDENTITY;

@Entity
@Table(name = "articles")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Article {
   @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

   @NotBlank(message = "le titre est obligatoire")
    @Size(max = 200, message = "le titre ne peut pas dépasser 200 caractères")
    @Column(nullable = false)
    private String title;

   @NotBlank(message = "le contenu est obligatoire ")
    @Column(columnDefinition =  "TEXT",nullable = false)
    private String content;

   @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id",nullable = false)
    private User author;

   @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "theme_id", nullable = false)
    private Theme theme;

   @CreationTimestamp
   @Column(name =  "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name =  "updated_at", updatable = false)
    private LocalDateTime updatedAt;




}
