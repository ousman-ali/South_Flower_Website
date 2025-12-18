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
import Link from "next/link";

export default function ServicesSection1({ services, products }) {
  const [activeService, setActiveService] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollContainerRef = useRef(null);

  function getFAIcon(iconName) {
    if (
      typeof iconName === "string" &&
      iconName.trim() !== "" &&
      (iconName.startsWith("fa ") || // "fa fa-facebook"
        iconName.startsWith("fa-") || // "fa-facebook"
        iconName.startsWith("fas ") || // "fas fa-user"
        iconName.startsWith("fas-") || // "fas-user"
        iconName.startsWith("fab ") || // "fab fa-instagram"
        iconName.startsWith("fab-") || // "fab-instagram"
        iconName.startsWith("far ") || // regular icons
        iconName.startsWith("far-"))
    ) {
      // VALID → return the icon directly
      return <i className={`${iconName} text-xl`}></i>;
    }

    // INVALID → fallback icon
    return <i className="fa-solid fa-concierge-bell  text-xl"></i>;
  }

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
                          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${service.banner_image}`}
                          alt={service.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-400 opacity-20`}
                        />
                        <div
                          className={`absolute top-3 right-3 p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400`}
                        >
                          {getFAIcon(service.icon_class)}
                        </div>
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {service.title.length > 50
                          ? service.title.slice(0, 50) + " ..."
                          : service.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {service.short_description.length > 100
                          ? service.short_description.slice(0, 100) + " ..."
                          : service.short_description}
                      </p>
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
                          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${service.banner_image}`}
                          alt={service.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-400 opacity-20`}
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div
                              className={`inline-flex p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 mb-2`}
                            >
                              {getFAIcon(service.icon_class)}
                            </div>
                            <h3 className="text-xl font-semibold text-white">
                              {service.title.length > 50
                                ? service.title.slice(0, 50) + " ..."
                                : service.title}
                            </h3>
                          </div>
                        </div>

                        <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                          {service.short_description.length > 100
                            ? service.short_description.slice(0, 100) + " ..."
                            : service.short_description}
                        </p>
                        <Link
                          href={`/service/${service.slug}`}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg 
                            bg-gradient-to-r from-gray-700 to-cyan-500 
                            text-white font-medium shadow-md 
                            hover:shadow-lg hover:scale-[1.03] transition-all"
                        >
                          Details
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Right Sidebar - Only Top Products Card */}
          <div className="lg:w-1/4">
            <div className="sticky top-20 self-start">
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
                  {products.map((product) => (
                    <motion.div
                      key={product.id}
                      whileHover={{ x: 5 }}
                      className="group cursor-pointer"
                    >
                      <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all">
                        {/* Product Image */}
                        <div className="relative w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden">
                          <img
                            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${product.banner_image}`}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                          <div
                            className={`absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-400 opacity-30`}
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
                          <div className="flex items-center gap-1 text-sm text-blue-400">
                            <ChevronRight className="w-3 h-3 fill-current" />
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
                    <div className="text-xl font-bold text-white">100%</div>
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
