"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Clock, MapPin, Wallet, Calendar, Sparkles, CheckCircle, Tag, X } from "lucide-react";
import Link from "next/link";
import parse from "html-react-parser";
import { useState } from "react";

interface StoryClientProps {
  story: any;
}

export function StoryClient({ story }: StoryClientProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const coverImage = story.featured_image?.url || "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1";

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
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 text-white hover:text-gray-300 transition p-2 bg-white/10 rounded-full"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
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
        
        <div className="absolute inset-0 z-20 flex flex-col justify-end max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
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
            <motion.div variants={fadeIn} className="flex flex-wrap gap-3 mb-6">
              <span className="bg-indigo-500/80 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                {story.destination?.name || "Unknown Location"}
              </span>
              {story.duration && (
                <span className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-sm font-medium border-l">
                  <Clock className="w-4 h-4 inline mr-2" />
                  {story.duration}
                </span>
              )}
              {story.budget && (
                <span className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-sm font-medium border-l">
                  <Wallet className="w-4 h-4 inline mr-2" />
                  {story.budget}
                </span>
              )}
            </motion.div>
            
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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="grid grid-cols-1 lg:grid-cols-3 gap-12"
        >
          {/* Left Column: Story Content */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Story Dynamic Blocks */}
            <div className="space-y-10">
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
                    <motion.div variants={fadeIn} key={index} className="bg-indigo-950/30 border border-indigo-500/30 rounded-3xl p-8 relative overflow-hidden">
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
                    <motion.div variants={fadeIn} key={index} className="bg-amber-950/30 border border-amber-500/30 rounded-3xl p-8">
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
          </div>

          {/* Right Column: Sidebar / Gallery */}
          <div className="lg:col-span-1 space-y-8 relative">
            <div className="sticky top-24">
              {traveler && (
                <motion.div variants={fadeIn} className="bg-zinc-900 border border-white/10 rounded-3xl p-6 mb-8 hover:border-indigo-500/50 transition-colors group">
                  <Link href={traveler.uid ? `/traveler/${traveler.uid}` : "#"} className="flex flex-col items-center text-center gap-4 cursor-pointer">
                    <div className="w-24 h-24 rounded-full bg-indigo-500 flex-shrink-0 flex items-center justify-center text-3xl font-bold overflow-hidden border-4 border-indigo-400 group-hover:scale-105 transition-transform">
                      {traveler.profile_picture?.url ? (
                        <img src={traveler.profile_picture.url} alt={traveler.full_name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-white">{(traveler.full_name || traveler.name || "A").charAt(0)}</span>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Written by</p>
                      <p className="font-semibold text-xl text-white group-hover:text-indigo-400 transition-colors">{traveler.full_name || traveler.name || "Anonymous Explorer"}</p>
                      {traveler.bio && (
                        <p className="text-sm text-gray-500 mt-2">{traveler.bio}</p>
                      )}
                    </div>
                  </Link>

                  {traveler.social_link && (
                    <div className="mt-6 pt-4 border-t border-white/10 flex justify-center">
                      <a
                        href={traveler.social_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-2"
                      >
                        Follow on Social
                      </a>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Image Gallery */}
              {story.gallery && story.gallery.length > 0 && (
                <motion.div variants={fadeIn} className="bg-white/5 border border-white/10 rounded-3xl p-6">
                  <h3 className="text-xl font-bold mb-6 flex items-center">
                    Photo Gallery
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {story.gallery.map((img: any, index: number) => (
                      <img
                        key={index}
                        src={img.url}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-24 object-cover rounded-xl hover:scale-105 transition-transform cursor-pointer"
                        onClick={() => setSelectedImage(img.url)}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
