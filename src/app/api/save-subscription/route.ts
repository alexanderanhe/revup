import {NextRequest, NextResponse} from "next/server";
import { setSubscriptionNotification } from "@/lib/data";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
    try{
      const { userId, sessionClaims } = await auth();
      const authenticated = !(userId === null || sessionClaims === null);
      if (!authenticated) return  NextResponse.json({ status:"fail", data: "Forbidden"}, { status: 403 });

      const payload = await req.json();
      if (!payload.subscription) return  NextResponse.json({ status:"fail", data: "Incorrect params"}, { status: 406 });

      const subscription = payload.subscription;
      await setSubscriptionNotification(subscription);
      return NextResponse.json({status:"success", subscription })
        
    }
    catch (e) {
      return  NextResponse.json({status:"fail",data: e })
    }
}