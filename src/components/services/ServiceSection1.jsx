"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  ShieldCheck,
  Stars,
  Globe2,
  Code,
  Palette,
  Cloud,
  Smartphone,
  Database,
  Server,
  Zap,
  TrendingUp,
  Award,
  Users,
  Clock,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Tag,
} from "lucide-react";
import styles from "./service.module.css";

export default function ServicesSection1() {
  const [activeService, setActiveService] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollContainerRef = useRef(null);

  // Define services array FIRST
  const services = [
    {
      id: 1,
      icon: <Code className="w-6 h-6" />,
      title: "Web Development",
      description:
        "Custom websites and web applications built with modern frameworks for optimal performance and scalability.",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80",
      color: "from-blue-500 to-cyan-400",
      tags: ["React", "Next.js", "Node.js"],
    },
    {
      id: 2,
      icon: <Palette className="w-6 h-6" />,
      title: "UI/UX Design",
      description:
        "User-centered design solutions that enhance engagement and drive conversions with beautiful interfaces.",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=400&q=80",
      color: "from-purple-500 to-pink-400",
      tags: ["Figma", "Adobe XD", "Prototyping"],
    },
    {
      id: 3,
      icon: <Cloud className="w-6 h-6" />,
      title: "Cloud Solutions",
      description:
        "Scalable cloud infrastructure and migration services for enhanced security and performance.",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80",
      color: "from-emerald-500 to-green-400",
      tags: ["AWS", "Azure", "Google Cloud"],
    },
    {
      id: 4,
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile Apps",
      description:
        "Cross-platform mobile applications with native performance and seamless user experience.",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=400&q=80",
      color: "from-orange-500 to-amber-400",
      tags: ["React Native", "Flutter", "iOS/Android"],
    },
    {
      id: 5,
      icon: <Database className="w-6 h-6" />,
      title: "Database Management",
      description:
        "Efficient database design, optimization, and management solutions for high-performance applications.",
      image:
        "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=400&q=80",
      color: "from-red-500 to-pink-400",
      tags: ["MySQL", "MongoDB", "PostgreSQL"],
    },
    {
      id: 6,
      icon: <Server className="w-6 h-6" />,
      title: "DevOps & CI/CD",
      description:
        "Automated deployment pipelines and infrastructure as code for reliable software delivery.",
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=400&q=80",
      color: "from-indigo-500 to-blue-400",
      tags: ["Docker", "Kubernetes", "Jenkins"],
    },
    {
      id: 7,
      icon: <Zap className="w-6 h-6" />,
      title: "Performance Optimization",
      description:
        "Website and application optimization for speed, SEO, and better user experience.",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80",
      color: "from-yellow-500 to-orange-400",
      tags: ["Speed", "SEO", "Optimization"],
    },
    {
      id: 8,
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Security Solutions",
      description:
        "Comprehensive security audits and implementation to protect your digital assets.",
      image:
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=400&q=80",
      color: "from-gray-600 to-gray-400",
      tags: ["Security", "Audit", "Protection"],
    },
    {
      id: 9,
      icon: <Sparkles className="w-6 h-6" />,
      title: "Digital Marketing",
      description:
        "Strategic digital marketing campaigns to boost your online presence and conversions.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80",
      color: "from-pink-500 to-rose-400",
      tags: ["SEO", "Social Media", "PPC"],
    },
    {
      id: 10,
      icon: <Globe2 className="w-6 h-6" />,
      title: "E-commerce Solutions",
      description:
        "Custom e-commerce platforms with seamless payment integration and inventory management.",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=400&q=80",
      color: "from-teal-500 to-cyan-400",
      tags: ["Shopify", "WooCommerce", "Custom"],
    },
    {
      id: 11,
      icon: <Stars className="w-6 h-6" />,
      title: "AI & Machine Learning",
      description:
        "Intelligent solutions powered by artificial intelligence and machine learning algorithms.",
      image:
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=400&q=80",
      color: "from-violet-500 to-purple-400",
      tags: ["AI", "ML", "Data Science"],
    },
    {
      id: 12,
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Business Analytics",
      description:
        "Data-driven insights and analytics to help make informed business decisions.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80",
      color: "from-amber-500 to-yellow-400",
      tags: ["Analytics", "BI", "Reporting"],
    },
  ];

  // Then use services in calculations
  const servicesPerPage = 6;
  const totalPages = Math.ceil(services.length / servicesPerPage);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // REMOVED AUTO SCROLL - Now manual scrolling only

  const topProducts = [
    {
      id: 1,
      name: "Enterprise CMS",
      description: "Scalable content management system",
      rating: 4.9,
      users: "2.5k+",
      image:
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=100&q=80",
      color: "from-blue-500 to-cyan-400",
    },
    {
      id: 2,
      name: "E-Commerce Suite",
      description: "Complete online store solution",
      rating: 4.8,
      users: "1.8k+",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w-100&q=80",
      color: "from-purple-500 to-pink-400",
    },
    {
      id: 3,
      name: "Mobile Platform",
      description: "Cross-platform mobile framework",
      rating: 4.7,
      users: "3.2k+",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=100&q=80",
      color: "from-emerald-500 to-green-400",
    },
    {
      id: 4,
      name: "Analytics Dashboard",
      description: "Real-time business intelligence",
      rating: 4.9,
      users: "1.5k+",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=100&q=80",
      color: "from-orange-500 to-amber-400",
    },
  ];

  // REMOVED quickLinks array as requested

  const currentServices = isMobile
    ? services.slice(
        currentPage * servicesPerPage,
        (currentPage + 1) * servicesPerPage
      )
    : services;

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <section className="relative py-20 bg-gradient-to-b from-gray-900 via-black to-gray-900">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-pink-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            y: [0, 80, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-semibold text-white">
              Our Expertise
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Comprehensive{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore our wide range of professional services designed to meet
            your business needs
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 relative">
          {/* Left Side - Services Cards - Full height scrollable container */}
          <div className="lg:w-3/4 min-h-full" id="services-content">
            {isMobile ? (
              // Mobile - Paginated Cards
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {currentServices.map((service) => (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -5 }}
                      className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all h-full"
                    >
                      {/* Service Image */}
                      <div className="relative h-40 mb-4 rounded-xl overflow-hidden">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-20`}
                        />
                        <div
                          className={`absolute top-3 right-3 p-2 rounded-lg bg-gradient-to-br ${service.color}`}
                        >
                          {service.icon}
                        </div>
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {service.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {service.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {service.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center justify-center gap-4 mt-8">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 0}
                    className={`p-2 rounded-full border ${
                      currentPage === 0
                        ? "border-gray-800 text-gray-600 cursor-not-allowed"
                        : "border-white/20 text-white hover:bg-white/5"
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }).map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentPage(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          currentPage === idx
                            ? "bg-gradient-to-r from-blue-500 to-purple-500 w-6"
                            : "bg-gray-700 hover:bg-gray-600"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages - 1}
                    className={`p-2 rounded-full border ${
                      currentPage === totalPages - 1
                        ? "border-gray-800 text-gray-600 cursor-not-allowed"
                        : "border-white/20 text-white hover:bg-white/5"
                    }`}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ) : (
              // Desktop - MANUALLY Scrollable Cards with Custom Scrollbar
              <div
                ref={scrollContainerRef}
                className={`grid grid-cols-1 sm:grid-cols-2 gap-6 pr-4 ${styles.scrollContainer}`}
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(255, 255, 255, 0.2) transparent",
                }}
              >
                {services.map((service) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                    className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all h-fit"
                  >
                    <div className="flex gap-4">
                      {/* Service Image */}
                      <div className="relative w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-20`}
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div
                              className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${service.color} mb-2`}
                            >
                              {service.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-white">
                              {service.title}
                            </h3>
                          </div>
                        </div>

                        <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                          {service.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {service.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Right Sidebar - Only Top Products Card */}
          <div className="lg:w-1/4">
            <div className="sticky top-24 self-start">
              {/* Top Products Card with Images */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
              >
                <div className="flex items-center gap-2 mb-6">
                  <Award className="w-5 h-5 text-yellow-400" />
                  <h3 className="text-lg font-semibold text-white">
                    Top Products
                  </h3>
                </div>

                <div className="space-y-4">
                  {topProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      whileHover={{ x: 5 }}
                      className="group cursor-pointer"
                    >
                      <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all">
                        {/* Product Image */}
                        <div className="relative w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-30`}
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-white group-hover:text-blue-400 transition-colors truncate">
                            {product.name}
                          </h4>
                          <p className="text-xs text-gray-400 truncate">
                            {product.description}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="flex items-center gap-1 text-sm text-yellow-400">
                            <Stars className="w-3 h-3 fill-current" />
                            <span>{product.rating}</span>
                          </div>
                          <div className="text-xs text-gray-400">
                            {product.users}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Stats Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mt-6"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-400" />
                      <span className="text-sm text-gray-300">
                        Clients Served
                      </span>
                    </div>
                    <div className="text-xl font-bold text-white">500+</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-purple-400" />
                      <span className="text-sm text-gray-300">Projects</span>
                    </div>
                    <div className="text-xl font-bold text-white">1000+</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-yellow-400" />
                      <span className="text-sm text-gray-300">
                        Success Rate
                      </span>
                    </div>
                    <div className="text-xl font-bold text-white">98%</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        ></motion.div>
      </div>
    </section>
  );
}
