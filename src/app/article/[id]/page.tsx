"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Trophy, Clock } from "lucide-react";
import { addReadingPoints, markArticleRead } from "@/lib/storage";
import { PointsToast } from "@/components/PointsToast";

export default function ArticlePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "Article";
  const url = searchParams.get("url") || "#";
  const articleId = params.id as string;

  const [seconds, setSeconds] = useState(0);
  const [earned, setEarned] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    markArticleRead(articleId);
    startTimeRef.current = Date.now();

    // Track reading time every second while tab is visible
    intervalRef.current = setInterval(() => {
      if (document.visibilityState === "visible") {
        setSeconds((s) => s + 1);
      }
    }, 1000);

    // Save points when leaving
    const saveOnLeave = () => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      if (elapsed >= 10) {
        const result = addReadingPoints(elapsed);
        setEarned(result.earned);
        window.dispatchEvent(new Event("newsly-points-updated"));
        if (result.earned > 0) {
          window.dispatchEvent(
            new CustomEvent("newsly-points-earned", { detail: { earned: result.earned } })
          );
        }
      }
    };

    window.addEventListener("beforeunload", saveOnLeave);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      window.removeEventListener("beforeunload", saveOnLeave);
      saveOnLeave();
    };
  }, [articleId]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to feed
      </Link>

      <article className="space-y-6">
        <header>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-4">
            {decodeURIComponent(title)}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span>
                Reading: {Math.floor(seconds / 60)}m {seconds % 60}s
              </span>
            </div>
            {earned > 0 && (
              <div className="flex items-center gap-1.5 text-primary font-medium">
                <Trophy className="h-4 w-4" />
                +{earned} points earned
              </div>
            )}
          </div>
        </header>

        <div className="rounded-2xl border bg-card p-8 text-center space-y-6">
          <p className="text-muted-foreground leading-relaxed">
            Full article content is hosted on the original publisher’s site.
            Click below to continue reading — we’ll keep tracking your reading time
            and award points when you return.
          </p>

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            Continue reading
            <ExternalLink className="h-4 w-4" />
          </a>

          <p className="text-xs text-muted-foreground">
            Tip: Stay on this tab while reading to earn more points.
          </p>
        </div>

        <div className="rounded-xl bg-muted/50 p-4 text-sm text-muted-foreground">
          <strong className="text-foreground">How points work:</strong> You earn
          approximately 1 point every 30 seconds of focused reading time (minimum 10
          seconds). Clicking an article also gives +2 points.
        </div>
      </article>

      <PointsToast />
    </div>
  );
}