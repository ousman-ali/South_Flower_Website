"use client";

import { getBatchData } from "@/api/service";
import Breadcrumb from "@/components/breadcrumb/BreadCrumb";
import CTACard from "@/components/cta/CtaSection";
import Loading from "@/components/loading/Loading";
import NotFound from "@/components/notFound/NotFound";
import ProductDetails from "@/components/products/ProductDetails";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductDetailsPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [services, setServices] = useState([]);
  const [stats, setStats] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_URL || "";

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const features = [
      { name: "about_service", amount: 3 },
      { name: "ecommerce_product", amount: 100000 },
      { name: "about_statistic", amount: 10 },
    ];

    async function fetchData() {
      try {
        const data = await getBatchData(features);

        const fetchedServices = data.about_service?.data || [];
        const fetchedProducts = data.ecommerce_product?.data || [];

        setServices(fetchedServices);
        setStats(data.about_statistic || []);

        // ✅ Correct filtering
        const currentProduct = fetchedProducts.find((p) => p.slug === slug);

        if (currentProduct) {
          const bannerImage = currentProduct.banner_image
            ? `${IMAGE_BASE_URL}/${currentProduct.banner_image}`
            : null;

          const galleryImages =
            currentProduct.images?.map(
              (img) => `${IMAGE_BASE_URL}/${img.image_path}`
            ) || [];

          // Final ordered images array
          currentProduct.allImages = [
            ...(bannerImage ? [bannerImage] : []),
            ...galleryImages,
          ];
        }

        const related = fetchedProducts
          .filter((p) => p.slug !== slug)
          .slice(0, 3);

        setProduct(currentProduct);
        setRelatedProducts(related);
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

  if (!product && !loading) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Breadcrumb Component */}
      <Breadcrumb
        pageTitle="Product Details"
        pageName="Product Details"
        currentPage="South Flower Product"
        backgroundImage="/images/product-slug-bread.jpg"
      />
      <ProductDetails
        services={services}
        product={product}
        relatedProducts={relatedProducts}
      />
      <CTACard stats={stats.data} />
    </div>
  );
}
