"use client";

import { motion, useAnimationFrame } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Target, Rocket, Globe, Clock, ChevronRight } from "lucide-react";

// Floating shape component with enhanced animation
const FloatingShape = ({
  delay = 0,
  className = "",
  style,
  shape = "circle",
}) => {
  const ref = useRef(null);

  useAnimationFrame((t) => {
    if (!ref.current) return;
    const rotate = (t / 120 + delay * 150) % 360;
    const y = Math.sin(t / 1500 + delay) * 30;
    const x = Math.cos(t / 2200 + delay) * 25;
    ref.current.style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg)`;
  });

  const shapeStyles = {
    circle: "rounded-full",
    diamond: "rotate-45",
    triangle: "rotate-0",
    hexagon: "rotate-0",
  };

  return (
    <div
      ref={ref}
      className={`${className} ${shapeStyles[shape]} transition-all duration-1000`}
      style={style}
    />
  );
};

export default function AboutSection1({
  setup,
  gallery,
  aboutContent,
  services,
}) {
  const [current, setCurrent] = useState(0);
  const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL;

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
    return <i className="fa-solid fa-concierge-bell  text-xl"></i>;
  }

  const floatingShapes = [
    {
      id: 1,
      size: 60,
      x: "5%",
      y: "20%",
      duration: 28,
      shape: "circle",
      color: "from-blue-400/20 to-cyan-400/10",
    },
    {
      id: 2,
      size: 80,
      x: "85%",
      y: "70%",
      duration: 32,
      shape: "diamond",
      color: "from-purple-400/20 to-pink-400/10",
    },
    {
      id: 3,
      size: 70,
      x: "15%",
      y: "80%",
      duration: 26,
      shape: "triangle",
      color: "from-emerald-400/20 to-green-400/10",
    },
    {
      id: 4,
      size: 90,
      x: "90%",
      y: "15%",
      duration: 30,
      shape: "hexagon",
      color: "from-amber-400/20 to-orange-400/10",
    },
    {
      id: 5,
      size: 65,
      x: "75%",
      y: "25%",
      duration: 34,
      shape: "circle",
      color: "from-indigo-400/20 to-blue-400/10",
    },
  ];

  return (
    <section className="relative py-4 md:py-4 overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Enhanced Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-50" />

        {/* Subtle Dots Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#00000005_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />

        {/* Floating Shapes with different styles */}
        {floatingShapes.map((shape) => (
          <FloatingShape
            key={shape.id}
            delay={shape.id * 0.5}
            className={`absolute border border-white/20 bg-gradient-to-br ${shape.color}`}
            style={{
              width: shape.size,
              height: shape.size,
              left: shape.x,
              top: shape.y,
              clipPath:
                shape.shape === "triangle"
                  ? "polygon(50% 0%, 0% 100%, 100% 100%)"
                  : shape.shape === "hexagon"
                  ? "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
                  : "none",
            }}
            shape={shape.shape}
          />
        ))}

        {/* Large Gradient Orbs with slower animation */}
        <motion.div
          className="absolute top-1/4 left-10 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-br from-blue-200/10 to-cyan-200/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 40, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-1/4 right-10 w-56 h-56 md:w-80 md:h-80 bg-gradient-to-br from-purple-200/10 to-pink-200/5 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            y: [0, 50, 0],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          {/* Left Side - Content */}
          <div className="lg:w-3/5">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Pioneering{" "}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Digital Excellence
                </span>{" "}
                Since 2010
              </h2>

              <div className="space-y-4">
                <p className="text-gray-700 text-lg leading-relaxed">
                  {aboutContent?.text || "this is about text area"}
                </p>
                <p className="text-xl font-semibold text-gray-700 italic tracking-wide">
                  {setup?.company_moto || "This is the company moto area"}
                </p>
              </div>
            </motion.div>

            {/* Mission & Vision */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-10"
            >
              <div className="grid md:grid-cols-2 gap-6">
                {/* Mission */}
                <motion.div
                  whileHover={{ scale: 1.02, y: -3 }}
                  className="relative group bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl border border-blue-200/50 shadow-lg"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Our Mission
                    </h3>
                  </div>
                  <p
                    className="text-gray-700"
                    dangerouslySetInnerHTML={{
                      __html: aboutContent?.mission || "this is mission area",
                    }}
                  ></p>
                </motion.div>

                {/* Vision */}
                <motion.div
                  whileHover={{ scale: 1.02, y: -3 }}
                  className="relative group bg-gradient-to-br from-purple-50 to-white p-6 rounded-2xl border border-purple-200/50 shadow-lg"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl">
                      <Globe className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Our Vision
                    </h3>
                  </div>
                  <p
                    className="text-gray-700"
                    dangerouslySetInnerHTML={{
                      __html: aboutContent?.vision || "this is vision area",
                    }}
                  ></p>
                </motion.div>
              </div>
            </motion.div>

            {/* Core Values */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-10"
            >
              <div className="flex items-center gap-3 mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  Core Values
                </h3>
                <div className="h-px flex-1 bg-gradient-to-r from-gray-300 to-transparent" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {aboutContent?.core_values?.map((value, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    whileHover={{ scale: 1.03, y: -2 }}
                    className="bg-white/80 backdrop-blur-sm border border-gray-300/50 rounded-xl p-4 hover:border-gray-400/50 transition-all shadow-sm hover:shadow-md"
                  >
                    <div
                      className={`inline-flex p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg mb-3`}
                    >
                      <div className="text-white">
                        {getFAIcon(value.icon_class || "fa-solid fa-gem")}
                      </div>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {value.title}
                    </h4>
                    <p className="text-sm text-gray-600">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Side - Image Gallery */}
          <div className="lg:w-2/5 relative">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, x: 50 }}
              whileInView={{ scale: 1, opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Main Image Container */}
              <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
                {/* Background slideshow */}
                {galleryImages.map((img, index) => (
                  <motion.img
                    key={index}
                    src={img}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{
                      opacity: current === index ? 1 : 0,
                      scale: current === index ? 1 : 1.1,
                    }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ zIndex: current === index ? 2 : 1 }}
                  />
                ))}

                {/* Overlay Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-3" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/10 z-3" />

                {/* Floating Decorative Element */}
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    y: [0, -15, 0],
                  }}
                  transition={{
                    rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  }}
                  className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 backdrop-blur-sm rounded-xl border border-white/20 p-2 z-10"
                >
                  <Rocket className="w-full h-full text-blue-600" />
                </motion.div>

                {/* Image Indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {galleryImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrent(idx)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        current === idx
                          ? "bg-white w-6"
                          : "bg-white/40 hover:bg-white/60"
                      }`}
                    />
                  ))}
                </div>

                {/* Floating Badge */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="absolute bottom-4 right-4 z-10"
                >
                  <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-gray-300/50 shadow-lg">
                    <Clock className="w-3 h-3 text-gray-700" />
                    <span className="text-xs font-semibold text-gray-800">
                      Since 2010
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Floating Experience Card */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute -bottom-4 -left-4 bg-gradient-to-br from-blue-600 to-cyan-500 text-white p-5 rounded-2xl shadow-2xl border border-white/20"
              >
                <div className="text-2xl font-bold">14+ Years</div>
                <div className="text-sm font-medium">Of Excellence</div>
              </motion.div>

              {/* Services List */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="mt-8 space-y-3"
              >
                {services?.map((service, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 + idx * 0.1, duration: 0.4 }}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-300/50 shadow-sm"
                  >
                    <span className="text-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white px-2 py-1 rounded-lg ">
                      {getFAIcon(service.icon_class)}
                    </span>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">
                        {service.title}
                      </div>
                      <div className="text-sm text-gray-600">
                        {service.short_description}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-blue-500" />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        ></motion.div>
      </div>
    </section>
  );
}
