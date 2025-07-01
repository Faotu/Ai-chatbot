// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI as string;

// cloudinary.config({
//   // cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   cloud_name: "dfuauemak",
//   api_key: "881511479721179",
//   // api_key: process.env.CLOUDINARY_API_KEY,
//   // api_secret: process.env.CLOUDINARY_API_SECRET,
//   api_secret: "VVwNt8DdPEuwhOoBVxQFJf3IlOg",
// });

// mongoose.connect(process.env.MONGOBD_CONNECTION_STRING as string);

// let cached = global.mongoose || { conn: null, promise: null };

// async function dbConnect() {
//   if (cached.conn) return cached.conn;
//   if (!cached.promise) {
//     cached.promise = mongoose.connect(MONGODB_URI, {
//       bufferCommands: false,
//     });
//   }
//   cached.conn = await cached.promise;
//   return cached.conn;
// }

// export default dbConnect;

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:3000";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let cached = (global as any).mongoose || { conn: null, promise: null };

export async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
