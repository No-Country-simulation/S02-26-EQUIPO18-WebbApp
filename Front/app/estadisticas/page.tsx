import { CheckCircle2, TrendingUp, Users } from "lucide-react";

const EstadisticasRapidas = () => {
  return (
          <div className="bg-blue-600 text-white py-8">
            <div className="max-w-6xl mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="flex flex-col items-center gap-2">
                  <CheckCircle2 size={40} className="text-blue-200" />
                  <p className="text-3xl font-bold">500+</p>
                  <p className="text-blue-100">Empresas Registradas</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Users size={40} className="text-blue-200" />
                  <p className="text-3xl font-bold">98%</p>
                  <p className="text-blue-100">Clientes Satisfechos</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <TrendingUp size={40} className="text-blue-200" />
                  <p className="text-3xl font-bold">7-10</p>
                  <p className="text-blue-100">Dias Promedio</p>
                </div>
              </div>
            </div>
          </div>
  )
}

export default EstadisticasRapidas
