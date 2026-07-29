import { BecomeTechnicianSection } from "@/components/home/BecomeTechnicianSection";
import { PopularCategories } from "@/components/home/categories";
import { CTASection } from "@/components/home/CTASection";
import { CustomerReviews } from "@/components/home/CustomerReviews";
import { FAQSection } from "@/components/home/FAQSection";
import { FeaturedServices } from "@/components/home/featuredServices";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { LatestOffers } from "@/components/home/LatestOffers";
import { StatsSection } from "@/components/home/Statistics";
import { TopRatedTechnicians } from "@/components/home/technicians";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function HomePage() {
  return (
    <div>



      <Hero></Hero>
      <StatsSection></StatsSection>
      <PopularCategories></PopularCategories>
      <FeaturedServices></FeaturedServices>
      <TopRatedTechnicians></TopRatedTechnicians>
      <HowItWorks></HowItWorks>
      <WhyChooseUs></WhyChooseUs>
      <CustomerReviews></CustomerReviews>
      <LatestOffers></LatestOffers>
      <BecomeTechnicianSection></BecomeTechnicianSection>
      <FAQSection></FAQSection>
      <CTASection></CTASection>
    </div>
  );
}
