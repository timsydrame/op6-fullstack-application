import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input() activeTab: 'articles' | 'themes' = 'articles';

  constructor(private router: Router) {}

  goToFeed(): void {
    this.router.navigate(['/feed']);
  }

  goToThemes(): void {
    this.router.navigate(['/themes']);
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
  }
}
