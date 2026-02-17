import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { ArticleService } from '../../services/article.service';
import { ThemeService } from '../../../themes/services/theme.service';
import { Theme } from '../../../../interfaces/theme.interface';

@Component({
  selector: 'app-create-article',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent],
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css'],
})
export class CreateArticleComponent implements OnInit {
  createForm: FormGroup;
  themes: Theme[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private themeService: ThemeService,
    private router: Router,
  ) {
    this.createForm = this.fb.group({
      themeId: ['', Validators.required],
      title: ['', [Validators.required, Validators.maxLength(200)]],
      content: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadThemes();
  }

  loadThemes(): void {
    this.themeService.getAllThemes().subscribe({
      next: (themes) => {
        this.themes = themes;
      },
      error: (error) => {
        console.error('Error loading themes:', error);
      },
    });
  }

  onSubmit(): void {
    if (this.createForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      this.articleService.createdArticle(this.createForm.value).subscribe({
        next: (article) => {
          this.isLoading = false;
          this.router.navigate(['/feed']);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = "Erreur lors de la création de l'article";
          console.error('Error creating article:', error);
        },
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/feed']);
  }
}
