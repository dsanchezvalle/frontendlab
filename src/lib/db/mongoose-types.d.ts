// NOTE:
// This .d.ts file is intentionally kept here (even commented) as a placeholder
// for future global Mongoose type extensions.
// Once the data layer stabilizes, these declarations may be activated or expanded.
// Keeping the file avoids having to recreate the structure later.

// import { Types } from "mongoose";

// declare module "mongoose" {
//   // Global type extensions
//   interface Document {
//     id: string; // For the transformed _id
//     _id: Types.ObjectId;
//     __v?: number;
//   }

//   interface Model<T extends Document> {
//     findByLocaleSlug?(locale: string, slug: string): Promise<T | null>;
//     getPublishedArticles?(locale: string): Promise<T[]>;
//   }
// }
