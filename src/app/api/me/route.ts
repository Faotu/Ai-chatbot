import Users from "@/app/models/User";
import { dbConnect } from "@/lib/mongodb";

import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token)
      return NextResponse.json({ error: "No token" }, { status: 401 });

    const jwtSecret = process.env.JWT_SECRET!;
    const decoded: any = jwt.verify(token, jwtSecret);

    await dbConnect();
    const user = await Users.findById(decoded.id).select(
      "firstname lastname avatar"
    );

    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json({
      user: {
        name: `${user.firstname} ${user.lastname}`,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
