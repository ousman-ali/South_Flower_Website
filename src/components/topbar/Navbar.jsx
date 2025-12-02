"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/about", label: "About", icon: "👤" },
  { href: "/service", label: "Services", icon: "⚙️" },
  { href: "/product", label: "Products", icon: "📦" },
  { href: "/blog", label: "Blog", icon: "📝" },
  { href: "/contact", label: "Contact", icon: "📞" },
];

export default function Navbar() {
  const [hoverIndex, setHoverIndex] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  // Use Next.js usePathname hook
  const pathname = usePathname();

  // Find active index based on current path - simpler logic
  const activeIndex = navItems.findIndex((item) => {
    if (item.href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(item.href);
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render anything until mounted to avoid hydration mismatch
  if (!isMounted) {
    return (
      <nav className="flex items-center space-x-2 relative">
        {navItems.map((item) => (
          <div key={item.href} className="relative">
            <a
              href={item.href}
              className="relative px-6 py-3 flex flex-col items-center justify-center"
            >
              <span className="text-lg font-semibold text-gray-300">
                {item.label}
              </span>
            </a>
          </div>
        ))}
      </nav>
    );
  }

  return (
    <nav className="flex items-center space-x-2 relative">
      {/* Glowing background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 blur-xl rounded-full" />

      {/* Active indicator with animation */}
      {activeIndex >= 0 && (
        <div
          className="absolute -z-10 transition-all duration-500 ease-out-expo"
          style={{
            left: `${activeIndex * 90}px`,
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(59,130,246,0.2) 0%, rgba(59,130,246,0.1) 40%, transparent 70%)",
            filter: "blur(10px)",
          }}
        />
      )}

      {/* Hover indicator */}
      {hoverIndex !== null && (
        <div
          className="absolute -z-10 transition-all duration-300 ease-out"
          style={{
            left: `${hoverIndex * 90}px`,
            width: "70px",
            height: "70px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(168,85,247,0.15) 0%, rgba(168,85,247,0.05) 50%, transparent 70%)",
            filter: "blur(8px)",
          }}
        />
      )}

      {navItems.map((item, index) => {
        const isActive = activeIndex === index;

        return (
          <div key={item.href} className="relative group">
            {/* Animated background on hover */}
            <div
              className="absolute inset-0 -m-2 rounded-full bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 
                          group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 
                          transition-all duration-500 blur-md group-hover:blur-sm"
            />

            {/* Floating icon effect */}
            <div
              className="absolute -top-6 left-1/2 transform -translate-x-1/2 opacity-0 
                          group-hover:opacity-100 group-hover:-top-8 transition-all duration-500"
            >
              <span className="text-lg">{item.icon}</span>
            </div>

            {/* Circular indicator for active item */}
            {isActive && (
              <>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-ping" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full" />
                <div
                  className="absolute -inset-2 rounded-full border-2 border-blue-500/30 animate-spin-slow"
                  style={{ animationDuration: "8s" }}
                />
              </>
            )}

            <a
              href={item.href}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
              className="relative px-6 py-3 flex flex-col items-center justify-center 
                        transition-all duration-500 group"
            >
              {/* Glowing text effect */}
              <span
                className={`text-lg font-semibold bg-gradient-to-r 
                              ${
                                isActive
                                  ? "from-blue-400 via-purple-400 to-pink-400"
                                  : "from-gray-300 via-gray-200 to-gray-300"
                              }
                              bg-clip-text text-transparent 
                              group-hover:from-blue-300 group-hover:via-purple-300 group-hover:to-pink-300
                              transition-all duration-500 
                              ${
                                isActive ? "scale-110" : "group-hover:scale-105"
                              }`}
              >
                {item.label}
              </span>

              {/* Underline animation */}
              <span
                className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 
                              h-0.5 transition-all duration-500
                              ${
                                isActive
                                  ? "w-10 bg-gradient-to-r from-blue-500 to-purple-500"
                                  : "w-0 group-hover:w-10 bg-gradient-to-r from-blue-400/50 to-purple-400/50"
                              }`}
              />

              {/* Particle effect on hover */}
              <div className="absolute inset-0 overflow-hidden rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-blue-400 rounded-full animate-float"
                    style={{
                      left: `${20 + i * 20}%`,
                      animationDelay: `${i * 0.2}s`,
                      animationDuration: "2s",
                    }}
                  />
                ))}
              </div>
            </a>
          </div>
        );
      })}
    </nav>
  );
}
