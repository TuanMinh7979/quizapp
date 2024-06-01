import { connectDB } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import Exam from "@/models/examModel";
import mongoose from "mongoose";
connectDB();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const rs = await Exam.create(reqBody);
    return NextResponse.json(
      { message: "Exam created successfully", rs: rs, success: true },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userIdPar = searchParams.get("userId");
    const topicIdStrPar = searchParams.get("topicSlug");
    const examPL = [{
      $match: {
        topicSlug: topicIdStrPar,
      }
    },
    {
      $lookup: {
        from: 'questions',
        localField: '_id',
        foreignField: 'examId',
        as: 'questions',
      },
    },
    {
      $lookup: {
        from: 'answers',
        localField: '_id',
        foreignField: 'examId',
        let: { userId: "$userId" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$userId", new mongoose.Types.ObjectId(userIdPar ? userIdPar : '')]
              }

            },
          },

        ],
        as: 'answers',
      },
    },
    {
      $addFields: {
        questionCnt: { $size: '$questions' },
        answerCnt: { $size: '$answers' },
      },
    },
    ];
    const rs = await Exam.aggregate(examPL);
    // const rs = await Exam.find(filtersObject);
    return NextResponse.json(
      { rs },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
