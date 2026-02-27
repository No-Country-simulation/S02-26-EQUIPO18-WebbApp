import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Cookie } from 'lucide-react';

export default function CookiesPolicy() {
  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
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

        <header className="border-b border-gray-100 pb-8 mb-8">
          <div className="flex items-center gap-3 mb-4 text-blue-600">
            <Cookie size={32} />
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Política de Cookies
            </h1>
          </div>
          <p className="text-sm text-gray-500">
            Última actualización: 27 de febrero de 2026
          </p>
        </header>

        <section className="space-y-8 text-gray-700 leading-relaxed">
          <p>
            En <strong>Total Incorporation</strong>, utilizamos cookies y tecnologías similares para mejorar tu experiencia, analizar el tráfico y personalizar el contenido publicitario. Al navegar en nuestro sitio, aceptas el uso de estas tecnologías de acuerdo con esta política.
          </p>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. ¿Qué son las cookies?</h2>
            <p>
              Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo (ordenador, móvil o tablet) cuando visitas un sitio web. Ayudan a que el sitio funcione correctamente y nos proporcionan información sobre cómo interactúas con él.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Tipos de cookies que utilizamos</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <h3 className="font-bold text-gray-900">Cookies Técnicas (Necesarias)</h3>
                <p className="text-sm">
                  Esenciales para que el sitio funcione. Incluyen cookies de sesión y las necesarias para procesar pagos seguros a través de <strong>Stripe</strong>. No pueden ser desactivadas.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <h3 className="font-bold text-gray-900">Cookies de Rendimiento y Análisis</h3>
                <p className="text-sm">
                  Utilizamos <strong>Google Analytics</strong> para entender cómo llegan los usuarios al sitio y qué secciones son las más visitadas. Esto nos ayuda a optimizar nuestra plataforma.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <h3 className="font-bold text-gray-900">Cookies de Marketing y Atribución</h3>
                <p className="text-sm text-blue-800">
                  Implementamos píxeles de <strong>Meta Business (Facebook)</strong> y <strong>Google Ads</strong>. Estas cookies nos permiten medir la efectividad de nuestros anuncios y realizar una atribución precisa de las conversiones (captura de identificadores como GCLID y FBC).
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Control de Cookies</h2>
            <p>
              Puedes gestionar o desactivar las cookies a través de la configuración de tu navegador. Ten en cuenta que desactivar ciertas cookies puede afectar la funcionalidad de nuestro proceso de solicitud y pago.
            </p>
          </div>
        </section>

        <footer className="mt-12 pt-8 border-t border-gray-100">
          <p className="text-center text-gray-500 text-sm">
            Para más información sobre cómo protegemos tus datos, visita nuestros <Link href="/terminos" className="text-blue-600 underline">Términos y Condiciones</Link>.
          </p>
        </footer>
      </div>
    </main>
  );
}