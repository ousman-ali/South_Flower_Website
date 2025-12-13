"use client";

import FacebookIcon from "../icons/FacebookIcon";
import LinkedInIcon from "../icons/LinkedlnIcon";
import SendIcon from "../icons/TelegramIcon";
import InstagramIcon from "../icons/InstagramIcon";
import TikTokIcon from "../icons/TiktokIcon";
import PhoneIcon from "../icons/PhoneIcon";
import EmailIcon from "../icons/EmailIcon";
import { getBatchData } from "@/api/service";
import { useEffect, useState } from "react";

export default function TopHeader() {
  const [aboutContent, setAboutContent] = useState([]);
  const [setup, setSetup] = useState(null);

  useEffect(() => {
    const features = [
      { name: "about_content", amount: 4 },
      { name: "about_setup" },
    ];

    async function fetchData() {
      try {
        const data = await getBatchData(features);

        // Set states individually
        setAboutContent(data.about_content.data || []);
        setSetup(data.about_setup.data || null);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);

  return (
    <div
      className="hidden md:flex relative overflow-hidden w-full py-2 px-14 justify-between text-sm 
      bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"
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
        {/* Phone */}
        {setup?.phone_numbers?.length >= 1 && (
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl
            bg-white/10 backdrop-blur-md
            border border-white/20
            shadow-sm
            transition-all duration-300
            hover:bg-white/20 hover:border-white/30 
            hover:shadow-md"
          >
            <a
              href={`tel:${setup?.phone_numbers[0].value}`}
              className="flex items-center justify-center"
            >
              <PhoneIcon size={15} className="text-blue-400" />
            </a>
            <a
              href={`tel:${setup?.phone_numbers[0].value}`}
              className="text-blue-200 font-medium tracking-wide"
            >
              {setup?.phone_numbers[0].value}
            </a>
          </div>
        )}

        {/* Email */}
        {setup?.email_addresses?.length >= 1 && (
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl
            bg-white/10 backdrop-blur-md
            border border-white/20
            shadow-sm
            transition-all duration-300
            hover:bg-white/20 hover:border-white/30 
            hover:shadow-md"
          >
            <a
              href={`mailto:${setup?.email_addresses[0].value}`}
              className="flex items-center justify-center"
            >
              <EmailIcon size={15} className="text-blue-400" />
            </a>
            <a
              href={`mailto:${setup?.email_addresses[0].value}`}
              className="text-blue-200 font-medium tracking-wide"
            >
              {setup?.email_addresses[0].value}
            </a>
          </div>
        )}
      </div>

      {/* Right: Social Icons */}
      <div className="flex space-x-5 relative z-10">
        {/* Facebook */}
        {setup?.social_media?.facebook && (
          <a
            href={setup?.social_media?.facebook}
            className="icon-wrapper metallic-bg"
          >
            <FacebookIcon
              size={15}
              className="text-white hover:text-blue-600 transition"
            />
          </a>
        )}

        {/* LinkedIn */}
        {setup?.social_media?.linkedin && (
          <a
            href={setup?.social_media?.linkedin}
            className="icon-wrapper metallic-bg"
          >
            <LinkedInIcon
              size={15}
              className="
                        text-white 
                        hover:text-[#0A66C2] 
                        transition 
                        duration-200 
                        transform 
                        hover:scale-110
                    "
            />
          </a>
        )}

        {/* Telegram */}
        {setup?.social_media?.telegram && (
          <a
            href={setup?.social_media?.telegram}
            className="icon-wrapper metallic-bg"
          >
            <SendIcon
              size={15}
              className="
                        text-white
                        hover:text-[#0088cc] 
                        transition 
                        duration-200  
                    "
            />
          </a>
        )}

        {/* TikTok */}
        {setup?.social_media?.instagram && (
          <a
            href={setup?.social_media?.instagram}
            className="icon-wrapper metallic-bg"
          >
            <InstagramIcon
              size={15}
              className="
                        text-white
                        hover:text-pink-500 
                        transition 
                        duration-300 
                        transform 
                        hover:drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]
                    "
            />
          </a>
        )}
        {setup?.social_media?.tiktok && (
          <a
            href={setup?.social_media?.tiktok}
            className="icon-wrapper metallic-bg"
          >
            <TikTokIcon
              size={15}
              className="
                        text-white
                        transition
                        duration-300
                        hover:text-black
                        hover:drop-shadow-[2px_2px_6px_rgba(0,242,234,0.7)]
                        hover:shadow-[ -2px_-2px_6px_rgba(255,0,80,0.7) ]
                    "
            />
          </a>
        )}
      </div>
    </div>
  );
}
