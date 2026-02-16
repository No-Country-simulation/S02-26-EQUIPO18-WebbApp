import { SERVICIOS } from "@/lib/constants";
import ServiceCard from "@/components/ServiceCard";

// Definimos el contrato: qué necesita este componente para funcionar
interface PricingSectionProps {
  selectedPlan: string | null;
  onSelectPlan: (id: string) => void;
}


const PricingSection = ({ selectedPlan, onSelectPlan }: PricingSectionProps) => {
  return (
          <section className="max-w-6xl mx-auto py-10 px-4">
            <header className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Planes Transparentes</h2>
              <p className="text-xl text-gray-600">Sin costos ocultos ni sorpresas de último momento.</p>
            </header>
            {/* Contenedor de las tarjetas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-strech">
              {SERVICIOS.map((servicio) => (
                <div key={servicio.id} className="relative">
                  <ServiceCard 
                    // Usamos el "spread operator" (...) para pasar todas las propiedades del objeto de golpe
                    {...servicio} 
                    // Le pasamos una función al botón de la tarjeta
                    onSelect={() => onSelectPlan(servicio.id)}
                    isSelected={selectedPlan === servicio.id}
                  />
                </div>
                
              ))}
            </div>
          </section>
  )
}

export default PricingSection
