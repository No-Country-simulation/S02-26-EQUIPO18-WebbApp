import CustomImage from "./ui/CustomImage";

const STEPS = [
  {
    id: 1,
    title: "Elige tu Plan",
    description: "Selecciona el paquete que mejor se adapte a tus objetivos comerciales.",
    image: "/images/steps/paso-1.png",
  },
  {
    id: 2,
    title: "Completa tus Datos",
    description: "Dinos el nombre de tu empresa y la información básica de registro.",
    image: "/images/steps/paso-2.png",
  },
  {
    id: 3,
    title: "Pago y Firma",
    description: "Paga de forma segura vía Stripe y firma tus documentos legalmente.",
    image: "/images/steps/paso-3.png",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
          Tu empresa lista en 3 simples pasos
        </h2>
        <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
        {STEPS.map((step) => (
          <div key={step.id} className="group flex flex-col items-center">
            {/* Contenedor de la Imagen con el número flotante */}
            <div className="relative mb-8">
              <CustomImage
                src={step.image}
                alt={step.title}
                containerClass="w-40 h-40 md:w-48 md:h-48 drop-shadow-xl group-hover:scale-101 transition-transform duration-200"
                className="object-contain"
              />

              {/* Círculo con el número */}
              <div
                className="absolute -top-2 -right-2 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg border-4 border-white transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-1 group-hover:shadow-2xl  group-hover:bg-blue-700"
              >
                {step.id}
              </div>
            </div>

            <h3 className="font-bold text-2xl mb-3 text-gray-800 group-hover:text-blue-700 transition-colors">
              {step.title}
            </h3>

            <p className="text-gray-600 text-center leading-relaxed">
              {step.description}
            </p>
          </div>

        ))}
      </div>
    </section>
  );
};

export default HowItWorks;