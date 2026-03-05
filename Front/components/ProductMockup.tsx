import CustomImage from "./ui/CustomImage";
import { Globe, DollarSign, Shield, Building2 } from "lucide-react";

export default function ProductMockup() {
  const scrollToPricing = () => {
    document.getElementById("pricing-section")?.scrollIntoView({ 
      behavior: "smooth" 
    });
  };

  return (
    <section className="py-24 bg-gray-50 border-y border-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl w-full md:text-4xl font-bold text-gray-900 mb-6 leading-tight text-center">
          Mucho más que documentos <br />
          <span className="text-blue-600">Tu pasaporte al mercado global</span>
        </h2>
        
        <div className="flex flex-col md:flex-row items-center gap-16">
          {/* lado izquierdo: beneficios */}
          <div className="flex-1 text-center md:text-left">
            <ul className="space-y-5 text-lg text-gray-700 mb-10">
              <li className="flex items-start gap-3 text-left">
                <div className="bg-green-100 text-green-600 p-2 rounded-full text-sm mt-1">
                  <Globe size={20} />
                </div>
                <div>
                  <strong className="text-gray-900">Cobros Globales: </strong> 
                  Factura en dolares y accede a Stripe o PayPal sin restricciones regionales.
                </div>
              </li>
              
              <li className="flex items-start gap-3 text-left">
                <div className="bg-green-100 text-green-600 p-2 rounded-full text-sm mt-1">
                  <Building2 size={20} />
                </div>
                <div>
                  <strong className="text-gray-900">Banca en EE. UU.: </strong> 
                  Gestiona tu capital en bancos digitales como Mercury con tarjetas corporativas.
                </div>
              </li>
              
              <li className="flex items-start gap-3 text-left">
                <div className="bg-green-100 text-green-600 p-2 rounded-full text-sm mt-1">
                  <DollarSign size={20} />
                </div>
                <div>
                  <strong className="text-gray-900">Eficiencia Fiscal: </strong> 
                  Aprovecha los beneficios de una LLC para no residentes (0% impuestos federales si cumples los requisitos*).
                </div>
              </li>

              <li className="flex items-start gap-3 text-left">
                <div className="bg-green-100 text-green-600 p-2 rounded-full text-sm mt-1">
                  <Shield size={20} />
                </div>
                <div>
                  <strong className="text-gray-900">Proteccion Legal: </strong> 
                  Tus bienes personales estan blindados bajo la jurisdiccion mas robusta del mundo.
                </div>
              </li>
            </ul>

            <div className="flex flex-col items-center gap-4">
              <button 
                onClick={scrollToPricing}
                className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 hover:scale-105 transition-all shadow-lg"
              >
                Comienza ahora — Elige tu plan
              </button>
              <p className="text-xs text-center text-gray-400 italic max-w-sm">
                * Nota: Aunque las LLC para no residentes ofrecen grandes ventajas, recomendamos siempre consultar con un contador calificado para evaluar tu situacion fiscal especifica.
              </p>
            </div>
          </div>

          {/* lado derecho: el mockup visual */}
          <div className="flex-1 w-full flex justify-center">
            <CustomImage 
              src="/images/mockupTotalIncorporation.png"
              alt="Kit profesional de Total Incorporation"
              containerClass="w-full max-w-lg h-[350px] md:h-[550px] rounded-[2rem] shadow-2xl"
              className="object-contain hover:rotate-1 transition-transform duration-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
}