import { connectDB } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";
connectDB();
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        // check if user exists
        const user = await User.findOne({ username: reqBody.username });
        if (!user) {
            throw new Error("User does not exist");
        }
        // compare passwords
        if (reqBody.password !== user.password) {
            throw new Error("Invalid password");
        }
        const dataToBeSigned = {
            userId: user._id,
            username: user.username,
            isAdmin: user.isAdmin
        };
        const token = jwt.sign(dataToBeSigned, process.env.jwt_secret!, {
            expiresIn: "20d",
        });
        const response = NextResponse.json(
            { message: "Login successful" },
            { status: 200 }
        );
        // set cookie
        response.cookies.set("token", token, {
            httpOnly: true,
            maxAge: 60 * 60 * 299 * 1000, // 1 day
        });
        return response;
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
