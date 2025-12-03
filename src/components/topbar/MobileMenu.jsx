import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Facebook, Linkedin, Send, Music } from "lucide-react";

export default function MobileMenu({ open, navItems, active, setActive }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          exit={{ x: -300 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="md:hidden fixed top-0 left-0 h-full w-64 bg-white shadow-xl p-6 z-50"
        >
          {/* Contact + Social Header */}
          <div className="mb-6 border-b pb-4">
            <div className="flex flex-col space-y-2 text-gray-700">
              <span>📞 +251 900 000 000</span>
              <span>📧 info@example.com</span>
            </div>

            <div className="flex space-x-4 mt-3 text-gray-700">
              <Facebook size={22} />
              <Linkedin size={22} />
              <Send size={22} />
              <Music size={22} /> {/* Replaced TikTok */}
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex flex-col space-y-4 text-lg text-gray-800">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => setActive(item.name)}
                className={`text-left px-2 py-2 rounded-md transition 
                ${
                  active === item.name
                    ? "bg-blue-100 text-blue-700"
                    : "hover:bg-gray-100"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
