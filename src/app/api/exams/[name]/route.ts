import { connectDB } from "@/config/dbConfig";
import Exam from "@/models/examModel";
import mongoose from "mongoose";

import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(request: NextRequest, { params }: any) {
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
      $match: { // Optional filter for students (replace with your criteria)
        name: params.name, // Replace with actual student ID
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


