"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Clock } from "lucide-react";
import { Article } from "@/types/news";
import { formatRelativeTime, truncate, cn } from "@/lib/utils";
import { addClickPoints, isArticleRead, markArticleRead } from "@/lib/storage";
import { useState, useEffect } from "react";

interface NewsCardProps {
  article: Article;
  featured?: boolean;
}

export function NewsCard({ article, featured = false }: NewsCardProps) {
  const [read, setRead] = useState(false);

  useEffect(() => {
    setRead(isArticleRead(article.article_id));
  }, [article.article_id]);

  const handleClick = () => {
    addClickPoints();
    markArticleRead(article.article_id);
    setRead(true);
    // Notify header to update points
    window.dispatchEvent(new Event("newsly-points-updated"));
  };

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5",
        featured && "md:col-span-2 md:flex-row",
        read && "opacity-75"
      )}
    >
      {/* Image */}
      <div
        className={cn(
          "relative overflow-hidden bg-muted",
          featured ? "md:w-1/2 aspect-[16/10] md:aspect-auto" : "aspect-[16/10]"
        )}
      >
        {article.image_url ? (
          <Image
            src={article.image_url}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
            <span className="text-4xl opacity-30">📰</span>
          </div>
        )}
        {read && (
          <div className="absolute top-3 left-3 rounded-full bg-black/60 px-2.5 py-1 text-xs text-white backdrop-blur">
            Read
          </div>
        )}
      </div>

      {/* Content */}
      <div className={cn("flex flex-1 flex-col p-5", featured && "md:w-1/2 md:justify-center")}>
        <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
          <span className="font-medium text-primary">
            {article.source_name || article.source_id}
          </span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatRelativeTime(article.pubDate)}
          </span>
        </div>

        <h2
          className={cn(
            "font-semibold leading-snug tracking-tight text-foreground group-hover:text-primary transition-colors",
            featured ? "text-2xl md:text-3xl mb-3" : "text-lg mb-2"
          )}
        >
          <Link
            href={`/article/${article.article_id}?url=${encodeURIComponent(article.link)}&title=${encodeURIComponent(article.title)}`}
            onClick={handleClick}
            className="after:absolute after:inset-0"
          >
            {article.title}
          </Link>
        </h2>

        {article.description && (
          <p className={cn("text-muted-foreground leading-relaxed", featured ? "text-base" : "text-sm line-clamp-2")}>
            {truncate(article.description, featured ? 220 : 140)}
          </p>
        )}

        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
          <ExternalLink className="h-3.5 w-3.5" />
          <span>Read full article</span>
          <span className="ml-auto text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            +2 pts
          </span>
        </div>
      </div>
    </article>
  );
}