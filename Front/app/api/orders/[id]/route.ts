import { NextResponse } from "next/server";

/**
 * BFF: Proxy para obtener/actualizar una orden específica.
 * GET /api/orders/[id] → Java GET /api/v1/orders/{id}
 * PATCH /api/orders/[id] → Java PATCH /api/v1/orders/{id}/status
 */

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const BASE = process.env.JAVA_BACKEND_URL?.replace(/\/orders$/, "") || "http://localhost:8080/api/v1";
    const response = await fetch(`${BASE}/orders/${id}`, {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Order not found" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json({ error: "Backend unavailable" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await req.json();
    const BASE = process.env.JAVA_BACKEND_URL?.replace(/\/orders$/, "") || "http://localhost:8080/api/v1";

    const response = await fetch(`${BASE}/orders/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: errorText }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json({ error: "Backend unavailable" }, { status: 500 });
  }
}
