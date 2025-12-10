"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

export default function BlogSection({ blogs }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && !isHovering) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % blogs.length);
      }, 4000); // Change slide every 4 seconds
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, isHovering]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % blogs.length);
    resetInterval();
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + blogs.length) % blogs.length);
    resetInterval();
  };

  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (isPlaying && !isHovering) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % blogs.length);
      }, 4000);
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Calculate visible cards
  const visibleCards = 3;
  const getVisibleIndices = () => {
    const indices = [];
    for (let i = -1; i <= 1; i++) {
      const idx = (currentIndex + i + blogs.length) % blogs.length;
      indices.push(idx);
    }
    return indices;
  };

  const visibleIndices = getVisibleIndices();

  return (
    <section className="w-full py-10 bg-gradient-to-b from-gray-50 to-white overflow-hidden relative">
      {/* Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large gradient orbs */}
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-blue-100/30 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-purple-100/30 to-transparent rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

        {/* Floating shapes */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-20 w-40 h-40 border-2 border-blue-200/30 rounded-3xl rotate-12"
        />
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, -15, 0] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute bottom-40 left-40 w-32 h-32 bg-gradient-to-br from-emerald-100/20 to-green-100/20 rounded-full"
        />
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/4 w-48 h-48 border-2 border-purple-200/20 rounded-full"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-4 px-6 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-200"
          >
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              BLOG POSTS
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            Our Latest{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              News & Events
            </span>
          </motion.h2>
        </div>

        {/* Slider Container */}
        <div
          ref={sliderRef}
          className="relative h-[450px]"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* LEFT ARROW (side-centered) */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-40
             p-4 rounded-full bg-white shadow-xl border border-gray-200
             hover:scale-110 transition-transform hover:shadow-2xl"
          >
            <ChevronLeft className="w-7 h-7 text-gray-700" />
          </button>

          {/* RIGHT ARROW (side-centered) */}
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-40
             p-4 rounded-full bg-white shadow-xl border border-gray-200
             hover:scale-110 transition-transform hover:shadow-2xl"
          >
            <ChevronRight className="w-7 h-7 text-gray-700" />
          </button>
          {/* Main Slides */}
          <div className="relative h-full flex items-center justify-center">
            {visibleIndices.map((blogIndex, cardIndex) => {
              const blog = blogs[blogIndex];
              const position = cardIndex - 1; // -1: left, 0: center, 1: right
              const isActive = position === 0;

              return (
                <motion.div
                  key={blogIndex}
                  initial={false}
                  animate={{
                    x: position * 320,
                    scale: isActive ? 1 : 0.85,
                    opacity: isActive ? 1 : 0.7,
                    zIndex: isActive ? 30 : position === -1 ? 20 : 10,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    duration: 0.6,
                  }}
                  whileHover={{
                    scale: isActive ? 1.05 : 0.9,
                    transition: { duration: 0.3 },
                  }}
                  className="absolute"
                >
                  {/* Card Container */}
                  <div
                    className={`w-[380px] ${
                      isActive ? "h-[400px]" : "h-[350px]"
                    } transition-all duration-300`}
                  >
                    {/* Decorative Shape */}
                    <motion.div
                      animate={{
                        rotate: isActive ? [0, 360] : 0,
                        scale: isActive ? [1, 1.2, 1] : 1,
                      }}
                      transition={{
                        duration: isActive ? 8 : 0,
                        repeat: isActive ? Infinity : 0,
                        ease: "linear",
                      }}
                      className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-blue-500 to-cyan-500 opacity-10 rounded-full blur-xl`}
                      style={{
                        clipPath: getShapeClipPath("star"),
                      }}
                    />

                    {/* Main Card */}
                    <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden h-full">
                      {/* Gradient Header */}
                      <div
                        className={`h-3 w-full bg-gradient-to-r from-blue-500 to-cyan-500`}
                      >
                        <motion.div
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                        />
                      </div>

                      {/* Content */}
                      <div className="p-8 h-full flex flex-col">
                        {/* Badge */}
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500`}
                            />
                            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                              {blog.title}
                            </span>
                          </div>
                          <div
                            className={`w-16 h-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500`}
                          />
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 mb-4">{blog.excerpt}</p>

                        {/* Image */}
                        <div className="relative h-48 rounded-2xl overflow-hidden mb-6 group">
                          <div
                            className={`absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10`}
                          />
                          {/* Featured Badge */}
                          {blog.is_featured && (
                            <div className="absolute top-2 right-2 z-20 bg-yellow-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                              Featured
                            </div>
                          )}
                          <img
                            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${blog.banner_image}`}
                            alt={blog.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />

                          {/* Shine Effect */}
                          <motion.div
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              repeatDelay: 2,
                            }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent z-20"
                          />
                        </div>

                        {/* Action Button */}
                        <button
                          className={`w-full flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 bg-opacity-10 hover:bg-opacity-20 rounded-xl transition-all duration-300 group/btn`}
                        >
                          <span className="text-gray-700 font-semibold">
                            View Details
                          </span>
                          <ExternalLink className="text-gray-600 group-hover/btn:translate-x-2 transition-transform" />
                        </button>
                      </div>
                    </div>

                    {/* Glow Effect for Active Card */}
                    {isActive && (
                      <motion.div
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className={`absolute inset-0 -z-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl blur-2xl`}
                      />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center gap-2">
          {blogs.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                resetInterval();
              }}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? "w-8 h-2 bg-gradient-to-r from-blue-600 to-purple-600"
                  : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Helper function for shape clip paths
function getShapeClipPath(shape) {
  switch (shape) {
    case "triangle":
      return "polygon(50% 0%, 0% 100%, 100% 100%)";
    case "circle":
      return "circle(50% at 50% 50%)";
    case "hexagon":
      return "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";
    case "square":
      return "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
    case "diamond":
      return "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)";
    case "star":
      return "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)";
    default:
      return "circle(50% at 50% 50%)";
  }
}
