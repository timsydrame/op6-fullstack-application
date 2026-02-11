import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="feed-container">
      <h1>Bienvenue sur MDD !</h1>
      <p>Vous êtes connecté(e) en tant que {{ username }}</p>
      <button class="btn-logout" (click)="logout()">Se déconnecter</button>
    </div>
  `,
  styles: [
    `
      .feed-container {
        padding: 40px;
        text-align: center;
      }

      h1 {
        color: #7c5cdb;
        margin-bottom: 20px;
      }

      .btn-logout {
        margin-top: 20px;
        padding: 12px 30px;
        background-color: #7c5cdb;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 600;
        transition: all 0.3s ease;
      }

      .btn-logout:hover {
        background-color: #6a4dc9;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(124, 92, 219, 0.3);
      }
    `,
  ],
})
export class FeedComponent {
  username: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    const currentUser = this.authService.getCurrentUser();
    this.username = currentUser?.username || '';
  }

  logout(): void {
    this.authService.logout();
  }
}
