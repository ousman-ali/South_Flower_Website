"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Calendar,
  Award,
  Star,
  Eye,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";

export default function BlogDetails({
  blog,
  services,
  products,
  relatedBlogs,
}) {
  // State for zoom functionality
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // State for image gallery
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // State for favorites and bookmarks
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);

  // Ref for zoom container
  const zoomContainerRef = useRef(null);

  // Handle zoom in/out
  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 3));
    setIsZoomed(true);
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.5, 1));
    if (zoomLevel <= 1.5) setIsZoomed(false);
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setIsZoomed(false);
    setPosition({ x: 0, y: 0 });
  };

  // Handle mouse move for panning when zoomed
  const handleMouseMove = (e) => {
    if (!isZoomed || !zoomContainerRef.current) return;

    const container = zoomContainerRef.current;
    const rect = container.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setPosition({ x, y });
  };

  // Image gallery navigation
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % blog.allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? blog.allImages.length - 1 : prev - 1,
    );
  };

  // Open lightbox
  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  // Close lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;

      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:w-2/3">
            {/* Breadcrumb */}
            <nav className="mb-6">
              <ol className="flex items-center space-x-2 text-sm text-gray-400">
                <li>
                  <a href="/" className="hover:text-white transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <ChevronRight className="w-4 h-4" />
                </li>
                <li>
                  <a
                    href="/blog"
                    className="hover:text-white transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <ChevronRight className="w-4 h-4" />
                </li>
                <li className="text-white truncate">{blog?.title}</li>
              </ol>
            </nav>

            {/* Main Image with Zoom */}
            <div className="mb-8">
              <div className="relative bg-gray-800 rounded-2xl overflow-hidden border border-gray-700">
                {/* Zoom Controls */}
                <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                  <button
                    onClick={handleZoomOut}
                    disabled={zoomLevel <= 1}
                    className="p-2 bg-black/50 backdrop-blur-sm rounded-lg hover:bg-black/70 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <ZoomOut className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleZoomIn}
                    disabled={zoomLevel >= 3}
                    className="p-2 bg-black/50 backdrop-blur-sm rounded-lg hover:bg-black/70 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <ZoomIn className="w-5 h-5" />
                  </button>
                  {isZoomed && (
                    <button
                      onClick={handleResetZoom}
                      className="p-2 bg-black/50 backdrop-blur-sm rounded-lg hover:bg-black/70 transition-all"
                    >
                      <Maximize2 className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {/* Zoom Container */}
                <div
                  ref={zoomContainerRef}
                  className="relative w-full h-[400px] overflow-hidden cursor-zoom-in"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={() => isZoomed && handleResetZoom()}
                  onClick={() => openLightbox(0)}
                >
                  <motion.div
                    className="w-full h-full"
                    animate={{
                      scale: zoomLevel,
                      x: isZoomed ? `calc(50% - ${position.x}%)` : 0,
                      y: isZoomed ? `calc(50% - ${position.y}%)` : 0,
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <img
                      src={blog.allImages[currentImageIndex]}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* Zoom Overlay Instructions */}
                  {isZoomed && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-lg text-sm">
                      Drag to pan • Click to reset
                    </div>
                  )}
                </div>

                {/* Image Gallery Thumbnails */}
                <div className="p-4 bg-gray-900/50">
                  <div className="flex items-center gap-4 overflow-x-auto pb-2">
                    {blog?.allImages.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          currentImageIndex === index
                            ? "border-emerald-500 ring-2 ring-emerald-500/30"
                            : "border-transparent hover:border-gray-600"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Blog Header */}
            <div className="mb-8">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-medium">
                      {blog?.category?.title}
                    </span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">
                    {blog?.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(blog?.created_at).toLocaleDateString()}
                    </span>
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-blue-400" />
                      <div className="text-lg font-bold text-white">
                        {blog?.views_count}
                      </div>
                      <div className="text-xs text-gray-400">Views</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Blog Content */}
            <div className="mb-8">
              <div className="prose prose-invert max-w-none">
                <div className="mb-6">
                  <p className="text-xl text-gray-300 leading-relaxed">
                    {blog?.excerpt}
                  </p>
                </div>
                <div
                  className="text-gray-300 space-y-6"
                  dangerouslySetInnerHTML={{
                    __html: blog?.content || "",
                  }}
                />
              </div>
            </div>

            {/* Related Topics */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Related Topics</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relatedBlogs.map((topic, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 backdrop-blur-sm border border-emerald-500/20 rounded-xl hover:border-emerald-500/40 transition-all cursor-pointer"
                  >
                    <Link href={`/blog/${topic?.slug}`}>
                      <h3 className="font-semibold text-white">
                        {topic?.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-400 mt-1">
                      {topic?.excerpt}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 space-y-6">
              {/* Top Products */}
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-blue-400" />
                  Top Products
                </h3>
                <div className="space-y-4">
                  {products.map((product) => (
                    <a
                      key={product.id}
                      href={`/product/${product?.slug}`}
                      className="group block"
                    >
                      <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-800/50 transition-all">
                        <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                          <img
                            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${product?.banner_image}`}
                            alt={product?.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <span className="text-xs text-blue-400 font-medium">
                                {product?.category?.name}
                              </span>
                              <h4 className="font-semibold text-white group-hover:text-blue-400 transition-colors truncate">
                                {product?.name}
                              </h4>
                            </div>
                          </div>
                          <p className="text-sm text-gray-400 truncate">
                            {product?.description}
                          </p>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
                <a
                  href="/product"
                  className="mt-6 block text-center py-3 text-gray-400 hover:text-white transition-colors"
                >
                  View All Products →
                </a>
              </div>

              {/* Top Services */}
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Award className="w-5 h-5 text-emerald-400" />
                  Top Services
                </h3>
                <div className="space-y-4">
                  {services.map((service) => (
                    <a
                      key={service.id}
                      href={`/service/${service.slug}`}
                      className="group block"
                    >
                      <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-800/50 transition-all">
                        <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                          <img
                            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${service?.banner_image}`}
                            alt={service?.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h4 className="font-semibold text-white group-hover:text-emerald-400 transition-colors truncate">
                                {service?.title}
                              </h4>
                            </div>
                          </div>
                          <p className="text-sm text-gray-400 truncate">
                            {service?.short_description}
                          </p>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
                <a
                  href="/service"
                  className="mt-6 block text-center py-3 text-gray-400 hover:text-white transition-colors"
                >
                  View All Services →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 p-3 bg-black/50 rounded-full hover:bg-black/70 transition-all z-10"
              onClick={closeLightbox}
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              className="absolute left-6 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 rounded-full hover:bg-black/70 transition-all z-10"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              className="absolute right-6 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 rounded-full hover:bg-black/70 transition-all z-10"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Current Image Index */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-lg text-sm">
              {currentImageIndex + 1} / {blog.allImages.length}
            </div>

            {/* Main Image */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={blog.allImages[currentImageIndex]}
                alt={`Gallery ${currentImageIndex + 1}`}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
            </motion.div>

            {/* Thumbnails */}
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
              {blog.allImages.map((img, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                    currentImageIndex === index
                      ? "border-white"
                      : "border-transparent hover:border-gray-600"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
