import { connectDB } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import stream from "stream";
import { deleteFile, uploadFromBase64 } from "@/utils/utils";
connectDB();
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const image = reqBody.image;
        const rs=await uploadFromBase64(reqBody.name, image)
        return NextResponse.json(
            { message: "Image uploaded successfully", success: true },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {

        const reqBody = await request.json();
        const del = deleteFile(reqBody.id)


        return NextResponse.json(
            { message: "Image deleted successfully", success: true },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("delete error");
    }
}
