import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  // Ne pas ajouter le token pour les routes d'authentification
  const isAuthRoute =
    req.url.includes('/api/auth/login') ||
    req.url.includes('/api/auth/register');

  if (isAuthRoute) {
    return next(req); // ← Pas de token pour login/register !
  }

  const token = localStorage.getItem('auth_token');

  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(clonedRequest);
  }

  return next(req);
};
