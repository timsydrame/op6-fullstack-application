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
import { CommentService } from '../../services/comment.service';
import { Article } from '../../../../interfaces/article.interface';
import { ArticleComment } from '../../../../interfaces/comment.interface';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent],
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css'],
})
export class ArticleDetailComponent implements OnInit {
  article: Article | null = null;
  comments: ArticleComment[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  commentForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private commentService: CommentService,
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
      this.loadComments(Number(id));
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

  loadComments(articleId: number): void {
    this.commentService.getCommentsByArticle(articleId).subscribe({
      next: (comments) => {
        this.comments = comments;
      },
      error: (error) => {
        console.error('Error loading comments:', error);
      },
    });
  }

  submitComment(): void {
    if (this.commentForm.valid && this.article) {
      const request = {
        content: this.commentForm.value.content,
        articleId: this.article.id,
      };

      this.commentService.createComment(request).subscribe({
        next: (comment) => {
          this.comments.push(comment);
          this.commentForm.reset();
        },
        error: (error) => {
          console.error('Error creating comment:', error);
        },
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/feed']);
  }
}
