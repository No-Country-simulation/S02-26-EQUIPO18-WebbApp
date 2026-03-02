"use client";

import { useConsent } from "@/context/ConsentContext";
import { useState, useEffect } from "react";

export default function CookieBanner() {
  const { hasConsent, accept, decline } = useConsent();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Comprobar si el usuario ya aceptó las cookies
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    accept(); // Actualizamos el estado de consentimiento en el contexto
    setIsVisible(false);
    
  };

  const declineCookies = () => {
    decline(); // Actualizamos el estado de consentimiento en el contexto
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900 text-white p-4 z-50 shadow-2xl border-t border-slate-700 animate-in fade-in slide-in-from-bottom-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-slate-300 text-center md:text-left">
          <p>
            Valoramos tu privacidad. Utilizamos cookies para mejorar tu experiencia y analizar nuestro tráfico de acuerdo a nuestra 
            <a href="/privacidad" className="underline ml-1 hover:text-blue-400">Política de Privacidad</a>.
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={declineCookies}
            className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition"
          >
            Rechazar
          </button>
          <button 
            onClick={acceptCookies}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition shadow-lg"
          >
            Aceptar y Continuar
          </button>
        </div>
      </div>
    </div>
  );
}