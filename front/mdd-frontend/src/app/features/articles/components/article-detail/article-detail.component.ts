import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../../../interfaces/article.interface';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent],
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css'],
})
export class ArticleDetailComponent implements OnInit {
  article: Article | null = null;
  isLoading: boolean = true;
  errorMessage: string = '';
  commentForm: FormGroup;
  comments: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private fb: FormBuilder,
  ) {
    this.commentForm = this.fb.group({
      content: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadArticle(Number(id));
    }
  }

  loadArticle(id: number): void {
    this.isLoading = true;
    this.articleService.getArticleById(id).subscribe({
      next: (article) => {
        this.article = article;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Article non trouvé';
        this.isLoading = false;
        console.error('Error loading article:', error);
      },
    });
  }

  submitComment(): void {
    if (this.commentForm.valid) {
      console.log('Commentaire:', this.commentForm.value);
      // À implémenter dans le module Commentaires
      this.commentForm.reset();
    }
  }

  goBack(): void {
    this.router.navigate(['/feed']);
  }
}
