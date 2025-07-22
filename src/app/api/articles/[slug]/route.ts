import { connectToDatabase } from "@/lib/mongoose";
import "@/models/Author";
import "@/models/Tag";
import Article from "@/models/Article";
import { NextResponse } from "next/server";

// Define a type for the route context argument
type RouteContext = {
  params: { slug: string };
};

export async function GET(
  req: Request,
  context: Promise<RouteContext> | RouteContext
) {
  // Await context and params to get slug because Next.js dynamic API routes provide `params` asynchronously
  const { params } = await context;
  const { slug } = await params;

  // Extract query parameters from the URL
  const { searchParams } = new URL(req.url);
  const lang = searchParams.get("lang") || "en";

  // Connect to MongoDB (uses cached connection)
  await connectToDatabase();

  try {
    // Query the article by the dynamic field based on language
    const article = await Article.findOne({ [`slug.${lang}`]: slug })
      .populate("author")
      .populate("tags")
      .lean(); // Use `lean()` for better performance

    if (!article) {
      return NextResponse.json(
        { error: `Article with slug "${slug}" not found.` },
        { status: 404 }
      );
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error("❌ Error fetching article:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
