
export interface Usuario {
  nombre: string;
  apellido: string;
  telefono: string; 
  email: string;
}

export interface Empresa {
  nombre: string;
  tipo: string;
  actividad: string; 
  estado: string;
}

export interface Orden {
  planId: string;
  precio: number;
  moneda: string;
}

export interface Metadata {
  campana: string;
  googleClientId: string;
  facebook_browser_id: string;
  facebook_click_id: string;
}

// Esta es la interfaz que representa el JSON completo que enviaremos a Java
export interface CheckoutPayload {
  usuario: Usuario;
  empresa: Empresa;
  orden: Orden;
  metadata: Metadata;
}

// Esta es la respuesta que esperamos que Java nos devuelva
export interface JavaBackendResponse {
  url: string;      // La URL de Stripe
  sessionId?: string; // Opcional, por si Java devuelve el ID de sesión
}