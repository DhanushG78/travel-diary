"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Compass, Map, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [destinations, setDestinations] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await fetch("/api/stories");
        if (res.ok) {
          const data = await res.json();
          const dests = Array.from(
            new Set(data.map((s: any) => s.destination?.name).filter(Boolean))
          ) as string[];
          setDestinations(dests);
        }
      } catch (error) {
        console.error("Failed to load destinations", error);
      }
    };
    fetchDestinations();
  }, []);

  const links = [
    { name: "Explore", href: "/", icon: Compass },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={clsx(
        "fixed w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-black/80 backdrop-blur-md border-b border-white/10 shadow-lg py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Compass className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Wanderlust
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={clsx(
                    "flex items-center gap-2 text-sm font-medium transition-colors hover:text-indigo-400 group relative",
                    isActive ? "text-white" : "text-gray-400"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-2 left-0 right-0 h-0.5 bg-indigo-500 rounded-full"
                    />
                  )}
                </Link>
              );
            })}

            {/* Destinations Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button
                className={clsx(
                  "flex items-center gap-2 text-sm font-medium transition-colors hover:text-indigo-400 group relative",
                  pathname.startsWith("/destination") ? "text-white" : "text-gray-400"
                )}
              >
                <Map className="w-4 h-4" />
                Destinations
                <ChevronDown className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-zinc-900 border border-white/10 rounded-xl shadow-xl overflow-hidden py-2"
                  >
                    {destinations.length > 0 ? (
                      destinations.map((dest) => (
                        <Link
                          key={dest}
                          href={`/destination/${encodeURIComponent(dest.toLowerCase())}`}
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-indigo-500 hover:text-white transition-colors"
                        >
                          {dest}
                        </Link>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-sm text-gray-500">No destinations found</div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <button className="hidden md:flex px-6 py-2 rounded-full border border-white/20 text-sm font-medium text-white hover:bg-white/10 transition-colors">
            Share Story
          </button>

          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10"
          >
            <div className="px-4 py-6 space-y-4">
              {links.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 text-gray-300 hover:text-white p-2 rounded-lg hover:bg-white/5"
                  >
                    <Icon className="w-5 h-5" />
                    {link.name}
                  </Link>
                );
              })}
              
              <div className="px-2 py-2">
                <p className="text-gray-400 text-sm mb-2 flex items-center font-medium">
                  <Map className="w-4 h-4 mr-2" /> Destinations
                </p>
                <div className="pl-6 space-y-2">
                  {destinations.map((dest) => (
                    <Link
                      key={dest}
                      href={`/destination/${encodeURIComponent(dest.toLowerCase())}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-gray-300 hover:text-white"
                    >
                      {dest}
                    </Link>
                  ))}
                </div>
              </div>

              <button className="w-full mt-4 px-6 py-3 rounded-full bg-indigo-500 text-white font-medium">
                Share Story
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
