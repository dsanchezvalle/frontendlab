import { connectToDatabase } from "@/lib/mongoose";
import "@/models/Author";
import "@/models/Tag";
import Article from "@/models/Article";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
): Promise<NextResponse> {
  const { slug } = await params;

  // Extract query parameters from the URL
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get("lang") || "en";

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
