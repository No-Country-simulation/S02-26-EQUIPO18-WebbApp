import { CheckoutPayload, JavaBackendResponse } from "@/types/checkout";
import { NextResponse } from "next/server";
import { headers, cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body: CheckoutPayload = await req.json();
    const { usuario, orden, empresa, metadata } = body;

  // 1. CAPTURA DE IDs DE TRACKING (Headers y Cookies)
    const cookieStore = await cookies();
    const headerList = await headers();

    // IP del usuario (importante para la clase Metadata del diagrama)
    const ip = headerList.get('x-forwarded-for')?.split(',')[0] || "127.0.0.1";
    
        // Facebook usa: '_fbp' (browser id) o '_fbc' (click id)
        const fbp = cookieStore.get('_fbp')?.value || "no-detectado";
          //fbc puede venir de la cookie o del header (si Facebook lo envía como header personalizado)
        const fbc = metadata.fbc ||cookieStore.get('_fbc')?.value || "no-detectado";
        
        // Google Analytics usa: '_ga'
        const gaValue = cookieStore.get('_ga')?.value;
        const googleClientId = gaValue ? gaValue.split('.').slice(-2).join('.') : "no-detectado";
    
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
        // Datos de Campaña (vienen del frontend)
        utm_source: metadata.utm_source,
        utm_medium: metadata.utm_medium,
        utm_campaign: metadata.utm_campaign,
        gclid: metadata.gclid || "no-detectado",
        //Datos de Tracking (vienen de cookies o headers)
        google_client_id: googleClientId, // <--- Esto es lo que me pedis de google
        fbp: fbp,     // <--- Esto es lo que me pedis de Facebook    
        fbc: fbc,   
        //Datos técnicos adicionales
        user_agent: metadata.user_agent, // Ya lo traíamos del front
        ip_address: ip         
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
      const errorText = await response.text();
      console.error("Error en Java:", errorText);
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