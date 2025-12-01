"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Mail, Phone, MessageSquare } from "lucide-react";

export default function CTACard() {
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const contactMethods = [
    {
      icon: <Mail className="w-5 h-5" />,
      text: "hello@example.com",
      delay: 0.1,
    },
    {
      icon: <Phone className="w-5 h-5" />,
      text: "+1 (555) 123-4567",
      delay: 0.2,
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      text: "Live Chat Available",
      delay: 0.3,
    },
  ];

  // Subtle floating shapes data
  const floatingShapes = [
    { id: 1, size: 60, x: "10%", y: "20%", duration: 25 },
    { id: 2, size: 40, x: "85%", y: "70%", duration: 30 },
    { id: 3, size: 50, x: "15%", y: "85%", duration: 28 },
    { id: 4, size: 35, x: "90%", y: "25%", duration: 22 },
    { id: 5, size: 45, x: "70%", y: "15%", duration: 26 },
    { id: 6, size: 55, x: "25%", y: "65%", duration: 24 },
  ];

  return (
    <section className="relative min-h-[400px] bg-gradient-to-b from-white to-gray-50/50">
      {/* Subtle floating background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingShapes.map((shape) => (
          <motion.div
            key={shape.id}
            className="absolute rounded-full bg-gradient-to-br from-blue-100/20 to-purple-100/10 border border-blue-100/10"
            style={{
              width: shape.size,
              height: shape.size,
              left: shape.x,
              top: shape.y,
            }}
            animate={{
              y: [0, -15, 0], // Very subtle up/down movement
              x: [0, 5, 0], // Minimal side movement
            }}
            transition={{
              duration: shape.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: shape.id * 0.5,
            }}
          />
        ))}

        {/* Very slow moving gradient orb */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-blue-100/5 to-purple-100/5 rounded-full"
          animate={{
            scale: [1, 1.05, 1],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Another subtle orb */}
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-60 h-60 bg-gradient-to-br from-amber-100/5 to-pink-100/5 rounded-full"
          animate={{
            scale: [1.05, 1, 1.05],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main CTA Card */}
      <div className="relative z-10 flex items-center justify-center min-h-[400px] p-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-2xl"
        >
          <div className="relative bg-white/95 backdrop-blur-sm border border-gray-200/60 rounded-2xl p-8 md:p-12 shadow-xl">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center mb-8"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100/50"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Sparkles className="w-4 h-4 text-blue-500" />
                </motion.div>
                <span className="text-sm font-medium text-blue-600">
                  Get in Touch
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              >
                Let's Create Something{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Amazing
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-gray-600 text-lg"
              >
                Our team is ready to help you bring your vision to life
              </motion.p>
            </motion.div>

            {/* Contact Methods */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap justify-center gap-4 mb-10"
            >
              {contactMethods.map((method, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: method.delay }}
                  whileHover={{ scale: 1.02, y: -1 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-50/80 border border-gray-200/50 backdrop-blur-sm"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="text-blue-500"
                  >
                    {method.icon}
                  </motion.div>
                  <span className="text-sm font-medium text-gray-700">
                    {method.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Main CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex justify-center"
            >
              <motion.button
                onHoverStart={() => setIsButtonHovered(true)}
                onHoverEnd={() => setIsButtonHovered(false)}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 10px 30px rgba(99, 102, 241, 0.15)",
                }}
                whileTap={{ scale: 0.98 }}
                className="relative px-8 py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-md overflow-hidden group"
              >
                {/* Subtle gradient overlay on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isButtonHovered ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Very subtle shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  animate={{ x: isButtonHovered ? ["0%", "100%"] : "0%" }}
                  transition={{
                    duration: 1,
                    repeat: isButtonHovered ? Infinity : 0,
                    repeatDelay: 0.5,
                  }}
                />

                {/* Button content */}
                <span className="relative flex items-center justify-center gap-3">
                  <span>Reach Out Now</span>
                  <motion.div
                    animate={{ x: isButtonHovered ? 3 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </span>
              </motion.button>
            </motion.div>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-center text-gray-500 text-sm mt-6"
            >
              We'll respond within 2 hours during business days
            </motion.p>

            {/* Subtle decorative elements around card */}
            <motion.div
              className="absolute -top-2 -left-2 w-4 h-4 rounded-full bg-blue-500/10"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-2 -right-2 w-4 h-4 rounded-full bg-purple-500/10"
              animate={{ scale: [1.2, 1, 1.2] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
