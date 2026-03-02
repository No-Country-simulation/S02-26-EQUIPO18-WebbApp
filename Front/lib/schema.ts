//CONTRATO DE DATOS Y VALIDACIONES USANDO ZOD: 
//Este archivo es el cerebro de la Validación
//Explicación: Creamos un "esquema" de lo que esperamos del usuario.
//Si el usuario no cumple estas reglas, el código ni siquiera intenta procesarlo.

import { z } from "zod";

// 1. Traemos el inventario para que el validador sepa qué existe.
import { USA_STATES_INFO, SERVICIOS, ENTITY_INFO } from "./constants";
/**
 * EXPLICACIÓN TÉCNICA:
 * Usamos .map() para extraer solo los IDs. 
 * VALID_STATES será: ["Wyoming", "Delaware", "New Mexico", "Florida", "Texas"]
 * VALID_PLANS será: ["Inicial_Básico", "Crecimiento_Pro", "Élite_Premium"]
 * VALID_ENTITIES será: ["LLC", "CORP"]
 * 
 * Luego, El "as [string, ...string[]]" le dice a TypeScript que este array siempre tendrá 
 * al menos un string, lo que es necesario para usarlo con z.enum.(Variadic Tuple Type),
 * que requiere al menos un valor.
 * 
 * Con esto, nuestro validador sabe exactamente qué opciones son válidas para cada campo, 
 * y si el usuario intenta enviar algo que no está en estas listas, el validador lo 
 * rechazará automáticamente. 
 */
const VALID_STATES = USA_STATES_INFO.map(state => state.id) as [string, ...string[]];
const VALID_PLANS = SERVICIOS.map(plan => plan.id) as [string, ...string[]];
const VALID_ENTITIES = ENTITY_INFO.map(ent => ent.id) as [string, ...string[]];

const ENTITY_TYPES = VALID_ENTITIES as [string, ...string[]];
const USA_STATES = VALID_STATES as [string, ...string[]];
const PLAN_IDS = VALID_PLANS as [string, ...string[]];


// 2. Esta es una regla que verifica que el texto tenga formato de email: algo@algo.com
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


//z.object: Define que los datos vendrán en un objeto, es como decir espero un paquete que
//contenga esto datos.
export const RegistrationSchema = z.object({ 

  // Paso 1: Datos Personales
  name: z.string().min(3, "Nombre requerido"),//especifica que el campo es string y tiene un mínimo de 3 caracteres
  lastname: z.string().min(3, "Apellido requerido"),
  email: z.string().trim().regex(emailRegex,"Email inválido"),
  whatsapp: z.string().min(10, "Número inválido"),
  
  // Paso 2: Datos de la Empresa
  companyName: z.string().min(2, "Nombre de empresa requerido"),
  activity: z.string().min(5, "Describe brevemente la actividad"),
  entityType: z.enum(ENTITY_TYPES, "Debe seleccionar un tipo de empresa"),
  state: z.enum(USA_STATES, "Debe seleccionar un estado"),
  
  // Paso 3: Plan seleccionado (se pasará automáticamente)
  planId: z.enum(PLAN_IDS, "El plan seleccionado no es válido")
});

//z.infer: Esto extrae el tipo de dato automáticamente del esquema
//En lugar de escribir manualmente un interface con todos los nombres de nuevo, 
//le decimos a TypeScript: 
// "Lee el esquema de Zod y crea automáticamente un tipo que coincida". 
//Esto garantiza que nuestro esquema y tipos nunca estén desincronizados. 
// (Single Source of Truth - Única fuente de verdad)
export type RegistrationData = z.infer<typeof RegistrationSchema>;