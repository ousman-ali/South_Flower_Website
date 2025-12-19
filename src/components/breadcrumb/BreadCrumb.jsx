"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, Sparkles, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Breadcrumb = ({ pageTitle, currentPage, backgroundImage }) => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  // Trigger entrance animation
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative h-[55vh] min-h-[400px] max-h-[550px] overflow-hidden">
      {/* Static Background Image */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${
              backgroundImage ||
              "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2000&q=80"
            })`,
            backgroundPosition: "center center",
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-purple-900/60 to-pink-900/50" />
      </div>

      {/* Main Content Container - FIXED ALIGNMENT */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        {/* Page Title - Perfectly Centered */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full max-w-4xl text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
            {pageTitle}
          </h1>
          {currentPage && (
            <p className="text-xl text-white/80 mt-2">{currentPage}</p>
          )}
        </motion.div>

        {/* Breadcrumb Navigation - Side by Side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center gap-4"
        >
          {/* Home Button */}
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group"
          >
            <Link
              href="/"
              className="flex items-center gap-3 px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl hover:bg-white/30 transition-all duration-300"
            >
              <Home className="w-5 h-5 text-white" />
              <span className="text-lg font-medium text-white">Home</span>
            </Link>
          </motion.div>

          {/* Separator */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 0.7 }}
            className="flex items-center"
          >
            <ArrowRight className="w-5 h-5 text-white/50" />
          </motion.div>

          {/* Current Page */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/30 to-purple-500/30 backdrop-blur-sm border border-white/40 rounded-xl"
          >
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <span className="text-lg font-medium text-white">
              {currentPage || pageTitle}
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Super Fancy Animated Top Shape */}
      <div className="absolute top-0 left-0 right-0 z-20">
        <svg
          className="w-full h-48"
          viewBox="0 0 1440 200"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Complex Gradient */}
            <linearGradient
              id="complexGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
              <stop offset="25%" stopColor="#8b5cf6" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#ec4899" stopOpacity="0.8" />
              <stop offset="75%" stopColor="#f59e0b" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
            </linearGradient>

            {/* Metallic Gradient */}
            <linearGradient
              id="metallicGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#e5e7eb" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.4" />
            </linearGradient>

            {/* Glow Effects */}
            <filter id="glow1" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="10" result="blur1" />
              <feMerge>
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="glow2" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="15" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Pattern for detail */}
            <pattern
              id="diamondPattern"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <rect width="20" height="20" fill="white" fillOpacity="0.1" />
            </pattern>
          </defs>

          {/* Base layer with complex animation */}
          <motion.path
            fill="url(#complexGradient)"
            filter="url(#glow2)"
            initial={{
              d: "M0,0 C300,50 600,30 900,70 C1200,110 1440,0 1440,0 L0,0 Z",
              opacity: 0.9,
            }}
            animate={{
              d: [
                "M0,0 C300,50 600,30 900,70 C1200,110 1440,0 1440,0 L0,0 Z",
                "M0,0 C300,30 600,70 900,40 C1200,10 1440,50 1440,50 L0,0 Z",
                "M0,0 C300,70 600,10 900,60 C1200,110 1440,30 1440,30 L0,0 Z",
                "M0,0 C300,10 600,60 900,30 C1200,0 1440,70 1440,70 L0,0 Z",
              ],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Metallic layer */}
          <motion.path
            fill="url(#metallicGradient)"
            filter="url(#glow1)"
            initial={{
              d: "M0,40 C200,20 400,60 600,40 C800,20 1000,60 1200,40 C1400,20 1440,40 1440,40 L0,40 Z",
              opacity: 0.6,
            }}
            animate={{
              d: [
                "M0,40 C200,20 400,60 600,40 C800,20 1000,60 1200,40 C1400,20 1440,40 1440,40 L0,40 Z",
                "M0,20 C200,40 400,20 600,30 C800,40 1000,20 1200,30 C1400,40 1440,20 1440,20 L0,20 Z",
                "M0,30 C200,10 400,50 600,20 C800,50 1000,10 1200,20 C1400,50 1440,30 1440,30 L0,30 Z",
              ],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />

          {/* Pattern overlay */}
          <motion.path
            fill="url(#diamondPattern)"
            d="M0,0 C300,50 600,30 900,70 C1200,110 1440,0 1440,0 L0,0 Z"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Animated sparkle lines */}
          <motion.path
            d="M0,30 L1440,30"
            stroke="white"
            strokeWidth="1"
            strokeOpacity="0.3"
            strokeDasharray="5,5"
            animate={{
              strokeDashoffset: [0, 20],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <motion.path
            d="M0,60 L1440,60"
            stroke="white"
            strokeWidth="1"
            strokeOpacity="0.3"
            strokeDasharray="5,5"
            animate={{
              strokeDashoffset: [10, 30],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
              delay: 0.5,
            }}
          />
        </svg>

        {/* Floating elements above the shape */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`float-${i}`}
            className="absolute"
            style={{
              left: `${10 + i * 12}%`,
              top: "20px",
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          >
            <div
              className="w-4 h-4 opacity-80"
              style={{
                clipPath:
                  i % 2 === 0
                    ? "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"
                    : "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
              }}
            >
              <div className="w-full h-full bg-gradient-to-br from-cyan-300 to-purple-300" />
            </div>
          </motion.div>
        ))}

        {/* Glowing orbs */}
        <motion.div
          className="absolute top-6 left-1/4 w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute top-8 right-1/4 w-5 h-5 bg-gradient-to-r from-purple-400 to-pink-300 rounded-full"
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      {/* Floating particles in the middle - FIXED HYDRATION ERROR */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full bg-white/40"
            style={{
              left: `${5 + i * 4.7}%`, // Evenly spaced horizontally
              top: `${35 + ((i * 1.7) % 40)}%`, // Evenly spaced vertically
            }}
            animate={{
              y: [0, -15, 0],
              x: [0, (i % 3) * 5 - 5, 0], // Deterministic x movement
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 5 + (i % 4), // Deterministic duration
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* Subtle bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/40 to-transparent" />
    </div>
  );
};

export default Breadcrumb;
