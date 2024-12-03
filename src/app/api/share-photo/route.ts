import {NextRequest, NextResponse} from "next/server";
import fs from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
import { auth } from "@clerk/nextjs/server";
const pump = promisify(pipeline);

export async function POST(req: NextRequest) {
    try{
        // const { userId, sessionClaims } = await auth();
        // const authenticated = !(userId === null || sessionClaims === null);
        // if (authenticated) {
        //   const formData = await req.formData();
        //   const file = formData.getAll('files')[0]
        //   const filePath = `./public/file/${file.name}`;
        //   await pump(file.stream(), fs.createWriteStream(filePath));
        //   return NextResponse.json({status:"success", data: file.size })
        // }
        return  NextResponse.json({ status:"fail", data: "Forbidden"})
    }
    catch (e) {
      return  NextResponse.json({status:"fail",data: e })
    }
}