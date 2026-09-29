import { UserPoints } from "@/types/news";

const POINTS_KEY = "newsly_points";
const READ_ARTICLES_KEY = "newsly_read_articles";
const GUEST_ID_KEY = "newsly_guest_id";

export function getGuestId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem(GUEST_ID_KEY);
  if (!id) {
    id = `guest_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    localStorage.setItem(GUEST_ID_KEY, id);
  }
  return id;
}

export function getPoints(): UserPoints {
  if (typeof window === "undefined") {
    return { total: 0, readingTimeMinutes: 0, articlesClicked: 0, lastUpdated: new Date().toISOString() };
  }
  const raw = localStorage.getItem(POINTS_KEY);
  if (!raw) {
    return { total: 0, readingTimeMinutes: 0, articlesClicked: 0, lastUpdated: new Date().toISOString() };
  }
  try {
    return JSON.parse(raw);
  } catch {
    return { total: 0, readingTimeMinutes: 0, articlesClicked: 0, lastUpdated: new Date().toISOString() };
  }
}

export function savePoints(points: UserPoints) {
  if (typeof window === "undefined") return;
  localStorage.setItem(POINTS_KEY, JSON.stringify({
    ...points,
    lastUpdated: new Date().toISOString(),
  }));
}

export function addReadingPoints(seconds: number) {
  const points = getPoints();
  const minutes = Math.floor(seconds / 60);
  // 1 point per 30 seconds of reading (min 1 point if > 10s)
  const earned = seconds >= 10 ? Math.max(1, Math.floor(seconds / 30)) : 0;

  const updated: UserPoints = {
    total: points.total + earned,
    readingTimeMinutes: points.readingTimeMinutes + (seconds / 60),
    articlesClicked: points.articlesClicked,
    lastUpdated: new Date().toISOString(),
  };
  savePoints(updated);
  return { earned, total: updated.total };
}

export function addClickPoints() {
  const points = getPoints();
  const earned = 2; // 2 points per article click
  const updated: UserPoints = {
    total: points.total + earned,
    readingTimeMinutes: points.readingTimeMinutes,
    articlesClicked: points.articlesClicked + 1,
    lastUpdated: new Date().toISOString(),
  };
  savePoints(updated);
  return { earned, total: updated.total };
}

export function markArticleRead(articleId: string) {
  if (typeof window === "undefined") return;
  const raw = localStorage.getItem(READ_ARTICLES_KEY);
  const list: string[] = raw ? JSON.parse(raw) : [];
  if (!list.includes(articleId)) {
    list.push(articleId);
    localStorage.setItem(READ_ARTICLES_KEY, JSON.stringify(list.slice(-200))); // keep last 200
  }
}

export function isArticleRead(articleId: string): boolean {
  if (typeof window === "undefined") return false;
  const raw = localStorage.getItem(READ_ARTICLES_KEY);
  if (!raw) return false;
  try {
    return JSON.parse(raw).includes(articleId);
  } catch {
    return false;
  }
}