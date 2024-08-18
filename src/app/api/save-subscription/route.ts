import {NextRequest, NextResponse} from "next/server";
import { auth } from "@/auth";
import { setSubscriptionNotification } from "@/lib/data";

export async function POST(req: NextRequest) {
    try{
        const session = await auth()
        if (!session?.user) return  NextResponse.json({ status:"fail", data: "Forbidden"});

        const payload = await req.json();
        if (!payload.subscription) return  NextResponse.json({ status:"fail", data: "Incorrect params"});

        const subscription = payload.subscription;
        await setSubscriptionNotification(subscription);
        return NextResponse.json({status:"success", subscription })
        
    }
    catch (e) {
      return  NextResponse.json({status:"fail",data: e })
    }
}