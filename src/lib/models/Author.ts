import { Schema, model, models } from "mongoose";

const AuthorSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, unique: true, sparse: true }, // for future Auth
    avatarUrl: { type: String },
    bio: {
      en: { type: String },
      es: { type: String },
      pt: { type: String },
    },
    social: {
      type: Map,
      of: String,
      default: {},
    },
  },
  { timestamps: true }
);

const Author = models.Author || model("Author", AuthorSchema);
export default Author;
