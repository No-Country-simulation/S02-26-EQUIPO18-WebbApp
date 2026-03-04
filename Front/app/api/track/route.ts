import { NextResponse } from "next/server";
import { headers } from "next/headers";

/**
 * BFF Tracking Route
 * Recibe eventos de tracking del frontend y los envia al backend Java.
 * Si el backend no esta disponible, loguea y devuelve 200 (fire-and-forget).
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const headerList = await headers();
    const ip = headerList.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const userAgent = headerList.get("user-agent") || "";

    const enriched = {
      ...body,
      ip_address: ip,
      user_agent: userAgent,
    };

    const TRACKING_URL =
      process.env.JAVA_TRACKING_URL || "http://localhost:8080/api/v1/visitors/events";

    // Fire-and-forget al backend Java
    fetch(TRACKING_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(enriched),
    }).catch((err) => console.warn("Tracking backend unavailable:", err.message));

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true }); // Nunca falla para el cliente
  }
}
