import { connectDB } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Question from "@/models/questionModel";
import { uploadFromBase64 } from "@/utils/utils";


connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    // check if user already exists
  


    await Question.create(reqBody);
    // uploadFromBase64("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAA1BMVEUAAP+KeNJXAAAASElEQVR4nO3BgQAAAADDoPlTX+AIVQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwDcaiAAFXD1ujAAAAAElFTkSuQmCC")
    return NextResponse.json(
      { message: "Question created successfully", success: true },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}


