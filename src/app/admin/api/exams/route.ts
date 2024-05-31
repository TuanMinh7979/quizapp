import Exam from "@/models/examModel";
import Question from "@/models/questionModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const examList = await Exam.find();
        return NextResponse.json(
            { examList },
            { status: 200 }
        );
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
