"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import MobileMenu from "./MobileMenu";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/service" },
  { name: "Products", href: "/product" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Home");

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Logo"
              width={120}
              height={50}
              className="object-contain rounded-md"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setActive(item.name)}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition ${
                  active === item.name
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.name}

                {/* Active dot */}
                {active === item.name && (
                  <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-blue-600"></span>
                )}
              </Link>
            ))}

            {/* Get Quote Button */}
            <Link
              href="/contact"
              className="ml-4 px-5 py-2 rounded-lg bg-blue-600 text-white font-medium text-sm shadow 
              hover:bg-blue-700 transition"
            >
              Get Quote
            </Link>
          </div>

          {/* Hamburger Icon */}
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        open={open}
        navItems={navItems}
        active={active}
        setActive={setActive}
      />
    </>
  );
}
