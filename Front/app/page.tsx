// Porqué NextJS: Este es un "Server Component" por defecto. 
// Es ideal para la primera carga porque es muy rápido.
"use client"; // <- Necesario para manejar el clic del usuario

import { useState } from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react"; 

import ServiceCard from "@/components/ServiceCard";
import MultiStepForm from "@/components/MultiStepForm";
import { FAQSection } from "@/components/FAQSection";

import { SERVICIOS } from "@/lib/constants";
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
      <a
        href="https://wa.me/1234567890?text=Hola!%20Me%20gustaría%20saber%20más%20sobre%20los%20planes%20de%20incorporación."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed h-15 bottom-4 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all hover:scale-110 flex items-center justify-center group"
        aria-label="Contacto por WhatsApp"
      >
        <MessageCircle size={30} fill="currentColor" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-500 font-bold">
          ¿Dudas? Chatea con nosotros
        </span>
      </a>

      {/* 1. Sección: CONFIANZA */}
      <section className="bg-white py-20 px-4 border-b border-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            Impulsa tu negocio con <span className="text-blue-600">Total Incorporation</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Registramos tu empresa en Estados Unidos de forma rápida, segura y 100% online. 
            Sin complicaciones burocráticas.
          </p>
          
          {/* Logos de Confianza / Seguridad */}
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-gray-800 italic">Stripe</span>
              <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">Verified</span>
            </div>
            <div className="h-8 w-px bg-gray-300 hidden md:block"></div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-gray-800 uppercase">IRS</span>
              <span className="text-xs font-semibold text-gray-500">Authorized</span>
            </div>
            <div className="h-8 w-px bg-gray-300 hidden md:block"></div>
            <div className="text-gray-800 font-bold">SSL Secure 🔒</div>
          </div>
        </div>
      </section>

      {/* 2. Sección: CÓMO FUNCIONA (Proceso en 3 pasos) */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Tu empresa lista en 3 simples pasos</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mb-4">1</div>
            <h3 className="font-bold text-xl mb-2 text-gray-800">Elige tu Plan</h3>
            <p className="text-gray-600">Selecciona el paquete que mejor se adapte a tus objetivos comerciales.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mb-4">2</div>
            <h3 className="font-bold text-xl mb-2 text-gray-800">Completa tus Datos</h3>
            <p className="text-gray-600">Dinos el nombre de tu empresa y la información básica de registro.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mb-4">3</div>
            <h3 className="font-bold text-xl mb-2 text-gray-800">Pago y Firma</h3>
            <p className="text-gray-600">Paga de forma segura vía Stripe y firma tus documentos legalmente.</p>
          </div>
        </div>
      </section>
      
      {/* 3. Sección: SELECCIÓN PLANES */}
      <section className="max-w-6xl mx-auto py-10 px-4">
        <header className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Planes Transparentes</h2>
          <p className="text-xl text-gray-600">Sin costos ocultos ni sorpresas de último momento.</p>
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

      {/* 4. Sección: FORMULARIO (Solo aparece si hay un plan seleccionado) */}
      {selectedPlan && (
        <section id="registro-form" className="py-22 animate-in fade-in slide-in-from-bottom duration-700">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="text-3xl font-bold text-blue-950">Estás registrando tu Plan {selectedPlan.toUpperCase()}</h2>
            <p className="text-gray-600">Completa los pasos para iniciar el trámite legal.</p>
          </div>
          
          {/* Le pasamos el planId al formulario para que sepa qué cobrar */}
          <MultiStepForm planId={selectedPlan} />
        </section>
      )}

      {/*5. Sección: FAQ */}
      <FAQSection/>

      {/* 6. FOOTER / CONTACTO RÁPIDO  y DIRECCIÓn*/}
      <Footer/>
    </main>
    

  );
}