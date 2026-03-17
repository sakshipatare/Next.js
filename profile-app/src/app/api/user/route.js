import { connectDB } from "@/config/db";
import { User } from "@/models/user.model";
import jwt from "jsonwebtoken";

export async function GET(req) {
  await connectDB();

  try {
    // 🔑 get token from headers
    // const token = req.headers.get("authorization")?.split(" ")[1];

    // if (!token) {
    //   return Response.json({ message: "No token" }, { status: 401 });
    // }

    //cookies
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    // 🔐 verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId);

    return Response.json({
      email: user.email,
      id: user._id
    });
  } catch (error) {
    return Response.json({ message: "Invalid token" }, { status: 401 });
  }
}