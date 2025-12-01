"use client";

import { motion, useAnimationFrame } from "framer-motion";
import { Sparkles, ShieldCheck, Stars, Globe2 } from "lucide-react";
import { useRef } from "react";

// Floating shape component with continuous animation
const FloatingShape = ({ delay = 0, className = "", style }) => {
  const ref = useRef(null);

  useAnimationFrame((t) => {
    if (!ref.current) return;
    const rotate = (t / 50 + delay * 100) % 360;
    const y = Math.sin(t / 1000 + delay) * 30;
    const x = Math.cos(t / 1500 + delay) * 20;
    ref.current.style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg)`;
  });

  return <div ref={ref} className={className} style={style} />;
};

export default function ServicesSection() {
  const services = [
    {
      icon: <Sparkles size={32} />,
      title: "Premium Quality",
      desc: "We provide industry-leading quality with attention to detail and reliability.",
      gradient: "from-blue-500 to-cyan-400",
      glowColor: "bg-blue-500/20",
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "Trusted Solutions",
      desc: "Our work is trusted by top organizations for performance and excellence.",
      gradient: "from-emerald-500 to-green-400",
      glowColor: "bg-emerald-500/20",
    },
    {
      icon: <Stars size={32} />,
      title: "Innovation First",
      desc: "We bring creativity and modern technology into every project.",
      gradient: "from-purple-500 to-pink-400",
      glowColor: "bg-purple-500/20",
    },
    {
      icon: <Globe2 size={32} />,
      title: "Worldwide Reach",
      desc: "We deliver world-class solutions with global standards.",
      gradient: "from-orange-500 to-amber-400",
      glowColor: "bg-orange-500/20",
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-black/95 via-black/90 to-black/95">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)]" />

      {/* Large Floating Shapes - External Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Gradient Orbs */}
        <FloatingShape
          delay={0}
          className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        />
        <FloatingShape
          delay={2}
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        />
        <FloatingShape
          delay={4}
          className="absolute top-1/2 left-1/3 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"
        />

        {/* Geometric Shapes */}
        <FloatingShape
          delay={1}
          className="absolute top-32 right-32 w-40 h-40 border-2 border-blue-500/20 rounded-3xl"
        />
        <FloatingShape
          delay={3}
          className="absolute bottom-40 left-40 w-32 h-32 border-2 border-purple-500/20"
          style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
        />
        <FloatingShape
          delay={5}
          className="absolute top-1/3 right-1/4 w-36 h-36 border-2 border-emerald-500/20 rounded-full"
        />
        <FloatingShape
          delay={2.5}
          className="absolute bottom-1/3 left-1/4 w-28 h-28 bg-gradient-to-br from-orange-500/10 to-amber-500/10"
          style={{
            clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
          }}
        />
        <FloatingShape
          delay={4.5}
          className="absolute top-1/4 left-1/2 w-24 h-24 border-2 border-cyan-500/20 rotate-45"
        />
        <FloatingShape
          delay={6}
          className="absolute bottom-1/4 right-1/3 w-44 h-44 border-2 border-pink-500/20 rounded-2xl rotate-12"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header with animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 backdrop-blur-sm"
          >
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              What We Offer
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Our{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Featured Services
            </span>
          </h2>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            We deliver world-class services designed to support your business
            growth with innovation and excellence.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -12, transition: { duration: 0.3 } }}
              className="group relative"
            >
              {/* External Floating Shapes around card */}
              <motion.div
                className={`absolute -top-8 -right-8 w-24 h-24 ${service.glowColor} rounded-full blur-2xl opacity-0 group-hover:opacity-100`}
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 180, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <motion.div
                className="absolute -bottom-8 -left-8 w-20 h-20 border-2 border-current opacity-10 group-hover:opacity-30"
                style={{
                  borderColor: service.gradient.includes("blue")
                    ? "#3b82f6"
                    : service.gradient.includes("emerald")
                    ? "#10b981"
                    : service.gradient.includes("purple")
                    ? "#a855f7"
                    : "#f97316",
                }}
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Gradient glow on hover */}
              <div
                className={`absolute -inset-1 bg-gradient-to-br ${service.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}
              />

              {/* Main Card with glass effect */}
              <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 shadow-2xl group-hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] h-full flex flex-col">
                {/* Animated gradient border on top */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.gradient} rounded-t-2xl`}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    animate={{
                      x: ["-200%", "200%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                      repeatDelay: 1,
                    }}
                  />
                </div>

                {/* Internal animated shapes */}
                <motion.div
                  className="absolute top-4 right-4 w-20 h-20 opacity-5"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <div
                    className={`w-full h-full bg-gradient-to-br ${service.gradient}`}
                    style={{
                      clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                    }}
                  />
                </motion.div>

                <motion.div
                  className="absolute bottom-4 left-4 w-16 h-16 border-2 border-current opacity-5 rounded-full"
                  animate={{
                    scale: [1, 1.4, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Icon with gradient background */}
                <div className="relative mb-6 flex justify-center">
                  <motion.div
                    className={`relative p-4 bg-gradient-to-br ${service.gradient} rounded-2xl shadow-lg`}
                    whileHover={{
                      rotate: [0, -10, 10, -10, 0],
                      scale: 1.1,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-300`}
                    />
                    <div className="relative text-white">{service.icon}</div>
                  </motion.div>
                </div>

                {/* Content */}
                <h3 className="relative text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                  {service.title}
                </h3>

                <p className="relative text-gray-400 leading-relaxed flex-grow">
                  {service.desc}
                </p>

                {/* Hover indicator */}
                <motion.div
                  className={`mt-6 h-1 bg-gradient-to-r ${service.gradient} rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center mt-20"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl overflow-hidden shadow-lg hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] transition-all duration-300"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
              initial={{ x: "100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10 flex items-center gap-2">
              Explore All Services
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
