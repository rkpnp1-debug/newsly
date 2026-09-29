import { Article, NewsResponse } from "@/types/news";

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

export async function fetchNews(
  category?: string,
  query?: string,
  page?: string
): Promise<{ articles: Article[]; nextPage?: string; isMock?: boolean }> {
  const apiKey = process.env.NEWSDATA_API_KEY;

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
    const params = new URLSearchParams({
      apikey: apiKey,
      language: "en",
      size: "12",
    });

    if (category && category !== "top") {
      params.set("category", category);
    }
    if (query) {
      params.set("q", query);
    }
    if (page) {
      params.set("page", page);
    }

    const res = await fetch(`https://newsdata.io/api/1/latest?${params.toString()}`, {
      next: { revalidate: 300 }, // cache 5 min
    });

    if (!res.ok) {
      console.error("News API error:", res.status);
      return { articles: MOCK_ARTICLES, isMock: true };
    }

    const data: NewsResponse = await res.json();
    return {
      articles: data.results || [],
      nextPage: data.nextPage,
    };
  } catch (error) {
    console.error("Failed to fetch news:", error);
    return { articles: MOCK_ARTICLES, isMock: true };
  }
}