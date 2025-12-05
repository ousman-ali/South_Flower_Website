"use client";

import BlogSection1 from "@/components/blog/BlogSection1";
import FeaturedBlogPosts from "@/components/blog/FeaturedBlogPosts";
import Breadcrumb from "@/components/breadcrumb/BreadCrumb";
import CTACard from "@/components/cta/CtaSection";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Breadcrumb Component */}
      <Breadcrumb
        pageTitle="Blog"
        pageName="Our Blog Posts"
        currentPage="South Flower Posts"
      />
      <FeaturedBlogPosts />
      <BlogSection1 />
      <CTACard />
    </div>
  );
}
