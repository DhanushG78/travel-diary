import Stack from "@/lib/contentstack";
import Link from "next/link";
import { ArrowLeft, MapPin, Clock } from "lucide-react";

const getStoriesByDestination = async (name: string) => {
  const Query = Stack.ContentType("travel_story").Query();

  Query.includeReference(["destination"]);

  const result = await Query.toJSON().find();

  return (result[0] || []).filter(
    (s: any) => s.destination?.name?.toLowerCase() === name
  );
};

export default async function DestinationPage({ params }: { params: Promise<{ name: string }> }) {
  const resolvedParams = await params;
  const stories = await getStoriesByDestination(resolvedParams.name);
  
  // Extract destination fields dynamically from the associated stories
  const targetDestination = stories.length > 0 ? stories[0].destination : null;

  return (
    <div className="min-h-screen bg-black text-white p-6 max-w-7xl mx-auto pt-24">
      <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Explore
      </Link>
      
      <h1 className="text-5xl font-bold mb-4 capitalize bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
        {resolvedParams.name} Adventures
      </h1>

      {targetDestination?.places && (
        <div className="mb-12 bg-white/5 border border-white/10 rounded-xl p-4 inline-block">
          <h2 className="text-sm text-gray-400 mb-1 flex items-center"><MapPin className="w-4 h-4 mr-2" /> Key Places to Visit</h2>
          <p className="text-indigo-300 font-medium">{targetDestination.places}</p>
        </div>
      )}

      {(!targetDestination?.places) && <div className="mb-12" />}

      {stories.length === 0 ? (
        <p className="text-gray-500 text-lg">No stories found for this destination yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story: any) => (
            <Link key={story.uid} href={`/story/${story.slug}`}>
              <div className="group bg-zinc-900 rounded-3xl overflow-hidden border border-white/5 hover:border-indigo-500/50 transition-all cursor-pointer h-full flex flex-col">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={story.featured_image?.url || "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1"}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                    <span className="bg-indigo-500/80 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {story.destination?.name || resolvedParams.name}
                    </span>
                    {story.duration && (
                      <span className="bg-black/50 backdrop-blur-md text-gray-200 text-xs px-3 py-1.5 rounded-full flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {story.duration}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col">
                  <h2 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-2">
                    {story.title}
                  </h2>
                  <p className="text-gray-400 mt-3 text-sm line-clamp-3">
                    {story.short_description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
