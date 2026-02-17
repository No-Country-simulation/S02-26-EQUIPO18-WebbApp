// components/ProductMockup.tsx
import CustomImage from "./ui/CustomImage";

export default function ProductMockup() {
  const scrollToPricing = () => {
    // Buscamos el ID de la sección de planes para el scroll suave
    document.getElementById("pricing-section")?.scrollIntoView({ 
      behavior: "smooth" 
    });
  };

  return (
    <section className="py-24 bg-gray-50 border-y border-gray-100">
                <h2 className="text-3xl w-full md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            Mucho más que documentos: <br />
            <span className="text-blue-600">Tu pasaporte al mercado global</span>
          </h2>
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-16">

        {/* LADO IZQUIERDO: BENEFICIOS */}
        <div className="flex-1 text-center md:text-left">

          
          <ul className="space-y-5 text-lg text-gray-700 mb-10">
            <li className="flex items-start gap-3 text-left">
              <span className="bg-green-100 text-green-600 p-1 rounded-full text-sm mt-1">✓</span>
              <div>
                <strong className="text-gray-900">Cobros Globales: </strong> 
                Factura en dólares y accede a Stripe o PayPal sin restricciones regionales.
              </div>
            </li>
            
            <li className="flex items-start gap-3 text-left">
              <span className="bg-green-100 text-green-600 p-1 rounded-full text-sm mt-1">✓</span>
              <div>
                <strong className="text-gray-900">Banca en EE. UU.: </strong> 
                Gestiona tu capital en bancos digitales como Mercury con tarjetas corporativas.
              </div>
            </li>
            
            <li className="flex items-start gap-3 text-left">
              <span className="bg-green-100 text-green-600 p-1 rounded-full text-sm mt-1">✓</span>
              <div>
                <strong className="text-gray-900">Eficiencia Fiscal: </strong> 
                Aprovecha los beneficios de una LLC para no residentes (0% impuestos federales si cumples los requisitos*).
              </div>
            </li>

            <li className="flex items-start gap-3 text-left">
              <span className="bg-green-100 text-green-600 p-1 rounded-full text-sm mt-1">✓</span>
              <div>
                <strong className="text-gray-900">Protección Legal: </strong> 
                Tus bienes personales están blindados bajo la jurisdicción más robusta del mundo.
              </div>
            </li>
          </ul>

          {/* BOTÓN DE ACCIÓN Y NOTA LEGAL */}
          <div className="flex flex-col items-center md:items-center gap-4">
            <button 
              onClick={scrollToPricing}
              className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 hover:scale-105 transition-all shadow-lg"
            >
              Comienza ahora — Elige tu plan
            </button>
            <p className="text-xs text-center text-gray-400 italic max-w-sm">
              * Nota: Aunque las LLC para no residentes ofrecen grandes ventajas, recomendamos siempre consultar con un contador calificado para evaluar tu situación fiscal específica.
            </p>
          </div>
        </div>

        {/* LADO DERECHO: EL MOCKUP VISUAL */}
        <div className="flex-1 w-full">
          <CustomImage 
            src="/images/mockupTotalIncorporation.png"
            alt="Kit profesional de Total Incorporation"
            containerClass="w-full h-[350px] md:h-[550px] rounded-[2rem] shadow-2xl"
            className="object-contain hover:rotate-1 transition-transform duration-700"
          />
        </div>

      </div>
    </section>
  );
}