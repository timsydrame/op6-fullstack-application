import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthResponse } from '../interfaces/auth-response-interface';
import { LoginRequest } from '../interfaces/login-request-interface';
import { RegisterRequest } from '../interfaces/register-request-interface';
import { UpdateUserRequest } from '../interfaces/update-user-request.interface';
import { environment } from '../../../../environments/environment';

 @Injectable({
   providedIn: 'root',
 })
 export class AuthService {
   private apiUrl = `${environment.apiUrl}/auth`;
   private tokenKey = 'auth_token';

   private currentUserSubject = new BehaviorSubject<AuthResponse | null>(null);
   public currentUser$ = this.currentUserSubject.asObservable();

   constructor(
     private http: HttpClient,
     private router: Router,
   ) {
     // Charger l'utilisateur depuis le localStorage au démarrage
     const token = this.getToken();
     if (token) {
       // Si un token existe, on pourrait appeler /api/auth/me ici (optionnel)
     }
   }

   register(request: RegisterRequest): Observable<AuthResponse> {
     return this.http
       .post<AuthResponse>(`${this.apiUrl}/register`, request)
       .pipe(tap((response) => this.handleAuthSuccess(response)));
   }

   login(request: LoginRequest): Observable<AuthResponse> {
     return this.http
       .post<AuthResponse>(`${this.apiUrl}/login`, request)
       .pipe(tap((response) => this.handleAuthSuccess(response)));
   }

   logout(): void {
     localStorage.removeItem(this.tokenKey);
     this.currentUserSubject.next(null);
     this.router.navigate(['/']);
   }

   private handleAuthSuccess(response: AuthResponse): void {
     localStorage.setItem(this.tokenKey, response.token);
     this.currentUserSubject.next(response);
   }

   getToken(): string | null {
     return localStorage.getItem(this.tokenKey);
   }

   isAuthenticated(): boolean {
     return this.getToken() !== null;
   }

   getCurrentUser(): AuthResponse | null {
     return this.currentUserSubject.value;
   }
   updateUser(request: UpdateUserRequest): Observable<AuthResponse> {
     return this.http
       .put<AuthResponse>(`${environment.apiUrl}/auth/me`, request)
       .pipe(
         tap((response) => {
           this.currentUserSubject.next(response);
         }),
       );
   }
 }
