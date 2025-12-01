import AboutSection from "@/components/about/AboutSection";
import HeroSection from "@/components/hero/HeroSection";
import ProductSection from "@/components/products/ProductSection";
import ProjectSection from "@/components/projects/ProjectSection";
import ServicesSection from "@/components/services/ServicesSection";
import TestimonialSection from "@/components/testimonials/TestimonialSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProjectSection />
      <ProductSection />
      <TestimonialSection />
    </>
  );
}
