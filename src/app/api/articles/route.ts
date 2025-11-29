import { NextResponse } from "next/server";
import type { Locale } from "@/lib/db/types/article";
import { listPublishedArticles } from "@/modules/log/services/articles";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const locale = (url.searchParams.get("locale") ?? "en") as Locale;

    const articles = await listPublishedArticles(locale);

    // Maintain backward compatibility: return articles directly (not wrapped in { data: ... })
    return NextResponse.json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 }
    );
  }
}
