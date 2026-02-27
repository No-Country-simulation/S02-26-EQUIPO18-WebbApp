import Link from "next/link";
import { ArrowLeft } from 'lucide-react';

export default function PrivacidadPage() {

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

          <h1 className="text-4xl font-black mb-8 text-gray-900">Política de Privacidad</h1>
          
          <section className="space-y-6 text-gray-600">
            <p>
              En **Total Incorporation**, nos tomamos muy en serio la seguridad de tus datos. Esta política explica cómo recopilamos, usamos y protegemos la información necesaria para el registro de tu empresa.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-10">1. Información que Recopilamos</h2>
            <p>
              Para procesar tu solicitud, solicitamos datos específicos a través de nuestro formulario de registro:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Datos de contacto (Nombre, correo electrónico, teléfono).</li>
              <li>Información relativa a la entidad legal que deseas constituir.</li>
              <li>Información de pago (procesada exclusivamente por Stripe).</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-10">2. Uso de la Información</h2>
            <p>
              Los datos proporcionados se utilizan para:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Gestionar el trámite de incorporación ante las autoridades estatales.</li>
              <li>Crear tu cuenta de usuario en nuestra plataforma para que puedas realizar el seguimiento de tu solicitud.</li>
              <li>Enviarte notificaciones importantes sobre el estado de tu trámite y el acceso a tu contrato digital.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-10">3. Seguridad y Almacenamiento</h2>
            <p>
              Toda la información personal se almacena en bases de datos seguras con acceso restringido. Implementamos protocolos de cifrado para asegurar que tu información esté protegida contra accesos no autorizados.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-10">4. Servicios de Terceros</h2>
            <p>
              Compartimos información estrictamente necesaria con proveedores de servicios de confianza para completar tu registro:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li><strong>Stripe:</strong> Para el procesamiento seguro de pagos.</li>
              <li><strong>Plataformas de Firma Digital:</strong> Para la formalización legal de tus documentos.</li>
            </ul>
          </section>


      </div>
    </main>
  );
}