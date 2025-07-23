import mongoose from "mongoose";

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

  if (!cached) {
    throw new Error("mongooseCache is undefined");
  }

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
