import { connectDB } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Question from "@/models/questionModel";
import { uploadFromBase64 } from "@/utils/utils";


connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    // check if user already exists



    const rs = await Question.create(reqBody);

    return NextResponse.json(
      { message: "Question created successfully", rs: rs, success: true },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}


export async function PUT(request: NextRequest) {
  try {
    const reqBody = await request.json();

    // check if user already exists




    const { _id: idToUpdate, ...restBody } = reqBody
    console.log(idToUpdate, restBody)
    const rs = await Question.findOneAndUpdate({ _id: idToUpdate }, restBody, { new: true });

    return NextResponse.json(
      { message: "Question update successfully", rs: rs, success: true },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}


