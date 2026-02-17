import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth-service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input() activeTab: 'articles' | 'themes' = 'articles';

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  goToFeed(): void {
    this.router.navigate(['/feed']);
  }

  goToThemes(): void {
    this.router.navigate(['/themes']);
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }
  logout(): void {
    this.authService.logout();
  }
}
