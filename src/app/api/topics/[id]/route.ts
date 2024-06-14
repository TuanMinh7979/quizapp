import { connectDB } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Topic from "@/models/topicModel";
import Subject from "@/models/subjectModel";
import mongoose from "mongoose";
connectDB();
export async function GET(request: NextRequest, { params }: any) {
    try {
        const rs = await Subject.findOne({slug: params.id});
        console.log(rs)
        let topicList: any[] = [];
        if (rs) {
            topicList = await Topic.find({ subjectId: new mongoose.Types.ObjectId(rs._id) });
        }

        return NextResponse.json(
            { topicList },
            { status: 200 }
        );
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

