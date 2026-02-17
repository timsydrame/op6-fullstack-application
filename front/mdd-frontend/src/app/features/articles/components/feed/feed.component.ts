import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../../../interfaces/article.interface';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  articles: Article[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private articleService: ArticleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFeed();
  }

  loadFeed(): void {
    this.isLoading = true;
    this.articleService.getFeed().subscribe({
      next: (articles) => {
        this.articles = articles;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement des articles';
        this.isLoading = false;
        console.error('Error loading feed:', error);
      }
    });
  }

  goToArticle(id: number): void {
    this.router.navigate(['/articles', id]);
  }

  goToCreateArticle(): void {
    this.router.navigate(['/articles/create']);
  }
}
