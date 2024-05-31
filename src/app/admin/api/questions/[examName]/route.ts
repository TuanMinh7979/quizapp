import Exam from "@/models/examModel";
import Question from "@/models/questionModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: any) {
    try {

        const exam: any = await Exam.find({ name: params.examName })
        
        const questionList = await Question.find({ examId: exam[0]._id });
        return NextResponse.json(
            { questionList },
            { status: 200 }
        );
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
