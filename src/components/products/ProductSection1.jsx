"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Star,
  Heart,
  Eye,
  ChevronRight,
  Sparkles,
  Leaf,
  Flower,
  Truck,
  Shield,
  Zap,
  Clock,
  Search,
  TrendingUp,
} from "lucide-react";

export default function ProductSection1() {
  const [isHovered, setIsHovered] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef(null);

  // Services for sidebar
  const services = [
    {
      id: 1,
      name: "Floral Design",
      icon: <Flower className="w-4 h-4" />,
      color: "from-rose-500 to-pink-400",
    },
    {
      id: 2,
      name: "Garden Planning",
      icon: <Leaf className="w-4 h-4" />,
      color: "from-emerald-500 to-teal-400",
    },
    {
      id: 3,
      name: "Plant Care",
      icon: <Sparkles className="w-4 h-4" />,
      color: "from-blue-500 to-cyan-400",
    },
    {
      id: 4,
      name: "Delivery",
      icon: <Truck className="w-4 h-4" />,
      color: "from-purple-500 to-violet-400",
    },
    {
      id: 5,
      name: "Consultation",
      icon: <Search className="w-4 h-4" />,
      color: "from-amber-500 to-orange-400",
    },
    {
      id: 6,
      name: "Maintenance",
      icon: <TrendingUp className="w-4 h-4" />,
      color: "from-indigo-500 to-purple-400",
    },
  ];

  // Product categories
  const categories = [
    "All",
    "Flowers",
    "Plants",
    "Seeds",
    "Tools",
    "Pots",
    "Soil",
    "Accessories",
  ];

  // Products data - minimized version
  const products = [
    {
      id: 1,
      name: "Premium Rose Bouquet",
      description: "Fresh cut premium roses in elegant arrangement",
      price: "$79.99",
      originalPrice: "$99.99",
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=400&h=250&fit=crop&crop=center",
      category: "Flowers",
      gradient: "from-rose-500 to-pink-400",
      badge: "BEST SELLER",
    },
    {
      id: 2,
      name: "Orchid Collection",
      description: "Exotic orchids with stunning blooms",
      price: "$129.99",
      originalPrice: "$159.99",
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=400&h=250&fit=crop&crop=center",
      category: "Plants",
      gradient: "from-purple-500 to-violet-400",
      badge: "EXOTIC",
    },
    {
      id: 3,
      name: "Herbal Seed Kit",
      description: "Complete herb garden seed collection",
      price: "$34.99",
      originalPrice: "$49.99",
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=250&fit=crop&crop=center",
      category: "Seeds",
      gradient: "from-emerald-500 to-teal-400",
      badge: "ORGANIC",
    },
    {
      id: 4,
      name: "Ceramic Plant Pots",
      description: "Handcrafted ceramic pots in various sizes",
      price: "$24.99",
      originalPrice: "$34.99",
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=250&fit=crop&crop=center",
      category: "Pots",
      gradient: "from-amber-500 to-orange-400",
      badge: "HANDCRAFTED",
    },
    {
      id: 5,
      name: "Pruning Shears",
      description: "High-quality stainless steel pruning tools",
      price: "$49.99",
      originalPrice: "$69.99",
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1577041241576-f4b964db30ee?w=400&h=250&fit=crop&crop=center",
      category: "Tools",
      gradient: "from-blue-500 to-cyan-400",
      badge: "PROFESSIONAL",
    },
    {
      id: 6,
      name: "Organic Fertilizer",
      description: "All-natural plant nutrition for healthy growth",
      price: "$29.99",
      originalPrice: "$39.99",
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1600841541100-bf7835d5d3da?w=400&h=250&fit=crop&crop=center",
      category: "Soil",
      gradient: "from-lime-500 to-green-400",
      badge: "ECO FRIENDLY",
    },
    {
      id: 7,
      name: "Luxury Succulent Set",
      description: "Rare succulent collection in decorative pots",
      price: "$89.99",
      originalPrice: "$119.99",
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=250&fit=crop&crop=center",
      category: "Plants",
      gradient: "from-indigo-500 to-purple-400",
      badge: "LUXURY",
    },
    {
      id: 8,
      name: "Garden Watering System",
      description: "Smart automated watering system for gardens",
      price: "$149.99",
      originalPrice: "$199.99",
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=400&h=250&fit=crop&crop=center",
      category: "Tools",
      gradient: "from-sky-500 to-blue-400",
      badge: "SMART",
    },
    {
      id: 9,
      name: "Seasonal Flower Seeds",
      description: "Mix of seasonal flowers for year-round blooms",
      price: "$19.99",
      originalPrice: "$29.99",
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=250&fit=crop&crop=center",
      category: "Seeds",
      gradient: "from-pink-500 to-rose-400",
      badge: "SEASONAL",
    },
    {
      id: 10,
      name: "Bamboo Plant Stands",
      description: "Sustainable bamboo stands for indoor plants",
      price: "$39.99",
      originalPrice: "$59.99",
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&h=250&fit=crop&crop=center",
      category: "Accessories",
      gradient: "from-amber-600 to-yellow-500",
      badge: "SUSTAINABLE",
    },
    {
      id: 11,
      name: "Premium Garden Soil",
      description: "Nutrient-rich soil mix for optimal plant growth",
      price: "$44.99",
      originalPrice: "$59.99",
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1592892111427-bc0c1f0c4658?w=400&h=250&fit=crop&crop=center",
      category: "Soil",
      gradient: "from-brown-500 to-amber-700",
      badge: "PREMIUM",
    },
    {
      id: 12,
      name: "Hydroponic Starter Kit",
      description: "Complete hydroponic system for indoor gardening",
      price: "$199.99",
      originalPrice: "$249.99",
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=250&fit=crop&crop=center",
      category: "Tools",
      gradient: "from-cyan-500 to-blue-400",
      badge: "INNOVATIVE",
    },
  ];

  // Filter products based on selected category
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  // Toggle favorite
  const toggleFavorite = (productId) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent rendering mismatched content
  if (!mounted) {
    return (
      <section className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="h-96 flex items-center justify-center">
            <div className="animate-pulse text-gray-500">Loading...</div>
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
              <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-900/30 to-teal-900/30 border border-emerald-500/20">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                <span className="text-xs font-medium text-emerald-300">
                  Premium Collection
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
                Our{" "}
                <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                  Products
                </span>
              </h1>

              <p className="text-gray-400 text-sm">
                Discover our curated selection of premium botanical products
              </p>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center gap-6">
              {[
                { value: "500+", label: "Products" },
                { value: "4.9★", label: "Rating" },
                { value: "100%", label: "Natural" },
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-lg font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              ))}
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
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-500/20"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
                }`}
              >
                {category}
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
              className=" rounded-lg border border-gray-800 bg-gray-900/30 p-4"
            >
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
                    className="group relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-emerald-500/10 hover:border-emerald-500/30 transition-all duration-300 cursor-pointer"
                    style={{ height: "320px" }}
                  >
                    {/* Favorite Button */}
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(product.id);
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute top-2 right-2 z-20 p-1.5 rounded-full bg-gray-900/80 backdrop-blur-sm border border-gray-700/50"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 transition-colors duration-300 ${
                          favorites.includes(product.id)
                            ? "fill-rose-500 text-rose-500"
                            : "text-gray-400 group-hover:text-rose-400"
                        }`}
                      />
                    </motion.button>

                    {/* Badge */}
                    <div className="absolute top-2 left-2 z-20">
                      <div
                        className={`px-2 py-0.5 rounded-full bg-gradient-to-r ${product.gradient} text-white text-[10px] font-bold`}
                      >
                        {product.badge}
                      </div>
                    </div>

                    {/* Product Image */}
                    <div className="relative h-32 overflow-hidden">
                      <motion.img
                        src={product.image}
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
                      {/* Category & Rating */}
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-medium text-emerald-400 bg-emerald-900/20 px-1.5 py-0.5 rounded">
                          {product.category}
                        </span>

                        {/* Rating */}
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span className="text-xs font-bold text-gray-300">
                            {product.rating}
                          </span>
                        </div>
                      </div>

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
                        <div className="flex items-center gap-2">
                          <span className="text-base font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                            {product.price}
                          </span>
                          <span className="text-gray-500 text-xs line-through">
                            {product.originalPrice}
                          </span>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-500 text-white text-xs font-medium rounded-lg flex items-center gap-1 shadow-lg hover:shadow-emerald-500/20 transition-all duration-300"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Details</span>
                        </motion.button>
                      </div>
                    </div>

                    {/* Hover Glow Effect */}
                    <div
                      className={`absolute inset-0 rounded-xl bg-gradient-to-r ${product.gradient
                        .replace("from-", "")
                        .replace(
                          " to-",
                          "/5 to-"
                        )}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                    />
                  </motion.div>
                ))}
              </div>
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
                    <div className="p-1.5 rounded-lg bg-gradient-to-br from-emerald-900/30 to-teal-900/30 border border-emerald-500/20">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
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
                          <div
                            className={`p-1.5 rounded-md bg-gradient-to-r ${service.color}/10`}
                          >
                            <div
                              className={`bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}
                            >
                              {service.icon}
                            </div>
                          </div>

                          <div className="flex-1">
                            <h3 className="text-xs font-medium text-gray-300 group-hover:text-white">
                              {service.name}
                            </h3>
                          </div>

                          <ChevronRight className="w-3 h-3 text-gray-500 group-hover:text-emerald-400 transition-colors duration-300" />
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
                className="bg-gradient-to-br from-emerald-900/30 to-teal-900/30 rounded-xl border border-emerald-500/20 p-4"
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
                        <benefit.icon className="w-3 h-3 text-emerald-400" />
                      </div>
                      <span className="text-xs text-gray-300">
                        {benefit.text}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Popular Tags */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4"
              >
                <h3 className="text-sm font-bold text-white mb-3">
                  Popular Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Organic",
                    "Premium",
                    "Rare",
                    "Sustainable",
                    "Luxury",
                    "Handmade",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs text-gray-400 bg-gray-900/50 rounded-lg border border-gray-700 hover:text-emerald-400 hover:border-emerald-500/30 transition-colors duration-300 cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styling */}
      <style jsx global>{`
        .products-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #10b981 transparent;
        }
        .products-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .products-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
          margin: 4px;
        }
        .products-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #10b981, #059669);
          border-radius: 4px;
        }
        .products-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #059669, #047857);
        }
        .products-scrollbar::-webkit-scrollbar-corner {
          background: transparent;
        }
      `}</style>
    </section>
  );
}
