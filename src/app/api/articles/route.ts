import { connectToDatabase } from "@/lib/mongoose";
import "@/models/Author";
import "@/models/Tag";
import Article from "@/models/Article";

export async function GET(req: Request) {
  await connectToDatabase();

  try {
    const articles = await Article.find()
      .sort({
        createdAt: -1,
      })
      .populate("author")
      .populate("tags");

    return Response.json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return new Response("Failed to fetch articles", { status: 500 });
  }
}
