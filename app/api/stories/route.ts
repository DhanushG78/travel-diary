import { NextResponse } from "next/server";
import { getStories } from "@/lib/server/getStories";

export async function GET() {
  try {
    const stories = await getStories();
    return NextResponse.json(stories);
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to fetch stories" },
      { status: 500 }
    );
  }
}
