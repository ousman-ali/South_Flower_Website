"use client";

import { getBatchData } from "@/api/service";
import Breadcrumb from "@/components/breadcrumb/BreadCrumb";
import CTACard from "@/components/cta/CtaSection";
import Loading from "@/components/loading/Loading";
import ServicesSection1 from "@/components/services/ServiceSection1";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [stats, setStats] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const features = [
      { name: "ecommerce_product", amount: 5 },
      { name: "about_service", amount: 5 },
      { name: "about_statistic", amount: 10 },
    ];

    async function fetchData() {
      try {
        const data = await getBatchData(features);
        setProducts(data.ecommerce_product || []);
        setServices(data.about_service || []);
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Breadcrumb Component */}
      <Breadcrumb
        pageTitle="Services"
        pageName="Our Services"
        currentPage="South Flower Services"
        backgroundImage="/images/service-bread.jpg"
      />
      <ServicesSection1 services={services.data} products={products.data} />
      <CTACard stats={stats.data} />
    </div>
  );
}
