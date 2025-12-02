"use client";

import Breadcrumb from "@/components/breadcrumb/BreadCrumb";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Breadcrumb Component */}
      <Breadcrumb
        pageTitle="About"
        pageName="Our Story"
        currentPage="Company History"
      />

      {/* Rest of the page content would go here */}
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Page content would go here
          </h2>
          <p className="text-gray-400">
            This is where your about page content would be displayed.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
