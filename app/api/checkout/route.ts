
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // 1. Extraemos los datos que vienen del formulario
    const body = await request.json();

    // 2. Definimos la URL de Webhook de Make
    // Por ahora usamos una variable de entorno o un placeholder
    const MAKE_WEBHOOK_URL = process.env.MAKE_URL;

    if(!MAKE_WEBHOOK_URL){
      throw new Error("La variable MAKE_URL no está configurada en el servidor. Ver el archivo '.env.example'")
    }

    // 3. Enviamos los datos a Make usando 'fetch'
    const response = await fetch(MAKE_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Error al contactar con el servidor de automatización");
    }

    // 4. Si todo sale bien, respondemos a nuestra web con un éxito
    return NextResponse.json({ message: "Datos enviados con éxito" }, { status: 200 });

  } catch (error) {
    console.error("Error en la API:", error);
    return NextResponse.json(
      { message: "Hubo un error al procesar tu registro" },
      { status: 500 }
    );
  }
}