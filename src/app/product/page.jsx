"use client";

import Breadcrumb from "@/components/breadcrumb/BreadCrumb";
import CTACard from "@/components/cta/CtaSection";
import ProductSection1 from "@/components/products/ProductSection1";
import ServicesSection1 from "@/components/services/ServiceSection1";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Breadcrumb Component */}
      <Breadcrumb
        pageTitle="Products"
        pageName="Our Products"
        currentPage="South Flower Products"
      />
      <ProductSection1 />
      <CTACard />
    </div>
  );
}
