import CategoriesSection from "@/components/CategoriesSection";
import FAQSection from "@/components/FAQSection";
import FeaturesSection from "@/components/FeaturesSection";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function Home() {
  return (
    <div>
     <HeroSection></HeroSection>
     <ServicesSection></ServicesSection>
     <StatsSection></StatsSection>
     <FeaturesSection></FeaturesSection>
     <CategoriesSection></CategoriesSection>
     <TestimonialsSection></TestimonialsSection>
     <FAQSection></FAQSection>
    </div>
  );
}
