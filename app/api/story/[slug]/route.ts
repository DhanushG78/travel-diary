import { NextResponse } from "next/server";
import { getStory } from "@/lib/server/getStories";

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const params = await context.params;

  try {
    const story = await getStory(params.slug);

    if (!story) {
      return NextResponse.json({ error: "Story not found" }, { status: 404 });
    }

    return NextResponse.json(story);
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to fetch story" },
      { status: 500 }
    );
  }
}
