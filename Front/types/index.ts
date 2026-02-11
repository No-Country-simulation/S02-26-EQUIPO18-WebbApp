//Creamos las interfaces y tipos necesarios para el proyecto
//y los exportamos


// 1. Representa los 3 planes (Básico, Pro, Premium)
export interface ServicePackage {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
}

// 2. Representa los servicios extra (Add-ons) que por el momento no usamos
// export interface AddOn {
//   id: string;
//   name: string; 
//   price: number;
// }

// 3. Representa el estado de USA (para el selector visual implementado)
export interface USAState {
  id: "Wyoming" | "Delaware" | "New Mexico" | "Florida" | "Texas"; //"Literal Union Type", aceptamos sólo uno de estos valores
  label: string;
  tag?: string;//valor opcional
  info: string;
}

// 4. Representa el tipo de empresa (LLC o CORP)
// Aquí usamos type en vez de interface porque es un tipo literal simple. "esto o aquello"
export type EntityType = "LLC" | "CORP";