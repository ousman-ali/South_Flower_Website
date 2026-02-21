"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

export default function TestimonialSection({ testimonials }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handlePrevious = () => {
    setDirection(-1);
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: isMobile ? 0 : direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      x: isMobile ? 0 : direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
  };

  const fadeVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <section className="relative py-10 md:py-10 lg:py-10 overflow-hidden bg-gradient-to-b from-black/95 via-black/90 to-black/95">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)]" />

      <motion.div
        animate={{
          y: [0, 30, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-4 lg:left-10 w-48 h-48 md:w-64 md:h-64 lg:w-96 lg:h-96 bg-gradient-to-br from-blue-500/10 to-cyan-400/10 rounded-full blur-3xl"
      />

      <motion.div
        animate={{
          y: [0, -40, 0],
          x: [0, -15, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/4 right-4 lg:right-10 w-48 h-48 md:w-64 md:h-64 lg:w-96 lg:h-96 bg-gradient-to-br from-gray-500/10 to-pink-400/10 rounded-full blur-3xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16 lg:mb-20"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 mb-4 md:mb-6 px-4 py-2 md:px-6 md:py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-gray-500/10 border border-white/10 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
            <span className="text-xs md:text-sm font-semibold bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent">
              What Our Customers Say
            </span>
            <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-bold mb-4 md:mb-6 text-amber-50"
          >
            Voices of{" "}
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              Our Clients
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-gray-400 text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed px-4 text-justify"
          >
            Hear from companies and partners who trust South Flower General
            Trading PLC to deliver high-quality truck bodies, fuel tankers,
            trailers, and industrial transport solutions
          </motion.p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto px-2">
          <motion.button
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 lg:-translate-x-12 z-20 w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full shadow-2xl flex items-center justify-center hover:shadow-blue-500/30 transition-all"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 lg:translate-x-12 z-20 w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full shadow-2xl flex items-center justify-center hover:shadow-gray-500/30 transition-all"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-white" />
          </motion.button>

          <div className="relative h-[350px] md:h-[300px]">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.3 },
                }}
                className="absolute inset-0 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-6 md:gap-8 lg:gap-12"
              >
                <div className="lg:w-2/5 relative w-full max-w-sm md:max-w-md mx-auto">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative"
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, 0, -5, 0],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className={`absolute -inset-4 md:-inset-6 lg:-inset-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full blur-3xl opacity-20`}
                    />

                    <div className="relative">
                      <motion.img
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${testimonials[activeIndex].image}`}
                        alt={testimonials[activeIndex].name}
                        className="relative w-48 h-38 sm:w-56 sm:h-46 md:w-64 md:h-54 lg:w-72 lg:h-62 xl:w-80 xl:h-80 object-cover rounded-2xl sm:rounded-3xl border-4 border-white/20 shadow-2xl mx-auto"
                        initial={{ scale: 0.9, rotate: -5 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                      />

                      <motion.div
                        animate={{
                          y: [0, -10, 0],
                          rotate: [0, 360],
                        }}
                        transition={{
                          y: {
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                          },
                          rotate: {
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                          },
                        }}
                        className={`absolute -top-4 -right-4 sm:-top-5 sm:-right-5 md:-top-6 md:-right-6 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-2xl`}
                      >
                        <Quote className="w-full h-full text-white" />
                      </motion.div>

                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        className="absolute -bottom-4 left-1/2 -translate-x-1/2 sm:left-8 sm:translate-x-0 bg-transparent px-3 py-1.5 sm:px-4 sm:py-2 rounded-full flex items-center gap-2"
                      >
                        <div className="flex items-center gap-1">
                          {[
                            ...Array(Number(testimonials[activeIndex].rating)),
                          ].map((_, i) => (
                            <Star
                              key={i}
                              fill="currentColor"
                              stroke="none"
                              className="h-8 w-8 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.8)]"
                            />
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>

                <div className="lg:w-3/5 w-full px-2 sm:px-4 md:px-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      variants={fadeVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="space-y-4 md:space-y-6 lg:space-y-8"
                    >
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed italic text-center lg:text-left px-2 sm:px-0"
                      >
                        "{testimonials[activeIndex].description}"
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="space-y-4 mt-6 md:mt-8 lg:mt-12"
                      >
                        <div className="text-center lg:text-left">
                          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                            {testimonials[activeIndex].title_prefix}
                            {". "}
                            {testimonials[activeIndex].name}
                          </h3>
                          <p className="text-gray-400 text-sm sm:text-base md:text-lg">
                            {testimonials[activeIndex].role}
                          </p>
                        </div>
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-3 md:gap-4 mt-8 md:mt-12 lg:mt-16">
            {testimonials.map((_, idx) => (
              <motion.button
                key={idx}
                onClick={() => {
                  setDirection(idx > activeIndex ? 1 : -1);
                  setActiveIndex(idx);
                }}
                className="relative group"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <div
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all ${
                    activeIndex === idx
                      ? `bg-gradient-to-r from-blue-500 to-cyan-400`
                      : "bg-gray-700 group-hover:bg-gray-600"
                  }`}
                />
                {activeIndex === idx && (
                  <motion.div
                    layoutId="activeDot"
                    className="absolute inset-0 -m-2 border-2 border-white/20 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
