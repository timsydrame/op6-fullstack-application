import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { Theme } from '../../interfaces/theme.interface';
import { AuthService } from '../auth/services/auth-service';
import { HeaderComponent } from '../../shared/components/header/header.component';
@Component({
  selector: 'app-themes',
  standalone: true,
  imports: [CommonModule, HeaderComponent], 
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.css'],
})
export class ThemesComponent implements OnInit {
  themes: Theme[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private themeService: ThemeService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadThemes();
  }

  loadThemes(): void {
    this.isLoading = true;
    this.themeService.getAllThemes().subscribe({
      next: (themes) => {
        this.themes = themes;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement des thèmes';
        this.isLoading = false;
        console.error('Error loading themes:', error);
      },
    });
  }

  toggleSubscription(theme: Theme): void {
    if (theme.isSubscribed) {
      this.unsubscribe(theme);
    } else {
      this.subscribe(theme);
    }
  }

  subscribe(theme: Theme): void {
    this.themeService.subscribe(theme.id).subscribe({
      next: () => {
        theme.isSubscribed = true;
      },
      error: (error) => {
        console.error('Error subscribing:', error);
      },
    });
  }

  unsubscribe(theme: Theme): void {
    this.themeService.unsubscribe(theme.id).subscribe({
      next: () => {
        theme.isSubscribed = false;
      },
      error: (error) => {
        console.error('Error unsubscribing:', error);
      },
    });
  }

  goToFeed(): void {
    this.router.navigate(['/feed']);
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }

  logout(): void {
    this.authService.logout();
  }
}
