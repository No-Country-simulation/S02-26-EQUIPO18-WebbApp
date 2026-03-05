"use client";
import { useState } from "react";
import { FAQS } from "@/lib/constants";
import { trackEvent } from "@/lib/visitor";


export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 px-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Preguntas Frecuentes</h2>
      <div className="space-y-4">
        {FAQS.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm">
            <button
              onClick={() => {
                if (openIndex !== index) trackEvent("faq_open", { question: faq.question });
                setOpenIndex(openIndex === index ? null : index);
              }}
              className="w-full flex justify-between items-center p-5 text-left font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
            >
              {faq.question}
              <span className={`text-2xl transition-transform duration-300 ${openIndex === index ? 'rotate-45 text-blue-600' : 'text-gray-400'}`}>+</span>
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