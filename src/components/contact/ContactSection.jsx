"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  Flower,
  Leaf,
  MessageSquare,
  User,
  Navigation,
  ChevronRight,
} from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Animated shapes
  const floatingShapes = [
    {
      id: 1,
      size: 80,
      x: "5%",
      y: "15%",
      duration: 25,
      color: "bg-gradient-to-br from-emerald-500/15 to-teal-400/20",
      icon: <Flower className="w-8 h-8 text-emerald-400/40" />,
    },
    {
      id: 2,
      size: 60,
      x: "92%",
      y: "20%",
      duration: 30,
      color: "bg-gradient-to-br from-rose-500/15 to-pink-400/20",
      icon: <Leaf className="w-6 h-6 text-rose-400/40" />,
    },
    {
      id: 3,
      size: 70,
      x: "8%",
      y: "70%",
      duration: 28,
      color: "bg-gradient-to-br from-amber-500/15 to-yellow-400/20",
      icon: <Flower className="w-7 h-7 text-amber-400/40" />,
    },
    {
      id: 4,
      size: 50,
      x: "90%",
      y: "75%",
      duration: 22,
      color: "bg-gradient-to-br from-purple-500/15 to-violet-400/20",
      icon: <Leaf className="w-5 h-5 text-purple-400/40" />,
    },
  ];

  // Contact cards data
  const contactCards = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Our Location",
      details: [
        "123 Flower Avenue",
        "South Garden District",
        "Addis Ababa, Ethiopia",
      ],
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-500/10",
      delay: 0.1,
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      details: ["+251 911 234 567", "+251 912 345 678"],
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-500/10",
      delay: 0.2,
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      details: ["hello@southflower.com", "support@southflower.com"],
      color: "from-rose-500 to-rose-600",
      bgColor: "bg-rose-500/10",
      delay: 0.3,
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Working Hours",
      details: ["Mon - Fri: 8:00 AM - 7:00 PM", "Sat - Sun: 9:00 AM - 5:00 PM"],
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-500/10",
      delay: 0.4,
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/contact-message`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to send message");
      }

      setIsSubmitted(true);

      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        setIsSubmitted(false);
      }, 7000);
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-emerald-900/40 to-gray-900/95" />

      {/* Large animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingShapes.map((shape) => (
          <motion.div
            key={shape.id}
            className={`absolute rounded-full ${shape.color} border border-white/10 backdrop-blur-sm flex items-center justify-center`}
            style={{
              width: shape.size,
              height: shape.size,
              left: shape.x,
              top: shape.y,
              filter: "blur(1px)",
            }}
            animate={{
              y: [0, -25, 0],
              x: [0, 10, 0],
              rotate: shape.id % 2 === 0 ? [0, 180, 360] : [0, 0, 0],
            }}
            transition={{
              duration: shape.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: shape.id * 0.3,
            }}
          >
            {shape.icon}
          </motion.div>
        ))}

        {/* Large gradient orbs */}
        <motion.div
          className="absolute top-1/4 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-emerald-700/10 via-teal-700/5 to-cyan-700/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -40, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-rose-700/10 via-purple-700/5 to-pink-700/10 rounded-full blur-3xl"
          animate={{
            x: [0, -60, 0],
            y: [0, 50, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 45,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-900/30 to-teal-900/30 border border-emerald-500/20 backdrop-blur-sm"
          >
            <Flower className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-medium text-emerald-300">
              Contact Us
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Get in{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Touch
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            Reach out to us for any inquiries or visit our floral paradise.
            We're here to help.
          </motion.p>
        </motion.div>

        {/* Top Section: Form and Cards Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="h-full"
          >
            <div className="bg-gray-900/60 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/10 shadow-2xl shadow-black/30 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border border-emerald-500/30">
                  <MessageSquare className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Send a Message
                </h3>
              </div>

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 10,
                      }}
                      className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/20 mb-6"
                    >
                      <CheckCircle className="w-12 h-12 text-emerald-400" />
                    </motion.div>
                    <h4 className="text-xl font-bold text-white mb-2">
                      Message Sent!
                    </h4>
                    <p className="text-gray-300">
                      We'll respond within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-gray-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Your name"
                        className="w-full px-4 py-3 rounded-xl bg-gray-800/60 border border-gray-700/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/30 transition-all duration-300"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-xl bg-gray-800/60 border border-gray-700/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/30 transition-all duration-300"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+251 900 000 000"
                        className="w-full px-4 py-3 rounded-xl bg-gray-800/60 border border-gray-700/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/30 transition-all duration-300"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        placeholder="Subject"
                        className="w-full px-4 py-3 rounded-xl bg-gray-800/60 border border-gray-700/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/30 transition-all duration-300"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-2">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        placeholder="Tell us about your floral needs..."
                        className="w-full px-4 py-3 rounded-xl bg-gray-800/60 border border-gray-700/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/30 transition-all duration-300 resize-none"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3.5 px-6 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-xl font-semibold text-lg shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group"
                    >
                      <div className="relative flex items-center justify-center gap-2 cursor-pointer">
                        {isSubmitting ? (
                          <>
                            <motion.div
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                            />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <motion.div
                              animate={{ x: [0, 4, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              <Send className="w-5 h-5" />
                            </motion.div>
                          </>
                        )}
                      </div>
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Contact Cards Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="h-full"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
              {contactCards.map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: card.delay }}
                  whileHover={{
                    scale: 1.03,
                    y: -4,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
                  }}
                  className="group relative bg-gray-900/60 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:border-emerald-500/30 transition-all duration-300 overflow-hidden cursor-pointer"
                >
                  {/* Card gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative z-10 h-full flex flex-col">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${card.bgColor} mb-3 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <div
                        className={`bg-gradient-to-r ${card.color} bg-clip-text text-transparent`}
                      >
                        {card.icon}
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-white mb-2">
                      {card.title}
                    </h3>

                    <div className="space-y-1 flex-grow">
                      {card.details.map((detail, idx) => (
                        <p
                          key={idx}
                          className="text-sm text-gray-300 leading-relaxed"
                        >
                          {detail}
                        </p>
                      ))}
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/10">
                      <div className="flex items-center gap-1 text-sm text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span>More info</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>

                  {/* Animated corner */}
                  <motion.div
                    className="absolute top-2 right-2 w-2 h-2 rounded-full bg-gradient-to-r from-white/30 to-white/10"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section: Full Width Map */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="w-full"
        >
          {/* Map Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <Navigation className="w-6 h-6 text-emerald-400" />
                Find Us Here
              </h3>
              <p className="text-gray-300 mt-1">
                Visit our floral paradise in Addis Ababa
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-emerald-300 font-medium">
                123 Flower Avenue, Addis Ababa
              </span>
            </div>
          </div>

          {/* Map Container */}
          <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden border-2 border-emerald-500/20 shadow-2xl shadow-black/40">
            {/* Map overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-transparent to-gray-900/10 z-10 pointer-events-none" />

            {/* Map pins */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
              <motion.div
                className="relative"
                animate={{
                  scale: [1, 1.2, 1],
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/50">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <div className="absolute inset-0 w-8 h-8 bg-emerald-500/30 rounded-full animate-ping" />
              </motion.div>
            </div>

            {/* Map iframe */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.0331488435927!2d38.748!3d9.0108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8f5f0b5f5f5f%3A0x5f5f5f5f5f5f5f5f!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2set!4v1620000000000!5m2!1sen!2set"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="relative z-0"
              title="South Flower Location"
            />

            {/* Map controls overlay */}
            <div className="absolute bottom-4 left-4 z-20">
              <div className="flex items-center gap-2 px-3 py-2 bg-black/60 backdrop-blur-sm rounded-lg">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-xs text-gray-300">Live Location</span>
              </div>
            </div>

            <div className="absolute bottom-4 right-4 z-20">
              <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm rounded-lg transition-colors duration-300 flex items-center gap-2">
                <Navigation className="w-4 h-4" />
                Get Directions
              </button>
            </div>
          </div>

          {/* Map Footer */}
          <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Open today until 7:00 PM</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                Parking Available
              </span>
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full" />
                Wheelchair Accessible
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
