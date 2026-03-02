import Link from "next/link";
import { ArrowLeft } from 'lucide-react';

export default function TerminosPage() {
  return (
    <main className="min-h-screen bg-white py-20 px-6 max-w-4xl mx-auto text-gray-800">
      <div className="max-w-3xl mx-auto bg-white shadow-sm border border-gray-100 rounded-xl p-8 sm:p-12">
        {/* Botón Volver Estratégico */}
        <div className="mb-8">
          <Link 
            href="/#pricing-section" 
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft size={16} />
            Volver a los planes
          </Link>
        </div>        
          
          <h1 className="text-4xl font-black mb-8 text-gray-900">Términos y Condiciones de Servicio</h1>
          
          <section className="space-y-6">
            <p className="text-lg text-gray-600">
              Última actualización: {new Date().toLocaleDateString()}
            </p>

            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 mb-8">
              <p className="text-blue-900 font-bold">
                IMPORTANTE: Total Incorporation no es una firma de abogados ni una institución financiera. 
                No proporcionamos asesoramiento legal, fiscal o contable.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-10">1. Descripción del Servicio</h2>
            <p>
              Total Incorporation facilita el registro de entidades comerciales (LLC) y servicios de Agente Registrado en los Estados Unidos. 
              Al contratar nuestros servicios, el cliente entiende que actuamos como gestores ante las autoridades gubernamentales correspondientes.
            </p>

            <h2 className="text-2xl font-bold mt-10">2. Tarifas y Pagos</h2>
            <p>
              Los precios de nuestros planes están detallados en la página principal. Los pagos se procesan de forma segura a través de la plataforma Stripe.
              Una vez iniciado el proceso de registro ante el Estado, las tarifas gubernamentales no son reembolsables.
            </p>

            <h2 className="text-2xl font-bold mt-10">3. Responsabilidad del Cliente</h2>
            <p>
              El cliente es responsable de proporcionar información veraz y completa. Esto incluye el nombre de la empresa, datos de contacto y correos electrónicos válidos para la comunicación del trámite.
            </p>

            <h2 className="text-2xl font-bold mt-10">4. Firma Digital y Contratos</h2>
            <p>
              Para completar la incorporación, el cliente deberá firmar digitalmente los documentos requeridos. Estas firmas tienen validez legal bajo las leyes aplicables de comercio electrónico.
            </p>
          </section>



      </div>
    </main>
  );
}