"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const galleryImages = [
  "/images/toyo.jpg",
  "/images/weg.jpg",
  "/images/servicelast.jpg",
];

export default function AboutSection() {
  const [current, setCurrent] = useState(0);

  // Auto change images every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % galleryImages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Background crossfading slideshow */}
      <div className="absolute inset-0">
        {galleryImages.map((img, index) => (
          <motion.img
            key={index}
            src={img}
            initial={{ opacity: 0 }}
            animate={{ opacity: current === index ? 1 : 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ zIndex: current === index ? 1 : 0 }}
          />
        ))}

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-white">
        {/* Motto */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl font-semibold text-center"
        >
          “Empowering the Future with Innovation and Excellence”
        </motion.h2>

        {/* Mission + Vision Cards */}
        <div className="grid md:grid-cols-2 gap-10 mt-16">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-white/20"
          >
            <h3 className="text-2xl font-semibold text-blue-300">Mission</h3>
            <p className="mt-4 text-gray-200 text-lg leading-relaxed">
              Our mission is to deliver transformative technologies that enhance
              productivity, empower businesses, and create meaningful impact
              across industries.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.9 }}
            className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-white/20"
          >
            <h3 className="text-2xl font-semibold text-blue-300">Vision</h3>
            <p className="mt-4 text-gray-200 text-lg leading-relaxed">
              Our vision is to become a global leader in digital transformation,
              creating smarter, sustainable, and future-driven solutions.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
