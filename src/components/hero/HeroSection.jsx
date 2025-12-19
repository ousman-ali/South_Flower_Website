"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";

const particlePositions = [
  { left: "42.9%", top: "10.2%" },
  { left: "94.3%", top: "95.5%" },
  { left: "56.7%", top: "26.3%" },
  { left: "98.2%", top: "65.1%" },
  { left: "15.7%", top: "66.9%" },
  { left: "86.9%", top: "73.0%" },
  { left: "6.3%", top: "17.4%" },
  { left: "97.4%", top: "0.1%" },
  { left: "89.6%", top: "18.2%" },
  { left: "62.1%", top: "4.1%" },
  { left: "90.4%", top: "83.1%" },
  { left: "7.2%", top: "62.1%" },
  { left: "5.3%", top: "65.7%" },
  { left: "60.4%", top: "12.9%" },
  { left: "91.3%", top: "9.3%" },
  { left: "99.2%", top: "13.2%" },
  { left: "51.0%", top: "99.9%" },
  { left: "51.1%", top: "89.4%" },
  { left: "64.9%", top: "20.6%" },
  { left: "89.7%", top: "47.5%" },
];

export default function HeroSection({ heroSlides }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Set mounted state after component mounts on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Auto slide every 8 seconds
  useEffect(() => {
    if (!isAutoPlaying || isPaused || !isMounted) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isPaused, isMounted]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const togglePlay = () => {
    setIsPaused(!isPaused);
  };

  console.log("hero contents", heroSlides);

  // Don't render animated content until mounted
  if (!isMounted) {
    return (
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 to-black">
        {/* Simple loading state with just the first slide */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${process.env.NEXT_PUBLIC_IMAGE_URL}/${heroSlides[0].image})`,
            }}
          />
          <div
            className={`absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-500/20`}
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative z-10 h-screen flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <div className="inline-flex items-center gap-2 mb-8 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
                  <Sparkles className="w-5 h-5 text-yellow-300" />
                  <span className="text-sm font-semibold">
                    Engine is not Enough
                  </span>
                  <Star className="w-5 h-5 text-yellow-300" />
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
                  {heroSlides[0].title.slice(0, 50) + " ..."}
                </h1>
                <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-xl mb-10">
                  {heroSlides[0].description.slice(0, 100) + " ..."}
                </p>
              </div>
              <div className="space-y-6">
                <button className="w-[50%] px-8 py-5 bg-white text-gray-900 font-semibold rounded-xl shadow-2xl flex items-center justify-center gap-3">
                  <span className="text-lg">Start Your Project</span>
                  <ArrowRight className="w-6 h-6" />
                </button>
                <button className="w-[50%] px-8 py-5 bg-transparent border-2 border-white/30 text-white font-semibold rounded-xl backdrop-blur-sm">
                  Explore Our Services
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Full-width Background Images */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          {heroSlides.map(
            (slide, index) =>
              currentSlide === index && (
                <motion.div
                  key={slide.id}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url(${process.env.NEXT_PUBLIC_IMAGE_URL}/${slide.image})`,
                    }}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-500/20" />

                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-black/30" />
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>

      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Particles */}
        {particlePositions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-white/20"
            style={{
              left: pos.left,
              top: pos.top,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, (i % 3) * 10 - 10, 0], // Deterministic x movement
              scale: [1, 1.5, 1],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: (i % 10) + 10, // Deterministic duration
              repeat: Infinity,
              delay: (i % 5) * 0.5, // Deterministic delay
            }}
          />
        ))}

        {/* Large Floating Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/10 to-cyan-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-purple-500/10 to-pink-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            y: [0, 80, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Geometric Shapes */}
        <motion.div
          className="absolute top-32 left-32 w-40 h-40 border-2 border-white/20 rounded-3xl"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 40, repeat: Infinity, ease: "linear" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          }}
        />

        <motion.div
          className="absolute bottom-32 right-32 w-32 h-32 border-2 border-white/20"
          style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
          animate={{
            rotate: [0, -360],
            y: [0, -40, 0],
          }}
          transition={{
            rotate: { duration: 50, repeat: Infinity, ease: "linear" },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-screen flex items-center justify-center ml-10">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <AnimatePresence mode="wait">
              {heroSlides.map(
                (slide, index) =>
                  currentSlide === index && (
                    <motion.div
                      key={slide.id}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="text-white"
                    >
                      {/* Badge */}
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          type: "spring",
                          duration: 0.8,
                          delay: 0.3,
                        }}
                        className="inline-flex items-center gap-2 mb-8 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
                      >
                        <Sparkles className="w-5 h-5 text-yellow-300" />
                        <span className="text-sm font-semibold">
                          Engine is Not Enough
                        </span>
                        <Star className="w-5 h-5 text-yellow-300" />
                      </motion.div>

                      {/* Title */}
                      <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-6">
                        {slide.title.split(" ").map((word, wordIndex) => (
                          <motion.span
                            key={wordIndex}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.5,
                              delay: 0.4 + wordIndex * 0.1,
                            }}
                            className="inline-block mr-4"
                          >
                            {word}
                          </motion.span>
                        ))}
                      </h1>

                      {/* Description */}
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-xl mb-10"
                      >
                        {slide.description}
                      </motion.p>
                    </motion.div>
                  )
              )}
            </AnimatePresence>

            {/* Right Side - CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="space-y-6"
            >
              {/* Main CTA Button */}
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(255, 255, 255, 0.2)",
                }}
                whileTap={{ scale: 0.95 }}
                className="w-[50%] px-8 py-5 bg-white text-gray-900 font-semibold rounded-xl shadow-2xl flex items-center justify-center gap-3 group hover:shadow-3xl transition-all"
              >
                <span className="text-lg">Start Your Project</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-6 h-6" />
                </motion.span>
              </motion.button>

              {/* Secondary CTA Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-[50%] px-8 py-5 bg-transparent border-2 border-white/30 text-white font-semibold rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all"
              >
                Explore Our Services
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="flex items-center gap-8">
          {/* Previous Button */}
          <motion.button
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </motion.button>

          {/* Slide Indicators */}
          <div className="flex gap-3">
            {heroSlides.map((_, idx) => (
              <motion.button
                key={idx}
                onClick={() => goToSlide(idx)}
                className="relative group"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <div
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentSlide === idx
                      ? "bg-white"
                      : "bg-white/40 group-hover:bg-white/60"
                  }`}
                />
                {currentSlide === idx && (
                  <motion.div
                    layoutId="heroIndicator"
                    className="absolute inset-0 -m-2 border-2 border-white/30 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Next Button */}
          <motion.button
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </motion.button>
        </div>
      </div>

      {/* Stunning Footer Shape */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        {/* Main Wave Shape */}
        <svg
          className="w-full h-32 md:h-48"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop
                offset="0%"
                style={{ stopColor: "#3b82f6", stopOpacity: 1 }}
              />
              <stop
                offset="50%"
                style={{ stopColor: "#8b5cf6", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#ec4899", stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>

          <motion.path
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,192C672,181,768,139,864,122.7C960,107,1056,117,1152,138.7C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            fill="url(#waveGradient)"
            animate={{
              d: [
                "M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,192C672,181,768,139,864,122.7C960,107,1056,117,1152,138.7C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                "M0,256L48,250.7C96,245,192,235,288,224C384,213,480,203,576,192C672,181,768,171,864,154.7C960,139,1056,117,1152,122.7C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                "M0,192L48,176C96,160,192,128,288,133.3C384,139,480,181,576,192C672,203,768,181,864,165.3C960,149,1056,139,1152,154.7C1248,171,1344,213,1392,234.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
              ],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>

        {/* Floating Orbs Above Wave */}
        <motion.div
          className="absolute -top-6 left-1/4 w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full blur-sm"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -top-4 left-1/2 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-400 rounded-full blur-sm"
          animate={{
            y: [0, -15, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
        <motion.div
          className="absolute -top-8 right-1/4 w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-400 rounded-full blur-sm"
          animate={{
            y: [0, -25, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 z-20 bg-white/10">
        <motion.div
          key={currentSlide}
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 8, ease: "linear" }}
        />
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-32 right-8 z-20 hidden md:block"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-white/80">Scroll</span>
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-white/60 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
