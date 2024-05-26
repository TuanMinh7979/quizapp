import { connectDB } from "@/config/dbConfig";

import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

import jwt from "jsonwebtoken";

export const validateJWT = async (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      throw new Error("No token found");
    }
    const decodedData: any = await jwt.verify(token, process.env.jwt_secret!);
    return decodedData.userId;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export async function GET(request: NextRequest) {
  try {
    const userId = await validateJWT(request);
    const user = await User.findById(userId).select("-password");
    if (!user) {
      throw new Error("No user found");
    }
    return NextResponse.json({
      message: "User data fetched successfully",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
