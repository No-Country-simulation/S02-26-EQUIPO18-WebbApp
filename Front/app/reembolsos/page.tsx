import Link from "next/link";
import { ArrowLeft } from 'lucide-react';

export default function RefundPolicy() {
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
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Política de Reembolso y Cancelación
          </h1>
          <p className="mt-4 text-sm text-gray-500">
            Última actualización: 27 de febrero de 2026
          </p>
        </header>

        <section className="space-y-8 text-gray-700 leading-relaxed">
          <p>
            En <strong>Total Incorporation</strong>, nos esforzamos por ofrecer un servicio eficiente y transparente. Debido a la naturaleza de nuestros servicios de gestión legal y administrativa ante entes gubernamentales en los Estados Unidos, nuestra política se rige por las siguientes condiciones:
          </p>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Período de Solicitud de Reembolso</h2>
            <p>
              El Cliente puede solicitar un reembolso total o parcial dentro de las <strong>48 horas</strong> posteriores a la realización del pago, siempre y cuando el proceso de tramitación ante las autoridades estatales o federales no haya sido iniciado.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Gastos No Reembolsables</h2>
            <p className="mb-3">
              Una vez que la solicitud ha sido remitida a las oficinas gubernamentales correspondientes (Secretaría de Estado, IRS, etc.), se aplican las siguientes restricciones:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Tasas Gubernamentales:</strong> Los montos destinados a pagos estatales y federales no son reembolsables bajo ninguna circunstancia.</li>
              <li><strong>Comisiones de Procesamiento:</strong> Las tarifas retenidas por Stripe en la transacción original no son recuperables.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Reembolsos Parciales</h2>
            <p>
              Si el Cliente decide cancelar el servicio después de las 48 horas, pero antes de que el trámite sea enviado al gobierno, se podrá emitir un reembolso parcial. Se deducirá un cargo administrativo de [Monto, ej: $50 USD] por los servicios de consultoría y preparación de documentos ya prestados.
            </p>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
            <h2 className="text-lg font-semibold text-blue-900 mb-1 uppercase tracking-wide">Nota Importante</h2>
            <p className="text-blue-800 text-sm italic">
              Si una solicitud es rechazada por errores imputables a nuestra gestión, se ofrecerá el trámite nuevamente sin costo o el reembolso total de nuestros honorarios. No nos hacemos responsables por rechazos debidos a información falsa o incompleta proporcionada por el Cliente.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Proceso de Reembolso</h2>
            <ol className="list-decimal pl-5 space-y-3">
              <li>Enviar un correo a <strong>soporte@totalincorporation.com</strong> con el asunto "Solicitud de Reembolso - [ID de Orden]".</li>
              <li>Incluir el motivo de la cancelación.</li>
              <li>Una vez aprobado, el reembolso se procesará a través de <strong>Stripe</strong> hacia el método de pago original.</li>
              <li>El tiempo de acreditación suele ser de <strong>5 a 10 días hábiles</strong>.</li>
            </ol>
          </div>
        </section>

        <footer className="mt-12 pt-8 border-t border-gray-100 text-center">
          <p className="text-gray-500 text-sm">
            Al realizar un pago en nuestra plataforma, usted acepta los términos descritos en esta política.
          </p>
        </footer>


      </div>
    </main>
  );
}