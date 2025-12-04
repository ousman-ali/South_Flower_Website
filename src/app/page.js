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

export default async function Home() {
  const features = [
    { name: "blog_post", amount: 3 },
    { name: "about_service", amount: 4 },
    { name: "project_project", amount: 2 },
    { name: "about_content", amount: 2 },
  ];

  const data = await getBatchData(features);

  console.log("datas", data);

  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <BlogSection />
      <ProductSection />
      <CTACard />
      <TeamSection />
      <TestimonialSection />
      <PartnersSection />
    </>
  );
}
