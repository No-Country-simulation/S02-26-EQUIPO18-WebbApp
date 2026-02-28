// Explicación: Definimos la forma de los datos que recibirá este componente.
// Esto evita que intentemos mostrar un dato que no existe. Acá definimos qué necesita
//el componente para existir y cómo debe comportarse

interface ServiceProps {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  onSelect?: () => void; // Función que se ejecuta al seleccionar el plan
  isSelected?: boolean; // Indica si este plan está seleccionado (para estilos)
  popular?: boolean;
}

export default function ServiceCard({ id, name, price, description, features, onSelect, isSelected, popular }: ServiceProps) {
  return (
    <div className={`flex flex-col h-full p-6 rounded-2xl border-2  transition-all duration-300  ${
      isSelected 
        ? "border-blue-600 bg-white shadow-xl scale-105" 
        : popular 
          ? "border-blue-400 bg-linear-to-b from-blue-100 to-blue-50 shadow-lg z-10" // Fondo diferenciado con gradiente
          : "border-gray-200 bg-gray-50 opacity-90"
    }`}>

    {/* Badge de "Recomendado" */}
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[12px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-md">
          Recomendado
        </div>
      )}

      <h3 className="text-xl font-bold text-gray-900">{name}</h3>
      <p className="mt-2 text-sm text-gray-500 grow">{description}</p>
      
      <div className="my-6">
        <span className="text-4xl font-extrabold text-blue-600">${price}</span>
        <span className="text-gray-400 text-sm"> /anual</span>
      </div>

      <ul className="space-y-3 mb-6 grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-sm text-gray-600">
            <span className="mr-2 text-green-500">✔</span> {feature}
          </li>
        ))}
      </ul>

      <button onClick={onSelect} className={`w-full py-3 px-4 font-semibold rounded-lg transition-colors duration-200 ${
        isSelected
          ?  "bg-green-600 text-white shadow-inner"
          : popular
            ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md" // Botón más llamativo para el recomendado
            : "bg-gray-200 text-gray-700 hover:bg-gray-300" // Botón más discreto para los demás
        }`}>
        {isSelected ? "Plan Seleccionado" : "Elegir este Plan"}
      </button>
       
    </div>
  );
}