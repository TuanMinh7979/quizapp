import { connectDB } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Topic from "@/models/topicModel";
connectDB();
export async function GET(request: NextRequest) {
    try {
        const topicList = await Topic.find();
        return NextResponse.json(
            { topicList },
            { status: 200 }
        );
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const rs = await Topic.create(reqBody);
        return NextResponse.json(
            { message: "Topic created successfully", rs: rs, success: true },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
