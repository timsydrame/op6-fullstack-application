import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { AuthService } from '../auth/services/auth-service';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent {
  username: string = '';

  constructor(private authService: AuthService) {
    const currentUser = this.authService.getCurrentUser();
    this.username = currentUser?.username || '';
  }
}
