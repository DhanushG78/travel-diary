import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    apiKey: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY || process.env.CONTENTSTACK_API_KEY,
    environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT || process.env.CONTENTSTACK_ENVIRONMENT || "development",
  });
}
