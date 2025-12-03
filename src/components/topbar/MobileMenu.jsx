import { motion } from "framer-motion";

export default function MobileMenu({ open }) {
  if (!open) return null;

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      exit={{ x: -300 }}
      className="md:hidden fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-6 z-50"
    >
      {/* TopHeader info for small screens */}
      <div className="mb-6 border-b pb-4">
        <div className="flex flex-col space-y-2 text-gray-700">
          <span>📞 +251 900 000 000</span>
          <span>📧 info@example.com</span>
        </div>

        <div className="flex space-x-3 mt-3">
          <span>🌐 FB</span>
          <span>🌐 IG</span>
          <span>🌐 X</span>
        </div>
      </div>

      {/* Mobile Navigation Items */}
      <div className="flex flex-col space-y-4 text-lg text-gray-800">
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
    </motion.div>
  );
}
