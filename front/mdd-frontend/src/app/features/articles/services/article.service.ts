import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { Article } from "../../../interfaces/article.interface";
import { ArticleRequest } from "../interfaces/article-request.interface";

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private apiUrl = `${environment.apiUrl}/articles`;
    constructor(private http: HttpClient) { }
    
    //Créer un article
    createdArticle(request: ArticleRequest): Observable<Article>{
        return this.http.post<Article>(this.apiUrl, request);
    }

    //Recuperrer le feed personnalisé
    getFeed(): Observable<Article[]>{
        return this.http.get<Article[]>(`${this.apiUrl}/feed`);
    }

    // Recuperer tous les articles
    getAllArticles(): Observable<Article[]>{
        return this.http.get<Article[]>(this.apiUrl)
    }

    // Recuperer un article par ID
    getArticleById(id: number): Observable<Article> {
        return this.http.get<Article>(`${this.apiUrl}/${id}`);
    }
}