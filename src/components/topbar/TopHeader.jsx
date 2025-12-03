"use client";

import { Phone, Mail } from "lucide-react";
import FacebookIcon from "../icons/FacebookIcon";
import LinkedInIcon from "../icons/LinkedlnIcon";
import SendIcon from "../icons/TelegramIcon";
import InstagramIcon from "../icons/InstagramIcon";
import TikTokIcon from "../icons/TiktokIcon";

export default function TopHeader() {
  return (
    <div
      className="hidden md:flex relative overflow-hidden w-full py-2 px-14 justify-between text-sm 
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
      <div className="flex space-x-5 relative z-10">
        {/* Facebook */}
        <a href="#" className="icon-wrapper hover:bg-[#1877F2]">
          <FacebookIcon
            size={15}
            className="text-gray-500 hover:text-blue-600 transition"
          />
        </a>

        {/* LinkedIn */}
        <a href="#" className="icon-wrapper hover:bg-[#0A66C2]">
          <LinkedInIcon
            size={15}
            className="
                        text-gray-600 
                        hover:text-[#0A66C2] 
                        transition 
                        duration-200 
                        transform 
                        hover:scale-110
                    "
          />
        </a>

        {/* Telegram */}
        <a href="#" className="icon-wrapper hover:bg-[#0088cc]">
          <SendIcon
            size={15}
            className="
                        text-gray-600 
                        hover:text-[#0088cc] 
                        transition 
                        duration-200  
                    "
          />
        </a>

        {/* TikTok */}
        <a href="#" className="icon-wrapper hover:bg-[#010101]">
          <InstagramIcon
            size={15}
            className="
                        text-gray-600 
                        hover:text-pink-500 
                        transition 
                        duration-300 
                        transform 
                        hover:drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]
                    "
          />
        </a>
        <a href="#" className="icon-wrapper hover:bg-[#010101]">
          <TikTokIcon
            size={15}
            className="
                        text-gray-600
                        transition
                        duration-300
                        hover:text-white
                        hover:drop-shadow-[2px_2px_6px_rgba(0,242,234,0.7)]
                        hover:shadow-[ -2px_-2px_6px_rgba(255,0,80,0.7) ]
                    "
          />
        </a>
      </div>
    </div>
  );
}
