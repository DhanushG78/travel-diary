import { getTravelers } from "@/lib/server/getStories";
import Link from "next/link";
import { Users } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function TravelersPage() {
  const travelers = await getTravelers();

  return (
    <div className="min-h-screen bg-black text-white p-6 max-w-7xl mx-auto pt-24">
      <h1 className="text-4xl font-bold mb-8 flex items-center gap-3">
        <Users className="w-8 h-8 text-indigo-400" />
        Our Travelers
      </h1>

      {travelers.length === 0 ? (
        <p className="text-gray-500 text-lg">No travelers found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {travelers.map((traveler: any) => (
            <Link key={traveler.uid} href={`/traveler/${traveler.uid}`}>
              <div className="bg-zinc-900 border border-white/10 rounded-3xl p-6 hover:bg-zinc-800 transition-colors cursor-pointer group flex flex-col items-center text-center h-full">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-indigo-500 border-4 border-indigo-400 flex items-center justify-center text-2xl font-bold mb-4 group-hover:scale-105 transition-transform">
                  {traveler.profile_image?.url ? (
                    <img src={traveler.profile_image.url} alt={traveler.full_name || traveler.name} className="w-full h-full object-cover" />
                  ) : (
                    (traveler.full_name || traveler.name || "A").charAt(0)
                  )}
                </div>
                <h2 className="text-xl font-bold mb-2 group-hover:text-indigo-400 transition-colors">
                  {traveler.full_name || traveler.name}
                </h2>
                {traveler.bio && (
                  <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                    {traveler.bio}
                  </p>
                )}
                <div className="mt-auto text-indigo-400 text-sm font-medium flex items-center">
                  View Profile
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
