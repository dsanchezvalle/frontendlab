import mongoose from "mongoose";

declare global {
  // Rename the global cache property to avoid conflict with imported mongoose
  let mongooseCache:
    | {
        conn: mongoose.Connection | null;
        promise: Promise<typeof mongoose> | null;
      }
    | undefined;
}

const MONGODB_URI =
  process.env.NODE_ENV === "production"
    ? process.env.MONGODB_URI
    : process.env.MONGODB_URI_DEV;

if (!MONGODB_URI) {
  throw new Error("Missing MongoDB URI");
}

export async function connectToDatabase() {
  if (!global.mongooseCache) {
    global.mongooseCache = { conn: null, promise: null };
  }

  const cached = global.mongooseCache;

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI!, {
      bufferCommands: false,
    });
  }

  // Await the mongoose module instance
  const mongooseInstance = await cached.promise;
  cached.conn = mongooseInstance.connection;

  return cached.conn;
}
