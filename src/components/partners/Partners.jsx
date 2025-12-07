"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Zap, ChevronLeft, ChevronRight } from "lucide-react";

export default function PartnersSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(null);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const partners = [
    {
      id: 1,
      name: "Microsoft",
      logo: "https://images.unsplash.com/photo-1634942537034-2531766767d1?auto=format&fit=crop&w=400&h=300&q=80",
    },
    {
      id: 2,
      name: "Apple",
      logo: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=400&h=300&q=80",
    },
    {
      id: 3,
      name: "Google",
      logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&w=400&h=300&q=80",
    },
    {
      id: 4,
      name: "Amazon",
      logo: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&w=400&h=300&q=80",
    },
    {
      id: 5,
      name: "Tesla",
      logo: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=400&h=300&q=80",
    },
    {
      id: 6,
      name: "Adobe",
      logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=400&h=300&q=80",
    },
    {
      id: 7,
      name: "Salesforce",
      logo: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&h=300&q=80",
    },
    {
      id: 8,
      name: "IBM",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=400&h=300&q=80",
    },
    {
      id: 9,
      name: "Intel",
      logo: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=400&h=300&q=80",
    },
    {
      id: 10,
      name: "Samsung",
      logo: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=400&h=300&q=80",
    },
    {
      id: 11,
      name: "Spotify",
      logo: "https://images.unsplash.com/photo-1611605698335-8b1569810432?auto=format&fit=crop&w=400&h=300&q=80",
    },
    {
      id: 12,
      name: "Netflix",
      logo: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=400&h=300&q=80",
    },
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Get current visible partners (1 on mobile, 4 on desktop)
  const getVisiblePartners = () => {
    const visibleCount = isMobile ? 1 : 4;
    const visible = [];

    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % partners.length;
      visible.push({ ...partners[index], position: i });
    }
    return visible;
  };

  // Auto slide one position every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        setDirection(1);
        setCurrentIndex(
          (prev) => (prev + (isMobile ? 1 : 1)) % partners.length
        );
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 500);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [partners.length, isAnimating, isMobile]);

  const handlePrevious = () => {
    if (!isAnimating) {
      setDirection(-1);
      setCurrentIndex((prev) => (prev - 1 + partners.length) % partners.length);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const handleNext = () => {
    if (!isAnimating) {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % partners.length);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  // Floating background shapes
  const floatingShapes = [
    { id: 1, size: 100, x: "5%", y: "10%", duration: 25 },
    { id: 2, size: 70, x: "90%", y: "80%", duration: 30 },
    { id: 3, size: 80, x: "15%", y: "85%", duration: 22 },
    { id: 4, size: 60, x: "85%", y: "20%", duration: 28 },
    { id: 5, size: 90, x: "70%", y: "15%", duration: 26 },
  ];

  return (
    <section className="relative py-12 md:py-20 overflow-hidden bg-gradient-to-b from-white to-gray-50">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingShapes.map((shape) => (
          <motion.div
            key={shape.id}
            className="absolute rounded-full bg-gradient-to-br from-blue-100/20 to-purple-100/10"
            style={{
              width: shape.size,
              height: shape.size,
              left: shape.x,
              top: shape.y,
            }}
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: shape.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        <motion.div
          className="absolute top-1/4 left-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-gradient-to-br from-blue-100/10 to-purple-100/5 rounded-full"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[200px] h-[200px] md:w-[400px] md:h-[400px] bg-gradient-to-br from-amber-100/10 to-pink-100/5 rounded-full"
          animate={{
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-flex items-center gap-2 mb-4 md:mb-6 px-4 py-2 md:px-5 md:py-2.5 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg">
            <Star className="w-4 h-4 md:w-5 md:h-5 text-amber-500" />
            <span className="text-xs md:text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Trusted Partners
            </span>
            <Zap className="w-4 h-4 md:w-5 md:h-5 text-purple-500" />
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
            Our Global{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Network
            </span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
            Collaborating with industry leaders to deliver exceptional results
            worldwide
          </p>
        </div>

        {/* Partners Slider */}
        <div className="relative">
          {/* Navigation Buttons - Mobile: closer, Desktop: farther */}
          <button
            onClick={handlePrevious}
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 lg:-translate-x-12 z-20 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-white/90 backdrop-blur-sm border border-gray-300 rounded-full shadow-xl flex items-center justify-center hover:shadow-2xl transition-all hover:bg-white hover:scale-110"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 lg:translate-x-12 z-20 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-white/90 backdrop-blur-sm border border-gray-300 rounded-full shadow-xl flex items-center justify-center hover:shadow-2xl transition-all hover:bg-white hover:scale-110"
          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
          </button>

          {/* Slider Container */}
          <div className="px-10 md:px-16 overflow-hidden">
            <div
              className={`flex ${
                isMobile ? "justify-center" : "grid grid-cols-2 md:grid-cols-4"
              } gap-4 md:gap-6 relative`}
            >
              {getVisiblePartners().map((partner) => (
                <motion.div
                  key={`${partner.id}-${partner.position}`}
                  initial={{
                    x: isMobile
                      ? direction > 0
                        ? 300
                        : direction < 0
                        ? -300
                        : 0
                      : direction > 0
                      ? partner.position === (isMobile ? 0 : 3)
                        ? 400
                        : 0
                      : direction < 0
                      ? partner.position === 0
                        ? -400
                        : 0
                      : 0,
                    opacity: isMobile
                      ? direction !== 0
                        ? 0
                        : 1
                      : direction > 0
                      ? partner.position === (isMobile ? 0 : 3)
                        ? 0
                        : 1
                      : direction < 0
                      ? partner.position === 0
                        ? 0
                        : 1
                      : 1,
                  }}
                  animate={{
                    x: 0,
                    opacity: 1,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                  }}
                  onMouseEnter={() => !isMobile && setIsHovered(partner.id)}
                  onMouseLeave={() => !isMobile && setIsHovered(null)}
                  className={`relative group ${
                    isMobile ? "w-full max-w-sm" : ""
                  }`}
                >
                  {/* Card */}
                  <div className="relative bg-white rounded-xl md:rounded-2xl shadow-lg md:shadow-xl overflow-hidden border border-gray-200 transition-all duration-300 group-hover:shadow-2xl group-hover:border-gray-300">
                    {/* Image Container */}
                    <div className="relative h-40 sm:h-48 md:h-44 overflow-hidden">
                      {/* Image */}
                      <div
                        className="absolute inset-0 bg-gray-100 transition-transform duration-500 group-hover:scale-110"
                        style={{
                          backgroundImage: `url(${partner.logo})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />

                      {/* Gradient overlay on hover */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 ${
                          isMobile || isHovered === partner.id
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      />

                      {/* Partner Name - Shows on hover (or always on mobile) */}
                      <div
                        className={`absolute bottom-0 left-0 right-0 p-4 md:p-6 transition-all duration-300 ${
                          isMobile || isHovered === partner.id
                            ? "translate-y-0 opacity-100"
                            : "translate-y-4 opacity-0"
                        }`}
                      >
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white text-center">
                          {partner.name}
                        </h3>
                      </div>
                    </div>

                    {/* Subtle indicator */}
                    <div
                      className={`absolute -top-2 -right-2 w-3 h-3 md:w-4 md:h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ${
                        isMobile || isHovered === partner.id
                          ? "scale-125"
                          : "scale-100"
                      }`}
                    />
                  </div>

                  {/* Glow effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl md:rounded-2xl blur-xl transition-opacity duration-300 ${
                      isMobile || isHovered === partner.id
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Partner Dots - Show fewer on mobile */}
          <div className="flex justify-center gap-1.5 md:gap-2 mt-8 md:mt-12 overflow-x-auto pb-2 px-4">
            {partners.map((_, idx) => {
              // Show only every 2nd dot on mobile to avoid overflow
              if (isMobile && idx % 2 !== 0 && idx !== currentIndex)
                return null;

              return (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className={`flex-shrink-0 transition-all duration-300 ${
                    currentIndex === idx
                      ? `w-4 sm:w-6 h-2 md:h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500`
                      : "w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to partner ${idx + 1}`}
                />
              );
            })}
          </div>

          {/* Mobile indicator text */}
          <div className="text-center mt-4 md:hidden">
            <p className="text-sm text-gray-500">
              {currentIndex + 1} of {partners.length}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
