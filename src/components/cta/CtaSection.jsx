"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Flower, Leaf } from "lucide-react";
import Link from "next/link";

export default function CTACard({ stats }) {
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  // Simplified animated nature shapes
  const floatingShapes = [
    {
      id: 1,
      size: 40,
      x: "10%",
      y: "20%",
      duration: 25,
      icon: <Flower className="w-4 h-4 text-blue-300/50" />,
    },
    {
      id: 2,
      size: 30,
      x: "85%",
      y: "75%",
      duration: 30,
      icon: <Leaf className="w-3 h-3 text-blue-300/50" />,
    },
    {
      id: 3,
      size: 35,
      x: "15%",
      y: "80%",
      duration: 28,
      icon: <Flower className="w-3 h-3 text-blue-300/50" />,
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
    <section className="relative min-h-[400px] md:min-h-[450px] overflow-hidden bg-gray-900">
      {/* Background Image - Taller for space */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center bg-no-repeat"
          style={{
            filter: "brightness(0.6) contrast(1.1)",
          }}
        />
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 via-transparent to-gray-900/30" />
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
              y: [0, -10, 0],
              x: [0, shape.id % 2 === 0 ? 5 : -3, 0],
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

      {/* Main Content Container - Responsive padding for all screens */}
      <div className="relative z-10 h-full flex flex-col justify-center">
        {/* Responsive top spacing */}
        <div className="h-8 md:h-12 lg:h-16" />

        {/* Card Container */}
        <div className="flex-1 flex items-center justify-center px-4 md:px-6">
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
                  <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-blue-400/20 to-blue-400/15 backdrop-blur-sm border border-blue-400/30">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Sparkles className="w-4 h-4 text-blue-400" />
                    </motion.div>
                    <span className="text-sm font-semibold text-blue-100">
                      Professional Vehicle Care
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-3 md:mb-4 leading-tight drop-shadow-lg">
                    <span className="block">
                      Keep Your Vehicle{" "}
                      <span className="bg-gradient-to-r from-blue-300 via-blue-300 to-blue-300 bg-clip-text text-transparent drop-shadow-lg">
                        Running at Its Best
                      </span>
                    </span>
                    <span className="text-lg md:text-xl font-semibold text-blue-50">
                      Book Your Trusted Auto Repair Service Today
                    </span>
                  </h2>

                  {/* Description */}
                  <p className="text-blue-100/90 text-sm md:text-base max-w-xl drop-shadow">
                    Transform your space with premium flora and expert
                    horticultural services. Our team is ready to bring your
                    vision to life.
                  </p>

                  {/* Trust Badges */}
                  <div className="flex flex-wrap gap-3 md:gap-6 mt-4 md:mt-6">
                    {stats?.map((s) => (
                      <div
                        key={s.id}
                        className="flex items-center gap-2 backdrop-blur-sm bg-white/5 px-3 py-2 rounded-lg border border-white/10"
                      >
                        <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                        <span className="text-xs md:text-sm text-blue-50 font-medium">
                          {s.value} {s.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Side: CTA Button */}
                <div className="lg:w-2/5 flex justify-center lg:justify-end">
                  <Link
                    href="/contact"
                    onHoverStart={() => setIsButtonHovered(true)}
                    onHoverEnd={() => setIsButtonHovered(false)}
                    whilehover={{
                      scale: 1.05,
                      boxShadow: "0 15px 35px rgba(16, 185, 129, 0.4)",
                    }}
                    whiletap={{ scale: 0.98 }}
                    className="relative px-6 md:px-8 py-4 md:py-5 bg-gradient-to-r from-blue-300 to-cyan-500 text-white rounded-xl font-bold text-base md:text-lg shadow-lg overflow-hidden group min-w-[180px] md:min-w-[200px] border border-blue-400/30"
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
                      ></motion.div>
                      Get Quote
                      <motion.div
                        animate={{ x: isButtonHovered ? 5 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                      </motion.div>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Responsive bottom spacing */}
        <div className="h-8 md:h-12 lg:h-16" />
      </div>
    </section>
  );
}
