# Estrategia de Marketing y Tracking

La landing page utiliza un sistema de medición híbrido para garantizar la máxima precisión en la atribución de conversiones, minimizando la pérdida de datos causada por bloqueadores de anuncios o o restricciones de privacidad modernas (iOS/ITP).

## 1. Tracking del Lado del Cliente (Browser-side)

Se han implementado scripts base en el componente raíz (```layout.tsx``` o ```<head>```) para inicializar las librerías de rastreo:

- **Meta Pixel & Google Tag:** Rastreo de eventos estándar (```PageView```) y gestión de etiquetas mediante GTM (Google Tag Manager).

- **Evento de Conversión (Purchase):** Se dispara exclusivamente en la ruta ```/gracias```.

  - **Activación:** Condicionada a la presencia de ```session_id``` y ```plan``` en la URL (verificación de Stripe).
  - **Datos enviados:** Valor real de la compra, moneda (USD) y nombre del plan seleccionado.

## 2. Atribución Dinámica de Campaña (UTMs)

El sistema ha evolucionado de un modelo estático a uno dinámico. Ya no depende de un valor fijo (landing_page_v1), sino que extrae inteligencia directamente de la URL:

- **Captura Automática:** Mediante el hook useSearchParams, el frontend detecta y almacena utm_source, utm_medium y utm_campaign.

- **Persistencia de Origen:** Estos datos se inyectan en el contrato de la orden, permitiendo al equipo de marketing medir el ROI exacto de cada anuncio individual.

## 3. Tracking del Lado del Servidor (Server-side API/CAPI)

Para reforzar el rastreo del navegador y mejorar el Event Match Quality (EMQ), el Backend For Frontend (Next.js Route Handler) enriquece la petición antes de enviarla a Java con:

 - **Identificadores de Meta (```_fbp``` / ```_fbc```):** Claves para la API de Conversiones (CAPI), procesadas desde las cookies HttpOnly.

- **Google Client ID (```_ga```):** Client ID de Google para la medición de Conversiones Mejoradas.
  
- **Huella Técnica**: Captura de IP Address y User-Agent desde los headers del servidor, fundamentales para la validación de eventos en las plataformas de Ads.

## 4. Experiencia de Refuerzo Positivo (UX)

Tras la validación del pago y los eventos de tracking, se ejecuta una animación de celebración mediante la librería ```canvas-confetti```.

- **Propósito:** Reducir la fricción post-compra ("buyer's remorse") y confirmar visualmente que el proceso ha sido exitoso.

- **Implementación:** Función disparada dentro de un ```useEffect``` en la página de éxito, optimizada para no afectar el rendimiento de carga (LCP).

