"use client";

import { useEffect, useState } from "react";

import { getBatchData } from "@/api/service";
import AboutSection from "@/components/about/AboutSection";
import BlogSection from "@/components/blog/BlogSection";
import CTACard from "@/components/cta/CtaSection";
import HeroSection from "@/components/hero/HeroSection";
import PartnersSection from "@/components/partners/Partners";
import ProductSection from "@/components/products/ProductSection";
import ServicesSection from "@/components/services/ServicesSection";
import TeamSection from "@/components/team/TeamSection";
import TestimonialSection from "@/components/testimonials/TestimonialSection";
import Loading from "@/components/loading/Loading";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [services, setServices] = useState([]);
  const [aboutContent, setAboutContent] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [teams, setTeams] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [setup, setSetup] = useState(null);
  const [partners, setPartners] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const features = [
      { name: "blog_post", amount: 4 },
      { name: "about_service", amount: 4 },
      { name: "about_content", amount: 4 },
      { name: "about_testimonial", amount: 4 },
      { name: "about_team", amount: 10 },
      { name: "about_gallery", amount: 10 },
      { name: "about_partner", amount: 10 },
      { name: "about_setup" },
    ];

    async function fetchData() {
      try {
        const data = await getBatchData(features);

        console.log("datas", data);
        // Set states individually
        setBlogs(data.blog_post || []);
        setServices(data.about_service || []);
        setAboutContent(data.about_content || []);
        setTestimonials(data.about_testimonial || []);
        setTeams(data.about_team || []);
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

  console.log("teams home", teams.data);

  if (loading) {
    return (
      <div className="">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <HeroSection />
      <AboutSection setup={setup.data} />
      <ServicesSection servicesData={services.data} />
      <BlogSection blogs={blogs.data} />
      <ProductSection />
      <CTACard />
      <TeamSection teams={teams.data} />
      <TestimonialSection testimonialsData={testimonials.data} />
      <PartnersSection partnersData={partners.data} />
    </>
  );
}
