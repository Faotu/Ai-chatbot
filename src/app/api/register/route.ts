// import User from "@/app/models/User";
// import { dbConnect } from "@/lib/mongodb";
// import bcrypt from "bcryptjs";
// import { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== "POST") return res.status(405).end();

//   const { name, email, password } = req.body;
//   await dbConnect();

//   const existingUser = await User.findOne({ email });
//   if (existingUser)
//     return res.status(400).json({ error: "User already exists" });

//   const hashed = await bcrypt.hash(password, 10);
//   const user = await User.create({ name, email, password: hashed });

//   res.status(201).json({ user });
// }

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "@/app/models/User";
// import User from "@/models/User"; // Make sure this path is correct for your project structure

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connections[0].readyState === 1) return;
  await mongoose.connect(process.env.MONGODB_URI as string, {
    dbName: "fupre_db",
  });
};

export const POST = async (req: Request) => {
  try {
    await connectDB();

    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already in use" },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "User registered successfully", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
