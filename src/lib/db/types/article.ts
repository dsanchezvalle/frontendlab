import { Document, Types } from "mongoose";

export type Locale = "en" | "es" | "pt";

export interface ILocalizedField {
  en: string;
  es: string;
  pt: string;
}

export interface ICoverImage {
  url?: string;
  alt?: ILocalizedField;
}

type ITag = {
  _id: string;
  key: string;
  label: ILocalizedField;
  description?: ILocalizedField;
};

export interface IArticle extends Document {
  slug: ILocalizedField;
  title: ILocalizedField;
  description: ILocalizedField;
  content: ILocalizedField;
  coverImage?: ICoverImage;
  author: Types.ObjectId;
  tags: ITag[];
  publishedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  isPublished?: boolean; // Virtual field
}

// For frontend usage (optional)
export type ArticlePreview = Pick<
  IArticle,
  "slug" | "title" | "description" | "publishedAt" | "coverImage"
> & { id: string };
