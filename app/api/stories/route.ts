import { NextResponse } from "next/server";
import { getStories } from "@/lib/server/getStories";

import Stack from "@/lib/contentstack";
export async function GET() {
  try {
    console.log("Stack config:", { 
      delivery_token: Stack.config.delivery_token, 
      api_key: Stack.config.api_key, 
      host: Stack.config.host,
      live_preview: Stack.live_preview
    });
    const stories = await getStories();
    return NextResponse.json(stories);
  } catch (error) {
    console.error("API /api/stories error:", error);
    return NextResponse.json(
      { error: "Unable to fetch stories", details: JSON.stringify(error) },
      { status: 500 }
    );
  }
}
