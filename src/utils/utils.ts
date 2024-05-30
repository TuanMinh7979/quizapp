import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { google } from "googleapis";
import stream from "stream";
import { fileTypeFromBuffer } from "file-type"
export const validateJWT = async (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value;
        if (!token) {
            throw new Error("No token found");
        }
        const decodedData: any = await jwt.verify(token, process.env.jwt_secret!);
        return decodedData.userId;
    } catch (error: any) {
        throw new Error(error.message);
    }
};


export async function uploadFromBase64(fileName: String, base64Str: String) {
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

        const buffer = Buffer.from(base64Str.split(',')[1], 'base64');
        const typeStr = await fileTypeFromBuffer(buffer);
        console.log(typeStr)
        const fileMetadata = {
            name: fileName + "." + typeStr?.ext,
            mimeType: typeStr?.mime,
            parents: [folderId],
        };

        var bufferStream = new stream.PassThrough();
        const toUp = bufferStream.end(Buffer.from(base64Str.split(',')[1], 'base64'));

        const createdFile = await drive.files.create({
            requestBody: fileMetadata,
            media: {
                mimeType: typeStr?.mime,
                body: toUp
            },
        })

        // console.log(createdFile.data.id)

        return createdFile.data.id

    } catch (error: any) {
        console.error("UPLOAD FILE FAILED")
    }
}