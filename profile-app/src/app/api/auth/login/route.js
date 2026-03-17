import { connectDB } from "@/config/db";
import { User } from "@/models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();

  const body = await req.json();
  const { email, password } = body;

  const user = await User.findOne({ email });

  if (!user) {
    return Response.json({ message: "Invalid credentials" }, { status: 401 });
  }

  // 🔐 compare password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return Response.json({ message: "Invalid credentials" }, { status: 401 });
  }

  // 🎟️ create token
  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  // 🍪 set cookie becoz middleware cant read local Storage so cookie
  const response = NextResponse.json({ message: "Login successful" });

  response.cookies.set("token", token, {
    httpOnly: true,
    path: "/"
  });

  return response;
}