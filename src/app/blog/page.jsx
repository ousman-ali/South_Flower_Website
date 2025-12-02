"use client";

import Breadcrumb from "@/components/breadcrumb/BreadCrumb";
import CTACard from "@/components/cta/CtaSection";
import ServicesSection1 from "@/components/services/ServiceSection1";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Breadcrumb Component */}
      <Breadcrumb
        pageTitle="Blog"
        pageName="Our Blog Posts"
        currentPage="South Flower Posts"
      />
      <CTACard />
    </div>
  );
}
