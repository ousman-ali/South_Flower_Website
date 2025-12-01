import AboutSection from "@/components/about/AboutSection";
import HeroSection from "@/components/hero/HeroSection";
import ProjectSection from "@/components/projects/ProjectSection";
import ServicesSection from "@/components/services/ServicesSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProjectSection />
    </>
  );
}
