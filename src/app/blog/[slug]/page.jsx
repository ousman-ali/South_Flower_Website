"use client";

import BlogDetails from "@/components/blog/BlogDetails";
import Breadcrumb from "@/components/breadcrumb/BreadCrumb";
import CTACard from "@/components/cta/CtaSection";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Breadcrumb Component */}
      <Breadcrumb
        pageTitle="Blog Details"
        pageName="Blog Details"
        currentPage="South Flower Post"
      />
      <BlogDetails />
      <CTACard />
    </div>
  );
}
