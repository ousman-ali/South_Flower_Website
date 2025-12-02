import AboutSection from "@/components/about/AboutSection";
import BlogSection from "@/components/blog/BlogSection";
import CTACard from "@/components/cta/CtaSection";
import HeroSection from "@/components/hero/HeroSection";
import PartnersSection from "@/components/partners/Partners";
import ProductSection from "@/components/products/ProductSection";
import ServicesSection from "@/components/services/ServicesSection";
import TestimonialSection from "@/components/testimonials/TestimonialSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <BlogSection />
      <ProductSection />
      <CTACard />
      <TestimonialSection />
      <PartnersSection />
    </>
  );
}
