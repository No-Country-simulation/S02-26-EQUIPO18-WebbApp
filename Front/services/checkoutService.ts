import { apiRequest } from "@/lib/apiRequest";
import type { ApiResponse } from "@/types/ApiResponse";

interface CheckoutRequest {
  usuario: {
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
  };
  empresa: {
    nombre: string;
    actividad: string;
    estado: string;
    tipo: string;
  };
  orden: {
    planId: string;
    precio: number;
    moneda: string;
  };
  metadata: {
    campana: string;
    pixel_id: string;
    tagG_id: string;
  };
}

interface CheckoutResponse {
  url: string;
}

export const checkoutService = {
  // crear sesion de checkout
  createCheckoutSession: async (data: CheckoutRequest): Promise<ApiResponse<CheckoutResponse>> => {
    return await apiRequest<CheckoutResponse>(
      "/api/checkout",
      "POST",
      data
    );
  },
};
