"use client";

import { Phone, Mail, Linkedin, Facebook, Send, Music2 } from "lucide-react";

export default function TopHeader() {
  return (
    <div
      className="hidden md:flex relative overflow-hidden w-full py-2 px-4 justify-between text-sm 
      bg-gradient-to-r from-[#b3e5fc] to-[#81d4fa]"
    >
      {/* Water Droplet Animations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="droplet w-3 h-3 bg-white/30 rounded-full absolute top-6 left-10"></div>
        <div className="droplet w-4 h-4 bg-white/20 rounded-full absolute top-3 left-40"></div>
        <div className="droplet w-2 h-2 bg-white/25 rounded-full absolute top-5 right-20"></div>
        <div className="droplet w-3 h-3 bg-white/30 rounded-full absolute bottom-1 left-1/2"></div>
      </div>

      {/* Left: Contact Info */}
      <div className="flex space-x-4 relative z-10">
        <div className="flex items-center gap-2 bg-white/40 px-2 py-1 rounded-full backdrop-blur hover:bg-white/60 transition">
          <Phone size={14} />
          <span>+251 900 000 000</span>
        </div>

        <div className="flex items-center gap-2 bg-white/40 px-2 py-1 rounded-full backdrop-blur hover:bg-white/60 transition">
          <Mail size={14} />
          <span>info@example.com</span>
        </div>
      </div>

      {/* Right: Social Icons */}
      <div className="flex space-x-3 relative z-10">
        {/* Facebook */}
        <a href="#" className="icon-wrapper hover:bg-[#1877F2]">
          <Facebook size={15} />
        </a>

        {/* LinkedIn */}
        <a href="#" className="icon-wrapper hover:bg-[#0A66C2]">
          <Linkedin size={15} />
        </a>

        {/* Telegram */}
        <a href="#" className="icon-wrapper hover:bg-[#0088cc]">
          <Send size={15} />
        </a>

        {/* TikTok */}
        <a href="#" className="icon-wrapper hover:bg-[#010101]">
          <Music2 size={15} />
        </a>
      </div>
    </div>
  );
}
