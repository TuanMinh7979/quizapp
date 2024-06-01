import { connectDB } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Question from "@/models/questionModel";
import { uploadFromBase64 } from "@/utils/utils";
import Exam from "@/models/examModel";
connectDB();
export async function GET(request: NextRequest) {
    try {

        const examList = await Exam.find();

        const questionList = await Question.find({ examId: examList[0]._id });
        return NextResponse.json(
            { questionList, examList },
            { status: 200 }
        );
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}


