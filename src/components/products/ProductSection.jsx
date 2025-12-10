"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Star,
  Zap,
  Shield,
  Heart,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

// Slide container with interval-based sliding
const SlideContainer = ({ children, interval = 3000 }) => {
  const containerRef = useRef(null);
  const CARD_WIDTH = 340;
  const items = React.Children.toArray(children);

  // Duplicate items enough times so there is no gap
  const loopItems = [...items, ...items, ...items].map((child, i) =>
    React.cloneElement(child, { key: `loop-${i}` })
  );

  const positionRef = useRef(0);

  // Continuous automatic sliding
  useEffect(() => {
    const timer = setInterval(() => {
      slideLeft();
    }, interval);
    return () => clearInterval(timer);
  }, []);

  const slideLeft = () => {
    positionRef.current += 1;

    if (containerRef.current) {
      containerRef.current.style.transition = "transform 0.7s ease";
      containerRef.current.style.transform = `translateX(-${
        positionRef.current * CARD_WIDTH
      }px)`;
    }

    // When we've moved past 1 full set, JUMP back without animation
    const oneSetWidth = items.length * CARD_WIDTH;

    if (positionRef.current * CARD_WIDTH >= oneSetWidth) {
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.style.transition = "none";
          containerRef.current.style.transform = `translateX(0px)`;
        }
        positionRef.current = 0;
      }, 700);
    }
  };

  const slideRight = () => {
    positionRef.current -= 1;

    if (positionRef.current < 0) {
      positionRef.current = items.length - 1;
    }

    if (containerRef.current) {
      containerRef.current.style.transition = "transform 0.7s ease";
      containerRef.current.style.transform = `translateX(-${
        positionRef.current * CARD_WIDTH
      }px)`;
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Left Button */}
      <button
        onClick={slideRight}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 rounded-full"
      >
        <ChevronLeft className="w-7 h-7" />
      </button>

      {/* Right Button */}
      <button
        onClick={slideLeft}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 rounded-full"
      >
        <ChevronRight className="w-7 h-7" />
      </button>

      {/* Actual sliding track */}
      <div ref={containerRef} className="flex gap-6">
        {loopItems}
      </div>
    </div>
  );
};

export default function ProductSection({ products }) {
  const [isHovered, setIsHovered] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto advance index for visual indication
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-16 overflow-hidden bg-gradient-to-b from-black/95 via-black/90 to-black/95">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header - Minimal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Our Products
            </span>
          </motion.h2>
        </motion.div>

        {/* Stats - Simple */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 mb-8"
        >
          {[
            { value: "1K+", label: "Happy Customers", icon: Heart },
            { value: "5.0★", label: "Average Rating", icon: Star },
            { value: "24/7", label: "Support", icon: Shield },
            { value: "100%", label: "Original", icon: Zap },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * idx }}
              whileHover={{ scale: 1.03, y: -2 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center"
            >
              <stat.icon className="w-6 h-6 mx-auto mb-2 text-emerald-400" />
              <div className="text-2xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-gray-400 text-xs">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Products Carousel - Simple sliding */}
        <div className="relative overflow-hidden ">
          <SlideContainer interval={4000}>
            {products.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                onMouseEnter={() => setIsHovered(product.id)}
                onMouseLeave={() => setIsHovered(null)}
                className="relative min-w-[320px] max-w-[320px] bg-gradient-to-br bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 cursor-pointer hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/10"
              >
                {/* Product Image - Full width, no padding */}
                <div className="relative h-64 overflow-hidden">
                  <motion.img
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${product.banner_image}`}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    animate={{ scale: isHovered === product.id ? 1.1 : 1 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                {/* Product Details - Below image */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">
                        {product.name}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  {/* Price & Details Button */}
                  <div className="flex items-center justify-between">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="group relative px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-500 text-white text-sm font-semibold rounded-lg overflow-hidden flex items-center gap-2"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-600"
                        initial={{ x: "100%" }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                      <Eye size={16} className="relative z-10" />
                      <span className="relative z-10">Details</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </SlideContainer>
        </div>

        {/* Simple CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-bold rounded-xl shadow-xl hover:shadow-emerald-500/20 transition-all duration-300"
          >
            View All Products
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
