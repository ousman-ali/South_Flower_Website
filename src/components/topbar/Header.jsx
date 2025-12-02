"use client";

import { useState, useEffect, useRef } from "react";
import Logo from "./Logo";
import Navbar from "./Navbar";
import { Phone, Mail, Clock, MapPin } from "lucide-react";

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

  const topHeaderItems = [
    { icon: Phone, text: "+1 (555) 123-4567" },
    { icon: Mail, text: "info@southflower.com" },
    { icon: Clock, text: "Mon-Fri: 9AM-6PM" },
    { icon: MapPin, text: "123 Flower St" },
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
        <div className="bg-gradient-to-r from-emerald-900 to-teal-900 border-b border-emerald-500/20">
          <div className="max-w-7xl mx-auto px-6 py-2 flex justify-center space-x-8">
            {topHeaderItems.map((item, i) => (
              <div
                key={i}
                className="flex items-center space-x-2 text-sm text-emerald-100/90"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isTopVisible ? "pt-10" : "pt-0"
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
              Shop Now
            </button>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-28 bg-gradient-to-b from-blue-900/60 via-gray-800/40 to-gray-900/60" />
    </>
  );
}
