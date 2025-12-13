"use client";

import { getBatchData } from "@/api/service";
import { motion, useAnimationFrame } from "framer-motion";
import {
  Sparkles,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Send,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// Floating shape component
const FloatingShape = ({ delay = 0, className = "", style }) => {
  const ref = useRef(null);

  useAnimationFrame((t) => {
    if (!ref.current) return;
    const rotate = (t / 80 + delay * 100) % 360;
    const y = Math.sin(t / 1200 + delay) * 25;
    const x = Math.cos(t / 1800 + delay) * 15;
    ref.current.style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg)`;
  });

  return <div ref={ref} className={className} style={style} />;
};

export default function Footer() {
  const [isClient, setIsClient] = useState(false);
  const [services, setServices] = useState([]);
  const [setup, setSetup] = useState(null);

  useEffect(() => {
    const features = [
      { name: "about_service", amount: 6 },
      { name: "about_setup" },
    ];

    async function fetchData() {
      try {
        const data = await getBatchData(features);

        // Set states individually
        setServices(data.about_service.data || []);
        setSetup(data.about_setup.data || null);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/service" },
    { name: "Products", href: "/product" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const socialMedia = [
    {
      icon: <Facebook size={20} />,
      href: setup?.social_media?.facebook,
      color: "hover:text-blue-400",
    },
    {
      icon: <Twitter size={20} />,
      href: setup?.social_media?.twitter,
      color: "hover:text-cyan-400",
    },
    {
      icon: <Instagram size={20} />,
      href: setup?.social_media?.instagram,
      color: "hover:text-pink-400",
    },
    {
      icon: <Linkedin size={20} />,
      href: setup?.social_media?.linkedin,
      color: "hover:text-blue-500",
    },
    {
      icon: <Send size={20} />,
      href: setup?.social_media?.telegram,
      color: "hover:text-[#0088CC]",
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-black/95 via-black/90 to-black/95">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Large Floating Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Gradient Orbs */}
        <FloatingShape
          delay={0}
          className="absolute top-20 left-5 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
        />
        <FloatingShape
          delay={3}
          className="absolute bottom-40 right-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
        />
        <FloatingShape
          delay={6}
          className="absolute top-1/3 left-1/2 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl"
        />

        {/* Geometric Shapes */}
        <FloatingShape
          delay={1}
          className="absolute top-1/4 right-32 w-32 h-32 border-2 border-blue-500/20 rounded-2xl"
        />
        <FloatingShape
          delay={4}
          className="absolute bottom-1/3 left-24 w-28 h-28 border-2 border-purple-500/20"
          style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
        />
        <FloatingShape
          delay={7}
          className="absolute top-1/2 right-1/4 w-24 h-24 border-2 border-emerald-500/20 rounded-full"
        />
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-6">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/10">
          {/* Logo & Description */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-30" />
                <div className="relative p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Innovate<span className="text-white">Co</span>
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 leading-relaxed"
            >
              We create innovative solutions that drive business growth and
              deliver exceptional digital experiences.
            </motion.p>

            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex gap-4"
            >
              {socialMedia.map(
                (social, index) =>
                  social.href && (
                    <motion.a
                      key={index}
                      href={social.href}
                      whileHover={{ scale: 1.2, y: -5 }}
                      whileTap={{ scale: 0.9 }}
                      className={`relative p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-gray-400 ${social.color} transition-all duration-300 hover:border-white/30`}
                    >
                      <div className="relative z-10">{social.icon}</div>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.a>
                  )
              )}
            </motion.div>
          </div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <ArrowRight className="w-5 h-5 text-blue-400" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ x: 5 }}
                >
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <motion.div
                      className="w-1 h-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100"
                      animate={{
                        scale: [1, 1.5, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              Our Services
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ x: 5 }}
                >
                  <a
                    href={service.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group cursor-pointer"
                  >
                    <motion.span
                      className="text-blue-400 opacity-0 group-hover:opacity-100"
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      ●
                    </motion.span>
                    {service?.title.length > 30
                      ? service?.title.slice(0, 30) + "..."
                      : service?.title}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Mail className="w-5 h-5 text-emerald-400" />
              Contact Us
            </h3>

            <div className="space-y-4">
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-start gap-3 text-gray-400 group"
              >
                <div className="relative mt-1">
                  <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-sm group-hover:blur-md transition-all duration-300" />
                  <Mail className="relative w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-white group-hover:text-blue-400 transition-colors duration-300">
                    hello@innovateco.com
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-start gap-3 text-gray-400 group"
              >
                <div className="relative mt-1">
                  <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-sm group-hover:blur-md transition-all duration-300" />
                  <Phone className="relative w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-white group-hover:text-purple-400 transition-colors duration-300">
                    +1 (555) 123-4567
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-start gap-3 text-gray-400 group"
              >
                <div className="relative mt-1">
                  <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-sm group-hover:blur-md transition-all duration-300" />
                  <MapPin className="relative w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="text-white group-hover:text-emerald-400 transition-colors duration-300">
                    123 Innovation St, San Francisco, CA 94107
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="pt-4 flex flex-col md:flex-row justify-center items-center"
        >
          Copyright
          <div className="flex items-center just gap-2 text-gray-400 md:mb-0">
            <span>
              © {new Date().getFullYear()}{" "}
              <span className="text-gray-100">South Flower</span> All rights
              reserved. Powered by
              <Link
                href="https://keradiontechnology.com"
                className="text-blue-400 cursor-pointer hover:underline underline-offset-4"
              >
                {" "}
                Keradion Technology
              </Link>
            </span>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            ></motion.div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Bottom Line */}
      <div className="relative h-px w-full overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Floating Particles */}
      {isClient && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
      )}
    </footer>
  );
}
