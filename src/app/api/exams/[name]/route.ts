import { connectDB } from "@/config/dbConfig";
import Exam from "@/models/examModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
connectDB();
export async function GET(request: NextRequest, { params }: any) {
  const { searchParams } = new URL(request.url);
  const userIdPar = searchParams.get("userId");
  const examPipeline = [
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
    {
      $match: {
        name: params.name,

      },
    },
  ];
  try {
    const rs = await Exam.aggregate(examPipeline);
    return NextResponse.json({
      rs: rs[0]
    },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
