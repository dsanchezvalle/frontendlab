import { Schema, model, models } from "mongoose";

const TagSchema = new Schema({
  key: { type: String, required: true, unique: true }, // e.g., "react"
  label: {
    en: { type: String, required: true },
    es: { type: String, required: true },
    pt: { type: String, required: true },
  },
  description: {
    en: String,
    es: String,
    pt: String,
  },
});

const Tag = models.Tag || model("Tag", TagSchema);
export default Tag;
