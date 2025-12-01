"use client";

import { motion, useAnimationFrame } from "framer-motion";
import {
  ShoppingBag,
  Sparkles,
  Star,
  Zap,
  Shield,
  Heart,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useRef, useState, useEffect } from "react";

// Floating shape component
const FloatingShape = ({ delay = 0, className = "", style }) => {
  const ref = useRef(null);

  useAnimationFrame((t) => {
    if (!ref.current) return;
    const rotate = (t / 50 + delay * 100) % 360;
    const y = Math.sin(t / 1000 + delay) * 40;
    const x = Math.cos(t / 1800 + delay) * 25;
    ref.current.style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg)`;
  });

  return <div ref={ref} className={className} style={style} />;
};

// Auto-sliding container
const AutoSlideContainer = ({ children, speed = 1 }) => {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useAnimationFrame((time) => {
    if (!containerRef.current || isHovered) return;
    const scrollAmount = Math.sin(time / 8000) * 50 * speed;
    containerRef.current.style.transform = `translateX(${scrollAmount}px)`;
  });

  return (
    <div
      ref={containerRef}
      className="flex gap-8 transition-transform duration-1000 ease-out"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {children} {/* Duplicate for seamless loop */}
    </div>
  );
};

export default function ProductSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(null);

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

  // Auto slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % products.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-32 overflow-hidden bg-gradient-to-b from-black/95 via-black/90 to-black/95">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)]" />

      {/* Floating Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <FloatingShape
          delay={0}
          className="absolute top-20 left-5% w-[500px] h-[500px] bg-gradient-to-br from-emerald-500/10 to-teal-400/10 rounded-full blur-3xl"
        />
        <FloatingShape
          delay={2}
          className="absolute bottom-20 right-5% w-[500px] h-[500px] bg-gradient-to-br from-purple-500/10 to-pink-400/10 rounded-full blur-3xl"
        />
        <FloatingShape
          delay={1}
          className="absolute top-1/2 left-1/3 w-64 h-64 border-4 border-amber-500/10 rounded-3xl rotate-45"
        />
        <FloatingShape
          delay={3}
          className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-gradient-to-br from-blue-500/10 to-cyan-400/10"
          style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
        />
        <FloatingShape
          delay={4}
          className="absolute top-40 right-40 w-32 h-32 border-2 border-rose-500/20 rounded-full"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500/10 to-purple-500/10 border border-white/10 backdrop-blur-sm"
          >
            <Sparkles size={16} className="text-emerald-400" />
            <span className="text-sm font-semibold bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">
              Premium Collection
            </span>
            <Sparkles size={16} className="text-purple-400" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Iconic Products
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-gray-400 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
          >
            Experience the pinnacle of natural excellence with our curated
            collection of premium, handcrafted products designed for
            transformative wellness.
          </motion.p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
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
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center"
            >
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-emerald-400" />
              <div className="text-3xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Auto-Sliding Products */}
        <div className="relative">
          {/* Navigation Arrows */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.1 }}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full shadow-2xl flex items-center justify-center hover:shadow-emerald-500/30 transition-shadow"
            onClick={() =>
              setActiveIndex(
                (prev) => (prev - 1 + products.length) % products.length
              )
            }
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.1 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-400 rounded-full shadow-2xl flex items-center justify-center hover:shadow-purple-500/30 transition-shadow"
            onClick={() =>
              setActiveIndex((prev) => (prev + 1) % products.length)
            }
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </motion.button>

          {/* Products Carousel */}
          <div className="overflow-hidden px-4">
            <AutoSlideContainer speed={0.5}>
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    scale: activeIndex === index ? 1 : 0.9,
                    opacity: 1,
                    y: activeIndex === index ? 0 : 20,
                  }}
                  transition={{ duration: 0.5 }}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2 },
                  }}
                  onMouseEnter={() => setIsHovered(product.id)}
                  onMouseLeave={() => setIsHovered(null)}
                  className={`relative min-w-[380px] bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-xl rounded-3xl p-8 border ${
                    activeIndex === index
                      ? "border-emerald-500/30 shadow-2xl shadow-emerald-500/20"
                      : "border-white/10"
                  } transition-all duration-500 cursor-pointer`}
                >
                  {/* Badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="absolute -top-3 left-6 z-10"
                  >
                    <div
                      className={`px-4 py-2 rounded-full bg-gradient-to-r ${product.gradient} text-white text-xs font-bold shadow-lg`}
                    >
                      {product.badge}
                    </div>
                  </motion.div>

                  {/* Glow Effect */}
                  <motion.div
                    animate={{
                      scale: isHovered === product.id ? [1, 1.2, 1] : 1,
                      opacity: isHovered === product.id ? 0.3 : 0.1,
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`absolute inset-0 ${product.glow} rounded-3xl blur-xl`}
                  />

                  {/* Product Image */}
                  <div className="relative h-64 mb-6 overflow-hidden rounded-2xl">
                    <motion.img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      animate={{
                        scale: isHovered === product.id ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                    {/* Rating */}
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-white text-sm font-bold">
                        {product.rating}
                      </span>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="relative">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">
                      {product.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {product.features.map((feature, idx) => (
                        <motion.span
                          key={idx}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: idx * 0.1 }}
                          className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300 border border-white/10"
                        >
                          {feature}
                        </motion.span>
                      ))}
                    </div>

                    {/* Price & CTA */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                            {product.price}
                          </span>
                          <span className="text-gray-500 line-through">
                            {product.originalPrice}
                          </span>
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-semibold rounded-xl overflow-hidden"
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-teal-400 to-emerald-500"
                          initial={{ x: "100%" }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                        <span className="relative z-10 flex items-center gap-2">
                          <ShoppingBag size={18} />
                          Add to Cart
                          <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <ArrowRight size={16} />
                          </motion.span>
                        </span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AutoSlideContainer>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-10">
            {products.map((_, idx) => (
              <motion.button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  activeIndex === idx
                    ? "bg-gradient-to-r from-emerald-400 to-cyan-400"
                    : "bg-gray-700"
                }`}
                animate={{
                  scale: activeIndex === idx ? [1, 1.2, 1] : 1,
                }}
                transition={{ duration: 0.5 }}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-20"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-10 py-5 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-bold text-lg rounded-2xl overflow-hidden shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-emerald-600"
              initial={{ x: "100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.4 }}
            />
            <span className="relative z-10 flex items-center justify-center gap-3">
              Explore All Collections
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles size={20} />
              </motion.span>
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
