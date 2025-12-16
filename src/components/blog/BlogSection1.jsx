"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  ArrowRight,
  Eye,
  BookOpen,
  Tag,
  Sparkles,
  Leaf,
  Flower,
  TrendingUp,
  PenTool,
  Camera,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
} from "lucide-react";
import Link from "next/link";

export default function BlogSection1({ categories, blogs, products }) {
  const [isHovered, setIsHovered] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [mounted, setMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  const filteredPosts =
    selectedCategory === "all"
      ? blogs
      : blogs.filter(
          (blog) =>
            blog.blog_category_id?.toString() === selectedCategory.toString()
        );

  // Featured tags
  const featuredTags = ["Flowers", "Gardening", "Plants", "Design"];

  // Animated shapes
  const floatingShapes = [
    {
      id: 1,
      size: 80,
      x: "5%",
      y: "15%",
      duration: 30,
      color: "from-emerald-500/10 to-teal-400/15",
      icon: <Flower className="w-8 h-8 text-emerald-400/40" />,
      shape: "circle",
    },
    {
      id: 2,
      size: 60,
      x: "90%",
      y: "25%",
      duration: 35,
      color: "from-rose-500/10 to-pink-400/15",
      icon: <Leaf className="w-6 h-6 text-rose-400/40" />,
      shape: "triangle",
    },
    {
      id: 3,
      size: 70,
      x: "10%",
      y: "75%",
      duration: 28,
      color: "from-blue-500/10 to-cyan-400/15",
      icon: <Sparkles className="w-7 h-7 text-blue-400/40" />,
      shape: "circle",
    },
    {
      id: 4,
      size: 50,
      x: "85%",
      y: "70%",
      duration: 32,
      color: "from-purple-500/10 to-violet-400/15",
      icon: <PenTool className="w-5 h-5 text-purple-400/40" />,
      shape: "hexagon",
    },
    {
      id: 5,
      size: 90,
      x: "70%",
      y: "15%",
      duration: 25,
      color: "from-amber-500/10 to-yellow-400/15",
      icon: <Camera className="w-9 h-9 text-amber-400/40" />,
      shape: "circle",
    },
    {
      id: 6,
      size: 55,
      x: "20%",
      y: "60%",
      duration: 29,
      color: "from-lime-500/10 to-green-400/15",
      icon: <BookOpen className="w-5 h-5 text-lime-400/40" />,
      shape: "triangle",
    },
  ];

  // Pagination settings
  const postsPerPage = 4; // Always 4 cards per page on mobile

  // Calculate total pages
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Get current posts for the page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Fix hydration error and detect mobile
  useEffect(() => {
    setMounted(true);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  // Prevent rendering mismatched content
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

      {/* Animated Floating Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingShapes.map((shape) => (
          <motion.div
            key={shape.id}
            className={`absolute ${shape.color} border border-white/5 backdrop-blur-sm flex items-center justify-center`}
            style={{
              width: shape.size,
              height: shape.size,
              left: shape.x,
              top: shape.y,
              borderRadius:
                shape.shape === "circle"
                  ? "50%"
                  : shape.shape === "hexagon"
                  ? "30%"
                  : "20%",
              clipPath:
                shape.shape === "triangle"
                  ? "polygon(50% 0%, 0% 100%, 100% 100%)"
                  : "none",
            }}
            animate={{
              y: [0, -25, 0],
              x: [0, 15, 0],
              rotate: shape.id % 2 === 0 ? [0, 180, 360] : [0, 0, 0],
            }}
            transition={{
              duration: shape.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: shape.id * 0.5,
            }}
          >
            {shape.icon}
          </motion.div>
        ))}

        {/* Large gradient orbs */}
        <motion.div
          className="absolute top-1/4 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-emerald-700/10 via-teal-700/5 to-cyan-700/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -40, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 45,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-rose-700/10 via-purple-700/5 to-pink-700/10 rounded-full blur-3xl"
          animate={{
            x: [0, -60, 0],
            y: [0, 50, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-900/30 to-teal-900/30 border border-emerald-500/20">
                <BookOpen className="w-3 h-3 text-emerald-400" />
                <span className="text-xs font-medium text-emerald-300">
                  South Flower Blog
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Garden{" "}
                <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                  Insights & Tips
                </span>
              </h1>

              <p className="text-gray-400 text-sm">
                Discover expert gardening advice, floral design tips, and
                sustainable practices
              </p>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center gap-6">
              {[
                { value: blogs.length, label: "Articles" },
                { value: "4.8★", label: "Rating" },
                { value: "10K+", label: "Readers" },
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
            <motion.button
              key="all"
              onClick={() => setSelectedCategory("all")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                selectedCategory === "all"
                  ? "bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-500/20"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
              }`}
            >
              All
            </motion.button>

            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-500/20"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
                }`}
              >
                {category.title}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Main Layout: Blog Posts + Sidebar */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Blog Posts Section - Left */}
          <div className="lg:w-3/4">
            {/* Desktop: Scrollable Container */}
            {!isMobile ? (
              <div
                ref={containerRef}
                className=" rounded-lg border border-gray-800 bg-gray-900/30 p-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  {filteredPosts.map((post) => (
                    <BlogCard
                      key={post.id}
                      post={post}
                      isHovered={isHovered}
                      setIsHovered={setIsHovered}
                    />
                  ))}
                </div>
              </div>
            ) : (
              /* Mobile: Listed Cards (4 per page) - No Scroll */
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  {currentPosts.map((post) => (
                    <BlogCard
                      key={post.id}
                      post={post}
                      isHovered={isHovered}
                      setIsHovered={setIsHovered}
                    />
                  ))}
                </div>

                {/* Pagination Controls - Mobile Only */}
                {totalPages > 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-8 flex flex-col items-center justify-center space-y-4"
                  >
                    {/* Page Info */}
                    <div className="text-sm text-gray-400">
                      Page {currentPage} of {totalPages} • Showing{" "}
                      {indexOfFirstPost + 1}-
                      {Math.min(indexOfLastPost, filteredPosts.length)} of{" "}
                      {filteredPosts.length} posts
                    </div>

                    {/* Pagination Buttons */}
                    <div className="flex items-center justify-center space-x-4">
                      {/* Previous Button */}
                      <motion.button
                        onClick={prevPage}
                        disabled={currentPage === 1}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-3 rounded-lg flex items-center gap-2 ${
                          currentPage === 1
                            ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                            : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
                        }`}
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span className="text-sm font-medium">Previous</span>
                      </motion.button>

                      {/* Page Numbers */}
                      <div className="flex items-center space-x-2">
                        {Array.from(
                          { length: Math.min(5, totalPages) },
                          (_, i) => {
                            let pageNumber;
                            if (totalPages <= 5) {
                              pageNumber = i + 1;
                            } else if (currentPage <= 3) {
                              pageNumber = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                              pageNumber = totalPages - 4 + i;
                            } else {
                              pageNumber = currentPage - 2 + i;
                            }

                            if (pageNumber > 0 && pageNumber <= totalPages) {
                              return (
                                <motion.button
                                  key={pageNumber}
                                  onClick={() => paginate(pageNumber)}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className={`w-10 h-10 rounded-lg text-sm font-medium transition-all duration-300 ${
                                    currentPage === pageNumber
                                      ? "bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-500/20"
                                      : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
                                  }`}
                                >
                                  {pageNumber}
                                </motion.button>
                              );
                            }
                            return null;
                          }
                        )}
                      </div>

                      {/* Next Button */}
                      <motion.button
                        onClick={nextPage}
                        disabled={currentPage === totalPages}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-3 rounded-lg flex items-center gap-2 ${
                          currentPage === totalPages
                            ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                            : "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
                        }`}
                      >
                        <span className="text-sm font-medium">Next</span>
                        <ChevronRightIcon className="w-4 h-4" />
                      </motion.button>
                    </div>

                    {/* Quick Page Navigation */}
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-gray-500">Go to:</span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3]
                          .filter((p) => p <= totalPages)
                          .map(
                            (page) =>
                              page !== currentPage && (
                                <button
                                  key={page}
                                  onClick={() => paginate(page)}
                                  className="px-2 py-1 text-xs text-gray-400 hover:text-emerald-400 transition-colors"
                                >
                                  {page}
                                </button>
                              )
                          )}
                        {totalPages > 3 && (
                          <>
                            <span className="text-xs text-gray-600">...</span>
                            <button
                              onClick={() => paginate(totalPages)}
                              className="px-2 py-1 text-xs text-gray-400 hover:text-emerald-400 transition-colors"
                            >
                              {totalPages}
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar - Right (Fixed on Desktop, Below on Mobile) */}
          <div className={`${isMobile ? "mt-8" : "lg:w-1/4"}`}>
            <div className={`${!isMobile ? "sticky top-20" : ""} space-y-4`}>
              {/* Popular Products */}
              <motion.div
                initial={{ opacity: 0, x: isMobile ? 0 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4"
              >
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-sm font-bold text-white">
                    Popular Products
                  </h3>
                </div>
                <div className="space-y-3">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700/30 transition-colors duration-300 cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${product.banner_image}`}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-medium text-white truncate">
                          {product.name}
                        </h4>
                        <span className="text-[10px] text-gray-400">
                          {product.description}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Featured Tags */}
              <motion.div
                initial={{ opacity: 0, x: isMobile ? 0 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-sm font-bold text-white">
                    Why Choose us
                  </h3>
                </div>
                <ul className="list-disc pl-4 text-gray-300 space-y-1">
                  {featuredTags.map((tag, index) => (
                    <li key={index} className="text-sm">
                      {tag}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styling */}
      <style jsx global>{`
        .blog-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #10b981 transparent;
        }
        .blog-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .blog-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
          margin: 4px;
        }
        .blog-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #10b981, #059669);
          border-radius: 4px;
        }
        .blog-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #059669, #047857);
        }
      `}</style>
    </section>
  );
}

// Blog Card Component
const BlogCard = ({ post, isHovered, setIsHovered }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
    whileHover={{
      scale: 1.02,
      y: -3,
    }}
    onMouseEnter={() => setIsHovered(post.id)}
    onMouseLeave={() => setIsHovered(null)}
    className="group relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-emerald-500/10 hover:border-emerald-500/30 transition-all duration-300 cursor-pointer"
    style={{ height: "300px" }}
  >
    {/* Full Image Background */}
    <div className="absolute inset-0 overflow-hidden">
      <motion.img
        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${post.banner_image}`}
        alt={post.title}
        className="w-full h-full object-cover"
        animate={{
          scale: isHovered === post.id ? 1.15 : 1.1,
        }}
        transition={{ duration: 0.7 }}
      />
      {/* Gradient overlay - DARKER by default */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />

      {/* New Hover Overlay - Lighter gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>

    {/* Content - ALWAYS VISIBLE */}
    <div className="absolute inset-0 p-6 flex flex-col justify-end">
      <div>
        {/* Title - Always visible */}
        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt - Always visible */}
        <p className="text-gray-300 text-sm mb-4 line-clamp-2 opacity-100 group-hover:opacity-90 transition-opacity duration-300">
          {post.excerpt || "No excerpt available"}
        </p>

        {/* Author & Stats - Always visible */}
        <div className="flex items-center justify-between opacity-100 group-hover:opacity-80 transition-opacity duration-300">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-300">
                {post.views_count || 0}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-300">
                {new Date(post.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom Info */}
    <div className="absolute bottom-4 right-4">
      <Link
        href={`/blog/${post.slug}`}
        className="flex items-center justify-between"
      >
        {/* Original Read More button - hidden on hover */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-3 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-500 text-white text-xs font-medium rounded-lg flex items-center gap-1 opacity-100 group-hover:opacity-100 transition-opacity duration-300"
        >
          <span>Read More</span>
          <ArrowRight className="w-3 h-3" />
        </motion.button>
      </Link>
    </div>

    {/* NEW HOVER EFFECT: Tags with animation */}
    {post.tags && post.tags.length > 0 && (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: isHovered === post.id ? 1 : 0,
          y: isHovered === post.id ? 0 : 10,
        }}
        transition={{ duration: 0.3 }}
        className="absolute top-16 left-4"
      >
        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag, idx) => (
            <motion.span
              key={idx}
              initial={{ scale: 0 }}
              animate={{ scale: isHovered === post.id ? 1 : 0 }}
              transition={{ duration: 0.2, delay: idx * 0.1 }}
              className="px-3 py-1.5 text-xs font-medium text-emerald-300 bg-emerald-900/40 backdrop-blur-sm rounded-lg border border-emerald-500/30"
            >
              #{typeof tag === "object" ? tag.name : tag}
            </motion.span>
          ))}
        </div>
      </motion.div>
    )}

    {/* NEW HOVER EFFECT: Glowing border effect */}
    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-cyan-500/10" />
      <div className="absolute inset-0 rounded-xl border-2 border-emerald-500/20" />
    </div>

    {/* NEW HOVER EFFECT: Sparkle animation */}
    {isHovered === post.id && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 pointer-events-none"
      >
        <motion.div
          className="absolute top-4 right-12"
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: {
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            },
            scale: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <Sparkles className="w-5 h-5 text-emerald-400/50" />
        </motion.div>
        <motion.div
          className="absolute bottom-12 left-8"
          animate={{
            rotate: -360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: {
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            },
            scale: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <Sparkles className="w-4 h-4 text-cyan-400/40" />
        </motion.div>
      </motion.div>
    )}
  </motion.div>
);

// Helper component for star rating
const Star = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);
