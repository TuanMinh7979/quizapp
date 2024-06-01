
import { connectDB } from "@/config/dbConfig";
import Exam from "@/models/examModel";
import Question from "@/models/questionModel";
import { NextRequest, NextResponse } from "next/server";



connectDB();
export async function DELETE(request: NextRequest, { params }: any) {
    try {
        const rs = await Exam.findByIdAndDelete(params.id);
        const delAns = await Question.deleteMany({ examId: params.id })
        return NextResponse.json(
            { message: "Exam delete successfully", success: true },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}