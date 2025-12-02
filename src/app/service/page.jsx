"use client";

import AboutSection1 from "@/components/about/AboutSection1";
import Breadcrumb from "@/components/breadcrumb/BreadCrumb";
import CTACard from "@/components/cta/CtaSection";
import PartnersSection from "@/components/partners/Partners";
import ServicesSection1 from "@/components/services/ServiceSection1";
import TestimonialSection from "@/components/testimonials/TestimonialSection";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Breadcrumb Component */}
      <Breadcrumb
        pageTitle="Services"
        pageName="Our Services"
        currentPage="South Flower Services"
      />
      <ServicesSection1 />
      <CTACard />
    </div>
  );
}
