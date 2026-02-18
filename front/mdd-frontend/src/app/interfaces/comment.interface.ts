export interface ArticleComment {
  id: number;
  content: string;
  authorName: string;
  authorId: number;
  articleid: number;
  createdAt: Date;
}