import { NextResponse } from "next/server";

/**
 * BFF: Proxy para obtener eventos de visitantes del backend Java.
 * GET /api/visitors → Java GET /api/v1/visitors/events
 */
export async function GET() {
  try {
    // Prioridad: Variable de entorno -> Nombre del servicio Docker -> Localhost
    const JAVA_URL = process.env.JAVA_TRACKING_URL || "http://backend:8080/api/v1/visitors/events";

    console.log("Intentando conectar a:", JAVA_URL); // Esto saldrá en tu terminal de Docker

    const response = await fetch(JAVA_URL, {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Backend error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching visitor events:", error);
    return NextResponse.json([], { status: 200 });
  }
}