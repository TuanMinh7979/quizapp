import { connectDB } from "@/config/dbConfig";
import Exam from "@/models/examModel";
import Question from "@/models/questionModel";
import { NextRequest, NextResponse } from "next/server";
connectDB();
export async function GET(request: NextRequest) {
    try {

        const { searchParams } = new URL(request.url);
        const topicIdStrPar = searchParams.get("topicSlug");

        const rs = await Exam.find({ topicSlug: topicIdStrPar });
        return NextResponse.json(
            { examList: rs },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}