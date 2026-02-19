import { CheckoutPayload, JavaBackendResponse } from "@/types/checkout";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body: CheckoutPayload = await req.json();
    const { usuario, orden, empresa, metadata } = body;

    // 1. CAPTURA DE IDs DE TRACKING (Cookies)
    const cookieStore = await cookies();
    
        // Facebook usa: '_fbp' (browser id) o '_fbc' (click id)
        const fbp = cookieStore.get('_fbp')?.value || "no-detectado";
        const fbc = cookieStore.get('_fbc')?.value || "";
        
        // Google Analytics usa: '_ga'
        const ga = cookieStore.get('_ga')?.value;
        const googleClientId = ga || "no-detectado";
    // 2. CONSTRUCCIÓN DEL JSON PARA JAVA
    const jsonParaJava = {
      usuario: {
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        telefono: usuario.telefono,
        email: usuario.email
      },
      empresa:{
        nombre: empresa.nombre,
        actividad: empresa.actividad,
        estado: empresa.estado,
        tipo: empresa.tipo
      },
      orden: {
        planId: orden.planId,
        precio: orden.precio,
        moneda: "USD"
      },
      metadata: {
        campana: "landing_page_v1",
        google_client_id: googleClientId, // <--- Esto es lo que me pedis
        facebook_browser_id: fbp,         
        facebook_click_id: fbc            
      }
    };

    console.log("Enviando contrato a Java:", jsonParaJava);

    // 3. PETICIÓN AL BACKEND DE JAVA
    // Nota: Aquí pondrás la URL que te den tus compañeros.
    // Por ahora usamos una variable de entorno o una URL de prueba.
    const JAVA_BACKEND_URL = process.env.JAVA_BACKEND_URL! || "http://localhost:8080/api/v1/checkout";

    const response = await fetch(JAVA_BACKEND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Para añadir un API KEY si Java lo requiere para seguridad
        "X-Api-Key": process.env.BACKEND_API_KEY || ""
      },
      body: JSON.stringify(jsonParaJava),
    });

    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor Java");
    }

    const data: JavaBackendResponse = await response.json();

    // 4. RESPUESTA DE JAVA (URL de Stripe)
    // Esperamos que Java nos devuelva algo como: { "url": "https://checkout.stripe.com/..." }
    return NextResponse.json({ url: data.url });

  } catch (error) {
    console.error("Error en Checkout Route:", error);
    return NextResponse.json(
      { error: "Error al procesar la solicitud con el backend" },
      { status: 500 }
    );
  }
}