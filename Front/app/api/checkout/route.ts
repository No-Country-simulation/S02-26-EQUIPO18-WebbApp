
import { NextResponse } from "next/server";

import Stripe from "stripe";

// Inicializamos Stripe con mi llave secreta
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-01-28.clover", 
});

//const baseUrl ="http://localhost:3000";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL?.trim()

export async function POST(request: Request) {
  try {
    // 1. Extraemos los datos que el usuario envió desde el formulario
    const body = await request.json();
    const { planId, companyName, price, email, name, lastname } = body; // Desestructuramos: Extraemos lo que necesitamos

    // Convertimos explícitamente a número por si llega como texto
    const unitAmount = Math.round(Number(price) * 100);// porque Stripe usa centavos ($499 -> 49900)

    if (!unitAmount||isNaN(unitAmount)) {
      return NextResponse.json({ message: "El precio no es un número válido" }, { status: 400 });
    }

    // 2. Definimos la URL de Webhook de Make
    // Enviamos los datos antes de ir a Stripe. 
    // Si el cliente se distrae o su tarjeta falla, 
    // ya tenemos un Deal creado en Pipedrive como "Pendiente" 
    // y podemos hacer seguimiento manual.
    const MAKE_WEBHOOK_URL = process.env.MAKE_URL;

    if(!MAKE_WEBHOOK_URL){
      throw new Error("La variable MAKE_URL no está configurada. Ver el archivo '.env.example'")
    }

    // 3. Enviamos los datos a Make usando 'fetch'
    // Enviamos los datos antes de ir a Stripe. 
    // Si el cliente se distrae o su tarjeta falla, 
    // ya tenemos un Deal creado en Pipedrive como "Pendiente" 
    // y podemos hacer seguimiento manual.
    const response = await fetch(MAKE_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Error al contactar con el servidor de automatización");
    }

    //4. Creamos la sesión de Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Plan ${planId.toUpperCase()} - ${companyName}`,
              description: `Registro legal para ${name} ${lastname }`,
            },
            unit_amount: unitAmount, // porque Stripe usa centavos ($499 -> 49900)
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: email,
      // Respuestas para sesión exitosa y cancelada
      success_url: `${baseUrl}/gracias?session_id={CHECKOUT_SESSION_ID}&plan=${planId}`,
      cancel_url: `${baseUrl}/#registro-form`,
    });


    // 5. Si todo sale bien, respondemos a nuestra web con un éxito
    //return NextResponse.json({ message: "Datos enviados con éxito" }, { status: 200 });
    
    //5. Respondemos con la URL de Stripe para que el frontend redirija
    return NextResponse.json({ url: session.url }, { status: 200 });

  } catch (error : any) {
    console.error("Error en la API:", error);
    return NextResponse.json(
      { message: error.message || "Hubo un error al procesar tu registro" },
      { status: 500 }
    );
  }
}