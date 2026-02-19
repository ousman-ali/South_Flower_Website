"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import MobileMenu from "./MobileMenu";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { getBatchData } from "@/api/service";

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
  const pathname = usePathname();
  const [setup, setSetup] = useState(null);

  useEffect(() => {
    const features = [{ name: "about_setup" }];

    async function fetchData() {
      try {
        const data = await getBatchData(features);

        // Set states individually
        setSetup(data.about_setup.data || null);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <Image
              src={
                setup?.logo_small
                  ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${setup?.logo_small}`
                  : "/images/south_flower_logo.png"
              }
              alt="Logo"
              width={80}
              height={50}
              className="object-contain rounded-md w-[80px] h-[50px]"
            />

            <span className="hidden sm:block font-semibold text-md tracking-wide text-gray-900">
              {setup?.company_name || "South Flower General Trading PLC"}
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition ${
                  pathname === item.href
                    ? "border-b border-l text-gray-900"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.name}

                {/* Active dot */}
                {pathname === item.href && (
                  <span
                    className="absolute -bottom-1 inset-x-0 mx-auto w-4 h-2
                      rounded-full bg-black shadow-lg shadow-blue-500/50
                      animate-[pulseGlow_1.5s_ease-in-out_infinite]"
                  ></span>
                )}
              </Link>
            ))}

            {/* Get Quote Button */}
            <Link
              href="/getquote"
              className="ml-4 px-5 py-2 rounded-lg bg-gray-700 text-white font-medium text-sm shadow transition hover:scale-[1.1]"
            >
              Get Quote
              <span className="inline-block animate-danceRight text-white ml-1">
                →
              </span>
            </Link>
          </div>

          {/* Hamburger Icon */}
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu open={open} navItems={navItems} pathname={pathname} />
    </>
  );
}
