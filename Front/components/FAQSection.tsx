"use client";
import { useState } from "react";

const faqs = [
  {
    question: "¿Cuánto tiempo tarda el registro?",
    answer: "El tiempo promedio es de 5 a 10 días hábiles, dependiendo de la velocidad de procesamiento del estado elegido (como Wyoming o Delaware)."
  },
  {
    question: "¿Necesito ser residente en USA?",
    answer: "No, cualquier persona en el mundo puede registrar una LLC en Estados Unidos de forma 100% legal y remota."
  },
  {
    question: "¿Qué documentos recibiré después del pago?",
    answer: "Recibirás tus Artículos de Organización oficiales, el Acuerdo Operativo y, si lo incluyes, la confirmación de tu número EIN del IRS."
  },
  {
    question: "¿El pago por Stripe es seguro?",
    answer: "Absolutamente. Utilizamos Stripe para procesar todos los pagos, lo que significa que tus datos bancarios nunca tocan nuestros servidores."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 px-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Preguntas Frecuentes</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex justify-between items-center p-5 text-left font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
            >
              {faq.question}
              <span className={`text-2xl transition-transform ${openIndex === index ? 'rotate-45' : ''}`}>+</span>
            </button>
            {openIndex === index && (
              <div className="p-5 pt-0 text-gray-600 animate-in fade-in zoom-in duration-300">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}