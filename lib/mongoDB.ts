import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
	throw new Error("Please define the MONGODB_URI environment variable");
}

// Define a global type-safe cache for mongoose
interface MongooseGlobalCache {
	conn: typeof mongoose | null;
	promise: Promise<typeof mongoose> | null;
}

// Add `mongoose` property to globalThis with proper typing
declare global {
	var mongoose: MongooseGlobalCache | undefined;
}

const globalWithMongoose = globalThis as typeof globalThis & {
	mongoose: MongooseGlobalCache;
};

let cached = globalWithMongoose.mongoose;

if (!cached) {
	cached = globalWithMongoose.mongoose = {conn: null, promise: null};
}

async function dbConnect() {
	if (cached.conn) return cached.conn;

	if (!cached.promise) {
		cached.promise = mongoose
			.connect(MONGODB_URI!)
			.then((mongoose) => mongoose);
	}

	cached.conn = await cached.promise;
	return cached.conn;
}

export default dbConnect;
