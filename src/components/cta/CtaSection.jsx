"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Flower, Leaf } from "lucide-react";

export default function CTACard() {
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  // Simplified animated nature shapes
  const floatingShapes = [
    {
      id: 1,
      size: 40,
      x: "10%",
      y: "20%",
      duration: 25,
      icon: <Flower className="w-4 h-4 text-emerald-300/50" />,
    },
    {
      id: 2,
      size: 30,
      x: "85%",
      y: "75%",
      duration: 30,
      icon: <Leaf className="w-3 h-3 text-green-300/50" />,
    },
    {
      id: 3,
      size: 35,
      x: "15%",
      y: "80%",
      duration: 28,
      icon: <Flower className="w-3 h-3 text-teal-300/50" />,
    },
    {
      id: 4,
      size: 25,
      x: "90%",
      y: "25%",
      duration: 22,
      icon: <Leaf className="w-3 h-3 text-lime-300/50" />,
    },
  ];

  return (
    <section className="relative h-[400px] md:h-[450px] overflow-hidden bg-gray-900">
      {/* Background Image - Fully Visible */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center bg-no-repeat"
          style={{
            filter: "brightness(0.6) contrast(1.1)",
          }}
        />
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-gray-900/10 to-transparent" />
      </div>

      {/* Animated floating shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingShapes.map((shape) => (
          <motion.div
            key={shape.id}
            className="absolute flex items-center justify-center rounded-full"
            style={{
              width: shape.size,
              height: shape.size,
              left: shape.x,
              top: shape.y,
              background:
                "radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)",
              backdropFilter: "blur(2px)",
            }}
            animate={{
              y: [0, -15, 0],
              x: [0, shape.id % 2 === 0 ? 8 : -5, 0],
            }}
            transition={{
              duration: shape.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: shape.id * 0.3,
            }}
          >
            {shape.icon}
          </motion.div>
        ))}
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 h-full flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-6xl">
          {/* Partially Transparent Card */}
          <div className="relative bg-gradient-to-br from-white/20 via-white/15 to-white/20 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-white/30 shadow-2xl">
            {/* Semi-transparent overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/3 to-white/5 rounded-2xl" />

            {/* Content Layout: Title Left, Button Right */}
            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8">
              {/* Left Side: Title and Description */}
              <div className="lg:w-3/5">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-400/20 to-green-400/15 backdrop-blur-sm border border-emerald-400/30">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Sparkles className="w-4 h-4 text-emerald-300" />
                  </motion.div>
                  <span className="text-sm font-semibold text-emerald-100">
                    South Flower Excellence
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-3 md:mb-4 leading-tight drop-shadow-lg">
                  <span className="block">
                    Let's Grow Your{" "}
                    <span className="bg-gradient-to-r from-emerald-300 via-green-300 to-teal-300 bg-clip-text text-transparent drop-shadow-lg">
                      Green Vision
                    </span>
                  </span>
                  <span className="text-lg md:text-xl font-semibold text-emerald-50">
                    Partner with South Flower Today
                  </span>
                </h2>

                {/* Description */}
                <p className="text-emerald-100/90 text-sm md:text-base max-w-xl drop-shadow">
                  Transform your space with premium flora and expert
                  horticultural services. Our team is ready to bring your vision
                  to life.
                </p>

                {/* Trust Badges */}
                <div className="flex flex-wrap gap-3 md:gap-6 mt-4 md:mt-6">
                  <div className="flex items-center gap-2 backdrop-blur-sm bg-white/5 px-3 py-2 rounded-lg border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs md:text-sm text-emerald-50 font-medium">
                      1000+ Projects
                    </span>
                  </div>
                  <div className="flex items-center gap-2 backdrop-blur-sm bg-white/5 px-3 py-2 rounded-lg border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs md:text-sm text-emerald-50 font-medium">
                      98% Satisfaction
                    </span>
                  </div>
                  <div className="flex items-center gap-2 backdrop-blur-sm bg-white/5 px-3 py-2 rounded-lg border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                    <span className="text-xs md:text-sm text-emerald-50 font-medium">
                      15+ Years Experience
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Side: CTA Button */}
              <div className="lg:w-2/5 flex justify-center lg:justify-end">
                <motion.button
                  onHoverStart={() => setIsButtonHovered(true)}
                  onHoverEnd={() => setIsButtonHovered(false)}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 15px 35px rgba(16, 185, 129, 0.4)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="relative px-6 md:px-8 py-4 md:py-5 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white rounded-xl font-bold text-base md:text-lg shadow-lg overflow-hidden group min-w-[180px] md:min-w-[200px] border border-emerald-400/30"
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                    animate={{
                      x: isButtonHovered ? ["-100%", "100%"] : "-100%",
                    }}
                    transition={{
                      duration: 1,
                      repeat: isButtonHovered ? Infinity : 0,
                    }}
                  />

                  {/* Button content */}
                  <span className="relative flex items-center justify-center gap-2 md:gap-3">
                    <motion.div
                      animate={{ rotate: isButtonHovered ? 90 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Flower className="w-4 h-4 md:w-5 md:h-5" />
                    </motion.div>
                    <span>Start Now</span>
                    <motion.div
                      animate={{ x: isButtonHovered ? 5 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                    </motion.div>
                  </span>
                </motion.button>
              </div>
            </div>

            {/* Contact Info - Bottom Row */}
            <div className="relative mt-6 md:mt-8 pt-6 md:pt-8 border-t border-emerald-500/20">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center backdrop-blur-sm bg-white/5 p-3 rounded-xl border border-white/10">
                  <div className="inline-flex items-center gap-2 justify-center">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs text-emerald-100">
                      Fast Response
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-white">
                    Within 2 Hours
                  </p>
                </div>
                <div className="text-center backdrop-blur-sm bg-white/5 p-3 rounded-xl border border-white/10">
                  <div className="inline-flex items-center gap-2 justify-center">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs text-emerald-100">
                      Expert Team
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-white">
                    15+ Professionals
                  </p>
                </div>
                <div className="text-center backdrop-blur-sm bg-white/5 p-3 rounded-xl border border-white/10">
                  <div className="inline-flex items-center gap-2 justify-center">
                    <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                    <span className="text-xs text-emerald-100">
                      Free Consultation
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-white">
                    No Commitment
                  </p>
                </div>
                <div className="text-center backdrop-blur-sm bg-white/5 p-3 rounded-xl border border-white/10">
                  <div className="inline-flex items-center gap-2 justify-center">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-xs text-emerald-100">
                      24/7 Support
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-white">
                    Always Available
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
