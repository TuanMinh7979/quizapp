import { connectDB } from "@/config/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
connectDB();
import jwt from "jsonwebtoken";
import { validateJWT } from "@/utils/utils";
import mongoose from "mongoose";
import Answer from "@/models/answerModel";
import Question from "@/models/questionModel";
export async function GET(request: NextRequest) {
  try {
    const userId = await validateJWT(request);
    const totalQuestion= await Question.countDocuments();
    const userPL = [{
      $match: {
        _id: new mongoose.Types.ObjectId(userId),
      }
    },
    {
      $lookup: {
        from: 'answers',
        localField: '_id',
        foreignField: 'userId',
        as: 'answers',
      },
    },

    {
      $addFields: {
        answerCnt: { $size: '$answers' },
        totalQuestion: totalQuestion
      },
    },
    {
      $project: {
        password: 0 
      }
    },
    ];

    const users = await User.aggregate(userPL);


    if (!users) {
      throw new Error("No user found");
    }
    console.log(users)
    return NextResponse.json({
      message: "User data fetched successfully",
      data: users[0],
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
