import { Schema, model, models, Types } from "mongoose";
import type { IArticle, Locale } from "@/lib/db/types/article";

const ArticleSchema = new Schema<IArticle>(
  {
    slug: {
      en: { type: String, required: true },
      es: { type: String, required: true },
      pt: { type: String, required: true },
    },
    title: {
      en: { type: String, required: true },
      es: { type: String, required: true },
      pt: { type: String, required: true },
    },
    description: {
      en: { type: String, required: true },
      es: { type: String, required: true },
      pt: { type: String, required: true },
    },
    content: {
      en: { type: String, required: true },
      es: { type: String, required: true },
      pt: { type: String, required: true },
    },
    coverImage: {
      url: { type: String },
      alt: {
        en: { type: String },
        es: { type: String },
        pt: { type: String },
      },
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Author",
      required: true,
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
        required: true,
      },
    ],
    publishedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    autoIndex: process.env.NODE_ENV !== "production", // Auto-create indexes in dev
    toJSON: {
      virtuals: true,
      transform: (doc, ret: IArticle & { _id: unknown; __v?: number }) => {
        const { _id, ...rest } = ret;
        delete rest.__v;

        return {
          ...rest,
          id: (_id as Types.ObjectId).toString(),
        };
      },
    },
  }
);

// Index definitions (will auto-create in dev via autoIndex)
ArticleSchema.index({ "slug.en": 1 });
ArticleSchema.index({ "slug.es": 1 });
ArticleSchema.index({ "slug.pt": 1 });
ArticleSchema.index({ publishedAt: -1 });
ArticleSchema.index({ author: 1 });
ArticleSchema.index({ tags: 1 });

// Full-text search indexes (only needed if using $text searches)
ArticleSchema.index({
  "title.en": "text",
  "title.es": "text",
  "title.pt": "text",
  "content.en": "text",
  "content.es": "text",
  "content.pt": "text",
});

// Virtual for publication status
ArticleSchema.virtual("isPublished").get(function (this: IArticle) {
  return this.publishedAt && this.publishedAt <= new Date();
});

// Query Helpers
ArticleSchema.statics.findByLocaleSlug = async function (
  locale: Locale,
  slug: string
) {
  return this.findOne({ [`slug.${locale}`]: slug })
    .populate("author", "name slug")
    .populate("tags", "key label");
};

ArticleSchema.statics.getPublishedArticles = async function (locale: Locale) {
  return (
    this.find({
      publishedAt: { $lte: new Date() },
    })
      // TODO: refine projection to return locale-specific Data Transfer Object for previews.
      .select(`slug title description publishedAt ${locale}`)
      .sort({ publishedAt: -1 })
  );
};

const Article = models.Article || model<IArticle>("Article", ArticleSchema);
export default Article;
