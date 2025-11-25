import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongoose";
import "@/lib/models/Author";
import "@/lib/models/Tag";
import Article from "@/lib/models/Article";

export async function GET(request: NextRequest) {
  await connectToDatabase();

  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get("locale"); // "en", "es", "pt", etc. or null

    // For now, we don't filter by locale yet.
    // But we DO read it so the contract with useArticles is explicit and future-proof.

    const articles = await Article.find()
      .sort({
        createdAt: -1,
      })
      .populate("author")
      .populate("tags");

    return NextResponse.json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 }
    );
  }
}
