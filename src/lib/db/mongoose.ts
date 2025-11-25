import mongoose from "mongoose";

// NOTE:
// Cached MongoDB connection for Next.js App Router.
// Prevents creating a new connection on every server invocation,
// especially during development with Hot Reload.

// Declare the mongooseCache type
interface MongooseCache {
  conn: mongoose.Connection | null;
  promise: Promise<typeof mongoose> | null;
}

// Extend the Global interface without using namespace
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

export async function connectToDatabase() {
  if (!global.mongooseCache) {
    global.mongooseCache = { conn: null, promise: null };
  }

  const cached = global.mongooseCache;

  if (!cached) {
    throw new Error("mongooseCache is undefined");
  }

  if (cached.conn) {
    return cached.conn;
  }

  const MONGODB_URI =
    process.env.NODE_ENV === "production"
      ? process.env.MONGODB_URI
      : process.env.MONGODB_URI_DEV;

  if (!MONGODB_URI) {
    throw new Error("Missing MongoDB URI");
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
