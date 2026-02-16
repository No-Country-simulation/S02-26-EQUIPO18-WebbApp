// Porqué NextJS: Este es un "Server Component" por defecto. 
// Es ideal para la primera carga porque es muy rápido.
"use client"; // <- Necesario para manejar el clic del usuario

import { useState } from "react";
import Link from "next/link";

//Componentes
import WhatsAppButton from "@/components/WhatsAppButton";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import PricingSection from "@/components/PricingSection";
import RegistrationSection from "@/components/RegistrationSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

export default function Home() {

  // Estado para guardar el plan que eligió el usuario (empieza vacío)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleSelectPlan = (id: string) => {//Cuando se selecciona un plan se desplaza suavemente hacia el formulario
    setSelectedPlan(id);
    //Desplazamiento: movimiento suave al formulario. Usamos un pequeño Delay
    setTimeout(()=>{
      document.getElementById("registro-form")?.scrollIntoView({ 
        behavior: "smooth",
        block:"start" });
    }, 100);  
  };

  return (
    <main className="min-h-screen bg-gray-50 py-20 px-4">

      {/* --- BOTÓN FLOTANTE DE WHATSAPP --- */}
      <WhatsAppButton/>

      {/* 1. Sección: HERO Y CONFIANZA */}
      <HeroSection/>

      {/* 2. Sección: CÓMO FUNCIONA (Proceso en 3 pasos) */}
      <HowItWorks/>
      
      {/* 3. Sección: SELECCIÓN PLANES */}
      <PricingSection selectedPlan={selectedPlan} onSelectPlan={handleSelectPlan}/>

      {/* 4. Sección: FORMULARIO (Solo aparece si hay un plan seleccionado) */}
      {selectedPlan && (
        <RegistrationSection planId={selectedPlan}/>
      )}

      {/* 5. Sección: FAQ */}
      <FAQSection/>

      {/* 6. FOOTER / CONTACTO RÁPIDO  y DIRECCIÓN*/}
      <Footer/>
    </main>
    

  );
}