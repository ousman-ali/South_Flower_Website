"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navItems = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/about", label: "About", icon: "👤" },
  { href: "/service", label: "Services", icon: "⚙️" },
  { href: "/product", label: "Products", icon: "📦" },
  { href: "/blog", label: "Blog", icon: "📝" },
  { href: "/contact", label: "Contact", icon: "📞" },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);
  const pathname = usePathname();
  const menuRef = useRef(null);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.position = "static";
      document.body.style.width = "auto";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.position = "static";
      document.body.style.width = "auto";
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        // Check if click is on hamburger button (its parent is button)
        const isHamburger = e.target.closest(
          'button[aria-label="Toggle menu"]'
        );
        if (!isHamburger) {
          setIsOpen(false);
        }
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Hamburger Button - visible on mobile */}
      <button
        onClick={toggleMenu}
        className="lg:hidden flex flex-col items-center justify-center w-10 h-10 relative z-60"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        {/* Animated Hamburger Icon */}
        <div className="relative w-6 h-6">
          <span
            className={`absolute left-0 w-6 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 rounded-full ${
              isOpen
                ? "top-3 rotate-45 bg-gradient-to-r from-blue-400 to-purple-400"
                : "top-1 bg-white"
            }`}
          />
          <span
            className={`absolute left-0 w-6 h-0.5 bg-white transition-all duration-300 top-3 rounded-full ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute left-0 w-6 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 rounded-full ${
              isOpen
                ? "top-3 -rotate-45 bg-gradient-to-r from-purple-400 to-pink-400"
                : "top-5 bg-white"
            }`}
          />
        </div>
      </button>

      {/* Overlay with gradient background */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-black/90 to-black/95 backdrop-blur-sm" />
      </div>

      {/* Mobile Menu Panel */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-gradient-to-b from-black via-black/95 to-black z-50 shadow-2xl shadow-blue-500/20 border-l border-blue-500/20 transition-all duration-300 ease-out-expo lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Gradient Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />

        {/* Floating Particles Background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* Menu Header */}
        <div className="relative p-6 border-b border-white/10 bg-gradient-to-r from-black/50 to-transparent">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Menu
              </span>
            </h2>
            <button
              onClick={closeMenu}
              className="p-2 rounded-full hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 transition-all duration-300 group"
              aria-label="Close menu"
            >
              <div className="relative w-6 h-6">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity" />
                <svg
                  className="relative w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>

        {/* Menu Items Container */}
        <div className="relative h-[calc(100%-80px)] overflow-y-auto p-6">
          <ul className="space-y-3">
            {navItems.map((item, index) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onMouseEnter={() => setHoverIndex(index)}
                    onMouseLeave={() => setHoverIndex(null)}
                    className={`relative flex items-center gap-4 p-4 rounded-2xl transition-all duration-500 group overflow-hidden ${
                      isActive
                        ? "bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 border border-blue-500/30"
                        : "hover:bg-gradient-to-r hover:from-blue-500/10 hover:via-purple-500/10 hover:to-pink-500/10"
                    }`}
                    onClick={closeMenu}
                  >
                    {/* Hover Background Effect */}
                    <div
                      className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
                        hoverIndex === index
                          ? "bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-pink-500/15 blur-sm"
                          : "opacity-0"
                      }`}
                    />

                    {/* Active Glow Effect */}
                    {isActive && (
                      <>
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-20 animate-pulse" />
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-2xl blur" />
                      </>
                    )}

                    {/* Icon Container */}
                    <div
                      className={`relative z-10 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${
                        isActive
                          ? "bg-gradient-to-br from-blue-500 to-purple-500 scale-110"
                          : "bg-white/5 group-hover:bg-gradient-to-br group-hover:from-blue-500/30 group-hover:to-purple-500/30"
                      }`}
                    >
                      <span className="text-xl">{item.icon}</span>

                      {/* Active Indicator Dot */}
                      {isActive && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-ping" />
                      )}
                    </div>

                    {/* Text Container */}
                    <div className="relative z-10 flex-1 min-w-0">
                      <span
                        className={`text-lg font-semibold transition-all duration-500 ${
                          isActive
                            ? "bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                            : "text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-300 group-hover:via-purple-300 group-hover:to-pink-300 group-hover:bg-clip-text"
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>

                    {/* Animated Arrow */}
                    <div className="relative z-10">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-500 ${
                          isActive
                            ? "bg-gradient-to-r from-blue-500 to-purple-500 rotate-90"
                            : "bg-white/5 group-hover:bg-gradient-to-r group-hover:from-blue-500/30 group-hover:to-purple-500/30"
                        }`}
                      >
                        <svg
                          className={`w-4 h-4 transition-all duration-300 ${
                            isActive
                              ? "text-white rotate-90"
                              : "text-gray-400 group-hover:text-white group-hover:translate-x-1"
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Particle Effects on Hover */}
                    <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-blue-400 rounded-full animate-float"
                          style={{
                            left: `${20 + i * 20}%`,
                            animationDelay: `${i * 0.1}s`,
                            animationDuration: "1.5s",
                          }}
                        />
                      ))}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 text-sm text-gray-400 bg-black">
                Quick Links
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                label: "Get Quote",
                icon: "💬",
                href: "/quote",
                color: "from-cyan-500 to-blue-500",
              },
              {
                label: "Portfolio",
                icon: "📁",
                href: "/portfolio",
                color: "from-purple-500 to-pink-500",
              },
              {
                label: "Pricing",
                icon: "💰",
                href: "/pricing",
                color: "from-green-500 to-emerald-500",
              },
              {
                label: "Support",
                icon: "🛟",
                href: "/support",
                color: "from-orange-500 to-amber-500",
              },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative group p-4 rounded-xl bg-white/5 hover:bg-gradient-to-r hover:from-white/10 hover:to-transparent transition-all duration-300"
                onClick={closeMenu}
              >
                <div
                  className={`absolute -inset-1 bg-gradient-to-r ${link.color} rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                />
                <div className="relative flex flex-col items-center gap-2">
                  <span className="text-2xl">{link.icon}</span>
                  <span className="text-sm font-medium text-white">
                    {link.label}
                  </span>
                </div>
              </a>
            ))}
          </div>

          {/* Bottom Contact Info */}
          <div className="mt-8 pt-8 border-t border-white/10">
            <div className="space-y-4">
              <a
                href="tel:+1234567890"
                className="flex items-center gap-4 p-3 rounded-xl bg-gradient-to-r from-blue-500/10 to-transparent hover:from-blue-500/20 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-white">📞</span>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Call us 24/7</p>
                  <p className="text-white font-semibold">+1 (234) 567-890</p>
                </div>
              </a>

              <a
                href="mailto:hello@example.com"
                className="flex items-center gap-4 p-3 rounded-xl bg-gradient-to-r from-purple-500/10 to-transparent hover:from-purple-500/20 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-white">✉️</span>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Email us</p>
                  <p className="text-white font-semibold">hello@example.com</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
