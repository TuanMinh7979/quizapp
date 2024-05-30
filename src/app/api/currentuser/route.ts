import { connectDB } from "@/config/dbConfig";

import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

import jwt from "jsonwebtoken";
import { validateJWT } from "@/utils/utils";



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
    const response = NextResponse.json(
      { message: "Cookies has expired" },
      { status: 500 }
    );;
    response.cookies.set("token", "", { maxAge: 0 });
    return response;
  }
}
