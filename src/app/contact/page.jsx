"use client";

import Breadcrumb from "@/components/breadcrumb/BreadCrumb";
import ContactSection from "@/components/contact/ContactSection";
import CTACard from "@/components/cta/CtaSection";
import ServicesSection1 from "@/components/services/ServiceSection1";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Breadcrumb Component */}
      <Breadcrumb
        pageTitle="Contacts"
        pageName="Our Socials"
        currentPage="Contact South Flower"
      />
      <ContactSection />
      <CTACard />
    </div>
  );
}
