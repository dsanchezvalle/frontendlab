// NOTE: These types describe the current API responses for The Log.
// They are separate from the DB layer types (IArticle) and will
// likely be refactored into DTOs in a future iteration.

export type LocaleObject = {
  en: string;
  es: string;
  pt: string;
};

export type Author = {
  bio: LocaleObject;
  _id: string;
  slug: string;
  name: string;
  email: string;
  social: {
    twitter: string;
    github: string;
  };
  __v: number;
  createdAt: string;
  updatedAt: string;
};

export type Tag = {
  label: LocaleObject;
  description: LocaleObject;
  _id: string;
  key: string;
  __v: number;
};

export type LogArticle = {
  _id: string;
  title: LocaleObject;
  description: LocaleObject;
  content: LocaleObject;
  slug: LocaleObject;
  date: string;
  readTime: string;
  tags: Tag[];
  author: Author;
  publishedAt: string | null;
  __v: number;
  createdAt: string;
  updatedAt: string;
};

export type LogArticleCard = {
  id: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
};
