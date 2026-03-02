# DOCUMENTACIÓN TÉCNICA DEL FRONTEND

## 1. Resumen del Proyecto (Project Overview)

- **Tecnologías:** Next.js 14/15, TypeScript, Tailwind CSS.

- **Propósito:** Landing page de conversión para servicios de incorporación legal en EE. UU.

## 2. Arquitectura de Componentes

- **Estructura de Carpetas:**  
  - [Enlace a detalle_arbol](detalle-arbol.md)

- **Componentes Clave:**

  - *MultistepForm.tsx:* Lógica principal de captura de datos.
  - *CustomImage.tsx:* Manejo optimizado de imágenes.
  - *TrustLogos.tsx:* Sección de sellos de confianza para mejorar la confianza.

## 3. Flujo de Checkout e Integración 

Este proyecto utiliza una arquitectura de "Backend for Frontend" (BFF). Next.js actúa como un proxy seguro para procesar datos de marketing y cookies antes de enviarlos al servidor principal de Java. 

  - [Enlace a flujo_checkout_integracion](flujo_checkout_integracion.md)


## 4. Estrategia de Marketing y Tracking

La landing page utiliza un sistema de medición híbrido para garantizar la máxima precisión en la atribución de conversiones, minimizando la pérdida de datos causada por bloqueadores de anuncios o restricciones de iOS (AppTrackingTransparency).
    - [Enlace a estrategia_Mkt_Tracking](estrategia_mkt_tracking.md)

## 5. Guía de Estilos y Decisiones de Diseño (UX/UI)

El diseño de la interfaz ha sido desarrollado bajo un concepto de "Autoridad Confiable". Dado que el servicio implica trámites legales y financieros en EE. UU., la estética huye de lo puramente decorativo para centrarse en la claridad y el prestigio.
        - [Enlace a Guía de Estilos y decisiones de diseño (UX/UI)](guia_estilos.md)

## 6. Variables de Entorno (.env)

El proyecto utiliza variables de entorno para gestionar las claves de API y las URLs de los servidores. Estas variables deben configurarse en el entorno de despliegue (Vercel, Docker, etc.) y en el archivo .env.local para desarrollo.
        - [Enlace a variables de entorno](variables_entorno.md)

## 7. Privacidad y Tracking (Privacy by Design)

- **Arquitectura de Consentimiento Global:** Se implementó un ```ConsentContext``` (React Context API) para gestionar el estado de privacidad en toda la aplicación.

- **Carga Condicional de Scripts (GDPR/CCPA Compliance):** Se desarrolló el componente ````TrackingScripts```` que condiciona la inyección de los SDK de Google Tag Manager y Meta Pixel.

  -*Lógica técnica:* Los scripts solo se inyectan en el DOM si el estado ````hasConsent```` es verdadero. Esto garantiza que no se creen cookies de rastreo sin el permiso explícito del usuario.

- **Persistencia de Preferencias:** Las decisiones del usuario se almacenan en ````localStorage```` bajo la llave ````cookie-consent```` para evitar peticiones redundantes y mejorar la experiencia en visitas recurrentes.

- **Integración con Backend:** El sistema está diseñado para enviar los IDs de tracking al endpoint ````/api/checkout```` solo si están disponibles; en caso contrario, el backend procesa la solicitud con valores por defecto (````no-detectado````), asegurando la resiliencia del sistema.