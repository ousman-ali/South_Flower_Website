"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  ArrowRight,
  Eye,
  ChevronRight,
  Sparkles,
  Flower2,
  Star,
  BookOpen,
  Bookmark,
  Share2,
  ExternalLink,
  Zap,
  Layers,
  Target,
  Award,
  Clock,
} from "lucide-react";

const FeaturedBlogPosts = ({ featuredBlogs }) => {
  const [selectedBlog, setSelectedBlog] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isHovered, setIsHovered] = useState(null);
  const [isSticky, setIsSticky] = useState(false);
  const containerRef = useRef(null);
  const sidebarRef = useRef(null);

  // Color mapping for blog categories
  const colorMapping = {
    "Zen Gardening": {
      color: "emerald",
      gradient: "from-emerald-500/90 via-teal-500/80 to-cyan-500/90",
      icon: <Flower2 className="w-5 h-5" />,
    },
    Hydroponics: {
      color: "blue",
      gradient: "from-blue-500/90 via-indigo-500/80 to-purple-500/90",
      icon: <Layers className="w-5 h-5" />,
    },
    "Night Gardening": {
      color: "purple",
      gradient: "from-purple-500/90 via-pink-500/80 to-rose-500/90",
      icon: <Sparkles className="w-5 h-5" />,
    },
    "Culinary Gardening": {
      color: "rose",
      gradient: "from-rose-500/90 via-orange-500/80 to-amber-500/90",
      icon: <Target className="w-5 h-5" />,
    },
    default: {
      color: "blue",
      gradient: "from-blue-500/90 via-indigo-500/80 to-purple-500/90",
      icon: <Flower2 className="w-5 h-5" />,
    },
  };

  // Get blog color based on category
  const getBlogColor = (category) => {
    return colorMapping[category] || colorMapping.default;
  };

  // Get color classes based on blog color
  const getColorClasses = (color) => {
    const colors = {
      emerald: {
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/30",
        text: "text-emerald-400",
        gradient: "from-emerald-500 to-teal-400",
        button: "bg-gradient-to-r from-emerald-600 to-teal-500",
        light: "bg-emerald-500/5",
        dark: "bg-emerald-900/20",
      },
      blue: {
        bg: "bg-blue-500/10",
        border: "border-blue-500/30",
        text: "text-blue-400",
        gradient: "from-blue-500 to-indigo-400",
        button: "bg-gradient-to-r from-blue-600 to-indigo-500",
        light: "bg-blue-500/5",
        dark: "bg-blue-900/20",
      },
      purple: {
        bg: "bg-purple-500/10",
        border: "border-purple-500/30",
        text: "text-purple-400",
        gradient: "from-purple-500 to-pink-400",
        button: "bg-gradient-to-r from-purple-600 to-pink-500",
        light: "bg-purple-500/5",
        dark: "bg-purple-900/20",
      },
      rose: {
        bg: "bg-rose-500/10",
        border: "border-rose-500/30",
        text: "text-rose-400",
        gradient: "from-rose-500 to-orange-400",
        button: "bg-gradient-to-r from-rose-600 to-orange-500",
        light: "bg-rose-500/5",
        dark: "bg-rose-900/20",
      },
    };
    return colors[color] || colors.blue;
  };

  // Animated SVG shapes
  const svgShapes = [
    {
      id: 1,
      path: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
      color: "text-emerald-500/20",
      size: 24,
      x: "10%",
      y: "15%",
    },
    {
      id: 2,
      path: "M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      color: "text-blue-500/20",
      size: 32,
      x: "85%",
      y: "20%",
    },
    {
      id: 3,
      path: "M12 2v20M2 12h20",
      color: "text-purple-500/20",
      size: 28,
      x: "15%",
      y: "80%",
    },
    {
      id: 4,
      path: "M12 2l7 20-7-5-7 5 7-20z",
      color: "text-rose-500/20",
      size: 20,
      x: "80%",
      y: "75%",
    },
  ];

  // Floating particles
  const particles = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
    color:
      i % 4 === 0
        ? "bg-emerald-500/30"
        : i % 4 === 1
        ? "bg-blue-500/30"
        : i % 4 === 2
        ? "bg-purple-500/30"
        : "bg-rose-500/30",
  }));

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  // Handle scroll for sticky behavior
  useEffect(() => {
    const handleScroll = () => {
      if (sidebarRef.current && containerRef.current) {
        const sidebar = sidebarRef.current;
        const container = containerRef.current;
        const sidebarTop = sidebar.getBoundingClientRect().top;
        const containerBottom = container.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;

        // Make sticky when sidebar is near top and container is still visible
        setIsSticky(sidebarTop <= 20 && containerBottom > windowHeight + 20);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section
      ref={containerRef}
      className="relative py-12 bg-gradient-to-b from-gray-100 via-blue to-gray-50 overflow-visible"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large Gradient Orbs */}
        <motion.div
          className="absolute top-20 -left-40 w-96 h-96 bg-gradient-to-br from-emerald-900/10 via-teal-900/5 to-cyan-900/10 rounded-full blur-3xl"
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-20 -right-40 w-96 h-96 bg-gradient-to-br from-purple-900/10 via-pink-900/5 to-rose-900/10 rounded-full blur-3xl"
          animate={{
            x: [0, -60, 0],
            y: [0, 40, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* SVG Shapes */}
        {svgShapes.map((shape) => (
          <motion.div
            key={shape.id}
            className={`absolute ${shape.color}`}
            style={{
              left: shape.x,
              top: shape.y,
              width: shape.size,
              height: shape.size,
            }}
            animate={{
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            >
              <path d={shape.path} />
            </svg>
          </motion.div>
        ))}

        {/* Floating Particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className={`absolute rounded-full ${particle.color}`}
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.sin(particle.id) * 30, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_30%,transparent_100%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-900/30 to-teal-900/30 border border-emerald-500/20 backdrop-blur-sm">
            <Award className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium text-emerald-300">
              Premium Content
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Featured{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Masterpieces
            </span>
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Handpicked expert guides with premium visuals and in-depth insights
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Blog List */}
          <div className="lg:col-span-1">
            <div
              ref={sidebarRef}
              className={`space-y-4 transition-all duration-300 ${
                isSticky ? "sticky top-20" : ""
              }`}
            >
              <div
                className={`overflow-y-auto pr-2 ${
                  isSticky ? "max-h-[calc(100vh-200px)]" : ""
                }`}
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(6, 182, 212, 0.3) transparent",
                }}
              >
                {featuredBlogs.map((blog, index) => {
                  const blogColor = getBlogColor(blog.category);
                  const colors = getColorClasses(blogColor.color);
                  const isSelected = selectedBlog === index;

                  return (
                    <motion.div
                      key={blog.id || index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ x: 5 }}
                      onClick={() => setSelectedBlog(index)}
                      onMouseEnter={() => setIsHovered(blog.id)}
                      onMouseLeave={() => setIsHovered(null)}
                      className={`relative p-4 mb-2 rounded-xl cursor-pointer transition-all duration-300 ${
                        isSelected
                          ? `${colors.bg} ${colors.border} border-2 shadow-xl shadow-black/30`
                          : "bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-gray-800/50"
                      } backdrop-blur-sm overflow-hidden group`}
                    >
                      {/* Selection Indicator */}
                      {isSelected && (
                        <motion.div
                          layoutId="activeBlog"
                          className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-gray-400 rounded-r-full"
                        />
                      )}

                      {/* Hover Effect */}
                      <div
                        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${colors.light}`}
                      />

                      <div className="relative flex items-start gap-4">
                        {/* Image */}
                        <div className="flex-shrink-0">
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                            <motion.img
                              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${blog.banner_image}`}
                              alt={blog.title}
                              className="w-full h-full object-cover"
                              animate={{
                                scale: isHovered === blog.id ? 1.1 : 1,
                              }}
                              transition={{ duration: 0.5 }}
                            />
                            <div
                              className={`absolute inset-0 ${blogColor.gradient} opacity-60`}
                            />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          {/* Title and Arrow */}
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h3
                              className={`text-sm font-bold line-clamp-2 ${
                                isSelected ? "text-white" : "text-gray-300"
                              }`}
                            >
                              {blog.title}
                            </h3>
                            <motion.div
                              animate={{ x: isSelected ? 5 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ChevronRight
                                className={`w-4 h-4 ${
                                  isSelected ? colors.text : "text-gray-600"
                                }`}
                              />
                            </motion.div>
                          </div>

                          {/* Short Description */}
                          <p className="text-xs text-gray-400 mb-3 line-clamp-2">
                            {blog.description}
                          </p>

                          {/* Meta Info */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {/* Date */}
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3 text-gray-500" />
                                <span className="text-xs text-gray-400">
                                  {formatDate(blog.created_at)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Progress Indicator */}
                      <div className="relative mt-3 h-1 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          className={`absolute top-0 left-0 h-full ${colors.bg}`}
                          initial={{ width: 0 }}
                          animate={{
                            width: isSelected ? "100%" : `${(index + 1) * 25}%`,
                          }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Side - Blog Preview */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {featuredBlogs.map((blog, index) => {
                if (index !== selectedBlog) return null;
                const blogColor = getBlogColor(blog.category);
                const colors = getColorClasses(blogColor.color);
                const isFavorite = favorites.includes(blog.id);

                return (
                  <motion.div
                    key={blog.id || index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    className={`${isSticky ? "sticky top-20" : ""}`}
                    style={{
                      height: isSticky ? "calc(100vh - 200px)" : "auto",
                    }}
                  >
                    <div
                      className={`relative ${
                        isSticky ? "h-full" : ""
                      } rounded-2xl overflow-hidden border border-gray-800/50 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm`}
                    >
                      {/* Main Image Background */}
                      <div className="absolute inset-0">
                        <motion.img
                          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${blog.banner_image}`}
                          alt={blog.title}
                          className="w-full h-full object-cover"
                          initial={{ scale: 1.1 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.8 }}
                        />
                        <div
                          className={`absolute inset-0 ${blogColor.gradient} opacity-90`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                      </div>

                      {/* Content Overlay */}
                      <div
                        className={`relative ${
                          isSticky ? "h-full p-6" : "p-8"
                        } flex flex-col`}
                      >
                        {/* Top Bar */}
                        <div className="flex items-center justify-between mb-8">
                          {/* Action Buttons */}
                          <div className="flex items-center gap-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={toggleBookmark}
                              className="p-2.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 hover:border-amber-500/30 transition-colors"
                            >
                              <Bookmark
                                className={`w-5 h-5 ${
                                  isBookmarked
                                    ? "fill-amber-500 text-amber-500"
                                    : "text-gray-400"
                                }`}
                              />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="p-2.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 hover:border-blue-500/30 transition-colors"
                            >
                              <Share2 className="w-5 h-5 text-gray-400" />
                            </motion.button>
                          </div>
                        </div>

                        {/* Main Content - Takes remaining space */}
                        <div
                          className={`flex-1 flex flex-col ${
                            isSticky ? "justify-between" : "justify-end"
                          }`}
                        >
                          {/* Stats Bar */}
                          <div className="flex items-center gap-6 mb-8">
                            {[
                              { key: "plants", value: 24, icon: <Flower2 /> },
                              { key: "tools", value: 8, icon: <Layers /> },
                              { key: "weeks", value: 16, icon: <Clock /> },
                            ].map((stat) => (
                              <div
                                key={stat.key}
                                className="flex items-center gap-2"
                              >
                                <div
                                  className={`p-2 rounded-lg ${colors.bg} backdrop-blur-sm`}
                                >
                                  {React.cloneElement(stat.icon, {
                                    className: `w-4 h-4 ${colors.text}`,
                                  })}
                                </div>
                                <div>
                                  <div className="text-lg font-bold text-white">
                                    {stat.value}
                                  </div>
                                  <div className="text-xs text-gray-400 capitalize">
                                    {stat.key}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Blog Title */}
                          <h2
                            className={`${
                              isSticky ? "text-3xl" : "text-4xl md:text-5xl"
                            } font-bold text-white mb-6 leading-tight`}
                          >
                            {blog.title}
                          </h2>

                          {/* Excerpt */}
                          <p
                            className={`${
                              isSticky ? "text-base" : "text-lg"
                            } text-gray-300 mb-8 max-w-3xl leading-relaxed`}
                          >
                            {blog.excerpt || blog.description}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-8">
                            {(blog.tags || []).slice(0, 4).map((tag, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-sm text-gray-300"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>

                          {/* Bottom Action Bar */}
                          <div className="flex items-center justify-between pt-8 border-t border-white/10">
                            <div className="flex items-center gap-6">
                              {/* Stats */}
                              <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                  <Eye className="w-5 h-5 text-gray-400" />
                                  <span className="text-gray-300">
                                    {(blog.views_count || 0).toLocaleString()}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Read Button */}
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={`${colors.button} text-white px-8 py-3.5 rounded-xl font-medium flex items-center gap-3 shadow-lg shadow-black/30`}
                            >
                              <span>Read Full Article</span>
                              <ArrowRight className="w-5 h-5" />
                            </motion.button>
                          </div>
                        </div>
                      </div>

                      {/* Floating Elements */}
                      <div className="absolute top-1/2 right-8 -translate-y-1/2">
                        <motion.div
                          className="w-24 h-24 rounded-full border-2 border-white/10 backdrop-blur-sm flex items-center justify-center"
                          animate={{
                            rotate: [0, 360],
                          }}
                          transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          <ExternalLink className="w-8 h-8 text-white/30" />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlogPosts;
