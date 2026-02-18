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
import Link from "next/link";

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
    <section className="relative py-10 bg-white">
      {/* subtle gray background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mb-4">
            Featured <span className="text-blue-600">Articles</span>
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
                    ? "bg-gray-700 border border-blue-200 shadow-sm"
                    : "bg-gray-700 border border-blue-200 hover:bg-gray-500"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${blog.banner_image}`}
                      alt={blog?.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-100 line-clamp-2">
                      {blog.title.length > 50
                        ? blog?.title.slice(0, 50) + " ..."
                        : blog?.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-blue-400 mt-1">
                      <span>{formatDate(blog?.created_at)}</span>
                      <span>•</span>
                      <span>{blog?.views_count || 0} views</span>
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
                  key={blog?.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-lg ${
                    !isMobile ? "lg:sticky lg:top-24" : ""
                  }`}
                >
                  {/* Image */}
                  <div className="relative h-[460px]">
                    <div className="h-[70%] relative">
                      <img
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${blog?.banner_image}`}
                        alt={blog?.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* 🔹 BOTTOM 20% — CONTENT */}
                    <div className="h-[30%] bg-gray-700 p-5 flex flex-col justify-between">
                      {/* Text block */}
                      <div>
                        <h2 className="text-lg md:text-xl font-semibold text-white line-clamp-1">
                          {blog?.title.length > 50
                            ? blog?.title.slice(0, 50) + " ..."
                            : blog?.title}
                        </h2>

                        <p className="text-sm text-gray-300 line-clamp-2 mt-1">
                          {blog?.excerpt.length > 80
                            ? blog?.excerpt.slice(0, 80) + " ..."
                            : blog?.excerpt}
                        </p>
                      </div>

                      {/* Time + Button */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2 text-xs text-blue-400">
                          <Calendar className="w-4 h-4" />
                          {formatDate(blog?.created_at)}
                        </div>

                        <Link
                          href={`/blog/${blog?.slug}`}
                          className="inline-flex items-center gap-1.5 bg-blue-400 hover:bg-blue-600 transition text-white px-4 py-2 rounded-md text-sm font-medium"
                        >
                          Read Full Article
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
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
