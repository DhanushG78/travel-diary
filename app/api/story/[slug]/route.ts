import { NextResponse } from "next/server";
import { getStory, setLivePreviewQuery } from "@/lib/server/getStories";

export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const params = await context.params;

  try {
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    
    if (queryString) {
      setLivePreviewQuery("?" + queryString);
    }

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
