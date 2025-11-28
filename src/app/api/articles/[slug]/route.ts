import { NextRequest, NextResponse } from "next/server";
import type { Locale } from "@/lib/db/types/article";
import { getArticleBySlug } from "@/modules/log/services/articles";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
): Promise<NextResponse> {
  try {
    const { slug } = await params;

    // Use NextRequest's built-in URL parser
    const locale = (request.nextUrl.searchParams.get("locale") ??
      "en") as Locale;

    const article = await getArticleBySlug(locale, slug);

    if (!article) {
      return NextResponse.json(
        { error: `Article with slug "${slug}" not found.` },
        { status: 404 }
      );
    }

    // Maintain backward compatibility: return article directly (not wrapped in { data: ... })
    return NextResponse.json(article);
  } catch (error) {
    console.error("Error fetching article:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
