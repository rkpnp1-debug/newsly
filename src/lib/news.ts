import { Article } from "@/types/news";

// Fallback mock data so the app works even without an API key
const MOCK_ARTICLES: Article[] = [
  {
    article_id: "mock-1",
    title: "The Future of Clean Energy: Breakthroughs in 2026",
    link: "https://example.com/clean-energy",
    description: "Scientists announce major advances in solar efficiency and battery storage that could accelerate the global energy transition.",
    content: null,
    pubDate: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    image_url: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
    source_id: "techcrunch",
    source_name: "TechCrunch",
    category: ["technology", "science"],
  },
  {
    article_id: "mock-2",
    title: "How Reading Habits Are Changing in the Digital Age",
    link: "https://example.com/reading-habits",
    description: "New research shows people prefer shorter, high-quality articles. Apps that reward focused reading are gaining popularity.",
    content: null,
    pubDate: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    image_url: "https://images.unsplash.com/photo-14565130808af52f38f48f3811eaa3f6?w=800&q=80",
    source_id: "theverge",
    source_name: "The Verge",
    category: ["lifestyle", "technology"],
  },
  {
    article_id: "mock-3",
    title: "Global Markets Rally on Positive Economic Data",
    link: "https://example.com/markets",
    description: "Stock indices across Asia, Europe and the US closed higher after better-than-expected inflation numbers.",
    content: null,
    pubDate: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    image_url: "https://images.unsplash.com/photo-1611974789855-9c2a0b3637d?w=800&q=80",
    source_id: "bloomberg",
    source_name: "Bloomberg",
    category: ["business"],
  },
  {
    article_id: "mock-4",
    title: "SpaceX Successfully Launches Next Generation Starship",
    link: "https://example.com/spacex",
    description: "The latest test flight marks a significant step toward reusable deep-space travel.",
    content: null,
    pubDate: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    image_url: "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=800&q=80",
    source_id: "space",
    source_name: "Space.com",
    category: ["science", "technology"],
  },
  {
    article_id: "mock-5",
    title: "Why Focused Reading Beats Endless Scrolling",
    link: "https://example.com/focused-reading",
    description: "Experts explain the cognitive benefits of deep reading and how point-based systems can help rebuild attention spans.",
    content: null,
    pubDate: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    image_url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80",
    source_id: "wired",
    source_name: "Wired",
    category: ["lifestyle", "health"],
  },
  {
    article_id: "mock-6",
    title: "AI Tools That Actually Improve Your Daily Productivity",
    link: "https://example.com/ai-productivity",
    description: "From smart summarizers to focus timers, these AI applications are helping professionals reclaim their time.",
    content: null,
    pubDate: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
    image_url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    source_id: "mit",
    source_name: "MIT Technology Review",
    category: ["technology"],
  },
];

// Map NewsAPI.org article → our internal Article shape
function mapNewsApiArticle(a: any, index: number): Article {
  return {
    article_id: a.url || `newsapi-${index}-${Date.now()}`,
    title: a.title || "Untitled",
    link: a.url || "#",
    description: a.description || null,
    content: a.content || null,
    pubDate: a.publishedAt || new Date().toISOString(),
    image_url: a.urlToImage || null,
    source_id: a.source?.id || a.source?.name?.toLowerCase().replace(/\s+/g, "-") || "unknown",
    source_name: a.source?.name || "Unknown",
    category: [],
    creator: a.author ? [a.author] : null,
  };
}

export async function fetchNews(
  category?: string,
  query?: string,
  page?: string
): Promise<{ articles: Article[]; nextPage?: string; isMock?: boolean }> {
  const apiKey = process.env.NEWS_API_KEY;

  // If no API key, return beautiful mock data so the UI still works
  if (!apiKey) {
    let filtered = MOCK_ARTICLES;
    if (category && category !== "top") {
      filtered = MOCK_ARTICLES.filter((a) =>
        a.category?.some((c) => c.toLowerCase().includes(category.toLowerCase()))
      );
    }
    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.description?.toLowerCase().includes(q)
      );
    }
    return { articles: filtered, isMock: true };
  }

  try {
    let url: string;

    if (query) {
      // Search endpoint
      const params = new URLSearchParams({
        q: query,
        language: "en",
        sortBy: "publishedAt",
        pageSize: "12",
        apiKey,
      });
      if (page) params.set("page", page);
      url = `https://newsapi.org/v2/everything?${params.toString()}`;
    } else {
      // Top headlines
      const params = new URLSearchParams({
        country: "us",
        pageSize: "12",
        apiKey,
      });

      // NewsAPI supports these categories for top-headlines
      const validCategories = [
        "business",
        "entertainment",
        "general",
        "health",
        "science",
        "sports",
        "technology",
      ];

      if (category && category !== "top" && validCategories.includes(category)) {
        params.set("category", category);
      }

      if (page) params.set("page", page);
      url = `https://newsapi.org/v2/top-headlines?${params.toString()}`;
    }

    const res = await fetch(url, {
      next: { revalidate: 300 }, // cache 5 min
    });

    if (!res.ok) {
      console.error("NewsAPI error:", res.status, await res.text());
      return { articles: MOCK_ARTICLES, isMock: true };
    }

    const data = await res.json();

    if (data.status !== "ok") {
      console.error("NewsAPI returned error:", data);
      return { articles: MOCK_ARTICLES, isMock: true };
    }

    const articles = (data.articles || []).map(mapNewsApiArticle);

    return {
      articles,
      // NewsAPI uses page numbers, not cursors
      nextPage: data.articles?.length === 12 ? String(Number(page || 1) + 1) : undefined,
    };
  } catch (error) {
    console.error("Failed to fetch news:", error);
    return { articles: MOCK_ARTICLES, isMock: true };
  }
}