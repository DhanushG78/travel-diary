"use client";

import { useEffect, useState } from "react";
import { getStories } from "@/lib/getStories";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, MapPin, Clock, ArrowRight, Compass } from "lucide-react";
import clsx from "clsx";

const THEMES = ["Beaches", "Mountains", "Waterfalls", "Forests", "Cities"];

export default function Home() {
  const [stories, setStories] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [activeDestination, setActiveDestination] = useState("All");
  const [activeTheme, setActiveTheme] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStories();
        setStories(data);
        setFiltered(data);
      } catch (error) {
        console.error("Failed to load stories", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let data = stories;

    if (activeDestination !== "All") {
      data = data.filter((s) => s.destination?.name === activeDestination);
    }

    if (activeTheme) {
      const lowerTheme = activeTheme.toLowerCase();
      data = data.filter((s) =>
        s.title?.toLowerCase().includes(lowerTheme) ||
        s.short_description?.toLowerCase().includes(lowerTheme) ||
        s.destination?.name?.toLowerCase().includes(lowerTheme)
      );
    }

    if (search) {
      data = data.filter((s) =>
        s.title?.toLowerCase().includes(search.toLowerCase()) ||
        s.short_description?.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(data);
  }, [search, activeDestination, activeTheme, stories]);

  const destinations = [
    "All",
    ...Array.from(
      new Set(stories.map((s) => s.destination?.name).filter(Boolean))
    ),
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <Compass className="w-12 h-12 text-indigo-500" />
        </motion.div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black z-10" />
          <img
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2621&auto=format&fit=crop"
            alt="Hero Background"
            className="w-full h-full object-cover animate-pulse-slow"
          />
        </div>

        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white"
          >
            Discover the World's
            <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              Hidden Wonders
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
          >
            Curated travel diaries, interactive itineraries, and breathtaking
            destinations shared by explorers worldwide.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-32 relative z-30">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl mb-12 flex flex-col gap-6"
        >
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search adventures..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-black/50 border border-white/10 text-white rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-gray-500"
              />
            </div>

            {/* Destinations Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto flex-nowrap scrollbar-hide">
              {destinations.map((dest, i) => (
                <button
                  key={i}
                  onClick={() => setActiveDestination(dest)}
                  className={clsx(
                    "px-6 py-3 rounded-2xl whitespace-nowrap text-sm font-medium transition-all duration-300 border",
                    activeDestination === dest
                      ? "bg-indigo-600 border-indigo-500 text-white shadow-[0_0_15px_rgba(79,70,229,0.5)]"
                      : "bg-black/50 border-white/10 text-gray-300 hover:bg-white/5 hover:border-white/20"
                  )}
                >
                  {dest}
                </button>
              ))}
            </div>
          </div>

          {/* Theme Filters */}
          <div className="flex gap-3 overflow-x-auto pt-4 border-t border-white/10 flex-nowrap scrollbar-hide">
            {THEMES.map((theme) => (
              <button
                key={theme}
                onClick={() => setActiveTheme(activeTheme === theme ? null : theme)}
                className={clsx(
                  "px-4 py-2 rounded-full whitespace-nowrap text-xs font-medium transition-all duration-300 border",
                  activeTheme === theme
                    ? "bg-purple-600 border-purple-500 text-white shadow-[0_0_10px_rgba(168,85,247,0.4)]"
                    : "bg-zinc-800 border-white/5 text-gray-400 hover:bg-zinc-700 hover:text-white"
                )}
              >
                {theme}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Global Destinations Grid UI Component */}
        <div id="destinations" className="mb-16 pt-8">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <MapPin className="w-6 h-6 mr-3 text-indigo-400" />
            Top Destinations
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {destinations.filter(d => d !== "All").map((dest, i) => (
              <Link key={i} href={`/destination/${encodeURIComponent(dest.toLowerCase())}`}>
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-black border border-white/10 rounded-2xl p-6 text-center hover:bg-zinc-900 transition-colors group cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.03)] hover:shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:border-indigo-500/50"
                >
                  <MapPin className="w-8 h-8 mx-auto mb-3 text-gray-500 group-hover:text-indigo-400 transition-colors" />
                  <p className="font-semibold text-gray-300 group-hover:text-white transition-colors">{dest}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* Stories Grid */}
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center border-t border-white/10 pt-16">
          <Compass className="w-6 h-6 mr-3 text-purple-400" />
          Recent Explorations
        </h2>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-500 text-lg">
            No stories found. Try adjusting your search or filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((story: any, i) => {
              const traveler = story.traveler?.[0] || story.author?.[0];
              
              return (
                <Link key={story.uid} href={`/story/${story.slug}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    whileHover={{ y: -10 }}
                    className="group bg-zinc-900 rounded-3xl overflow-hidden border border-white/5 hover:border-indigo-500/50 transition-all cursor-pointer h-full flex flex-col"
                  >
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
                      
                      <p className="text-gray-400 mt-3 text-sm line-clamp-3 mb-6">
                        {story.short_description}
                      </p>

                      <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
                        {traveler ? (
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full overflow-hidden bg-indigo-500 flex items-center justify-center text-xs font-bold text-white border border-indigo-400">
                              {traveler.profile_picture?.url ? (
                                <img src={traveler.profile_picture.url} alt={traveler.full_name} className="w-full h-full object-cover" />
                              ) : (
                                (traveler.full_name || traveler.name || "A").charAt(0)
                              )}
                            </div>
                            <span className="text-sm text-gray-300 font-medium">
                              {traveler.full_name || traveler.name || "Anonymous"}
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">Anonymous Explorer</span>
                        )}

                        <div className="text-indigo-400 font-medium text-sm flex items-center">
                          Read
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
