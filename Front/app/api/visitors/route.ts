import { NextResponse } from "next/server";

/**
 * BFF: Proxy para obtener eventos de visitantes del backend Java.
 * GET /api/visitors → Java GET /api/v1/visitors/events
 */
export async function GET() {
  try {
    const JAVA_URL =
      process.env.JAVA_TRACKING_URL || "http://localhost:8080/api/v1/visitors/events";

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
