import { NextRequest, NextResponse } from "next/server";
import { fetchNews } from "@/lib/news";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get("category") || undefined;
  const query = searchParams.get("q") || undefined;
  const page = searchParams.get("page") || undefined;

  try {
    const data = await fetchNews(category, query, page);
    return NextResponse.json(data);
  } catch (error) {
    console.error("API /news error:", error);
    return NextResponse.json(
      { articles: [], error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}