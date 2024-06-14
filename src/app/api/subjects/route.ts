import { connectDB } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Subject from "@/models/subjectModel";
connectDB();
export async function GET(request: NextRequest) {
    try {
        const subjectList = await Subject.find();
        return NextResponse.json(
            { subjectList },
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
        const rs = await Subject.create(reqBody);
        return NextResponse.json(
            { message: "Subject created successfully", rs: rs, success: true },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
