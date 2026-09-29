"use client";

import { useEffect, useState, useCallback } from "react";
import { Search, RefreshCw } from "lucide-react";
import { Article } from "@/types/news";
import { NewsCard } from "@/components/NewsCard";
import { NewsGridSkeleton } from "@/components/NewsSkeleton";
import { CategoryFilter } from "@/components/CategoryFilter";
import { PointsToast } from "@/components/PointsToast";

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("top");
  const [query, setQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [isMock, setIsMock] = useState(false);

  const loadNews = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (category && category !== "top") params.set("category", category);
      if (query) params.set("q", query);

      const res = await fetch(`/api/news?${params.toString()}`);
      const data = await res.json();
      setArticles(data.articles || []);
      setIsMock(!!data.isMock);
    } catch (err) {
      console.error(err);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }, [category, query]);

  useEffect(() => {
    loadNews();
  }, [loadNews]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery(searchInput.trim());
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Hero */}
      <section className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
          Read what matters.
          <span className="text-primary"> Earn points.</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A clean, distraction-free news experience. Get points for real reading time and engagement.
        </p>
      </section>

      {/* Search + Filters */}
      <div className="mb-8 space-y-4">
        <form onSubmit={handleSearch} className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search news..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full rounded-full border bg-background py-3 pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary/30 transition"
          />
        </form>

        <div className="flex items-center justify-between gap-4">
          <CategoryFilter active={category} onChange={setCategory} />
          <button
            onClick={loadNews}
            disabled={loading}
            className="shrink-0 rounded-full p-2.5 hover:bg-accent transition-colors disabled:opacity-50"
            title="Refresh"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {isMock && (
        <div className="mb-6 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-700 dark:text-amber-300">
          Showing demo articles. Add a free <strong>NEWSDATA_API_KEY</strong> in your environment to get live news.
        </div>
      )}

      {/* News Grid */}
      {loading ? (
        <NewsGridSkeleton />
      ) : articles.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-lg">No articles found.</p>
          <p className="text-sm mt-1">Try a different category or search term.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, i) => (
            <NewsCard
              key={article.article_id}
              article={article}
              featured={i === 0}
            />
          ))}
        </div>
      )}

      <PointsToast />
    </div>
  );
}