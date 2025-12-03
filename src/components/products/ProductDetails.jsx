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
  Award,
  Star,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Package,
  Layers,
  Cpu,
  Shield,
  Zap,
  TrendingUp,
  Users as UsersIcon,
} from "lucide-react";

// Mock data for the product - you can replace this with actual data from props/API
const productData = {
  id: 1,
  title: "Enterprise CMS Platform",
  category: "Software Product",
  shortDescription:
    "A powerful content management system designed for large-scale enterprises with advanced features and scalability.",
  longDescription: `
    Our Enterprise CMS Platform is the ultimate solution for organizations that need robust content management capabilities. Built with cutting-edge technology, it offers unparalleled performance, security, and scalability.

    <h3>Key Benefits:</h3>
    <ul>
      <li>Seamless integration with existing systems</li>
      <li>Advanced user permission management</li>
      <li>Built-in SEO optimization tools</li>
      <li>Multi-language support</li>
      <li>Real-time collaboration features</li>
      <li>Cloud-based deployment options</li>
    </ul>

    <h3>Technical Specifications:</h3>
    <p>Built on a modern tech stack including React, Node.js, and MongoDB. Supports RESTful APIs, WebSocket connections, and can handle millions of requests per second with proper load balancing.</p>

    <h3>Use Cases:</h3>
    <ul>
      <li>Corporate websites and intranets</li>
      <li>E-learning platforms</li>
      <li>Digital publishing</li>
      <li>Government portals</li>
      <li>Multinational corporation sites</li>
    </ul>
  `,
  mainImage:
    "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=1200&q=80",
  images: [
    "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=800&q=80",
  ],
  price: "$4,999",
  discountedPrice: "$3,999",
  isOnSale: true,
  saleEnds: "2024-12-31",
  licenseType: "Annual Subscription",
  deliveryTime: "Instant Download",
  updatesIncluded: "12 months",
  supportIncluded: "Premium 24/7",
  rating: 4.9,
  reviews: 256,
  features: [
    { icon: <Cpu className="w-5 h-5" />, text: "High Performance" },
    { icon: <Shield className="w-5 h-5" />, text: "Enterprise Security" },
    { icon: <Layers className="w-5 h-5" />, text: "Scalable Architecture" },
    { icon: <Zap className="w-5 h-5" />, text: "Fast Deployment" },
    { icon: <UsersIcon className="w-5 h-5" />, text: "Multi-user Support" },
    { icon: <TrendingUp className="w-5 h-5" />, text: "Analytics Dashboard" },
  ],
  specifications: [
    { label: "Version", value: "3.2.1" },
    { label: "Last Updated", value: "March 2024" },
    { label: "File Size", value: "450 MB" },
    { label: "Database", value: "MySQL, MongoDB" },
    { label: "Languages", value: "10+" },
    { label: "Browser Support", value: "Chrome, Firefox, Safari, Edge" },
    { label: "Mobile Responsive", value: "Yes" },
    { label: "API Access", value: "REST & GraphQL" },
  ],
  tags: [
    "CMS",
    "Enterprise",
    "SaaS",
    "Cloud",
    "React",
    "Node.js",
    "MongoDB",
    "Scalable",
  ],
  status: "In Stock",
  stock: 150,
  location: "Worldwide",
  createdAt: "2024-01-15",
  updatedAt: "2024-03-20",
  downloads: "2.5k+",
  customers: "500+",
  satisfaction: "98%",
};

const relatedProducts = [
  {
    id: 2,
    title: "SEO Toolkit Pro",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80",
    description: "Complete SEO optimization package",
    price: "$2,499",
    rating: 4.7,
    category: "Marketing Tool",
  },
  {
    id: 3,
    title: "Analytics Dashboard",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80",
    description: "Real-time business intelligence",
    price: "$3,999",
    rating: 4.8,
    category: "Analytics",
  },
  {
    id: 4,
    title: "E-commerce Suite",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=400&q=80",
    description: "Complete online store solution",
    price: "$5,999",
    rating: 4.9,
    category: "E-commerce",
  },
];

const topServices = [
  {
    id: 1,
    title: "Web Development",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80",
    description: "Custom websites and web applications",
    price: "$5,000 - $50,000",
    rating: 4.8,
    category: "Technology",
  },
  {
    id: 2,
    title: "UI/UX Design",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=400&q=80",
    description: "User-centered design solutions",
    price: "$3,000 - $25,000",
    rating: 4.7,
    category: "Design",
  },
  {
    id: 3,
    title: "Mobile Apps",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=400&q=80",
    description: "Cross-platform mobile applications",
    price: "$10,000 - $80,000",
    rating: 4.9,
    category: "Mobile",
  },
];

export default function ProductDetails() {
  // State for zoom functionality
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // State for image gallery
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // State for favorites
  const [isFavorite, setIsFavorite] = useState(false);

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
    setCurrentImageIndex((prev) => (prev + 1) % productData.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? productData.images.length - 1 : prev - 1
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

  // Calculate sale percentage
  const calculateSalePercentage = () => {
    const original = parseFloat(
      productData.price.replace("$", "").replace(",", "")
    );
    const discounted = parseFloat(
      productData.discountedPrice.replace("$", "").replace(",", "")
    );
    return Math.round(((original - discounted) / original) * 100);
  };

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
                    href="/products"
                    className="hover:text-white transition-colors"
                  >
                    Products
                  </a>
                </li>
                <li>
                  <ChevronRight className="w-4 h-4" />
                </li>
                <li className="text-white">{productData.title}</li>
              </ol>
            </nav>

            {/* Main Image with Zoom */}
            <div className="mb-8">
              <div className="relative bg-gray-800 rounded-2xl overflow-hidden border border-gray-700">
                {/* Sale Badge */}
                {productData.isOnSale && (
                  <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-red-500 text-white font-bold rounded-full text-sm">
                    -{calculateSalePercentage()}%
                  </div>
                )}

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
                      src={productData.images[currentImageIndex]}
                      alt={productData.title}
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
                    {productData.images.map((img, index) => (
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

            {/* Product Header */}
            <div className="mb-8">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium">
                      {productData.category}
                    </span>
                    <span className="inline-block px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
                      {productData.licenseType}
                    </span>
                  </div>
                  <h1 className="text-4xl font-bold mb-2">
                    {productData.title}
                  </h1>
                  <div className="flex items-center gap-4 text-gray-400">
                    <span className="flex items-center gap-1">
                      <Package className="w-4 h-4" />
                      {productData.deliveryTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Updated: {formatDate(productData.updatedAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Shield className="w-4 h-4" />
                      {productData.supportIncluded}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`p-3 rounded-full border transition-all ${
                      isFavorite
                        ? "bg-red-500/20 border-red-500/50 text-red-400"
                        : "bg-gray-800 border-gray-700 hover:bg-gray-700"
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`}
                    />
                  </button>
                  <button className="p-3 rounded-full bg-gray-800 border border-gray-700 hover:bg-gray-700 transition-all">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Rating and Price */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-gray-800/50 rounded-xl">
                <div>
                  {renderStars(productData.rating)}
                  <p className="text-sm text-gray-400 mt-1">
                    {productData.reviews} reviews • {productData.downloads}{" "}
                    downloads
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-3">
                    {productData.isOnSale && (
                      <span className="text-2xl font-bold text-gray-400 line-through">
                        {productData.price}
                      </span>
                    )}
                    <span className="text-3xl font-bold text-white">
                      {productData.discountedPrice || productData.price}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">
                    {productData.isOnSale
                      ? "Sale ends " + formatDate(productData.saleEnds)
                      : "One-time payment"}
                  </p>
                </div>
              </div>
            </div>

            {/* Product Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Product Overview</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 mb-6">
                  {productData.shortDescription}
                </p>
                <div
                  className="text-gray-300"
                  dangerouslySetInnerHTML={{
                    __html: productData.longDescription,
                  }}
                />
              </div>
            </div>

            {/* Key Features */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {productData.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 bg-gray-800/30 rounded-xl hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      {feature.icon}
                    </div>
                    <span className="font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl">
                <div className="flex items-center gap-3 mb-2">
                  <UsersIcon className="w-6 h-6 text-blue-400" />
                  <h3 className="text-lg font-semibold">Customers</h3>
                </div>
                <div className="text-3xl font-bold">
                  {productData.customers}
                </div>
                <p className="text-sm text-gray-400 mt-1">
                  Active users worldwide
                </p>
              </div>

              <div className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/20 rounded-2xl">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-6 h-6 text-purple-400" />
                  <h3 className="text-lg font-semibold">Satisfaction</h3>
                </div>
                <div className="text-3xl font-bold">
                  {productData.satisfaction}
                </div>
                <p className="text-sm text-gray-400 mt-1">
                  Customer satisfaction rate
                </p>
              </div>

              <div className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm border border-green-500/20 rounded-2xl">
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="w-6 h-6 text-green-400" />
                  <h3 className="text-lg font-semibold">Downloads</h3>
                </div>
                <div className="text-3xl font-bold">
                  {productData.downloads}
                </div>
                <p className="text-sm text-gray-400 mt-1">
                  Total downloads to date
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 space-y-6">
              {/* Related Products */}
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Package className="w-5 h-5 text-blue-400" />
                  Related Products
                </h3>
                <div className="space-y-4">
                  {relatedProducts.map((product) => (
                    <a
                      key={product.id}
                      href={`/products/${product.id}`}
                      className="group block"
                    >
                      <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-800/50 transition-all">
                        <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.title}
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
                                {product.title}
                              </h4>
                            </div>
                            {product.isOnSale && (
                              <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded">
                                Sale
                              </span>
                            )}
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
                  <Award className="w-5 h-5 text-yellow-400" />
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
                          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-orange-500/20" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <span className="text-xs text-yellow-400 font-medium">
                                {service.category}
                              </span>
                              <h4 className="font-semibold text-white group-hover:text-yellow-400 transition-colors truncate">
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

              {/* Quick Info */}
              <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4">Product Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">License Type</span>
                    <span className="font-medium">
                      {productData.licenseType}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Delivery</span>
                    <span className="font-medium text-green-400">
                      {productData.deliveryTime}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Updates</span>
                    <span className="font-medium">
                      {productData.updatesIncluded}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Support</span>
                    <span className="font-medium">
                      {productData.supportIncluded}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status</span>
                    <span
                      className={`font-medium ${
                        productData.status === "In Stock"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {productData.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Share */}
              <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-6">Share This Product</h3>
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
              {currentImageIndex + 1} / {productData.images.length}
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
                src={productData.images[currentImageIndex]}
                alt={`Gallery ${currentImageIndex + 1}`}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
            </motion.div>

            {/* Thumbnails */}
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
              {productData.images.map((img, index) => (
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
