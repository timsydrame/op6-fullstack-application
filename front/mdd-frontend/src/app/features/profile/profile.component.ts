import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { AuthService } from '../auth/services/auth-service';
import { ThemeService } from '../themes/services/theme.service';
import { Theme } from '../../interfaces/theme.interface';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  subscriptions: Theme[] = [];
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private themeService: ThemeService,
    private router: Router,
  ) {
    const currentUser = this.authService.getCurrentUser();
    this.profileForm = this.fb.group({
      username: [
        currentUser?.username || '',
        [Validators.required, Validators.minLength(3)],
      ],
      email: [
        currentUser?.email || '',
        [Validators.required, Validators.email],
      ],
    });
  }

  ngOnInit(): void {
    this.loadSubscriptions();
  }

  loadSubscriptions(): void {
    this.themeService.getUserSubscriptions().subscribe({
      next: (themes) => {
        this.subscriptions = themes;
      },
      error: (error) => {
        console.error('Error loading subscriptions:', error);
      },
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      this.authService.updateUser(this.profileForm.value).subscribe({
        next: () => {
          this.isLoading = false;
          this.successMessage = 'Profil mis à jour avec succès !';
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = 'Erreur lors de la mise à jour du profil';
          console.error('Error updating profile:', error);
        },
      });
    }
  }

  unsubscribe(themeId: number): void {
    this.themeService.unsubscribe(themeId).subscribe({
      next: () => {
        this.subscriptions = this.subscriptions.filter((t) => t.id !== themeId);
      },
      error: (error) => {
        console.error('Error unsubscribing:', error);
      },
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
