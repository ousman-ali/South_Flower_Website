"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="w-full bg-gradient-to-br from-white to-gray-100 py-24">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* LEFT SIDE - Text */}
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold leading-tight text-gray-900"
          >
            Empowering <span className="text-blue-600">Innovation</span> for a
            Better Tomorrow
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-6 text-lg text-gray-600"
          >
            We build next-generation solutions for enterprises, helping them
            scale, automate, and grow with cutting-edge technology.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-10 flex space-x-6"
          >
            <a
              href="#services"
              className="px-8 py-4 bg-blue-600 text-white rounded-xl font-medium shadow hover:bg-blue-700 transition"
            >
              Explore Services
            </a>

            <a
              href="#contact"
              className="px-8 py-4 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-200 transition"
            >
              Contact Us
            </a>
          </motion.div>
        </div>

        {/* RIGHT SIDE - Image */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          className="relative"
        >
          <motion.img
            src="/images/blog21.jpg" // <<< Put your hero image in public folder
            alt="Hero"
            className="rounded-3xl shadow-2xl w-full"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
          />

          {/* Floating Circle Animation */}
          <motion.div
            className="absolute top-[-30px] right-[-30px] w-20 h-20 bg-blue-600 rounded-full opacity-80"
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
