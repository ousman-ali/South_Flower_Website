"use client";

import AboutSection1 from "@/components/about/AboutSection1";
import Breadcrumb from "@/components/breadcrumb/BreadCrumb";
import PartnersSection from "@/components/partners/Partners";
import TestimonialSection from "@/components/testimonials/TestimonialSection";
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
      <AboutSection1 />
      <TestimonialSection />
      <PartnersSection />
    </div>
  );
}
