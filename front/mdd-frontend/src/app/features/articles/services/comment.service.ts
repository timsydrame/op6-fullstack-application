import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ArticleComment } from '../../../interfaces/comment.interface';
import { CommentRequest } from '../interfaces/comment-request.interface';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private apiUrl = `${environment.apiUrl}/comments`;

  constructor(private http: HttpClient) {}

  createComment(request: CommentRequest): Observable<ArticleComment> {
    return this.http.post<ArticleComment>(this.apiUrl, request);
  }

  getCommentsByArticle(articleId: number): Observable<ArticleComment[]> {
    return this.http.get<ArticleComment[]>(
      `${this.apiUrl}/article/${articleId}`,
    );
  }
}
