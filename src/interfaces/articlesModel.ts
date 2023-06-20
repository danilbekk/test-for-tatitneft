export interface ArticleType {
  id: string;
  title: string;
  text: string;
  topic: string;
  author: string;
  date: string;
  commentsCount?: number;
}
