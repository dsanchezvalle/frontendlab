// NOTE: This service module sits at the DB → DTO boundary for The Log.
// It queries Mongoose models and returns LogArticle DTOs to the rest
// of the application. DB-layer types (IArticle, ILocalizedField) should
// remain confined to this file and the mappers.
import { Types } from "mongoose";
import { connectToDatabase } from "@/lib/db/mongoose";
import Article from "@/lib/models/Article";
import "@/lib/models/Author";
import "@/lib/models/Tag";

import type { IArticle, ILocalizedField, Locale } from "@/lib/db/types/article";
import type { LogArticle } from "@/modules/log/types";
import { mapArticleToLogArticle } from "@/modules/log/utils/mappers";

// Local helper types to describe populated documents
interface PopulatedAuthorDoc {
  _id?: Types.ObjectId;
  slug?: string;
  name?: string;
  email?: string;
  bio?: ILocalizedField;
  social?: {
    twitter?: string;
    github?: string;
  } | null;
  __v?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface PopulatedTagDoc {
  _id?: Types.ObjectId;
  key?: string;
  label?: ILocalizedField;
  description?: ILocalizedField;
  __v?: number;
}

type PopulatedArticle = IArticle & {
  id?: string;
  _id?: Types.ObjectId;
  author?: PopulatedAuthorDoc;
  tags?: PopulatedTagDoc[];
};

export async function listPublishedArticles(
  locale: Locale
): Promise<LogArticle[]> {
  await connectToDatabase();

  const docs = await Article.find({
    publishedAt: { $lte: new Date() },
  })
    .populate("author")
    .populate("tags")
    .sort({ publishedAt: -1 })
    .lean<PopulatedArticle[]>();

  return docs.map((doc) => mapArticleToLogArticle(doc, locale));
}

export async function getArticleBySlug(
  locale: Locale,
  slug: string
): Promise<LogArticle | null> {
  await connectToDatabase();

  const doc = await Article.findOne({
    [`slug.${locale}`]: slug,
  })
    .populate("author")
    .populate("tags")
    .lean<PopulatedArticle | null>();

  if (!doc) return null;

  return mapArticleToLogArticle(doc, locale);
}
