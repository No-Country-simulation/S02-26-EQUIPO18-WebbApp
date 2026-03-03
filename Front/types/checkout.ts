
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
  // Información de seguimiento para análisis y marketing
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  //Identificadores de rastreo o seguimiento de redes sociales
  googleClientId: string; //id_cliente_google_analytics
  gclid: string; //id_click_google_ads
  fbp: string; //fbp:facebook_browser_id
  fbc: string; //fbc:facebook_click_id
  // Los datos técnicos del navegador (para la clase Metadata del diagrama de clases)
  user_agent: string; //se obtiene con widow.navigator.userAgent
  ip_address: string; //el back lo puede sacar de la request
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
  sessionUrl: string;  // La URL de Stripe Checkout
  sessionId: string;   // El ID de la sesión cs_test_... o cs_live_...
  url?: string;        // Alias para compatibilidad
}