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
  ShoppingCart,
  Tag,
} from "lucide-react";
import Link from "next/link";

export default function ServiceDetails({ service, products, relatedServices }) {
  const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_URL || "";

  // State for zoom functionality
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // State for image gallery
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

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
    setCurrentImageIndex((prev) => (prev + 1) % service.allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? service.allImages.length - 1 : prev - 1
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

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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
                    href="/service"
                    className="hover:text-white transition-colors"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <ChevronRight className="w-4 h-4" />
                </li>
                <li className="text-white">{service.title}</li>
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
                      src={service.allImages[currentImageIndex]}
                      alt={service.title}
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
                    {service.allImages.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          currentImageIndex === index
                            ? "border-blue-500 ring-2 ring-blue-500/30"
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

            {/* Service Header */}
            <div className="mb-8">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-4xl font-bold mb-2">{service.title}</h1>
                  <div className="flex items-center gap-4 text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(service.created_at)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 mb-6">
                  {service.short_description}
                </p>
                <div
                  className="text-gray-300"
                  dangerouslySetInnerHTML={{
                    __html: service.description,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 space-y-6">
              {/* Related Services */}
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-blue-400" />
                  Related Services
                </h3>
                <div className="space-y-4">
                  {relatedServices.map((service) => (
                    <a
                      key={service.id}
                      href={`/services/${service.id}`}
                      className="group block"
                    >
                      <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-800/50 transition-all">
                        <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                          <img
                            src={`${IMAGE_BASE_URL}/${service.banner_image}`}
                            alt={service.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-white group-hover:text-blue-400 transition-colors truncate">
                            {service.title}
                          </h4>
                          <p className="text-sm text-gray-400 truncate">
                            {service.short_description}
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

              {/* Related Products */}
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-green-400" />
                  Top Products
                </h3>
                <div className="space-y-4">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-800/50 transition-all"
                    >
                      <div className="relative w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden">
                        <img
                          src={`${IMAGE_BASE_URL}/${product.banner_image}`}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-white truncate">
                          {product.name}
                        </h4>
                        <p className="text-xs text-gray-400 truncate">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/product">
                  <button className="mt-6 w-full py-3 bg-gray-700/50 hover:bg-gray-700 rounded-xl transition-colors cursor-pointer">
                    View All Products
                  </button>
                </Link>
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
              {currentImageIndex + 1} / {service.allImages.length}
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
                src={service.allImages[currentImageIndex]}
                alt={`Gallery ${currentImageIndex + 1}`}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
            </motion.div>

            {/* Thumbnails */}
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
              {service.allImages.map((img, index) => (
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
