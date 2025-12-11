"use client";

import { getBatchData } from "@/api/service";
import AboutSection1 from "@/components/about/AboutSection1";
import Breadcrumb from "@/components/breadcrumb/BreadCrumb";
import Loading from "@/components/loading/Loading";
import PartnersSection from "@/components/partners/Partners";
import TestimonialSection from "@/components/testimonials/TestimonialSection";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const [aboutContent, setAboutContent] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [setup, setSetup] = useState(null);
  const [partners, setPartners] = useState([]);
  const [services, setServices] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const features = [
      { name: "about_content", amount: 4 },
      { name: "about_testimonial", amount: 4 },
      { name: "about_service", amount: 4 },
      { name: "about_gallery", amount: 10 },
      { name: "about_partner", amount: 10 },
      { name: "about_statistic", amount: 10 },
      { name: "about_setup" },
    ];

    async function fetchData() {
      try {
        const data = await getBatchData(features);

        // Set states individually
        setAboutContent(data.about_content || []);
        setTestimonials(data.about_testimonial || []);
        setServices(data.about_service || []);
        setGallery(data.about_gallery || []);
        setSetup(data.about_setup || null);
        setPartners(data.about_partner || []);
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
        pageTitle="About"
        pageName="Our Story"
        currentPage="Company History"
      />
      <AboutSection1
        setup={setup.data}
        gallery={gallery.data}
        aboutContent={aboutContent.data}
        services={services.data}
      />
      <TestimonialSection testimonials={testimonials.data} />
      <PartnersSection partners={partners.data} />
    </div>
  );
}
