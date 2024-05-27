import { connectDB } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";

import Answer from "@/models/answerModel";


connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    await Answer.create(reqBody);
    return NextResponse.json(
      { message: "Answer created successfully", success: true },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}


// export async function GET(request: NextRequest) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const topicIdStrPar = searchParams.get("topicIdStr");

//     const filtersObject: any = {};
//     if (topicIdStrPar) {
//       filtersObject["topicIdStr"] = topicIdStrPar;
//     }
//     const rs = await Exam.find(filtersObject);
//     return NextResponse.json(
//       { rs },
//       { status: 201 }
//     );
//   } catch (error: any) {
//     return NextResponse.json({ message: error.message }, { status: 500 });
//   }
// }



