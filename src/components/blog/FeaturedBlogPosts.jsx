"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  ArrowRight,
  Eye,
  ChevronRight,
  Bookmark,
  Share2,
  Award,
} from "lucide-react";

const FeaturedBlogPosts = ({ featuredBlogs }) => {
  const [selectedBlog, setSelectedBlog] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <section className="relative py-20 bg-white">
      {/* subtle gray background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-gray-100 border border-gray-200">
            <Award className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-medium text-gray-700">
              Featured Articles
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Top <span className="text-emerald-600">Picks</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Handpicked articles with premium insights
          </p>
        </div>

        {/* GRID — this defines sticky boundary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 relative">
          {/* LEFT: Sidebar (NORMAL SCROLL) */}
          <div className="lg:col-span-1 space-y-4">
            {featuredBlogs.map((blog, index) => (
              <motion.div
                key={blog.id || index}
                whileHover={{ x: 5 }}
                onClick={() => setSelectedBlog(index)}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                  selectedBlog === index
                    ? "bg-emerald-50 border border-emerald-200 shadow-sm"
                    : "bg-white border border-gray-200 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${blog.banner_image}`}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
                      {blog.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                      <span>{formatDate(blog.created_at)}</span>
                      <span>•</span>
                      <span>{blog.views_count || 0} views</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* RIGHT: STICKY PREVIEW */}
          <div className="lg:col-span-2">
            {featuredBlogs.map((blog, index) => {
              if (index !== selectedBlog) return null;

              return (
                <motion.div
                  key={blog.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-lg ${
                    !isMobile ? "lg:sticky lg:top-24" : ""
                  }`}
                >
                  {/* Image */}
                  <div className="relative h-[460px]">
                    <img
                      src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${blog.banner_image}`}
                      alt={blog.title}
                      className="w-full h-[460px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    <div className="p-8">
                      <div className="flex justify-between mb-6">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setIsBookmarked(!isBookmarked)}
                            className="p-2 rounded-full bg-gray-100 border border-gray-200"
                          >
                            <Bookmark
                              className={`w-4 h-4 ${
                                isBookmarked
                                  ? "fill-amber-500 text-amber-500"
                                  : "text-gray-500"
                              }`}
                            />
                          </button>
                          <button className="p-2 rounded-full bg-gray-100 border border-gray-200">
                            <Share2 className="w-4 h-4 text-gray-500" />
                          </button>
                        </div>
                      </div>

                      <div className="flex gap-6 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          {blog.views_count || 0} views
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {formatDate(blog.created_at)}
                        </div>
                      </div>

                      <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        {blog.title}
                      </h2>

                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {blog.excerpt || blog.description}
                      </p>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium"
                      >
                        Read Full Article
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlogPosts;
