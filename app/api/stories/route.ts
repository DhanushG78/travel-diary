import { NextResponse } from "next/server";
import { getStories } from "@/lib/server/getStories";

import Stack from "@/lib/contentstack";
export async function GET() {
  try {
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
