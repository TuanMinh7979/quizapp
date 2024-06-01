import { connectDB } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Question from "@/models/questionModel";
import { uploadFromBase64 } from "@/utils/utils";
import mongoose from "mongoose";
import Answer from "@/models/answerModel";


connectDB();


export async function DELETE(request: NextRequest, { params }: any) {
  try {
    const rs = await Question.findByIdAndDelete(params.idToDel);
    const delAns = await Answer.deleteMany({ questionId: params.idToDel })
    return NextResponse.json(
      { message: "Question delete successfully", success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}


