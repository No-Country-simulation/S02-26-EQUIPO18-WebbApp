# Flujo de Checkout e Integración con Backend

Este proyecto utiliza una arquitectura de "Backend for Frontend" (BFF). Next.js actúa como un proxy seguro para procesar datos de marketing y cookies antes de enviarlos al servidor principal de Java.

## 1. Proceso de Venta (Secuencia)

- **Captura de Datos:** El usuario completa el MultistepForm.

- **Normalización:** El frontend mapea los campos del formulario (ej. whatsapp -> telefono) al contrato de datos definido.

- **Enriquecimiento de Tracking:** La ruta de API (/api/checkout) extrae automáticamente los IDs de tracking de las cookies del navegador (_fbp, _fbc, _ga).

- **Handshake con Java:** Se realiza una petición POST al servidor Java con el JSON completo.

- **Redirección:** Al recibir la URL de Stripe generada por Java, el frontend redirige al usuario para completar el pago.

## 2. El Contrato de Datos (Interface)

Cualquier cambio en la estructura de datos debe reflejarse en ambos sistemas. La interfaz oficial definida en TypeScript es:
```
TypeScript

export interface Usuario {
  nombre: string;
  apellido: string;
  telefono: string; 
  email: string;
}

export interface Empresa {
  nombre: string;
  actividad: string; 
  estado: string;
  tipo: string;
}

export interface Orden {
  planId: string;
  precio: number;
  moneda: string;
}

export interface Metadata {
  campana: string;
  pixel_id: string;
  tagG_id: string;
}

// Esta es la interfaz que representa el JSON completo que enviaremos a Java
export interface CheckoutPayload {
  usuario: Usuario;
  empresa: Empresa;
  orden: Orden;
  metadata: Metadata;
}

// Esta es la respuesta que esperamos que Java nos devuelva
export interface JavaBackendResponse {
  url: string;      // La URL de Stripe
  sessionId?: string; // Opcional, por si Java devuelve el ID de sesión
}
```

## 3. Endpoint de Integración

- **Método:** POST

- **Endpoint:** Definido en la variable de entorno JAVA_BACKEND_URL.

- **Seguridad:** Las peticiones desde Next.js incluyen una cabecera X-Api-Key para validación interna entre servidores.

## 4. Respuesta Esperada del Backend
Para que el flujo sea exitoso, el backend de Java debe responder con un objeto que contenga la URL de la sesión de Stripe:

```
JSON
{
  "url": "https://checkout.stripe.com/pay/cs_test_..."
}
```

## 5. Retorno y Confirmación (Success URL)

El backend debe configurar Stripe para que, tras un pago exitoso, el usuario sea redirigido a:
{BASE_URL}/gracias?session_id={CHECKOUT_SESSION_ID}&plan={planId}

## 6. Acciones Post-Venta (Responsabilidad del Backend)

Una vez que el servidor de Java recibe la confirmación de pago exitoso por parte de Stripe (vía Webhook), se deben disparar automáticamente los siguientes procesos:

- **Creación de Registro:** Conversión del prospecto en "Cliente Activo" en la base de datos principal.

- **Generación de Documentación:** Creación automática de los borradores de registro de la empresa.

- **Notificación por Email:** Envío de correo electrónico de bienvenida que incluya:

  - Confirmación de pago y factura.
  - Credenciales de acceso al Dashboard.
  - Enlace de Firma Digital: Link hacia la plataforma de firma (ej. DocuSign) para la autorización legal del registro.