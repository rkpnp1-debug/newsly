export interface Article {
  article_id: string;
  title: string;
  link: string;
  description: string | null;
  content: string | null;
  pubDate: string;
  image_url: string | null;
  source_id: string;
  source_name?: string;
  category?: string[];
  country?: string[];
  language?: string;
  creator?: string[] | null;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  results: Article[];
  nextPage?: string;
}

export interface UserPoints {
  total: number;
  readingTimeMinutes: number;
  articlesClicked: number;
  lastUpdated: string;
}

export interface ReadingSession {
  articleId: string;
  startTime: number;
  accumulatedSeconds: number;
}