"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Clock, MapPin, Wallet, Calendar, Sparkles, CheckCircle, Tag, X, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import parse from "html-react-parser";
import { useState } from "react";

interface StoryClientProps {
  story: any;
}

export function StoryClient({ story }: StoryClientProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const coverImage = story.featured_image?.url || "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1";

  const selectedImage = selectedImageIndex !== null && story.gallery ? story.gallery[selectedImageIndex]?.url : null;

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (story.gallery) {
      setSelectedImageIndex((prev) => (prev !== null ? (prev + 1) % story.gallery.length : null));
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (story.gallery) {
      setSelectedImageIndex((prev) => (prev !== null ? (prev - 1 + story.gallery.length) % story.gallery.length : null));
    }
  };

  // Framer Motion variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.1 } }
  };

  const traveler = story.traveler?.[0] || story.author?.[0]; // Fallback if author is present

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setSelectedImageIndex(null)}
          >
            <button
              className="absolute top-6 right-6 text-white hover:text-gray-300 transition p-2 bg-white/10 rounded-full z-50"
              onClick={(e) => { e.stopPropagation(); setSelectedImageIndex(null); }}
            >
              <X className="w-8 h-8" />
            </button>
            
            {story.gallery && story.gallery.length > 1 && (
              <>
                <button
                  className="absolute left-4 md:left-12 text-white hover:text-gray-300 transition p-3 bg-black/50 hover:bg-black/80 rounded-full z-50"
                  onClick={prevImage}
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  className="absolute right-4 md:right-12 text-white hover:text-gray-300 transition p-3 bg-black/50 hover:bg-black/80 rounded-full z-50"
                  onClick={nextImage}
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}

            <motion.img
              key={selectedImage}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              src={selectedImage}
              alt="Gallery Fullscreen"
              className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] w-full">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
        <img
          src={coverImage}
          alt={story.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 z-20 flex flex-col justify-end max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
          <Link href="/">
            <motion.div 
              whileHover={{ x: -5 }}
              className="inline-flex items-center text-gray-300 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Explore
            </motion.div>
          </Link>
          
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.h1 variants={fadeIn} className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              {story.title}
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-xl text-gray-300 max-w-3xl">
              {story.short_description}
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="flex flex-col space-y-12"
        >
          {/* Gallery Slider */}
          {story.gallery && story.gallery.length > 0 && (
            <motion.div variants={fadeIn} className="space-y-6">
              <h3 className="text-2xl font-bold flex items-center">
                <Sparkles className="w-6 h-6 mr-3 text-indigo-400" />
                Gallery
              </h3>
              <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide">
                {story.gallery.map((img: any, index: number) => (
                  <img
                    key={index}
                    src={img.url}
                    alt={`Gallery ${index + 1}`}
                    className="w-72 h-48 md:w-80 md:h-56 object-cover rounded-2xl snap-center cursor-pointer hover:opacity-90 transition-opacity flex-shrink-0 shadow-lg border border-white/10"
                    onClick={() => setSelectedImageIndex(index)}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Destination, Duration, Budget buttons */}
          <motion.div variants={fadeIn} className="flex flex-wrap gap-4">
            <div className="bg-indigo-600 px-6 py-3 rounded-full text-sm font-bold flex items-center shadow-[0_0_15px_rgba(79,70,229,0.4)]">
              <MapPin className="w-5 h-5 mr-2" />
              {story.destination?.name || "Unknown Location"}
            </div>
            {story.duration && (
              <div className="bg-zinc-800 border border-zinc-700 px-6 py-3 rounded-full text-sm font-semibold flex items-center">
                <Clock className="w-5 h-5 mr-2 text-indigo-400" />
                {story.duration}
              </div>
            )}
            {story.budget && (
              <div className="bg-zinc-800 border border-zinc-700 px-6 py-3 rounded-full text-sm font-semibold flex items-center">
                <Wallet className="w-5 h-5 mr-2 text-emerald-400" />
                {story.budget}
              </div>
            )}
          </motion.div>

          {/* Best time to visit */}
          {story.best_time_to_visit && (
            <motion.div variants={fadeIn} className="bg-indigo-900/20 border border-indigo-500/20 rounded-3xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Calendar className="w-24 h-24 text-indigo-500" />
              </div>
              <h3 className="text-xl font-bold text-indigo-300 mb-3 flex items-center relative z-10">
                <Calendar className="w-6 h-6 mr-3 text-indigo-400" />
                Best Time to Visit
              </h3>
              <p className="text-gray-300 text-lg relative z-10">{story.best_time_to_visit}</p>
            </motion.div>
          )}

          {/* Story Dynamic Blocks */}
          <div className="space-y-10 pt-4">
            {story.content_sections?.map((block: any, index: number) => {
              if (block.day_wise_plan) {
                return (
                  <motion.div variants={fadeIn} key={index} className="relative pl-8 border-l-2 border-indigo-500/30">
                    <div className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(79,70,229,0.5)] border-4 border-black" />
                    <h3 className="text-2xl font-bold mb-4 text-indigo-400 flex items-center">
                      <Calendar className="w-6 h-6 mr-3" />
                      {block.day_wise_plan.day_title}
                    </h3>
                    <div className="prose prose-invert prose-indigo max-w-none text-gray-300">
                      {parse(block.day_wise_plan.description || "")}
                    </div>
                  </motion.div>
                );
              }

              if (block.tips) {
                return (
                  <motion.div variants={fadeIn} key={index} className="bg-indigo-950/30 border border-indigo-500/30 rounded-3xl p-8 relative overflow-hidden mt-8">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                      <CheckCircle className="w-32 h-32 text-indigo-500" />
                    </div>
                    <h3 className="text-xl font-bold text-indigo-300 mb-4 flex items-center relative z-10">
                      <Sparkles className="w-6 h-6 mr-3 text-indigo-400" />
                      {block.tips.title}
                    </h3>
                    <div className="prose prose-invert prose-indigo max-w-none text-gray-300 relative z-10">
                      {parse(block.tips.description || "")}
                    </div>
                  </motion.div>
                );
              }

              if (block.highlight) {
                return (
                  <motion.div variants={fadeIn} key={index} className="bg-amber-950/30 border border-amber-500/30 rounded-3xl p-8 mt-8">
                    <h3 className="text-xl font-bold text-amber-400 mb-4 flex items-center">
                      <Tag className="w-6 h-6 mr-3" />
                      {block.highlight.title}
                    </h3>
                    <div className="prose prose-invert prose-amber max-w-none text-gray-300">
                      <p>{block.highlight.description}</p>
                    </div>
                  </motion.div>
                );
              }

              return null;
            })}
          </div>

          {/* Traveler Details Box (Landscape & Bottom) */}
          {traveler && (
            <motion.div variants={fadeIn} className="bg-zinc-900 border border-white/10 rounded-3xl p-8 mt-12 hover:border-indigo-500/50 transition-colors group flex flex-col sm:flex-row items-center gap-8 shadow-xl">
              <Link href={traveler.uid ? `/traveler/${traveler.uid}` : "#"} className="flex-shrink-0">
                <div className="w-32 h-32 rounded-full bg-indigo-500 flex items-center justify-center text-4xl font-bold overflow-hidden border-4 border-indigo-400 group-hover:scale-105 transition-transform">
                  {traveler.profile_image?.url ? (
                    <img src={traveler.profile_image.url} alt={traveler.full_name || traveler.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-white">{(traveler.full_name || traveler.name || "A").charAt(0)}</span>
                  )}
                </div>
              </Link>
              <div className="flex-grow text-center sm:text-left">
                <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors uppercase tracking-wider mb-1 font-semibold">Written by</p>
                <Link href={traveler.uid ? `/traveler/${traveler.uid}` : "#"}>
                  <p className="font-bold text-3xl text-white group-hover:text-indigo-400 transition-colors mb-3">{traveler.full_name || traveler.name || "Anonymous Explorer"}</p>
                </Link>
                {traveler.bio && (
                  <p className="text-base text-gray-400 max-w-2xl">{traveler.bio}</p>
                )}
                {traveler.social_link && (
                  <div className="mt-5 pt-5 border-t border-white/10">
                    <a
                      href={traveler.social_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:text-white transition-colors text-sm font-bold inline-flex items-center gap-2"
                    >
                      Follow on Social
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          )}

        </motion.div>
      </div>
    </div>
  );
}
