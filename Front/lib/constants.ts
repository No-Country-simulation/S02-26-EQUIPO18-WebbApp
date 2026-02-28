
import { ServicePackage, USAState, EntityType, FAQ } from "@/types";

//Guardamos la información de los paquetes para que sea más fácil de mantener
export const SERVICIOS: ServicePackage[] = [
  {
    id: 'Inicial_Basico',
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
    id: 'Elite_Premium',
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
    question: "¿Es seguro ingresar mis datos y los de mi futura empresa en este sitio?",
    answer: "Totalmente. Contamos con un certificado de seguridad SSL (Secure Sockets Layer) de 256 bits, lo que garantiza que toda la información que viaja entre tu navegador y nuestro servidor está cifrada y protegida. Además, no almacenamos datos sensibles de pago en nuestros servidores."
  },
  {
    question: "¿Cómo se procesan los pagos?",
    answer: "Utilizamos Stripe, la plataforma de procesamiento de pagos líder a nivel mundial (utilizada por empresas como Amazon y Google). Esto significa que tu transacción se realiza bajo los más altos estándares de seguridad bancaria y cumplimiento de la normativa PCI-DSS Level 1."
  },
  {
    question: "¿Sus trámites están avalados por el IRS?",
    answer: "Operamos como agentes autorizados para la gestión de trámites ante el Internal Revenue Service (IRS). Nos encargamos de que tu solicitud de EIN y el registro de tu empresa cumplan estrictamente con las regulaciones fiscales y legales vigentes en EE. UU."
  },
   {
    question: "¿Qué garantía tengo de que mi empresa será registrada correctamente?",
    answer: "Una vez realizado el pago, nuestro sistema genera un registro automático y nuestro equipo legal revisa cada detalle. Recibirás una confirmación inmediata por email y podrás seguir el proceso paso a paso. Si hubiera algún inconveniente con los requisitos del estado solicitado, nuestro soporte te contactará de inmediato para corregirlo sin costo adicional."
  },
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
  },
  {
    question: "¿Qué tipos de actividad puedo realizar con una empresa en EE. UU. (LLC/Corp)?",
    answer: "La gran mayoría de las actividades globales son bienvenidas: servicios digitales, consultoría, e-commerce (Amazon, Shopify), desarrollo de software, infoproductos y holding de activos. Es ideal para negocios que operan internacionalmente."
  },
  {
    question: "¿Qué tipo de actividades NO se pueden realizar o no se recomiendan?",
    answer: "No se permiten actividades relacionadas con juegos de azar, contenido para adultos, venta de armas o servicios financieros no regulados. Tampoco se recomienda si tu negocio requiere una presencia física intensiva (como un restaurante local) en tu país de residencia."
  },
  {
    question: "¿Qué es el EIN y por qué lo necesito?",
    answer: "El EIN (Employer Identification Number) es el número de identificación fiscal de tu empresa ante el IRS. Es indispensable para abrir cuentas bancarias, contratar pasarelas de pago como Stripe o PayPal y declarar impuestos en EE. UU."
  },
  {
    question: "¿Podré abrir una cuenta bancaria si no vivo en Estados Unidos?",
    answer: "Sí, es totalmente posible. Existen plataformas como Mercury o Relay que permiten la apertura de cuentas empresariales de forma 100% remota. Solo necesitarás los documentos de tu empresa, tu EIN y tu pasaporte vigente."
  }

];
