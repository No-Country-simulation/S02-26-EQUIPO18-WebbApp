import MultiStepForm from "@/components/MultiStepForm";

interface RegistrationSectionProps {
  planId: string;
}

const RegistrationSection = ({ planId }: RegistrationSectionProps) => {
  return (
    <section id="registro-form" className="py-22 animate-in fade-in slide-in-from-bottom duration-700">
        <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="text-3xl font-bold text-blue-950">
                Estás registrando tu Plan {planId.toUpperCase()}
            </h2>
            <p className="text-gray-600">
                Completa los pasos para iniciar el trámite legal.
            </p>
        </div>
        {/* Le pasamos el planId al formulario para que sepa qué cobrar */}
        <MultiStepForm planId={planId} />
    </section>
  )
}

export default RegistrationSection
