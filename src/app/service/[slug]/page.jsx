"use client";

import { getBatchData } from "@/api/service";
import Breadcrumb from "@/components/breadcrumb/BreadCrumb";
import CTACard from "@/components/cta/CtaSection";
import Loading from "@/components/loading/Loading";
import NotFound from "@/components/notFound/NotFound";
import ServiceDetails from "@/components/services/ServiceDetails";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [service, setService] = useState(null);
  const [relatedServices, setRelatedServices] = useState([]);
  const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_URL || "";

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const features = [
      { name: "about_service", amount: 10000 },
      { name: "ecommerce_product", amount: 3 },
    ];

    async function fetchData() {
      try {
        const data = await getBatchData(features);

        const fetchedServices = data.about_service?.data || [];
        const fetchedProducts = data.ecommerce_product?.data || [];

        setProducts(fetchedProducts);

        // ✅ Correct filtering
        const currentService = fetchedServices.find((s) => s.slug === slug);

        if (currentService) {
          const bannerImage = currentService.banner_image
            ? `${IMAGE_BASE_URL}/${currentService.banner_image}`
            : null;

          const galleryImages =
            currentService.images?.map(
              (img) => `${IMAGE_BASE_URL}/${img.image_path}`
            ) || [];

          // Final ordered images array
          currentService.allImages = [
            ...(bannerImage ? [bannerImage] : []),
            ...galleryImages,
          ];
        }

        const related = fetchedServices
          .filter((s) => s.slug !== slug)
          .slice(0, 3);

        setService(currentService);
        setRelatedServices(related);
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

  if (!service && !loading) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Breadcrumb Component */}
      <Breadcrumb
        pageTitle="Service Details"
        pageName="Service Details"
        currentPage="South Flower Service"
      />
      <ServiceDetails
        service={service}
        products={products}
        relatedServices={relatedServices}
      />
      <CTACard />
    </div>
  );
}
