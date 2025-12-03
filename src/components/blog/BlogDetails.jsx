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
  Heart,
  Share2,
  Calendar,
  Clock,
  User,
  Award,
  Star,
  Bookmark,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  MessageCircle,
  Eye,
  BookOpen,
  Sparkles,
  TrendingUp,
  ShoppingCart,
} from "lucide-react";

// Mock data for the blog - you can replace this with actual data from props/API
const blogData = {
  id: 1,
  title: "The Art of Flower Arranging: Creating Masterpieces in Your Garden",
  category: "Flower Arranging",
  excerpt:
    "Learn professional techniques for creating stunning floral displays that last longer and look beautiful in any setting.",
  content: `
    <p>Flower arranging is more than just putting flowers in a vase—it's an art form that combines creativity, technical skill, and an understanding of nature's beauty. In this comprehensive guide, we'll explore everything from basic principles to advanced techniques.</p>
    
    <h2>Understanding the Basics</h2>
    <p>Before diving into complex arrangements, it's essential to understand the fundamental principles that guide all successful floral designs.</p>
    
    <ul>
      <li>Change water every 2 days</li>
      <li>Recut stems every few days</li>
      <li>Keep away from direct sunlight and heat</li>
      <li>Use floral preservatives</li>
      <li>Remove wilting flowers promptly</li>
    </ul>
    
    <h2>Conclusion</h2>
    <p>Flower arranging is a skill that improves with practice. Start with simple arrangements and gradually challenge yourself with more complex designs. Remember, the most important element is your personal creativity and connection with the flowers.</p>
  `,
  author: {
    name: "Sarah Gardner",
    bio: "Master Florist with 15+ years of experience. Specializes in wedding and event floral design.",
    image:
      "https://images.unsplash.com/photo-1494790108755-2616c113a1c7?w=200&h=200&fit=crop",
    social: {
      instagram: "@sarahgardnerflowers",
      twitter: "@sarah_gardner",
      website: "sarahgardnerflowers.com",
    },
  },
  mainImage:
    "https://images.unsplash.com/photo-1563974313767-7d26570bb586?w=1200&h=600&fit=crop",
  images: [
    "https://images.unsplash.com/photo-1563974313767-7d26570bb586?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&h=500&fit=crop",
  ],
  publishDate: "March 15, 2024",
  readTime: "8 min read",
  views: "12.5K",
  comments: 42,
  likes: 156,
  tags: ["Flowers", "Arrangement", "Design", "Gardening", "DIY", "Seasonal"],
  relatedTopics: [
    "Floral Design",
    "Gardening Tips",
    "Seasonal Flowers",
    "Home Decor",
  ],
  difficulty: "Intermediate",
  materials: ["Fresh flowers", "Vase", "Floral scissors", "Floral foam"],
  rating: 4.8,
};

const topProducts = [
  {
    id: 1,
    name: "Premium Rose Seeds",
    description: "High-quality rose seeds for beautiful blooms",
    price: "$24.99",
    rating: 4.9,
    category: "Seeds",
    image:
      "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=100&h=100&fit=crop",
  },
  {
    id: 2,
    name: "Ceramic Plant Pots",
    description: "Handcrafted ceramic pots for indoor plants",
    price: "$34.99",
    rating: 4.8,
    category: "Pots",
    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=100&h=100&fit=crop",
  },
  {
    id: 3,
    name: "Organic Fertilizer",
    description: "Natural fertilizer for healthy plant growth",
    price: "$19.99",
    rating: 4.7,
    category: "Soil",
    image:
      "https://images.unsplash.com/photo-1600841541100-bf7835d5d3da?w=100&h=100&fit=crop",
  },
  {
    id: 4,
    name: "Gardening Tool Set",
    description: "Complete set of professional gardening tools",
    price: "$49.99",
    rating: 4.9,
    category: "Tools",
    image:
      "https://images.unsplash.com/photo-1577041241576-f4b964db30ee?w=100&h=100&fit=crop",
  },
];

const topServices = [
  {
    id: 1,
    title: "Garden Design Consultation",
    description: "Professional garden planning and design services",
    price: "$150 - $500",
    rating: 4.8,
    category: "Design",
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=100&h=100&fit=crop",
  },
  {
    id: 2,
    title: "Plant Maintenance",
    description: "Regular plant care and maintenance services",
    price: "$75 - $200",
    rating: 4.7,
    category: "Care",
    image:
      "https://images.unsplash.com/photo-1592892111427-bc0c1f0c4658?w=100&h=100&fit=crop",
  },
  {
    id: 3,
    title: "Landscaping Services",
    description: "Complete landscaping solutions for your garden",
    price: "$500 - $5000",
    rating: 4.9,
    category: "Landscaping",
    image:
      "https://images.unsplash.com/photo-1517191434949-5e90cd67d2b6?w=100&h=100&fit=crop",
  },
  {
    id: 4,
    title: "Floral Arrangement Workshops",
    description: "Learn flower arranging from experts",
    price: "$120 - $300",
    rating: 4.8,
    category: "Workshops",
    image:
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=100&h=100&fit=crop",
  },
];

export default function BlogDetails() {
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
    setCurrentImageIndex((prev) => (prev + 1) % blogData.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? blogData.images.length - 1 : prev - 1
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

  // Render stars
  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(rating)
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-700 text-gray-700"
            }`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-300">{rating.toFixed(1)}</span>
      </div>
    );
  };

  // Handle like action
  const handleLike = () => {
    setHasLiked(!hasLiked);
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
                    href="/blog"
                    className="hover:text-white transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <ChevronRight className="w-4 h-4" />
                </li>
                <li>
                  <a
                    href={`/blog/category/${blogData.category
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className="hover:text-white transition-colors"
                  >
                    {blogData.category}
                  </a>
                </li>
                <li>
                  <ChevronRight className="w-4 h-4" />
                </li>
                <li className="text-white truncate">{blogData.title}</li>
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
                  className="relative w-full h-[500px] overflow-hidden cursor-zoom-in"
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
                      src={blogData.images[currentImageIndex]}
                      alt={blogData.title}
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
                    {blogData.images.map((img, index) => (
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
                      {blogData.category}
                    </span>
                    <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium">
                      {blogData.difficulty}
                    </span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">
                    {blogData.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {blogData.publishDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {blogData.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {blogData.author.name}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleLike}
                    className={`p-3 rounded-full border transition-all ${
                      hasLiked
                        ? "bg-red-500/20 border-red-500/50 text-red-400"
                        : "bg-gray-800 border-gray-700 hover:bg-gray-700"
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${hasLiked ? "fill-current" : ""}`}
                    />
                  </button>
                  <button
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`p-3 rounded-full border transition-all ${
                      isBookmarked
                        ? "bg-blue-500/20 border-blue-500/50 text-blue-400"
                        : "bg-gray-800 border-gray-700 hover:bg-gray-700"
                    }`}
                  >
                    <Bookmark
                      className={`w-5 h-5 ${
                        isBookmarked ? "fill-current" : ""
                      }`}
                    />
                  </button>
                  <button className="p-3 rounded-full bg-gray-800 border border-gray-700 hover:bg-gray-700 transition-all">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Stats and Rating */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-gray-800/50 rounded-xl">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-blue-400" />
                    <div>
                      <div className="text-lg font-bold text-white">
                        {blogData.views}
                      </div>
                      <div className="text-xs text-gray-400">Views</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <div>
                      <div className="text-lg font-bold text-white">
                        {blogData.comments}
                      </div>
                      <div className="text-xs text-gray-400">Comments</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-red-400" />
                    <div>
                      <div className="text-lg font-bold text-white">
                        {blogData.likes}
                      </div>
                      <div className="text-xs text-gray-400">Likes</div>
                    </div>
                  </div>
                </div>
                <div>
                  {renderStars(blogData.rating)}
                  <p className="text-sm text-gray-400 mt-1">Article Rating</p>
                </div>
              </div>
            </div>

            {/* Blog Content */}
            <div className="mb-8">
              <div className="prose prose-invert max-w-none">
                <div className="mb-6">
                  <p className="text-xl text-gray-300 leading-relaxed">
                    {blogData.excerpt}
                  </p>
                </div>
                <div
                  className="text-gray-300 space-y-6"
                  dangerouslySetInnerHTML={{
                    __html: blogData.content,
                  }}
                />
              </div>
            </div>

            {/* Related Topics */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Related Topics</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {blogData.relatedTopics.map((topic, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 backdrop-blur-sm border border-emerald-500/20 rounded-xl hover:border-emerald-500/40 transition-all cursor-pointer"
                  >
                    <h3 className="font-semibold text-white">{topic}</h3>
                    <p className="text-sm text-gray-400 mt-1">
                      Explore more about this topic
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
                  {topProducts.map((product) => (
                    <a
                      key={product.id}
                      href={`/products/${product.id}`}
                      className="group block"
                    >
                      <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-800/50 transition-all">
                        <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <span className="text-xs text-blue-400 font-medium">
                                {product.category}
                              </span>
                              <h4 className="font-semibold text-white group-hover:text-blue-400 transition-colors truncate">
                                {product.name}
                              </h4>
                            </div>
                          </div>
                          <p className="text-sm text-gray-400 truncate">
                            {product.description}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm text-gray-300">
                                {product.rating}
                              </span>
                            </div>
                            <span className="text-sm font-medium text-green-400">
                              {product.price}
                            </span>
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
                <a
                  href="/products"
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
                  {topServices.map((service) => (
                    <a
                      key={service.id}
                      href={`/services/${service.id}`}
                      className="group block"
                    >
                      <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-800/50 transition-all">
                        <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <span className="text-xs text-emerald-400 font-medium">
                                {service.category}
                              </span>
                              <h4 className="font-semibold text-white group-hover:text-emerald-400 transition-colors truncate">
                                {service.title}
                              </h4>
                            </div>
                          </div>
                          <p className="text-sm text-gray-400 truncate">
                            {service.description}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm text-gray-300">
                                {service.rating}
                              </span>
                            </div>
                            <span className="text-sm font-medium text-blue-400">
                              {service.price}
                            </span>
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
                <a
                  href="/services"
                  className="mt-6 block text-center py-3 text-gray-400 hover:text-white transition-colors"
                >
                  View All Services →
                </a>
              </div>

              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4">Blog Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-emerald-400" />
                      <span className="text-sm text-gray-300">
                        Reading Time
                      </span>
                    </div>
                    <div className="text-lg font-bold text-white">
                      {blogData.readTime}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-blue-400" />
                      <span className="text-sm text-gray-300">Difficulty</span>
                    </div>
                    <div className="text-lg font-bold text-white">
                      {blogData.difficulty}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-yellow-400" />
                      <span className="text-sm text-gray-300">Rating</span>
                    </div>
                    <div className="text-lg font-bold text-white">
                      {blogData.rating}/5
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Share */}
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-6">Share This Article</h3>
                <div className="flex items-center justify-center gap-4">
                  {[
                    { icon: Facebook, color: "bg-blue-600", label: "Facebook" },
                    { icon: Twitter, color: "bg-sky-500", label: "Twitter" },
                    { icon: Linkedin, color: "bg-blue-700", label: "LinkedIn" },
                    {
                      icon: Instagram,
                      color: "bg-pink-600",
                      label: "Instagram",
                    },
                    { icon: Youtube, color: "bg-red-600", label: "YouTube" },
                  ].map((social) => (
                    <button
                      key={social.label}
                      className={`p-3 ${social.color} rounded-full hover:opacity-90 transition-opacity`}
                      aria-label={`Share on ${social.label}`}
                    >
                      <social.icon className="w-5 h-5" />
                    </button>
                  ))}
                </div>
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
              {currentImageIndex + 1} / {blogData.images.length}
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
                src={blogData.images[currentImageIndex]}
                alt={`Gallery ${currentImageIndex + 1}`}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
            </motion.div>

            {/* Thumbnails */}
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
              {blogData.images.map((img, index) => (
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
