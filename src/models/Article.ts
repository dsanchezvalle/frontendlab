import { Schema, model, models } from "mongoose";

const ArticleSchema = new Schema(
  {
    slug: {
      en: { type: String, required: true, unique: true },
      es: { type: String, required: true, unique: true },
      pt: { type: String, required: true, unique: true },
    },
    title: {
      en: { type: String, required: true },
      es: { type: String, required: true },
      pt: { type: String, required: true },
    },
    description: {
      en: { type: String },
      es: { type: String },
      pt: { type: String },
    },
    content: {
      en: { type: String, required: true },
      es: { type: String },
      pt: { type: String },
    },
    coverImage: {
      url: { type: String }, // optional
      alt: {
        en: { type: String },
        es: { type: String },
        pt: { type: String },
      },
    },
    author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag", required: true }],
    publishedAt: { type: Date, default: null }, // null if not published
  },
  { timestamps: true }
);

const Article = models.Article || model("Article", ArticleSchema);
export default Article;
