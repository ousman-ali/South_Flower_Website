"use client";

import Breadcrumb from "@/components/breadcrumb/BreadCrumb";
import CTACard from "@/components/cta/CtaSection";
import ServiceDetails from "@/components/services/ServiceDetails";
import ServicesSection1 from "@/components/services/ServiceSection1";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Breadcrumb Component */}
      <Breadcrumb
        pageTitle="Service Details"
        pageName="Service Details"
        currentPage="South Flower Service"
      />
      <ServiceDetails />
      <CTACard />
    </div>
  );
}
