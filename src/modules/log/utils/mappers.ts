// NOTE: This file defines the DB → DTO mapping for The Log feature.
// It is one of the only places in the Log module where DB-layer types
// like IArticle and ILocalizedField are allowed; the rest of the module
// should work with LogArticle DTOs instead.
import { Types } from "mongoose";
import type { IArticle, ILocalizedField, Locale } from "@/lib/db/types/article";
import type {
  LogArticle,
  LocaleObject,
  Author,
  Tag,
} from "@/modules/log/types";

function ensureLocaleObject(
  field: ILocalizedField | null | undefined
): LocaleObject {
  return {
    en: field?.en ?? "",
    es: field?.es ?? "",
    pt: field?.pt ?? "",
  };
}

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

type ArticleWithPopulatedRelations = IArticle & {
  id?: string;
  _id?: Types.ObjectId;
  author?: PopulatedAuthorDoc;
  tags?: PopulatedTagDoc[];
};

// Very small heuristic for read time based on word count in the current locale
function computeReadTime(
  content: ILocalizedField | undefined,
  locale: Locale
): string {
  const text = content?.[locale] ?? "";
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200)); // ~200 wpm
  return `${minutes} min`;
}

export function mapArticleToLogArticle(
  doc: ArticleWithPopulatedRelations,
  locale: Locale
): LogArticle {
  const id = doc.id ?? doc._id?.toString() ?? "";

  const publishedAt = doc.publishedAt ?? doc.createdAt;
  const date = publishedAt.toISOString();

  const readTime = computeReadTime(doc.content, locale);

  const authorDoc = doc.author;

  const author: Author = {
    bio: ensureLocaleObject(authorDoc?.bio ?? null),
    _id: authorDoc?._id?.toString() ?? "",
    slug: authorDoc?.slug ?? "",
    name: authorDoc?.name ?? "",
    email: authorDoc?.email ?? "",
    social: {
      twitter: authorDoc?.social?.twitter ?? "",
      github: authorDoc?.social?.github ?? "",
    },
    __v: authorDoc?.__v ?? 0,
    createdAt: authorDoc?.createdAt?.toISOString?.() ?? "",
    updatedAt: authorDoc?.updatedAt?.toISOString?.() ?? "",
  };

  const tags: Tag[] = (doc.tags ?? []).map((tagDoc) => ({
    _id: tagDoc._id?.toString() ?? "",
    key: tagDoc.key ?? "",
    label: ensureLocaleObject(tagDoc.label ?? null),
    description: ensureLocaleObject(tagDoc.description ?? null),
    __v: 0,
  }));

  return {
    _id: id,
    title: ensureLocaleObject(doc.title),
    description: ensureLocaleObject(doc.description),
    content: ensureLocaleObject(doc.content),
    slug: ensureLocaleObject(doc.slug),
    date,
    readTime,
    tags,
    author,
    publishedAt: doc.publishedAt?.toISOString?.() ?? null,
    __v: (doc as { __v?: number }).__v ?? 0,
    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString(),
  };
}
