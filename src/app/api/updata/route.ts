import { connectDB } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import stream from "stream";
import { uploadFromBase64 } from "@/utils/utils";
connectDB();
export async function POST(request: NextRequest) {
    try {
        // const clientId = process.env.client_id
        // const clientSecret = process.env.client_secret
        // const rfToken = process.env.rf_token
        // const folderId: string = <string>process.env.folder_id

        // const oauthClient = new google.auth.OAuth2(clientId, clientSecret)
        // oauthClient.setCredentials({ refresh_token: rfToken })

        // const drive = google.drive({
        //     version: 'v3',
        //     auth: oauthClient
        // })



        // const fileMetadata = {
        //     name: "simpleimag.png",
        //     mimeType: 'image/png',
        //     parents: [folderId],
        // };


        // const reqBody = await request.json();

        // const image = reqBody.image;


        // var bufferStream = new stream.PassThrough();
        // const toUp = bufferStream.end(Buffer.from(image.split(',')[1], 'base64'));

        // const createdFile = await drive.files.create({
        //     requestBody: fileMetadata,
        //     media: {
        //         mimeType: 'image/png',
        //         body: toUp
        //     },
        // })

        // console.log(createdFile.data.id)


        
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
        const clientId = process.env.client_id
        const clientSecret = process.env.client_secret
        const rfToken = process.env.rf_token
        const folderId: string = <string>process.env.folder_id

        const oauthClient = new google.auth.OAuth2(clientId, clientSecret)
        oauthClient.setCredentials({ refresh_token: rfToken })

        const drive = google.drive({
            version: 'v3',
            auth: oauthClient
        })
        const reqBody = await request.json();
        const createdFile = await drive.files.delete({
            fileId: reqBody.id
        })


        return NextResponse.json(
            { message: "Image created successfully", success: true },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
