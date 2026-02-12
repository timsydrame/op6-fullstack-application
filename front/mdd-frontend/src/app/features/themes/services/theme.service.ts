import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Theme } from '../../../interfaces/theme.interface';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private apiUrl = `${environment.apiUrl}/themes`;

  constructor(private http: HttpClient) {}

  getAllThemes(): Observable<Theme[]> {
    return this.http.get<Theme[]>(this.apiUrl);
  }

  subscribe(themeId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${themeId}/subscribe`, {});
  }

  unsubscribe(themeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${themeId}/unsubscribe`);
  }

  getUserSubscriptions(): Observable<Theme[]> {
    return this.http.get<Theme[]>(`${this.apiUrl}/subscriptions`);
  }
}
