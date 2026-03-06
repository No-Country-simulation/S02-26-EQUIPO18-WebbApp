
import {  AlertCircle } from 'lucide-react';

import BtnCloseWindow from "@/components/btnCerrarWindow/page";
import NavbarLegales from '@/components/NavbarLegales';

export default function RefundPolicy() {
  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <NavbarLegales/>
      <div className="max-w-3xl mx-auto bg-white shadow-sm border border-gray-100 rounded-xl p-8 sm:p-12">
        
        <BtnCloseWindow />   

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
            En <strong>Total Incorporation</strong>, nos esforzamos por ofrecer un servicio eficiente y transparente. Debido a la naturaleza de nuestros servicios de gestión legal ante entes gubernamentales en los EE. UU., nuestra política se divide en los siguientes escenarios:
          </p>

          {/* ESCENARIO 1: ERROR DE LA EMPRESA */}
          <div className="bg-green-50 border-l-4 border-green-400 p-6 my-6">
            <h2 className="text-xl font-bold text-green-900 mb-2 flex items-center gap-2">
              <AlertCircle size={20} /> 1. Reembolso Total (Garantía de Servicio)
            </h2>
            <p className="text-green-800">
              Si una solicitud presenta errores críticos <strong>imputables exclusivamente a la gestión de Total Incorporation</strong>, el cliente tendrá la opción de solicitar el trámite nuevamente sin costo adicional o un <strong>reembolso del 100% de lo abonado</strong>. En este caso, la empresa asume los costos administrativos y comisiones.
            </p>
          </div>

          {/* ESCENARIO 2: CANCELACIÓN ANTES DE LAS 48HS / SIN TRÁMITE */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Reembolso Parcial (Antes de iniciar el trámite)</h2>
            <p className="mb-3">
              Si el Cliente solicita la cancelación dentro de las primeras <strong>48 horas</strong> posteriores al pago y el proceso de tramitación ante las autoridades (Secretaría de Estado o IRS) <strong>no ha sido iniciado</strong>, se emitirá un reembolso parcial que incluye la devolución del monto total <strong>menos</strong>:
            </p>
            <ul className="list-disc pl-5 space-y-2 italic">
              <li>El <strong>cargo administrativo de $50 USD</strong> (por consultoría y preparación inicial de documentos).</li>
              <li>Las comisiones de procesamiento de Stripe no son recuperables.</li>
            </ul>
          </div>

          {/* ESCENARIO 3: TRÁMITE YA INICIADO */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Reembolso Parcial (Trámite ya iniciado)</h2>
            <p className="mb-3">
              Una vez que la solicitud ha sido remitida a las oficinas gubernamentales correspondientes, además se aplicarán los siguientes descuentos:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Tasas Gubernamentales:</strong> Los pagos realizados a los Estados (Wyoming, Delaware, etc.) o al IRS <strong>no son reembolsables</strong>, ya que estos organismos no realizan devoluciones.</li>
              <li><strong>Honorarios Profesionales:</strong> Se evaluará la devolución proporcional de los honorarios de Total Incorporation, deduciendo siempre los costos ya devengados y comisiones.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Proceso de Solicitud</h2>
            <ol className="list-decimal pl-5 space-y-3">
              <li>Enviar un correo a <strong>soporte@totalincorporation.com</strong> con el asunto "Solicitud de Reembolso - [ID de Orden]".</li>
              <li>Especificar el motivo del reembolso.</li>
              <li>Una vez aprobado, el reembolso se procesará a través de <strong>Stripe</strong> hacia el método de pago original en un plazo de 5 a 10 días hábiles.</li>
            </ol>
          </div>
        </section>

        <footer className="mt-12 pt-8 border-t border-gray-100 text-center">
          <p className="text-gray-500 text-sm italic">
            Importante: No nos hacemos responsables por rechazos debidos a información falsa o incompleta proporcionada por el Cliente.
          </p>
        </footer>
      </div>
    </main>
  );
}