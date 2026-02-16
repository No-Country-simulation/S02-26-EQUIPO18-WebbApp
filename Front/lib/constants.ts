
import { ServicePackage, USAState, EntityType, FAQ } from "@/types";

//Guardamos la información de los paquetes para que sea más fácil de mantener
export const SERVICIOS: ServicePackage[] = [
  {
    id: 'Inicial_Básico',
    name: 'Plan Inicial',
    price: 499,
    description: 'Ideal para emprendedores que están empezando.',
    features: [
      'Registro de LLC o C-Corp',
      'Solicitud de EIN en el IRS',
      'Documentos post formación',
      'Agente Registrado',
      'Dirección Virtual',
      'Calendario de Cumplimiento'
    ],
    popular: false,
  },
  {
    id: 'Crecimiento_Pro',
    name: 'Plan Crecimiento',
    price: 899,
    description: 'Ideal para emprendedores individuales proveedores de servicios online.',
    features: [
      'Todo lo incluído en el Plan Inicio',
      '+ Asistencia Fiscal',
      '+ Informe Anual (Renovación estatal)',
      '+ Declaración de impuestos estatal'
    ],
    popular: true,
  },
  {
    id: 'Élite_Premium',
    name: 'Plan Élite',
    price: 4499,
    description: 'Ideal para emprendedores que buscan escalar su negocio.',
    features: [
      'Todo lo incluído en el Plan Crecimiento',
      'Asistencia fiscal completa y llamadas ilimitadas con expertos',
      'Contabilidad diaria (Límite de gastos: $50,000/mes)',
      'Impuesto sobre las Ventas/Reventa, Solicitud y Devolución de Impuestos.'
    ],
    popular: false,
  }
];

// export const ADDONS = [
//   { id: 'soporte-extra', nombre: 'Soporte Prioritario', precio: 50 },
//   { id: 'Asistencia Personalizada', nombre: 'Asistencia Personalizada', precio: 80 },
// ]; //No se está utilizando en este momento


//CONVERSION RATE OPTIMIZATION - CRO:
//Este bloque fue creado para optimizar el ratio de conversión. 
//Añadimos una pequeña descripción para cada uno de los ESTADOS para que ayude
//a la conversión.
//Se agregarn etiquetas en cada opción que sirven para guiar al usuario que no 
//sabe qué elegir.

export const USA_STATES_INFO: USAState[] = [
  { id: "Wyoming", label: "Wyoming", tag: "Recomendado", info: "Privacidad y bajos costos." },
  { id: "Delaware", label: "Delaware", tag: "Corporativo", info: "Ideal para levantar capital." },
  { id: "New Mexico", label: "New Mexico", tag: "Económico", info: "Sin informes anuales." },
  { id: "Florida", label: "Florida", tag: "Comercial", info: "Gran mercado local." },
  { id: "Texas", label: "Texas", tag: "Escalable", info: "Crecimiento acelerado." },
];


export const ENTITY_INFO: { id: EntityType; label: string; info: string }[] = [
  { id: "LLC", label: "LLC", info: "Protección de responsabilidad sin formalidades." },
  { id: "CORP", label: "C-Corporation", info: "Estructura tradicional para grandes negocios." },
];


//Guardamos las preguntas frecuentes en un bloque aparte para que sea más fácil de mantener
export const FAQS: FAQ[] = [
  {
    question: "¿Cuánto tiempo tarda el registro?",
    answer: "El tiempo promedio es de 5 a 10 días hábiles, dependiendo de la velocidad de procesamiento del estado elegido (como Wyoming o Delaware)."
  },
  {
    question: "¿Necesito ser residente en USA?",
    answer: "No, cualquier persona en el mundo puede registrar una LLC en Estados Unidos de forma 100% legal y remota."
  },
  {
    question: "¿Qué documentos recibiré después del pago?",
    answer: "Recibirás tus Artículos de Organización oficiales, el Acuerdo Operativo y, si lo incluyes, la confirmación de tu número EIN del IRS."
  },
  {
    question: "¿El pago por Stripe es seguro?",
    answer: "Absolutamente. Utilizamos Stripe para procesar todos los pagos, lo que significa que tus datos bancarios nunca tocan nuestros servidores."
  }
];
