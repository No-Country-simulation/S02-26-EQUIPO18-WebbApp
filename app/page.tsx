// Porqué NextJS: Este es un "Server Component" por defecto. 
// Es ideal para la primera carga porque es muy rápido.
"use client"; // <- Necesario para manejar el clic del usuario

import { useState } from "react";
import ServiceCard from "@/components/ServiceCard";
import MultiStepForm from "@/components/MultiStepForm";
import { SERVICIOS } from "@/lib/constants";

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
      
      {/* 1. Sección SELECCIÓN PLANES */}
      <section className="max-w-6xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
            Impulsa tu negocio con <span className="text-blue-600">Total Incorporation</span>
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Elige el plan que mejor se adapte a tus necesidades actuales.
          </p>
        </header>
        {/* Contenedor de las tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-strech">
          {SERVICIOS.map((servicio) => (
            <div key={servicio.id} className="relative">
              <ServiceCard 
                // Usamos el "spread operator" (...) para pasar todas las propiedades del objeto de golpe
                {...servicio} 
                // Le pasamos una función al botón de la tarjeta
                onSelect={() => handleSelectPlan(servicio.id)}
                isSelected={selectedPlan === servicio.id}
              />
            </div>
            
          ))}
        </div>
      </section>

      {/* 2. SECCIÓN DEL FORMULARIO (Solo aparece si hay un plan seleccionado) */}
      {selectedPlan && (
        <section id="registro-form" className="py-12 animate-in fade-in slide-in-from-bottom duration-700">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="text-3xl font-bold text-blue-950">Estás registrando tu Plan {selectedPlan.toUpperCase()}</h2>
            <p className="text-gray-600">Completa los pasos para iniciar el trámite legal.</p>
          </div>
          
          {/* Le pasamos el planId al formulario para que sepa qué cobrar */}
          <MultiStepForm planId={selectedPlan} />
        </section>
      )}


    </main>
  );
}