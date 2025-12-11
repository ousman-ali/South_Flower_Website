"use client";

import { getBatchData, getProductCategories } from "@/api/service";
import Breadcrumb from "@/components/breadcrumb/BreadCrumb";
import CTACard from "@/components/cta/CtaSection";
import Loading from "@/components/loading/Loading";
import ProductSection1 from "@/components/products/ProductSection1";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const features = [
      { name: "ecommerce_product", amount: 100000 },
      { name: "about_service", amount: 5 },
    ];

    async function fetchData() {
      try {
        const data = await getBatchData(features);
        const categories = await getProductCategories();
        setProducts(data.ecommerce_product || []);
        setCategories(categories || []);
        setServices(data.about_service || []);
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Breadcrumb Component */}
      <Breadcrumb
        pageTitle="Products"
        pageName="Our Products"
        currentPage="South Flower Products"
      />
      <ProductSection1
        products={products.data}
        categories={categories}
        services={services.data}
      />
      <CTACard />
    </div>
  );
}
