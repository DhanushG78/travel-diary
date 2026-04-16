import { getStory } from "@/lib/server/getStories";
import { StoryClient } from "./StoryClient";

export const dynamic = "force-dynamic";

interface StoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function StoryPage({ params }: StoryPageProps) {
  const resolvedParams = await params;
  const story = await getStory(resolvedParams.slug);

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Story Not Found</h1>
          <a href="/" className="text-indigo-400 hover:text-indigo-300">
            ← Return to Explore
          </a>
        </div>
      </div>
    );
  }

  return <StoryClient story={story} />;
}
