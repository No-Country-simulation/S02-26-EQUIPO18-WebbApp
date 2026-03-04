"use client";

import { useState, useEffect, useRef } from "react";
import { CheckCircle2, TrendingUp, Users } from "lucide-react";
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
          {/* estadisticas rapidas */}
          <div className="bg-blue-600 text-white py-8">
            <div className="max-w-6xl mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="flex flex-col items-center gap-2">
                  <CheckCircle2 size={40} className="text-blue-200" />
                  <p className="text-3xl font-bold">500+</p>
                  <p className="text-blue-100">Empresas Registradas</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Users size={40} className="text-blue-200" />
                  <p className="text-3xl font-bold">98%</p>
                  <p className="text-blue-100">Clientes Satisfechos</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <TrendingUp size={40} className="text-blue-200" />
                  <p className="text-3xl font-bold">7-10</p>
                  <p className="text-blue-100">Dias Promedio</p>
                </div>
              </div>
            </div>
          </div>
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