"use client";

import { useState } from "react";
import MobileMenu from "./MobileMenu";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Sticky Navbar */}
      <nav className="sticky top-0 z-50 w-full flex items-center justify-between p-4 bg-white shadow">
        {/* Logo */}
        <div className="text-2xl font-bold">Logo</div>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex space-x-6">
          <a href="#" className="hover:text-blue-600">
            Home
          </a>
          <a href="#" className="hover:text-blue-600">
            Services
          </a>
          <a href="#" className="hover:text-blue-600">
            Contact
          </a>
        </div>

        {/* Hamburger for small screens */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu open={open} />
    </>
  );
}
