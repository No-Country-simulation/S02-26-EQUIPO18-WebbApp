# Estrategia de Marketing y Tracking

La landing page utiliza un sistema de medición híbrido para garantizar la máxima precisión en la atribución de conversiones, minimizando la pérdida de datos causada por bloqueadores de anuncios o restricciones de iOS (AppTrackingTransparency).

## 1. Tracking del Lado del Cliente (Browser-side)

Se han implementado scripts base en el componente raíz (layout.tsx o <head>) para inicializar las librerías de rastreo:

- **Meta Pixel:** Rastreo de eventos estándar (PageView) y eventos personalizados de navegación.

- **Google Tag Manager (GTM):** Gestión de etiquetas de Google Ads y Analytics.

- **Evento de Conversión (Purchase):** Se dispara exclusivamente en la ruta /gracias.

  - **Activación:** Solo si existen en la URL los parámetros session_id y plan.
  - **Datos enviados:** Valor real de la compra, moneda (USD) y nombre del plan seleccionado.

## 2. Tracking del Lado del Servidor (Server-side API)

Para reforzar el rastreo del navegador, el frontend actúa como recolector de identificadores únicos que se envían al Backend (Java):

 - **_fbp / _fbc:** Identificadores únicos de Meta que permiten la API de Conversiones (CAPI).

- **_ga:** Client ID de Google para la medición de Conversiones Mejoradas.

## 3. Experiencia de Refuerzo Positivo (UX)

Tras la validación del pago y los eventos de tracking, se ejecuta una animación de celebración mediante la librería canvas-confetti.

- **Propósito:** Reducir la fricción post-compra ("buyer's remorse") y confirmar visualmente que el proceso ha sido exitoso.

- **Implementación:** Función disparada dentro de un useEffect en la página de éxito, optimizada para no afectar el rendimiento de carga (LCP).

## 4. Atribución de Campaña

El sistema detecta automáticamente la procedencia del usuario. Aunque actualmente el valor por defecto es ```landing_page_v1```, el sistema está preparado para capturar parámetros UTM de la URL y enviarlos al backend para segmentar el ROI de diferentes fuentes de tráfico.