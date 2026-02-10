"use client"; // <--- IMPORTANTE: Esto le dice a Next.js que este archivo es interactivo
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegistrationSchema, RegistrationData } from "@/lib/schema";
import StateSelector from "./StateSelector";
import { SERVICIOS } from "@/lib/constants";

export default function MultiStepForm({ planId }: { planId: string }) {
  
  const [step, setStep] = useState(1);//Se inicia en el paso 1
  
  const { 
    register, 
    handleSubmit, 
    trigger, 
    watch,
    setValue,
    formState: { errors } } = useForm<RegistrationData>({
                                resolver: zodResolver(RegistrationSchema), //acá conectamos zod. cada vez que el usuario intente avanzar, zod revisará los datos
                                defaultValues: { planId, entityType: "LLC", state: "Wyoming" }
                            });

  //Escuchamos cuál es el estado actual para que el componente visual sepa cuál marcar
    const currentState = watch("state");

  // Función para avanzar de paso validando solo los campos actuales
  const nextStep = async () => {
    const fields = step === 1 ? ["fullName", "email", "whatsapp"] : ["companyName", "activity"];
    const isValid = await trigger(fields as any); //valida sólo los campos del paso actual
    if (isValid) setStep(step + 1); //si es false el usuario no podrá avanzar y verá mensaje de error
  };

// Dentro de MultiStepForm.tsx

const onSubmit = async (data: RegistrationData) => {
  try {
    // 1. Llamamos a nuestra propia API
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data), // Convertimos el objeto de JS a texto plano
    });

    if (response.ok) {
      alert("¡Solicitud de registro recibido con éxito! Tus datos han sido enviados a Total Incorporation. Nos pondremos en contacto pronto.");
      // Aquí podrías redirigir a una página de "Gracias"
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.message ||"Algo salió mal, por favor intenta de nuevo."}`);
    }
  } catch (error) {
    console.error("Error al enviar:", error);
    alert("Hubo un fallo en la conexión. Por favor, intenta de nuevo.");
  }
};

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-2xl border border-gray-100">
      {/* Barra de Progreso */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-xs font-bold uppercase text-blue-600">Paso {step} de 3</span>
          <span className="text-xs font-bold text-gray-400">{step === 1 ? "Tus Datos Personales" : step === 2 ? "Datos Nueva Empresa" : "Confirmación"}</span>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div className={`bg-blue-600 h-2 rounded-full transition-all duration-500 ${step === 1 ? 'w-1/3' : step === 2 ? 'w-2/3' : 'w-full'}`}></div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/*Multistep form - Es un formulario que cuenta con 3 pasos 
        y se van mostrando a medida que se completa el paso anterior*/}
        {step === 1 && (
          <section className="space-y-4 animate-in fade-in slide-in-from-leftduration-500">
            <header className="text-left">
              <h2 className="text-xl font-bold text-gray-800">Cuéntanos sobre ti</h2>
              <p className="text-sm text-gray-500 mb-4">Ingresa tus datos de contacto personales.</p>
            </header>
            <main className="space-y-4">
              <div>//Inicio campo Nombre
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                <input 
                  {...register("fullName")} 
                  placeholder="Ej: Juan Pérez" 
                  className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
                />
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
              </div>//fin campo Nombre

              <div>//Inicio campo Email
                  <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                  <input 
                    {...register("email")} 
                    placeholder="tu@email.com" 
                    className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>//fin campo Email

                <div>//Inicio campo WhatsApp
                  <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
                  <input 
                    {...register("whatsapp")} 
                    placeholder="Ej: +1 123 456 7890" 
                    className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
                  />
                  {errors.whatsapp && <p className="text-red-500 text-xs mt-1">{errors.whatsapp.message}</p>}
                </div>//fin campo WhatsApp
            </main>
          </section>
        )}{/*fin paso 1*/}

        {step === 2 && (
          <section className="space-y-4 animate-in fade-in slide-in-from-leftduration-500">
            <header className="text-left">
              <h2 className="text-xl font-bold text-gray-800">Cuéntanos sobre tu Emprendimiento</h2>
              <p className="text-sm text-gray-500 mb-4">Ingresa los datos para tu nueva empresa.</p>
            </header>
            <main className="space-y-4">
              <div>//Inicio campo CompanyName
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la Empresa</label>
                <input 
                  {...register("companyName")} 
                  placeholder="Ej: Mi Empresa S.A." 
                  className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
                />
                {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName.message}</p>}
              </div>//fin campo companyName

              <div>//Inicio campo activity
                  <label className="block text-sm font-medium text-gray-700 mb-1">Actividad de la Empresa</label>
                  <input 
                    {...register("activity")} 
                    placeholder="Describe brevemente la actividad de tu empresa" 
                    className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
                  />
                  {errors.activity && <p className="text-red-500 text-xs mt-1">{errors.activity.message}</p>}
              </div>//fin campo activity
              <div className="flex flex-col gap-4 m-8">
                <p className="text-sm text-gray-500 mb-4">Selecciona el estado donde registrarás tu nueva empresa.</p>
                {/* Usamos nuestro selector visual */}
                <StateSelector 
                  selectedState={currentState} 
                  onSelect={(val) => setValue("state", val, { shouldValidate: true })} 
                />
                {errors.state && <p className="text-red-500 text-xs">{errors.state.message}</p>}

                <div className="flex flex-wrap gap-4">
                  <p className="text-sm w-full text-gray-500 mt-4mb-4">Selecciona la estructura para tu nueva empresa.</p>
                  <label className="flex-1 border p-3 rounded-lg cursor-pointer text-blue-900 border-gray-100 hover:border-blue-200 bg-white">
                    <input type="radio" {...register("entityType")} value="LLC" className="mr-2" /> LLC
                  </label>
                  <label className="flex-1 border p-3 rounded-lg cursor-pointer text-blue-900 border-gray-100 hover:border-blue-200 bg-white">
                    <input type="radio" {...register("entityType")} value="CORP" className="mr-2" /> Corp
                  </label>
                </div>
              </div>
            </main>
          </section>

        )}{/*fin paso 2*/}

        {step === 3 && (
          <div tabIndex={-1} className="space-y-6 animate-in zoom-in duration-300">
            <header className="text-center">
              <h2 className="text-2xl font-bold text-gray-800">¡Casi listo!</h2>
              <p className="text-sm text-gray-500">Confirma que los datos de registro sean correctos.</p>
            </header>

            <div className="bg-blue-50 p-6 rounded-2xl space-y-4 border border-blue-100">
              <div className="flex justify-between items-center border-b border-blue-200 pb-2">
                <span className="text-sm text-blue-800 font-medium">Plan Seleccionado:</span>
                <span className="font-bold text-blue-900">{SERVICIOS.find(s => s.id === planId)?.name}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 italic">Empresa:</p>
                  <p className="font-bold text-gray-800 uppercase">{watch("companyName")}</p>
                </div>
                <div>
                  <p className="text-gray-500 italic">Estado:</p>
                  <p className="font-bold text-gray-800">{watch("state")}</p>
                </div>
                <div>
                  <p className="text-gray-500 italic">Tipo:</p>
                  <p className="font-bold text-gray-800">{watch("entityType")}</p>
                </div>
                <div>
                  <p className="text-gray-500 italic">Email:</p>
                  <p className="font-bold text-gray-800">{watch("email")}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-blue-200 flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total a pagar:</span>
                <span className="text-3xl font-black text-blue-600">
                  ${SERVICIOS.find(s => s.id === planId)?.price}
                </span>
              </div>
            </div>
          </div>
        )}{/*fin paso 3*/}

        {/* Navegación */}
        <div className="flex justify-between pt-6 border-t mt-8">
          {step > 1 && (
            <button type="button" onClick={() => setStep(step - 1)} className="text-gray-500 font-medium px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors">Volver</button>
          )}
          {step < 3 ? (
            <button type="button" onClick={nextStep} className="ml-auto bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-md">Siguiente</button>
          ) : (// La "key" ayuda a React a entender que es un botón nuevo
            <button key="final-submit" type="submit" className="ml-auto bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition-all shadow-lg active:scale-95">Finalizar y Pagar</button>
          )}
        </div>
      </form>
    </div>
  );
}