import { NextResponse } from "next/server";

/**
 * BFF: Proxy para obtener ordenes del backend Java.
 */
export async function GET() {
  try {
    // 1. Priorizamos la variable del .env, si no existe usamos el nombre del servicio Docker
    const JAVA_URL = process.env.JAVA_BACKEND_URL || "http://backend:8080/api/v1/orders";

    console.log("Proxy Orders conectando a:", JAVA_URL);

    const response = await fetch(JAVA_URL, {
      headers: {
        "Content-Type": "application/json",
        ...(process.env.BACKEND_API_KEY
          ? { "X-Api-Key": process.env.BACKEND_API_KEY }
          : {}),
      },
      cache: "no-store",
    });

    if (!response.ok) {
      // Si el backend responde con error, lo atrapamos aquí
      const errorText = await response.text();
      console.error(`Error desde Java (${response.status}):`, errorText);
      throw new Error(`Backend error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error crítico en Proxy de Órdenes:", error);
    // Devolvemos array vacío para que el frontend no se rompa (pantalla blanca)
    return NextResponse.json([], { status: 200 }); 
  }
}