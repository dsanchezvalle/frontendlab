import { connectToDatabase } from "@/lib/db/mongoose";
import "@/lib/models/Author";
import "@/lib/models/Tag";
import Article from "@/lib/models/Article";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
): Promise<NextResponse> {
  const { slug } = await params;

  // Use NextRequest's built-in URL parser
  const lang = request.nextUrl.searchParams.get("lang") || "en";

  // Connect to MongoDB
  await connectToDatabase();

  try {
    const article = await Article.findOne({ [`slug.${lang}`]: slug })
      .populate("author")
      .populate("tags")
      .lean();

    if (!article) {
      return NextResponse.json(
        { error: `Article with slug "${slug}" not found.` },
        { status: 404 }
      );
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error("Error fetching article:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
