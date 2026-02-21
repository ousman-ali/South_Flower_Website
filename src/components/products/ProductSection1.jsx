"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  ChevronRight,
  Sparkles,
  Truck,
  Shield,
  Zap,
  Clock,
  Search,
} from "lucide-react";
import Link from "next/link";

export default function ProductSection1({ categories, products, services }) {
  const [isHovered, setIsHovered] = useState(null);
  // Initialize with "all" instead of "All"
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef(null);

  // Filter products based on selected category
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter(
          (product) =>
            product.product_category_id?.toString() ===
            selectedCategory.toString(),
        );

  useEffect(() => {
    setMounted(true);
  }, []);

  // If not mounted, show minimal UI to prevent hydration mismatch
  if (!mounted) {
    return (
      <section className="relative min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="h-80 bg-gray-800/50 rounded-xl animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)]" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header - Minimal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-900/30 to-gray-900/30 border border-blue-500/20">
                <Sparkles className="w-3 h-3 text-blue-400" />
                <span className="text-xs font-medium text-blue-300">
                  Genuine Collections
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
                Advanced Manufacturing{" "}
                <span className="bg-gradient-to-r from-blue-400 via-gray-400 to-cyan-400 bg-clip-text text-transparent">
                  Products
                </span>
              </h1>

              <p className="text-gray-400 text-sm">
                We design and fabricate reliable transport and storage systems
                built for strength, safety, and long-term performance
              </p>
            </div>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6"
        >
          <div className="flex flex-wrap gap-2">
            {/* Always include "All" option first */}
            <motion.button
              key="all"
              onClick={() => setSelectedCategory("all")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                selectedCategory === "all"
                  ? "bg-gradient-to-r from-blue-600 to-gray-500 text-white shadow-lg shadow-blue-500/20"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
              }`}
            >
              All
            </motion.button>

            {/* Map through actual categories */}
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-blue-600 to-gray-500 text-white shadow-lg shadow-blue-500/20"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
                }`}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Main Layout: Products + Sidebar */}
        <div className="flex flex-col lg:flex-row gap-6 min-h-[600px]">
          {/* Products Section - Left (Scrollable) */}
          <div className="lg:w-3/4 flex flex-col">
            {/* Products Grid - Scrollable Container with fixed height */}
            <div
              ref={containerRef}
              className="rounded-lg border border-gray-800 bg-gray-900/30 p-4"
            >
              {/* Show message if no products */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800/50 mb-4">
                    <Search className="w-8 h-8 text-gray-500" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-300 mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Try selecting a different category
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{
                        scale: 1.02,
                        y: -3,
                      }}
                      onMouseEnter={() => setIsHovered(product.id)}
                      onMouseLeave={() => setIsHovered(null)}
                      className="group relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/30 transition-all duration-300 cursor-pointer"
                    >
                      {/* Product Image */}
                      <div className="relative h-40 overflow-hidden">
                        <motion.img
                          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${product.banner_image}`}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          animate={{
                            scale: isHovered === product.id ? 1.05 : 1,
                          }}
                          transition={{ duration: 0.5 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      </div>

                      {/* Product Details */}
                      <div className="p-3 h-32 flex flex-col">
                        {/* Name */}
                        <h3 className="text-sm font-bold text-white mb-1 line-clamp-1">
                          {product.name}
                        </h3>

                        {/* Truncated Description */}
                        <p className="text-gray-400 text-xs mb-3 line-clamp-2 flex-grow">
                          {product.description}
                        </p>

                        {/* Price & CTA */}
                        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-700/50">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-blue-400 to-gray-500 text-white text-xs font-medium rounded-lg flex items-center gap-1 shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
                          >
                            <Link
                              href={`/product/${product.slug}`}
                              className="flex items-center gap-1 px-2 py-1.5"
                            >
                              <Eye className="w-3 h-3" />
                              <span>Details</span>
                            </Link>
                          </motion.button>
                        </div>
                      </div>

                      {/* Hover Glow Effect */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Right (Fixed) */}
          <div className="lg:w-1/4">
            <div className="sticky top-20 space-y-4">
              {/* Services Section */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-700/50 shadow-lg overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-900/30 to-gray-900/30 border border-blue-500/20">
                      <Sparkles className="w-4 h-4 text-blue-400" />
                    </div>
                    <h2 className="text-sm font-bold text-white">
                      Our Services
                    </h2>
                  </div>

                  <div className="space-y-2">
                    {services.map((service) => (
                      <motion.div
                        key={service.id}
                        whileHover={{ x: 4 }}
                        className="group cursor-pointer"
                      >
                        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/30 transition-colors duration-300">
                          {/* Image Container */}
                          <div className="p-0.5 rounded-md bg-gradient-to-r from-blue-500 to-cyan-400 flex-shrink-0">
                            <div className="w-10 h-10 rounded overflow-hidden bg-gray-900">
                              <img
                                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${service.banner_image}`}
                                alt={service.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>

                          {/* Service Name */}
                          <div className="flex-1">
                            <h3 className="text-xs font-medium text-gray-300 group-hover:text-white">
                              {service.title}
                            </h3>
                            <p className="text-gray-400 text-xs line-clamp-2">
                              {service.short_description}
                            </p>
                          </div>

                          {/* Arrow */}
                          <ChevronRight className="w-3 h-3 text-gray-500 group-hover:text-blue-400 transition-colors duration-300 flex-shrink-0" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Benefits Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-gradient-to-br from-blue-900/30 to-gray-900/30 rounded-xl border border-blue-500/20 p-4"
              >
                <h3 className="text-sm font-bold text-white mb-3">
                  Why Choose Us
                </h3>
                <div className="space-y-2">
                  {[
                    { icon: Shield, text: "Premium Quality" },
                    { icon: Truck, text: "Free Delivery" },
                    { icon: Zap, text: "Fast Service" },
                    { icon: Clock, text: "24/7 Support" },
                  ].map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="p-1 rounded bg-white/10">
                        <benefit.icon className="w-3 h-3 text-blue-400" />
                      </div>
                      <span className="text-xs text-gray-300">
                        {benefit.text}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
