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

import TrustedPartners from "@/components/home/TrustedPartners";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getAllTechnicians } from "@/app/(publicGroup)/_action/technicianAction";

export default async function HomePage() {
  // Fetch technicians server-side — the correct pattern in Next.js App Router
  let technicians: any[] = [];
  try {
    const response = await getAllTechnicians();
    if (response?.success) {
      // Support response.data, response.technicians, response.results
      const raw = response.data ?? response.technicians ?? response.results ?? [];
      technicians = Array.isArray(raw) ? raw : raw ? [raw] : [];
    } else if (Array.isArray(response)) {
      technicians = response;
    }
    technicians = technicians.slice(0, 4);
  } catch {
    technicians = [];
  }

  return (
    <div>



      <Hero></Hero>
      <StatsSection></StatsSection>
      <TrustedPartners></TrustedPartners>
      <PopularCategories></PopularCategories>
      <FeaturedServices></FeaturedServices>
      <TopRatedTechnicians technicians={technicians} />
      <HowItWorks></HowItWorks>
      <WhyChooseUs></WhyChooseUs>
      <CustomerReviews></CustomerReviews>
      <LatestOffers></LatestOffers>
      <BecomeTechnicianSection></BecomeTechnicianSection>
      <FAQSection></FAQSection>
      <CTASection></CTASection>
    </div >
  );
}
