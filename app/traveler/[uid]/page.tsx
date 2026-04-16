import { getTraveler, getStoriesByTraveler } from "@/lib/server/getStories";
import Link from "next/link";
import { ArrowLeft, MapPin, Clock, ExternalLink } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function TravelerPage({ params }: { params: Promise<{ uid: string }> }) {
  const resolvedParams = await params;
  const traveler = await getTraveler(resolvedParams.uid);
  const stories = await getStoriesByTraveler(resolvedParams.uid);

  if (!traveler) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Traveler Not Found</h1>
          <Link href="/" className="text-indigo-400 hover:text-indigo-300">
            ← Return to Explore
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 max-w-7xl mx-auto pt-24">
      <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Explore
      </Link>

      <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8 mb-12 flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden bg-indigo-500 border-4 border-indigo-400 flex-shrink-0 flex items-center justify-center text-5xl font-bold">
          {traveler.profile_picture?.url ? (
            <img src={traveler.profile_picture.url} alt={traveler.full_name} className="w-full h-full object-cover" />
          ) : (
            (traveler.full_name || traveler.name || "A").charAt(0)
          )}
        </div>
        <div className="text-center md:text-left flex-grow">
          <h1 className="text-4xl font-bold mb-3">{traveler.full_name || traveler.name}</h1>
          {traveler.bio && (
            <p className="text-gray-400 text-lg mb-6 max-w-2xl">{traveler.bio}</p>
          )}
          {traveler.social_link && (
            <a 
              href={traveler.social_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Follow
            </a>
          )}
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-8">Travel Stories by {traveler.full_name?.split(" ")[0] || traveler.name?.split(" ")[0]}</h2>

      {stories.length === 0 ? (
        <p className="text-gray-500 text-lg">No stories published yet.</p>
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
                      {story.destination?.name || "Unknown"}
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
