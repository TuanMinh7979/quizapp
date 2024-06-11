import { connectDB } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Answer from "@/models/answerModel";
import mongoose from "mongoose";
connectDB();
// post a list answer
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const toaddlst= reqBody.toAddList.filter((el:any)=>el.lbl)
    await Answer.insertMany(toaddlst);

    for (let el of reqBody.toUpdateList) {
      if(el.lbl){
        await Answer.findByIdAndUpdate(el.eAnswerId, { lbl: el.lbl })
      }
     
    }
    return NextResponse.json(
      { message: "Answer created successfully", success: true },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
