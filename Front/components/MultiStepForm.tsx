"use client";
import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { RegistrationSchema, RegistrationData } from "@/lib/schema";
import StateSelector from "./StateSelector";
import { SERVICIOS } from "@/lib/constants";
import TrustSeals from "./TrustSeals";
import toast from "react-hot-toast";
import { trackEvent } from "@/lib/visitor";

const STORAGE_KEY = "ti_form_draft";
const STORAGE_STEP_KEY = "ti_form_step";

interface SavedDraft {
  data: Partial<RegistrationData>;
  step: number;
  savedAt: number; // timestamp
}

export default function MultiStepForm({ planId }: { planId: string }) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [savedDraft, setSavedDraft] = useState<SavedDraft | null>(null);
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    reset,
    getValues,
    formState: { errors }
  } = useForm<RegistrationData>({
    resolver: zodResolver(RegistrationSchema),
    defaultValues: { planId, entityType: "LLC", state: "Wyoming" }
  });

  const currentState = watch("state");

  // --- localStorage: cargar borrador al montar ---
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const draft: SavedDraft = JSON.parse(raw);
        // Expira despues de 7 dias
        const sevenDays = 7 * 24 * 60 * 60 * 1000;
        if (Date.now() - draft.savedAt < sevenDays && draft.data) {
          setSavedDraft(draft);
          setShowResumeModal(true);
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  // --- localStorage: guardar en cada cambio ---
  const saveToStorage = useCallback(() => {
    try {
      const values = getValues();
      const draft: SavedDraft = {
        data: values,
        step,
        savedAt: Date.now(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    } catch { /* localStorage full or unavailable */ }
  }, [getValues, step]);

  // Guardar cuando cambia el step
  useEffect(() => {
    saveToStorage();
  }, [step, saveToStorage]);

  // Guardar cada 2 segundos si hay cambios (debounced)
  useEffect(() => {
    const interval = setInterval(saveToStorage, 2000);
    return () => clearInterval(interval);
  }, [saveToStorage]);

  // --- Handlers del modal de recuperacion ---
  const handleResumeDraft = () => {
    if (savedDraft?.data) {
      // Restaurar los valores del formulario
      Object.entries(savedDraft.data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          setValue(key as keyof RegistrationData, value as any, { shouldValidate: false });
        }
      });
      setStep(savedDraft.step || 1);
      toast.success("¡Formulario recuperado! Continúa donde lo dejaste.");
    }
    setShowResumeModal(false);
  };

  const handleDiscardDraft = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSavedDraft(null);
    setShowResumeModal(false);
    reset({ planId, entityType: "LLC", state: "Wyoming" });
    setStep(1);
  };

  // --- Limpiar storage al enviar exitosamente ---
  const clearStorage = () => {
    localStorage.removeItem(STORAGE_KEY);
  };

  // Track form_start on first interaction
  useEffect(() => {
    trackEvent("form_start", { planId });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const nextStep = async () => {
    const fields = step === 1 ? ["name", "lastname", "email", "whatsapp"] : ["companyName", "activity"];
    const isValid = await trigger(fields as any);
    if (isValid) {
      const nextS = step + 1;
      const eventMap: Record<number, "form_step_1" | "form_step_2" | "form_step_3"> = { 2: "form_step_2", 3: "form_step_3" };
      if (eventMap[nextS]) trackEvent(eventMap[nextS]);
      setStep(nextS);
    }
  };

  const onSubmit = async (data: RegistrationData) => {
    setIsSubmitting(true);

    const planSeleccionado = SERVICIOS.find(s => s.id === data.planId);
    const precioFinal = planSeleccionado ? planSeleccionado.price : 0;

    const utms = {
      source: searchParams.get("utm_source") || (searchParams.get("gclid") ? "google" : "directo"),
      medium: searchParams.get("utm_medium") || (searchParams.get("gclid") ? "cpc" : "organico"),
      campaign: searchParams.get("utm_campaign") || "landing_v1",
      fbclid: searchParams.get("fbclid") || "",
      gclid: searchParams.get("gclid") || ""
    };

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuario: {
            nombre: data.name,
            apellido: data.lastname,
            telefono: data.whatsapp,
            email: data.email
          },
          empresa: {
            nombre: data.companyName,
            actividad: data.activity,
            estado: data.state,
            tipo: data.entityType
          },
          orden: {
            planId: data.planId,
            precio: precioFinal,
            moneda: "USD"
          },
          metadata: {
            utm_source: utms.source,
            utm_medium: utms.medium,
            utm_campaign: utms.campaign,
            google_client_id: '',
            gclid: utms.gclid,
            fbp: '',
            fbc: utms.fbclid,
            user_agent: typeof window !== 'undefined' ? window.navigator.userAgent : '',
            ip_address: ''
          }
        }),
      });

      const result = await response.json();
      if (result.url) {
        trackEvent("form_submit");
        trackEvent("checkout_redirect", { planId: data.planId });
        clearStorage(); // Limpiamos el borrador al redirigir a Stripe
        window.location.href = result.url;
      } else {
        toast.error("No se pudo conectar con el servidor de pagos");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error en checkout:", error);
      toast.error("Hubo un fallo en la conexión");
      setIsSubmitting(false);
    }
  };

//__________________________________




  return (
    <>
      {/* Modal de recuperacion de formulario */}
      {showResumeModal && savedDraft && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 z-10 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              ¡Encontramos tu formulario!
            </h3>
            <p className="text-gray-600 mb-6">
              Parece que dejaste un formulario a medio completar. ¿Quieres continuar donde lo dejaste?
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDiscardDraft}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Empezar de nuevo
              </button>
              <button
                onClick={handleResumeDraft}
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      )}

    <div id="registro-form" className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-2xl border border-gray-100">
      {/* Barra de Progreso */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-xs font-bold uppercase text-blue-600">Paso {step} de 3</span>
          <span className="text-xs font-bold text-gray-400">
            {step === 1 ? "Tus Datos Personales" : step === 2 ? "Datos Nueva Empresa" : "Confirmación"}
          </span>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div className={`bg-blue-600 h-2 rounded-full transition-all duration-500 ${step === 1 ? 'w-1/3' : step === 2 ? 'w-2/3' : 'w-full'}`}></div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {step === 1 && (
          <section className="space-y-4 animate-in fade-in slide-in-from-left duration-500">
            <header className="text-left">
              <h2 className="text-xl font-bold text-gray-800">Cuéntanos sobre ti</h2>
              <p className="text-sm text-gray-500 mb-4">Ingresa tus datos de contacto personales.</p>
            </header>
            <main className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <input
                  {...register("name")}
                  placeholder="Ej: Juan"
                  className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                <input
                  {...register("lastname")}
                  placeholder="Ej: Pérez"
                  className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
                />
                {errors.lastname && <p className="text-red-500 text-xs mt-1">{errors.lastname.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                <input
                  {...register("email")}
                  placeholder="tu@email.com"
                  className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
                <input
                  {...register("whatsapp")}
                  placeholder="Ej: +1 123 456 7890"
                  className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
                />
                {errors.whatsapp && <p className="text-red-500 text-xs mt-1">{errors.whatsapp.message}</p>}
              </div>
            </main>
          </section>
        )}

        {step === 2 && (
          <section className="space-y-4 animate-in fade-in slide-in-from-left duration-500">
            <header className="text-left">
              <h2 className="text-xl font-bold text-gray-800">Cuéntanos sobre tu Emprendimiento</h2>
              <p className="text-sm text-gray-500 mb-4">Ingresa los datos para tu nueva empresa.</p>
            </header>
            <main className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la Empresa</label>
                <input
                  {...register("companyName")}
                  placeholder="Ej: Mi Empresa LLC"
                  className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
                />
                {/* Micro-copy de ansiedad */}
                <p className="mt-1 text-xs text-blue-600 flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" />
                  </svg>
                  No te preocupes, verificaremos la disponibilidad legal por ti antes del registro.
                </p>
                {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Actividad de la Empresa</label>
                <input
                  {...register("activity")}
                  placeholder="Describe brevemente la actividad de tu empresa"
                  className="w-full p-3 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
                />
                {errors.activity && <p className="text-red-500 text-xs mt-1">{errors.activity.message}</p>}
              </div>
              <div className="flex flex-col gap-4 m-8">
                <p className="text-sm text-gray-500 mb-4">Selecciona el estado donde registrarás tu nueva empresa.</p>
                {/* Usamos nuestro selector visual */}
                <StateSelector
                  selectedState={currentState}
                  onSelect={(val) => setValue("state", val, { shouldValidate: true })}
                />
                <p className="mt-1 text-xs text-blue-600 flex items-center text-center">
                  💡 Recomendación: Si no resides en EE.UU., Wyoming es nuestra opción recomendada por su bajo costo de mantenimiento.
                </p>
                {errors.state && <p className="text-red-500 text-xs">{errors.state.message}</p>}

                <div className="flex flex-wrap gap-4">
                  <p className="text-sm w-full text-gray-500 mt-4">Selecciona la estructura para tu nueva empresa.</p>
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
          <section tabIndex={-1} className="space-y-6 animate-in zoom-in duration-300">
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
            <TrustSeals />
          </section>
        )}{/*fin paso 3*/}

        {/* Navegación */}
        <div className="flex flex-col pt-6 border-t mt-8">
          <div className="flex justify-between items-center w-full">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                disabled={isSubmitting}
                className="text-gray-500 font-medium px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors disabled:opacity-50"
              >
                Volver
              </button>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="ml-auto bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-md"
              >
                Siguiente
              </button>
            ) : (
              <div className="ml-auto flex flex-col items-end">
                <button
                  key="final-submit"
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition-all shadow-lg active:scale-95 disabled:bg-gray-400 flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Procesando...
                    </>
                  ) : "Finalizar y Pagar"}
                </button>
              </div>
            )}
          </div>

          {step === 3 && (
            <div className="mt-6 flex flex-col items-center border-t border-gray-50 pt-4">
              <div className="flex items-center space-x-4 opacity-60 grayscale hover:grayscale-0 transition-all">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg"
                  alt="Pagos Seguros por Stripe"
                  className="h-5"
                />
                <div className="h-4 w-px bg-gray-300"></div>
                <div className="flex items-center text-gray-500 text-[10px] font-bold tracking-widest uppercase">
                  <svg className="w-3 h-3 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  SSL Secure Checkout
                </div>
              </div>
              <p className="text-[9px] text-gray-400 mt-2 text-center">
                Tus datos están protegidos por encriptación de grado bancario.
              </p>
            </div>
          )}
        </div>

      </form>
    </div>
    </>
  );
}