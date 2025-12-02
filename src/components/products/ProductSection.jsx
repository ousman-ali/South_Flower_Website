"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Star, Zap, Shield, Heart, Eye } from "lucide-react";
import { useState, useEffect, useRef } from "react";

// Slide container with interval-based sliding
const SlideContainer = ({ children, interval = 4000 }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef(null);
  const slideCount = React.Children.count(children);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => {
        const next = (prev + 1) % slideCount;

        // Animate the slide
        if (containerRef.current) {
          const slideWidth = 340; // card width + gap
          containerRef.current.style.transition = "transform 0.7s ease-in-out";
          containerRef.current.style.transform = `translateX(-${
            next * slideWidth
          }px)`;

          // Reset position when reaching end for seamless loop
          setTimeout(() => {
            if (next === slideCount - 1 && containerRef.current) {
              containerRef.current.style.transition = "none";
              containerRef.current.style.transform = "translateX(0)";
              setCurrentSlide(0);
            }
          }, 700);
        }

        return next;
      });
    }, interval);

    return () => clearInterval(slideInterval);
  }, [interval, slideCount]);

  return (
    <div className="relative overflow-hidden">
      <div
        ref={containerRef}
        className="flex gap-6 transition-transform duration-700 ease-in-out"
      >
        {children}
        {/* Clone first few items for seamless transition */}
        {React.Children.toArray(children).slice(0, 3)}
      </div>
    </div>
  );
};

export default function ProductSection() {
  const [isHovered, setIsHovered] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const products = [
    {
      id: 1,
      name: "Premium Organic Oil",
      description:
        "100% pure cold-pressed organic oil with anti-inflammatory properties",
      price: "$49.99",
      originalPrice: "$64.99",
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1600185366007-6dcb42a1a9bc?auto=format&fit=crop&w=800&q=80",
      features: [
        "Organic",
        "Cold-Pressed",
        "Anti-Inflammatory",
        "Vitamin E Rich",
      ],
      gradient: "from-emerald-500 to-teal-400",
      glow: "bg-emerald-500/20",
      badge: "BEST SELLER",
    },
    {
      id: 2,
      name: "Herbal Essence",
      description: "Ancient herbal blend for relaxation and mental clarity",
      price: "$39.99",
      originalPrice: "$52.99",
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1600180758895-19f2c67cac95?auto=format&fit=crop&w=800&q=80",
      features: [
        "All Natural",
        "Stress Relief",
        "Energy Boost",
        "Herbal Blend",
      ],
      gradient: "from-purple-500 to-pink-400",
      glow: "bg-purple-500/20",
      badge: "NEW",
    },
    {
      id: 3,
      name: "Luxury Flower Extract",
      description:
        "Rare flower extract with anti-aging and rejuvenating properties",
      price: "$89.99",
      originalPrice: "$119.99",
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1524593166156-1f2e30b69f6b?auto=format&fit=crop&w=800&q=80",
      features: ["Rare Extract", "Anti-Aging", "Rejuvenating", "Luxury Grade"],
      gradient: "from-rose-500 to-amber-400",
      glow: "bg-rose-500/20",
      badge: "LUXURY",
    },
    {
      id: 4,
      name: "Aromatic Infused Oil",
      description: "Therapeutic aromatic oil for holistic wellness",
      price: "$44.99",
      originalPrice: "$59.99",
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1582299008536-2a9a1f3a8c88?auto=format&fit=crop&w=800&q=80",
      features: ["Aromatherapy", "Holistic", "Therapeutic", "Calming"],
      gradient: "from-blue-500 to-cyan-400",
      glow: "bg-blue-500/20",
      badge: "POPULAR",
    },
    {
      id: 5,
      name: "Golden Elixir Serum",
      description: "24K gold infused serum for ultimate skin radiance",
      price: "$129.99",
      originalPrice: "$169.99",
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1556228578-9c360e0b8f3c?auto=format&fit=crop&w=800&q=80",
      features: ["24K Gold", "Anti-Oxidant", "Radiance", "Premium"],
      gradient: "from-amber-500 to-yellow-400",
      glow: "bg-amber-500/20",
      badge: "LIMITED",
    },
    {
      id: 6,
      name: "Crystal Essence Water",
      description: "Crystal-infused purified water for energetic balance",
      price: "$34.99",
      originalPrice: "$44.99",
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
      features: ["Crystal Infused", "Energetic", "Purified", "Balancing"],
      gradient: "from-indigo-500 to-violet-400",
      glow: "bg-indigo-500/20",
      badge: "ENERGY",
    },
  ];

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
            { value: "10K+", label: "Happy Customers", icon: Heart },
            { value: "4.9★", label: "Average Rating", icon: Star },
            { value: "24/7", label: "Support", icon: Shield },
            { value: "100%", label: "Natural", icon: Zap },
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
        <div className="relative overflow-hidden py-4">
          <SlideContainer interval={4000}>
            {products.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.2 },
                }}
                onMouseEnter={() => setIsHovered(product.id)}
                onMouseLeave={() => setIsHovered(null)}
                className="relative min-w-[320px] max-w-[320px] bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 cursor-pointer hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/10"
              >
                {/* Product Image - Full width, no padding */}
                <div className="relative h-64 overflow-hidden">
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    animate={{
                      scale: isHovered === product.id ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Badge - Positioned on image */}
                  <div className="absolute top-4 left-4 z-10">
                    <div
                      className={`px-3 py-1 rounded-full bg-gradient-to-r ${product.gradient} text-white text-xs font-bold shadow-lg`}
                    >
                      {product.badge}
                    </div>
                  </div>

                  {/* Rating - Positioned on image */}
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="text-white text-xs font-bold">
                      {product.rating}
                    </span>
                  </div>
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

                  {/* Features - Minimal */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {product.features.slice(0, 2).map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-white/5 rounded-full text-[10px] text-gray-300 border border-white/10"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Price & Details Button */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                          {product.price}
                        </span>
                        <span className="text-gray-500 text-sm line-through">
                          {product.originalPrice}
                        </span>
                      </div>
                    </div>

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
