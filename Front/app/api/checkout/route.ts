import { CheckoutPayload, JavaBackendResponse } from "@/types/checkout";
import { NextResponse } from "next/server";
import { headers, cookies } from "next/headers";

/**
 * BFF (Backend-for-Frontend) – Transforma el JSON del formulario React
 * al formato OrderRequest que espera el backend Java (Spring Boot).
 *
 * Frontend  →  POST /api/checkout  →  (transforma)  →  POST /api/v1/orders  →  Java
 * Frontend  ←  { url }             ←  (transforma)  ←  { sessionId, sessionUrl }
 */
export async function POST(req: Request) {
  try {
    const body: CheckoutPayload = await req.json();
    const { usuario, orden, empresa, metadata } = body;

    // 1. CAPTURA DE IDs DE TRACKING (Headers y Cookies)
    const cookieStore = await cookies();
    const headerList = await headers();

    const ip = headerList.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const fbp = cookieStore.get("_fbp")?.value || metadata.fbp || "";
    const fbc = cookieStore.get("fbc_custom")?.value || metadata.fbc || cookieStore.get("_fbc")?.value || "";
    const gclid = cookieStore.get("gclid_custom")?.value || metadata.gclid || "";
    const gaValue = cookieStore.get("_ga")?.value;
    const googleClientId = gaValue
      ? gaValue.split(".").slice(-2).join(".")
      : metadata.googleClientId || "";

    // 2. TRANSFORMACIÓN AL FORMATO OrderRequest DEL BACKEND JAVA
    //    El backend espera: { planId, business, campaign, metadata }
    const orderRequest = {
      planId: orden.planId,
      business: {
        name: empresa.nombre,
        activity: empresa.actividad,
        type: empresa.tipo,
        state: empresa.estado,
        owner: {
          name: usuario.nombre,
          lastName: usuario.apellido,
          phoneNumber: usuario.telefono,
          emailAddress: usuario.email,
        },
      },
      campaign: {
        utmSource: metadata.utm_source || "",
        utmMedium: metadata.utm_medium || "",
        utmCampaign: metadata.utm_campaign || "",
        reportarId: gclid,
      },
      metadata: {
        googleClientId: googleClientId,
        fbp: fbp,
        fbc: fbc,
        userAgent: metadata.user_agent || "",
        ipAddress: ip,
      },
    };

    console.log("📦 OrderRequest para Java:", JSON.stringify(orderRequest, null, 2));

    // 3. PETICIÓN AL BACKEND DE JAVA → POST /api/v1/orders
    const JAVA_BACKEND_URL =
      process.env.JAVA_BACKEND_URL || "http://localhost:8080/api/v1/orders";

    const response = await fetch(JAVA_BACKEND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.BACKEND_API_KEY
          ? { "X-Api-Key": process.env.BACKEND_API_KEY }
          : {}),
      },
      body: JSON.stringify(orderRequest),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Error en Java:", response.status, errorText);
      throw new Error(
        `Error en la respuesta del servidor Java: ${response.status} - ${errorText}`
      );
    }

    const data: JavaBackendResponse = await response.json();

    // 4. TRANSFORMAR RESPUESTA: Java devuelve { sessionId, sessionUrl }
    //    El frontend espera { url }
    return NextResponse.json({
      url: data.sessionUrl || data.url,
      sessionId: data.sessionId,
    });
  } catch (error) {
    console.error("❌ Error en Checkout Route:", error);
    return NextResponse.json(
      { error: "Error al procesar la solicitud con el backend", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}