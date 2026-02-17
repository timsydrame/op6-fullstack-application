import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/components/login/login.component').then(
        (m) => m.LoginComponent,
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/components/register/register.component').then(
        (m) => m.RegisterComponent,
      ),
  },
  {
    path: 'feed',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/articles/components/feed/feed.component').then(
        (m) => m.FeedComponent,
      ),
  },
  {
    path: 'themes',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/themes/themes.component').then(
        (m) => m.ThemesComponent,
      ),
  },
  {
    path: 'articles/create',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/articles/components/create-article/create-article.component').then(
        (m) => m.CreateArticleComponent,
      ),
  },
  {
    path: 'articles/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/articles/components/article-detail/article-detail.component').then(
        (m) => m.ArticleDetailComponent,
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
