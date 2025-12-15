"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
      >
        <h1 className="text-7xl font-extrabold text-gray-900">404</h1>

        <p className="mt-4 text-xl font-semibold text-gray-800">
          Page Not Found
        </p>

        <p className="mt-2 text-gray-500 leading-relaxed">
          Sorry, the page you’re looking for doesn’t exist or may have been
          moved. Please check the URL or return to the homepage.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 mt-8 px-6 py-3 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
