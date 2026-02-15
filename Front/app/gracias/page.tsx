"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { SERVICIOS } from "@/lib/constants";//importamos constantes
import Link from "next/link";

export default function GraciasPage() {

  //useSearchParams: Es un hook de Next.js que nos permite leer lo que viene después del signo ? en la URL. 
  //Aquí buscamos el session_id que Stripe añade automáticamente al redirigir al usuario.  
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const planId = searchParams.get("plan");


  //useEffect: Este bloque de código se ejecuta una sola vez cuando la página termina de cargar. 
  //Es el momento para avisar a Meta y Google, ya que tenemos la certeza de que el 
  //usuario está viendo la confirmación.
  useEffect(() => {
    if (sessionId && planId){//Ponemos un if (sessionId) para evitar que el Píxel cuente una "venta" si alguien entra a la página de gracias por error o escribiendo la URL manualmente sin haber pasado por Stripe.
        // 1. Buscamos los datos del plan en @/lib/constants
      const planData = SERVICIOS.find(s => s.id === planId);
      const valorCompra = planData ? planData.price : 499; // 499 como fallback
    
        // 2. Disparamos el evento a Meta con el valor REAL
        if(typeof window !== "undefined"){ //eesta línea asegura que el código de rastreo solo se dispare cuando estemos en el navegador (donde existen Meta y Google).
            console.log("Evento de conversión disparado para la sesión:", sessionId); 
        
            // AQUÍ DISPARAREMOS LOS PÍXELES DE ADS
        
            // Ejemplo Meta Pixel:
            // window.fbq('track', 'Purchase', { value: 499.00, currency: 'USD' });
            
            // Ejemplo Google Ads:
            // window.gtag('event', 'conversion', { 'send_to': 'AW-XXXXX/XXXXX', 'value': 499.0, 'currency': 'USD' });
            
        // 1. EVENTO META PIXEL
        if ((window as any).fbq) {  
          (window as any).fbq('track', 'Purchase', {
          value: valorCompra, 
          currency: 'USD',
          content_name: planData?.name || 'Plan Inicial',
          content_type: 'product'
          });
              console.log(`Evento Purchase enviado: $${valorCompra} USD para el plan ${planId}`);
        }

        // 2. EVENTO GOOGLE TAG (gtag.js)
        if ((window as any).gtag) {
          (window as any).gtag('event', 'purchase', {
            transaction_id: sessionId, // Usamos el ID de Stripe como ID de transacción único
            value: valorCompra,
            currency: 'USD',
            items: [{
              item_id: planId,
              item_name: planData?.name || 'Plan Inicial',
              price: valorCompra
            }]
          });
          console.log(`Google Purchase: $${valorCompra} USD`);
        }

        }
      }
  }, [sessionId, planId]);

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center border border-gray-100">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-black text-gray-900 mb-4">¡Pago Confirmado!</h1>
        <p className="text-gray-600 mb-8">
          Tu registro de empresa está en proceso. Hemos recibido los datos y el pago correctamente. 
          En breve recibirás un email con los siguientes pasos.
        </p>

        <div className="bg-blue-50 rounded-2xl p-4 mb-8 text-left">
          <h3 className="text-blue-800 font-bold text-sm uppercase mb-2">¿Qué sigue ahora?</h3>
          <ul className="text-sm text-blue-700 space-y-2">
            <li>• Formalizar tu solicitud con la firma digital del contrato.</li>
            <li>• Revisión legal del nombre de tu empresa.</li>
            <li>• Preparación de documentos para el estado.</li>
            <li>• Envío de Documentación pertinente de tu nueva empresa.</li>
          </ul>
        </div>

        <Link 
          href="/"
          className="inline-block w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-lg"
        >
          Volver al Inicio
        </Link>
      </div>
    </main>
  );
}