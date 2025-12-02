"use client";

import { useState, useEffect, useRef } from "react";
import Logo from "./Logo";
import Navbar from "./Navbar";
import {
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isTopVisible, setIsTopVisible] = useState(true);

  const lastScrollYRef = useRef(0);
  const isTopVisibleRef = useRef(true);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      const diff = current - lastScrollYRef.current;

      if (diff > 5 && current > 80) {
        if (isTopVisibleRef.current) {
          setIsTopVisible(false);
          isTopVisibleRef.current = false;
        }
      } else if (diff < -5) {
        if (!isTopVisibleRef.current) {
          setIsTopVisible(true);
          isTopVisibleRef.current = true;
        }
      }

      setIsScrolled(current > 50);
      lastScrollYRef.current = current;

      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        if (current < 30) {
          setIsTopVisible(true);
          isTopVisibleRef.current = true;
        }
      }, 50);
    };

    let ticking = false;
    const optimizedScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", optimizedScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", optimizedScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // Contact info
  const contactItems = [
    { icon: Phone, text: "+1 (555) 123-4567" },
    { icon: Mail, text: "info@southflower.com" },
  ];

  // Social icons with brand colors
  const socialIcons = [
    {
      icon: Facebook,
      label: "Facebook",
      href: "#",
      color: "bg-blue-600",
      hoverColor: "hover:bg-blue-600 hover:border-blue-500",
    },
    {
      icon: Twitter,
      label: "Twitter",
      href: "#",
      color: "bg-sky-500",
      hoverColor: "hover:bg-sky-500 hover:border-sky-400",
    },
    {
      icon: Instagram,
      label: "Instagram",
      href: "#",
      color: "bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-500",
      hoverColor: "hover:opacity-100",
    },
    {
      icon: Youtube,
      label: "YouTube",
      href: "#",
      color: "bg-red-600",
      hoverColor: "hover:bg-red-600 hover:border-red-500",
    },
  ];

  return (
    <>
      {/* Top Header */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isTopVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        {/* Fancy black/blue/gray gradient background */}
        <div className="bg-gradient-to-r from-gray-900 via-blue-900/90 to-gray-800 border-b border-blue-500/20 relative overflow-hidden">
          {/* Subtle animated background effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent animate-pulse-slow"></div>

          {/* Animated dots pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full"></div>
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white rounded-full"></div>
            <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-white rounded-full"></div>
          </div>

          {/* Increased padding container */}
          <div className="max-w-7xl mx-auto px-12 py-3 relative z-10">
            <div className="flex items-center justify-between">
              {/* Left side - Contact info - Pushed toward center */}
              <div className="flex items-center space-x-10">
                {contactItems.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-3 group cursor-pointer"
                  >
                    <div className="p-2 bg-blue-900/40 rounded-lg group-hover:bg-blue-700/60 transition-all duration-300 border border-blue-700/30 group-hover:border-blue-500/50">
                      <item.icon className="w-4 h-4 text-blue-300 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-sm text-gray-200 group-hover:text-white transition-colors font-medium tracking-wide">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Center decorative element */}
              <div className="hidden xl:flex items-center space-x-2">
                <div className="w-1 h-1 bg-blue-400/50 rounded-full"></div>
                <div className="w-2 h-2 bg-blue-400/70 rounded-full"></div>
                <div className="w-3 h-3 bg-blue-400/80 rounded-full"></div>
                <div className="w-2 h-2 bg-blue-400/70 rounded-full"></div>
                <div className="w-1 h-1 bg-blue-400/50 rounded-full"></div>
              </div>

              {/* Right side - Social icons - Pushed toward center */}
              <div className="flex items-center space-x-4">
                <span className="text-xs text-gray-400 font-medium tracking-wider hidden md:block">
                  CONNECT WITH US:
                </span>
                <div className="flex items-center space-x-2">
                  {socialIcons.map((social, i) => (
                    <a
                      key={i}
                      href={social.href}
                      aria-label={social.label}
                      className={`
                        relative p-2.5 rounded-full
                        bg-gray-800/50 backdrop-blur-sm
                        border border-gray-700/60
                        transition-all duration-300
                        group
                        ${social.hoverColor}
                        hover:scale-110 hover:shadow-xl
                        hover:-translate-y-0.5
                      `}
                    >
                      {/* Background that shows brand color on hover */}
                      <div
                        className={`
                        absolute inset-0 rounded-full opacity-0 
                        transition-all duration-300
                        group-hover:opacity-100
                        ${social.color}
                      `}
                      ></div>

                      {/* Icon with white color on hover */}
                      <social.icon className="w-4 h-4 text-gray-300 group-hover:text-white relative z-10 transition-colors duration-300" />

                      {/* Glow effect */}
                      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md">
                        <div
                          className={`w-full h-full ${social.color} rounded-full`}
                        ></div>
                      </div>

                      {/* Tooltip */}
                      <div className="absolute -top-9 left-1/2 transform -translate-x-1/2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none shadow-lg">
                        {social.label}
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isTopVisible ? "pt-14" : "pt-0"
        }`}
      >
        {/* Background NOW lives inside, not on the outer header */}
        <div
          className={`transition-all duration-300 ${
            isScrolled
              ? "bg-black/95 backdrop-blur-xl shadow-lg border-b border-white/10"
              : "bg-gradient-to-b from-black/95 via-black/90 to-black/95"
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <Logo />
            <Navbar />

            <button className="hidden lg:block px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-lg hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300">
              Get Quote
            </button>
          </div>
        </div>
      </header>

      {/* Spacer - Increased to accommodate larger top header */}
      <div className="h-32 bg-gradient-to-b from-blue-900/60 via-gray-800/40 to-gray-900/60" />
    </>
  );
}
