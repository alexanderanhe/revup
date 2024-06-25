import { useRouter } from "next/router";
import { NextResponse } from "next/server";

export async function GET() {
  const router = useRouter()
  console.log(router.query)
  return NextResponse.json({ status: "success" });
}