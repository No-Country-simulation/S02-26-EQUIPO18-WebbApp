"use client";

import { useState, useEffect, useRef } from "react";
import { trackEvent } from "@/lib/visitor";

import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import PricingSection from "@/components/PricingSection";
import RegistrationSection from "@/components/RegistrationSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import ProductMockup from "@/components/ProductMockup";
import EstadisticasRapidas from "./estadisticas/page";

export default function Home() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const fired50 = useRef(false);
  const fired100 = useRef(false);

  // page_view on mount + scroll tracking
  useEffect(() => {
    trackEvent("page_view");

    const handleScroll = () => {
      const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (pct >= 0.5 && !fired50.current) { fired50.current = true; trackEvent("scroll_50"); }
      if (pct >= 0.95 && !fired100.current) { fired100.current = true; trackEvent("scroll_100"); }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSelectPlan = (id: string) => {
    setSelectedPlan(id);
    trackEvent("plan_select", { planId: id });
    setTimeout(() => {
      document.getElementById("registro-form")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 100);
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 pt-20">
        <div className="px-4">
          <WhatsAppButton />
          <HeroSection />
          <HowItWorks />
          <EstadisticasRapidas />
          <ProductMockup />
          <PricingSection selectedPlan={selectedPlan} onSelectPlan={handleSelectPlan} />

          {selectedPlan && (
            <RegistrationSection planId={selectedPlan} />
          )}

          <FAQSection />
          <Footer />
        </div>
      </main>
    </>
  );
}