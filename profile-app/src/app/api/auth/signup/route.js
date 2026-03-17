import { connectDB } from "@/config/db";
import { User } from "@/models/user.model";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await connectDB();

  const body = await req.json();
  const { email, password } = body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return Response.json({ message: "User already exists" }, { status: 400 });
  }

  // 🔐 hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({ email, password: hashedPassword });

  return Response.json({ message: "Signup successful" });
}