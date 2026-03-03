import { NextResponse } from "next/server";

/**
 * BFF: Proxy para obtener ordenes del backend Java.
 * GET /api/orders → Java GET /api/v1/orders
 */
export async function GET() {
  try {
    const JAVA_URL =
      process.env.JAVA_BACKEND_URL?.replace(/\/orders$/, "/orders") ||
      "http://localhost:8080/api/v1/orders";

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
      throw new Error(`Backend error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json([], { status: 200 }); // Devolver array vacio, no romper
  }
}
