"use client";

import { getBatchData } from "@/api/service";
import BlogDetails from "@/components/blog/BlogDetails";
import Breadcrumb from "@/components/breadcrumb/BreadCrumb";
import CTACard from "@/components/cta/CtaSection";
import Loading from "@/components/loading/Loading";
import NotFound from "@/components/notFound/NotFound";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [stats, setStats] = useState([]);
  const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_URL || "";

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const features = [
      { name: "blog_post", amount: 100000 },
      { name: "about_service", amount: 3 },
      { name: "ecommerce_product", amount: 3 },
      { name: "about_statistic", amount: 10 },
    ];

    async function fetchData() {
      try {
        const data = await getBatchData(features);

        const fetchedBlogs = data.blog_post?.data || [];
        const fetchedServices = data.about_service?.data || [];
        const fetchedProducts = data.ecommerce_product?.data || [];

        setServices(fetchedServices);
        setProducts(fetchedProducts);

        // ✅ Correct filtering
        const currentBlog = fetchedBlogs.find((p) => p.slug === slug);

        if (currentBlog) {
          const bannerImage = currentBlog.banner_image
            ? `${IMAGE_BASE_URL}/${currentBlog.banner_image}`
            : null;

          const galleryImages =
            currentBlog.images?.map(
              (img) => `${IMAGE_BASE_URL}/${img.image_path}`,
            ) || [];

          // Final ordered images array
          currentBlog.allImages = [
            ...(bannerImage ? [bannerImage] : []),
            ...galleryImages,
          ];
        }

        const related = fetchedBlogs.filter((p) => p.slug !== slug).slice(0, 3);

        setBlog(currentBlog);
        setRelatedBlogs(related);
        setStats(data.about_statistic || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // Global loading done!
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="">
        <Loading />
      </div>
    );
  }

  if (!blog && !loading) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Breadcrumb Component */}
      <Breadcrumb
        pageTitle={blog?.title}
        pageName={blog?.title}
        currentPage="South Flower Post"
        backgroundImage="/images/blog-slug-bread.jpg"
      />
      <BlogDetails
        blog={blog}
        services={services}
        products={products}
        relatedBlogs={relatedBlogs}
      />
      <CTACard stats={stats.data} />
    </div>
  );
}
