"use client";

import { getBatchData, getBlogCategories } from "@/api/service";
import BlogSection1 from "@/components/blog/BlogSection1";
import FeaturedBlogPosts from "@/components/blog/FeaturedBlogPosts";
import Breadcrumb from "@/components/breadcrumb/BreadCrumb";
import CTACard from "@/components/cta/CtaSection";
import Loading from "@/components/loading/Loading";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [featuredBlogs, setFeaturedBlogs] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const features = [
      { name: "ecommerce_product", amount: 5 },
      { name: "blog_post", amount: 100000 },
    ];

    async function fetchData() {
      try {
        const data = await getBatchData(features);
        const categories = await getBlogCategories();
        setProducts(data.ecommerce_product || []);
        setCategories(categories);
        setBlogs(data.blog_post || []);
        const featured = (data.blog_post?.data || []).filter(
          (blog) => blog.is_featured === true
        );

        setFeaturedBlogs(featured);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // Global loading done!
      }
    }

    fetchData();
  }, []);

  console.log("featuredblogs", featuredBlogs);

  if (loading) {
    return (
      <div className="">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Breadcrumb Component */}
      <Breadcrumb
        pageTitle="Blog"
        pageName="Our Blog Posts"
        currentPage="South Flower Posts"
      />
      {featuredBlogs.length > 0 && (
        <FeaturedBlogPosts featuredBlogs={featuredBlogs} />
      )}
      <BlogSection1
        blogs={blogs.data}
        products={products.data}
        categories={categories}
      />
      <CTACard />
    </div>
  );
}
