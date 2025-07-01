// import User from "@/app/models/User";
// import { dbConnect } from "@/lib/mongodb";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== "POST") return res.status(405).end();

//   const { email, password } = req.body;
//   await dbConnect();

//   const user = await User.findOne({ email });
//   if (!user) return res.status(401).json({ error: "Invalid credentials" });

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

//   const token = jwt.sign(
//     { id: user._id, email: user.email },
//     process.env.JWT_SECRET!,
//     {
//       expiresIn: "7d",
//     }
//   );

//   res
//     .status(200)
//     .json({
//       token,
//       user: { id: user._id, name: user.name, email: user.email },
//     });
// }

import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/User";
import { dbConnect } from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    await dbConnect();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return NextResponse.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
