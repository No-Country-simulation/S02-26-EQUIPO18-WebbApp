import { z } from "zod";
import { USA_STATES_INFO, SERVICIOS, ENTITY_INFO } from "./constants";

const VALID_STATES = USA_STATES_INFO.map(state => state.id) as [string, ...string[]];
const VALID_PLANS = SERVICIOS.map(plan => plan.id) as [string, ...string[]];
const VALID_ENTITIES = ENTITY_INFO.map(ent => ent.id) as [string, ...string[]];

const ENTITY_TYPES = VALID_ENTITIES as [string, ...string[]];
const USA_STATES = VALID_STATES as [string, ...string[]];
const PLAN_IDS = VALID_PLANS as [string, ...string[]];

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const RegistrationSchema = z.object({ 
  // Paso 1: Datos Personales
  name: z.string().min(3, "Nombre requerido"),
  lastname: z.string().min(3, "Apellido requerido"),
  email: z.string().trim().regex(emailRegex,"Email inválido"),
  whatsapp: z.string().min(10, "Número inválido"),
  
  // Paso 2: Datos de la Empresa
  companyName: z.string().min(2, "Nombre de empresa requerido"),
  activity: z.string().min(5, "Describe brevemente la actividad"),
  entityType: z.enum(ENTITY_TYPES, "Debe seleccionar un tipo de empresa"),
  state: z.enum(USA_STATES, "Debe seleccionar un estado"),
  
  // Paso 3: Plan seleccionado
  planId: z.enum(PLAN_IDS, "El plan seleccionado no es válido")
});

export type RegistrationData = z.infer<typeof RegistrationSchema>;