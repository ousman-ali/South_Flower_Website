import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Facebook,
  Linkedin,
  Instagram,
  Twitter,
  Send,
  Mail,
  Phone,
} from "lucide-react";
import { SiTiktok } from "react-icons/si";

export default function MobileMenu({ open, navItems, pathname }) {
  const socialMedia = [
    {
      icon: <Facebook size={20} style={{ color: "#1877F2" }} />,
      href: "#",
    },
    {
      icon: <Twitter size={20} style={{ color: "#1DA1F2" }} />,
      href: "#",
    },
    {
      icon: <Instagram size={20} style={{ color: "#E1306C" }} />,
      href: "#",
    },
    {
      icon: <Linkedin size={20} style={{ color: "#0A66C2" }} />,
      href: "#",
    },
    {
      icon: <Send size={18} style={{ color: "#0088CC" }} />, // Telegram
      href: "#",
    },
    {
      icon: <SiTiktok size={18} style={{ color: "#fffff" }} />, // TikTok cyan
      href: "#",
    },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          exit={{ x: -300 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="md:hidden fixed top-0 left-0 h-full w-64 bg-white shadow-xl p-6 z-50 overflow-y-auto"
        >
          {/* Contact + Social Header */}
          <div className="mb-6 border-b pb-4">
            {/* Contact Info */}
            <div className="flex flex-col space-y-3 text-gray-700">
              {/* Phone */}
              <div className="flex items-center gap-3 p-2.5 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                <div className="p-2 bg-gray-200 rounded-lg">
                  <Phone size={18} className="text-gray-700" />
                </div>
                <span className="text-sm font-medium">+251 900 000 000</span>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3 p-2.5 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
                <div className="p-2 bg-gray-200 rounded-lg">
                  <Mail size={18} className="text-gray-700" />
                </div>
                <span className="text-sm font-medium">info@example.com</span>
              </div>
            </div>

            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-3 gap-3 mt-4"
            >
              {socialMedia.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className={`
                    group p-3 rounded-xl 
                    bg-white/40 backdrop-blur-md 
                    border border-gray-200 
                    shadow-sm 
                    flex items-center justify-center
                    transition-all duration-300

                    hover:shadow-md hover:bg-white/60 
                    hover:border-gray-300 
                    ${social.color}
                  `}
                >
                  <div className="relative z-10">{social.icon}</div>

                  <motion.div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-blue-400/10 to-purple-500/10"
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1 }}
                  />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Menu Items */}
          <div className="flex flex-col space-y-4 text-lg text-gray-800">
            {navItems.map((item) => (
              <Link
                href={item.href}
                key={item.name}
                className={`text-left px-2 py-2 rounded-md transition 
                ${
                  pathname === item.href
                    ? "bg-gray-700 text-gray-100"
                    : "hover:bg-gray-100"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
