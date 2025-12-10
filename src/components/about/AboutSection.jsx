"use client";

import { motion, useAnimationFrame } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import {
  Target,
  Rocket,
  Globe,
  Zap,
  Sparkles,
  TrendingUp,
  Lightbulb,
  Clock,
} from "lucide-react";

// Floating shape component
const FloatingShape = ({ delay = 0, className = "", style }) => {
  const ref = useRef(null);

  useAnimationFrame((t) => {
    if (!ref.current) return;
    const rotate = (t / 60 + delay * 100) % 360;
    const y = Math.sin(t / 1200 + delay) * 25;
    const x = Math.cos(t / 1800 + delay) * 20;
    ref.current.style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg)`;
  });

  return <div ref={ref} className={className} style={style} />;
};

export default function AboutSection({ setup, gallery, stats, aboutContent }) {
  const [current, setCurrent] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL;

  console.log("aboutContent", aboutContent);

  const galleryImages =
    gallery?.flatMap((album) =>
      album.images.map((img) => `${IMAGE_URL}/${img.image}`)
    ) || [];

  // Auto change images every 4 seconds
  useEffect(() => {
    if (!galleryImages.length) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % galleryImages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [galleryImages.length]);

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
    return <i className="fa-solid fa-circle-exclamation text-xl"></i>;
  }

  const values = [
    {
      icon: <Lightbulb />,
      title: "Innovation",
      desc: "Pushing boundaries with creative solutions",
    },
    {
      icon: <Sparkles />,
      title: "Excellence",
      desc: "Delivering quality beyond expectations",
    },
    {
      icon: <TrendingUp />,
      title: "Growth",
      desc: "Continuous improvement and learning",
    },
    {
      icon: <Zap />,
      title: "Agility",
      desc: "Adapting quickly to changing needs",
    },
  ];

  const floatingShapes = [
    { id: 1, size: 80, x: "10%", y: "30%", duration: 25 },
    { id: 2, size: 60, x: "85%", y: "60%", duration: 30 },
    { id: 3, size: 100, x: "15%", y: "75%", duration: 28 },
    { id: 4, size: 70, x: "90%", y: "25%", duration: 32 },
    { id: 5, size: 90, x: "70%", y: "15%", duration: 26 },
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        {/* Floating Shapes */}
        {floatingShapes.map((shape) => (
          <FloatingShape
            key={shape.id}
            delay={shape.id * 0.5}
            className="absolute rounded-full bg-gradient-to-br from-gray-200/30 to-gray-300/20 border border-gray-300/10"
            style={{
              width: shape.size,
              height: shape.size,
              left: shape.x,
              top: shape.y,
            }}
          />
        ))}

        {/* Large Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-gray-200/20 to-gray-300/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-gray-300/20 to-gray-200/10 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left Side - Image Gallery at Top & Core Values at Bottom */}
          <div className="lg:w-2/5 flex flex-col gap-12">
            {/* Image Gallery at Top */}
            <div className="relative">
              <motion.div
                initial={{ scale: 0.8, opacity: 0, x: -50 }}
                whileInView={{ scale: 1, opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                {/* Main Image Container */}
                <div className="relative w-full h-[500px] rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
                  {/* Background crossfading slideshow */}
                  {galleryImages.map((img, index) => (
                    <motion.img
                      key={index}
                      src={img}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{
                        opacity: current === index ? 1 : 0,
                        scale: current === index ? 1 : 1.1,
                      }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{ zIndex: current === index ? 2 : 1 }}
                    />
                  ))}

                  {/* Light Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent z-3" />

                  {/* Floating Decorative Elements */}
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                      y: [0, -20, 0],
                    }}
                    transition={{
                      rotate: {
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      },
                      y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                    }}
                    className="absolute top-6 right-6 w-16 h-16 bg-gradient-to-br from-gray-700/20 to-gray-600/20 backdrop-blur-sm rounded-2xl border border-gray-300/30 p-3 z-10"
                  >
                    <Rocket className="w-full h-full text-gray-700" />
                  </motion.div>

                  {/* Image Indicator Dots */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {galleryImages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          current === idx
                            ? "bg-gradient-to-r from-gray-700 to-gray-600 w-8"
                            : "bg-gray-400/60 hover:bg-gray-500/60"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Floating Text */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute bottom-6 right-6 z-10"
                  >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-300/50 shadow-lg">
                      <Clock className="w-4 h-4 text-gray-700" />
                      <span className="text-sm font-semibold text-gray-800">
                        Since 2010
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* Floating Stats Card */}
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="absolute -bottom-6 -right-6 bg-gradient-to-br from-gray-700 to-gray-600 text-white p-6 rounded-2xl shadow-2xl border border-gray-300/30"
                >
                  <div className="text-3xl font-bold">14+</div>
                  <div className="text-sm font-medium">Years Experience</div>
                </motion.div>
              </motion.div>
            </div>

            {/* Core Values at Bottom */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Core Values
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {values.map((value, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 * idx }}
                    whileHover={{ scale: 1.05, y: -3 }}
                    className="bg-white/80 backdrop-blur-sm border border-gray-300/50 rounded-xl p-4 text-center group hover:border-gray-400/50 transition-all shadow-xl"
                  >
                    <div className="inline-flex p-3 bg-gradient-to-br from-gray-100 to-gray-50 rounded-lg mb-3 group-hover:from-gray-200 group-hover:to-gray-100 border border-gray-300/30">
                      <div className="text-gray-700 group-hover:text-gray-900">
                        {value.icon}
                      </div>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {value.title}
                    </h4>
                    <p className="text-sm text-gray-600">{value.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Side - Main Content */}
          <div className="lg:w-3/5">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-gray-100 to-gray-50 border border-gray-300 shadow-sm">
                <Sparkles className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-semibold text-gray-700">
                  About Us
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Empowering{" "}
                <span className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                  Innovation
                </span>{" "}
                Worldwide
              </h2>

              <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-3xl">
                We are a team of passionate innovators dedicated to creating
                transformative solutions that drive growth, inspire change, and
                shape the future of technology across global markets.
              </p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
            >
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative group"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-300/20 to-transparent rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                  <div className="relative bg-white/80 backdrop-blur-sm border border-gray-300/50 rounded-2xl p-6 text-center shadow-lg">
                    <div
                      className={`inline-flex p-3 bg-gradient-to-br from-gray-600 to-gray-500 rounded-xl mb-3`}
                    >
                      <div className="text-white">
                        {getFAIcon(stat.icon_class)}
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-gray-600 text-sm">{stat.name}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Mission & Vision Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid md:grid-cols-2 gap-6 mb-12"
            >
              {/* Mission Card */}
              <motion.div
                onHoverStart={() => setHoveredCard("mission")}
                onHoverEnd={() => setHoveredCard(null)}
                whileHover={{ scale: 1.02, y: -5 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-400/20 to-gray-300/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-2xl border border-gray-300/50 shadow-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-gradient-to-br from-gray-700 to-gray-600 rounded-xl">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Our Mission
                    </h3>
                  </div>
                  <p
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: aboutContent?.mission || "this is mission area",
                    }}
                  ></p>
                </div>
              </motion.div>

              {/* Vision Card */}
              <motion.div
                onHoverStart={() => setHoveredCard("vision")}
                onHoverEnd={() => setHoveredCard(null)}
                whileHover={{ scale: 1.02, y: -5 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-500/20 to-gray-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                <div className="relative bg-white/90 backdrop-blur-sm p-8 rounded-2xl border border-gray-300/50 shadow-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Our Vision
                    </h3>
                  </div>
                  <p
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: aboutContent?.vision || "this is vision area",
                    }}
                  ></p>
                </div>
              </motion.div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12"
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(107, 114, 128, 0.2)",
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-gray-700 to-gray-800 text-white font-semibold rounded-xl shadow-lg flex items-center gap-3 group hover:shadow-xl transition-shadow"
              >
                Learn More About Us
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="group-hover:translate-x-1 transition-transform"
                >
                  →
                </motion.span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
