"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Quote,
  Star,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Award,
  Heart,
  Zap,
} from "lucide-react";

export default function TestimonialSection() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "CEO, Bloom Enterprises",
      company: "Bloom Enterprises",
      image:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
      rating: 5,
      message:
        "South Flower delivered outstanding quality. Their professionalism, attention to detail, and innovative solutions exceeded our expectations. The team's dedication to excellence is truly remarkable.",
      stats: { projects: 15, satisfaction: 98 },
      color: "from-blue-500 to-cyan-400",
      icon: <Award className="w-5 h-5" />,
    },
    {
      id: 2,
      name: "Michael Adams",
      role: "Operations Manager, GreenLeaf Co.",
      company: "GreenLeaf Co.",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
      rating: 5,
      message:
        "A highly trusted partner. The team brought our vision to life with dedication and exceptional skill. Their ability to understand complex requirements and deliver beyond expectations is impressive.",
      stats: { projects: 8, satisfaction: 95 },
      color: "from-emerald-500 to-green-400",
      icon: <Zap className="w-5 h-5" />,
    },
    {
      id: 3,
      name: "Sophia Martinez",
      role: "Marketing Director, Lux Botanics",
      company: "Lux Botanics",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
      rating: 5,
      message:
        "Working with South Flower was an absolute pleasure. Their commitment to quality and service is unmatched. They transformed our brand identity with creativity and precision.",
      stats: { projects: 12, satisfaction: 99 },
      color: "from-purple-500 to-pink-400",
      icon: <Heart className="w-5 h-5" />,
    },
    {
      id: 4,
      name: "David Chen",
      role: "Founder, Nature's Essence",
      company: "Nature's Essence",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      rating: 5,
      message:
        "The results speak for themselves. South Flower's expertise elevated our product line to premium status. Their innovative approach and attention to detail set them apart in the industry.",
      stats: { projects: 20, satisfaction: 97 },
      color: "from-amber-500 to-orange-400",
      icon: <Sparkles className="w-5 h-5" />,
    },
    {
      id: 5,
      name: "Emma Wilson",
      role: "Creative Director, Botanic Arts",
      company: "Botanic Arts",
      image:
        "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=800&q=80",
      rating: 5,
      message:
        "Exceptional service from start to finish. South Flower understands the essence of botanical beauty and translates it into stunning visual experiences. Highly recommended!",
      stats: { projects: 10, satisfaction: 96 },
      color: "from-rose-500 to-red-400",
      icon: <Star className="w-5 h-5" />,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handlePrevious = () => {
    setDirection(-1);
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
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
    <section className="relative py-32 overflow-hidden bg-gradient-to-b from-black/95 via-black/90 to-black/95">
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
        className="absolute top-1/4 left-10 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-cyan-400/10 rounded-full blur-3xl"
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
        className="absolute bottom-1/4 right-10 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-pink-400/10 rounded-full blur-3xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 mb-6 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10 backdrop-blur-sm"
          >
            <Sparkles className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Client Testimonials
            </span>
            <Sparkles className="w-5 h-5 text-purple-400" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6 text-amber-50"
          >
            Voices of{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Excellence
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-gray-400 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
          >
            Discover why industry leaders trust South Flower for their premium
            botanical needs
          </motion.p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          <motion.button
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-20 w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full shadow-2xl flex items-center justify-center hover:shadow-blue-500/30 transition-all"
          >
            <ChevronLeft className="w-7 h-7 text-white" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-20 w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-400 rounded-full shadow-2xl flex items-center justify-center hover:shadow-purple-500/30 transition-all"
          >
            <ChevronRight className="w-7 h-7 text-white" />
          </motion.button>

          <div className="relative h-[500px]">
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
                className="absolute inset-0 flex flex-col lg:flex-row items-center justify-between gap-12"
              >
                <div className="lg:w-2/5 relative">
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
                      className={`absolute -inset-8 bg-gradient-to-br ${testimonials[activeIndex].color} rounded-full blur-3xl opacity-20`}
                    />

                    <div className="relative">
                      <motion.img
                        src={testimonials[activeIndex].image}
                        alt={testimonials[activeIndex].name}
                        className="relative w-64 h-64 lg:w-80 lg:h-80 object-cover rounded-3xl border-4 border-white/20 shadow-2xl"
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
                        className={`absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br ${testimonials[activeIndex].color} rounded-2xl p-4 shadow-2xl`}
                      >
                        <Quote className="w-full h-full text-white" />
                      </motion.div>

                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                        className="absolute -bottom-6 left-8 bg-gradient-to-r from-amber-500 to-orange-400 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-xl"
                      >
                        <Star className="w-5 h-5 fill-white" />
                        <span className="font-bold">
                          {testimonials[activeIndex].rating}.0
                        </span>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>

                <div className="lg:w-3/5">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      variants={fadeVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="space-y-8"
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.5, type: "spring" }}
                        className="text-6xl text-blue-400/30"
                      >
                        "
                      </motion.div>

                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-2xl lg:text-3xl text-gray-200 leading-relaxed italic"
                      >
                        "{testimonials[activeIndex].message}"
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="space-y-4 mt-12"
                      >
                        <div>
                          <h3 className="text-3xl font-bold text-white">
                            {testimonials[activeIndex].name}
                          </h3>
                          <p className="text-gray-400 text-lg">
                            {testimonials[activeIndex].role}
                          </p>
                        </div>

                        <div className="flex items-center gap-8 pt-6 border-t border-white/10">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.4 }}
                            className="flex items-center gap-3"
                          >
                            <div
                              className={`p-3 bg-gradient-to-br ${testimonials[activeIndex].color} rounded-xl`}
                            >
                              {testimonials[activeIndex].icon}
                            </div>
                            <div>
                              <div className="text-2xl font-bold text-white">
                                {testimonials[activeIndex].stats.projects}+
                              </div>
                              <div className="text-gray-400 text-sm">
                                Projects
                              </div>
                            </div>
                          </motion.div>

                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5 }}
                            className="flex items-center gap-3"
                          >
                            <div
                              className={`p-3 bg-gradient-to-br ${testimonials[activeIndex].color} rounded-xl`}
                            >
                              <Heart className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="text-2xl font-bold text-white">
                                {testimonials[activeIndex].stats.satisfaction}%
                              </div>
                              <div className="text-gray-400 text-sm">
                                Satisfaction
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-4 mt-16">
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
                  className={`w-3 h-3 rounded-full transition-all ${
                    activeIndex === idx
                      ? `bg-gradient-to-r ${testimonials[activeIndex].color}`
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
