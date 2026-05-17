"use client";

import { useEffect, useState, useCallback } from "react";
import { StoryClient } from "./StoryClient";
import ContentstackLivePreview from "@contentstack/live-preview-utils";
import { initializeLivePreview } from "@/lib/livePreview";
import { useParams } from "next/navigation";
import { Compass } from "lucide-react";
import { motion } from "framer-motion";

export default function StoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [story, setStory] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchStory = useCallback(async () => {
    try {
      let url = `/api/story/${slug}`;
      if (typeof window !== "undefined" && window.location.search) {
        url += window.location.search;
      }
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setStory(data);
      } else {
        setStory(null);
      }
    } catch (error) {
      console.error("Failed to fetch story", error);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    const init = async () => {
      try {
        const res = await fetch("/api/config");
        const config = await res.json();
        
        if (config.apiKey) {
          initializeLivePreview(config.apiKey, config.environment);
        }
        
        await fetchStory();

        ContentstackLivePreview.onEntryChange(() => {
          fetchStory();
        });
      } catch (err) {
        console.error("Failed to initialize", err);
        setLoading(false);
      }
    };

    init();
  }, [fetchStory]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <Compass className="w-12 h-12 text-indigo-500" />
        </motion.div>
      </div>
    );
  }

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
