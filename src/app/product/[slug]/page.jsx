"use client";

import Breadcrumb from "@/components/breadcrumb/BreadCrumb";
import CTACard from "@/components/cta/CtaSection";
import ProductDetails from "@/components/products/ProductDetails";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Breadcrumb Component */}
      <Breadcrumb
        pageTitle="Product Details"
        pageName="Product Details"
        currentPage="South Flower Product"
      />
      <ProductDetails />
      <CTACard />
    </div>
  );
}
