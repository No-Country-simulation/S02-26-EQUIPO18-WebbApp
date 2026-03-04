# Total Incorporation — Documentación del Proyecto

> Plataforma web para el registro de empresas (LLC / C-Corp) en Estados Unidos, dirigida a emprendedores latinoamericanos no residentes.

---

## Índice

1. [Descripción General](#1-descripción-general)
2. [Arquitectura del Sistema](#2-arquitectura-del-sistema)
3. [Stack Tecnológico](#3-stack-tecnológico)
4. [Estructura del Repositorio](#4-estructura-del-repositorio)
5. [Frontend — Next.js](#5-frontend--nextjs)
6. [Backend — Spring Boot](#6-backend--spring-boot)
7. [Flujo de Checkout](#7-flujo-de-checkout)
8. [Variables de Entorno](#8-variables-de-entorno)
9. [Ramas Git](#9-ramas-git)
10. [Cómo levantar el proyecto](#10-cómo-levantar-el-proyecto)

---

## 1. Descripción General

**Total Incorporation** facilita a emprendedores de LATAM la incorporación de entidades legales en EE. UU. (LLC o C-Corp) a través de un proceso simplificado de 3 pasos. El flujo termina en un pago mediante **Stripe Checkout** y dispara eventos de conversión hacia **Meta Pixel** y **Google Analytics**.

### Servicios / Planes disponibles

| ID | Nombre | Precio |
|----|--------|--------|
| `Inicial_Basico` | Plan Inicial | $499 USD |
| `Crecimiento_Pro` | Plan Crecimiento | $899 USD |
| `Elite_Premium` | Plan Élite | $4,499 USD |

### Estados disponibles para incorporación

`Wyoming` (recomendado) · `Delaware` · `New Mexico` · `Florida` · `Texas`

### Tipos de entidad

`LLC` · `CORP` (C-Corporation)

---

## 2. Arquitectura del Sistema

```
Usuario (Browser)
       │
       ▼
[Next.js 16 - Front/]          ← Landing page + Formulario multi-paso
       │  POST /api/checkout
       ▼
[Next.js API Route]             ← Enriquece el payload con cookies de tracking
  (route.ts)                       (_ga, _fbp, _fbc, IP, User-Agent)
       │  POST JAVA_BACKEND_URL
       ▼
[Spring Boot - src/]            ← Crea sesión de Stripe, dispara conversiones
  Puerto 8080
       │
       ├──► Stripe API           → Genera URL de pago
       ├──► Meta Conversions API → Evento de conversión Facebook
       └──► Google Measurement Protocol → Evento de conversión Google
```

---

## 3. Stack Tecnológico

### Frontend
| Tecnología | Versión | Uso |
|-----------|---------|-----|
| Next.js | 16.1.6 | Framework React (App Router) |
| React | 19.2.3 | UI |
| TypeScript | ^5 | Tipado estático |
| Tailwind CSS | ^4 | Estilos |
| React Hook Form | ^7 | Gestión de formularios |
| Zod | ^4 | Validación de esquemas |
| Lucide React | ^0.564 | Iconografía |
| react-hot-toast | ^2.6 | Notificaciones |
| react-icons | ^5.5 | Iconos adicionales |
| canvas-confetti | ^1.9 | Animación de éxito |
| Stripe (SDK) | ^20.3 | Tipos de checkout |

### Backend
| Tecnología | Versión | Uso |
|-----------|---------|-----|
| Java / Spring Boot | — | API REST |
| Stripe Java SDK | — | Crear sesiones de pago |
| Lombok | — | Reducción de boilerplate |
| Maven | — | Gestión de dependencias |

---

## 4. Estructura del Repositorio

```
/
├── PROYECTO.md               ← Este archivo
├── pom.xml                   ← Configuración Maven (Back)
├── .gitignore
│
├── Front/                    ← Aplicación Next.js
│   ├── app/
│   │   ├── layout.tsx        ← Root layout (ConsentProvider, TrackingScripts, CookieBanner)
│   │   ├── page.tsx          ← Landing page principal
│   │   ├── api/checkout/
│   │   │   └── route.ts      ← API Route: enrichment de tracking → Java
│   │   ├── terminos/         ← Página de Términos y Condiciones
│   │   ├── privacidad/       ← Política de Privacidad
│   │   ├── cookies/          ← Política de Cookies
│   │   ├── reembolsos/       ← Política de Reembolsos
│   │   ├── contacto/         ← Página de Contacto
│   │   └── gracias/          ← Página post-pago exitoso
│   │
│   ├── components/
│   │   ├── MultiStepForm.tsx ← Formulario principal (3 pasos)
│   │   ├── PricingSection.tsx← Planes y precios
│   │   ├── HeroSection.tsx   ← Sección hero
│   │   ├── ProductMockup.tsx ← Beneficios + mockup visual
│   │   ├── StateSelector.tsx ← Selector visual de estados USA
│   │   ├── TrustSeals.tsx    ← Sellos de seguridad (Stripe, SSL)
│   │   ├── CookieBanner.tsx  ← Banner de consentimiento GDPR
│   │   ├── TrackingScripts.tsx← GTM / Meta Pixel (carga condicional)
│   │   └── ...
│   │
│   ├── lib/
│   │   ├── constants.ts      ← SERVICIOS, USA_STATES_INFO, ENTITY_INFO, FAQS
│   │   ├── schema.ts         ← Esquema Zod de validación del formulario
│   │   └── apiRequest.ts     ← Helpers de fetch
│   │
│   ├── context/
│   │   ├── ConsentContext.tsx ← Estado global de consentimiento de cookies
│   │   └── authContext.tsx    ← Estado de autenticación
│   │
│   ├── services/
│   │   └── checkoutService.ts← Servicio alternativo de checkout (axios)
│   │
│   └── types/
│       ├── checkout.ts       ← Tipos: CheckoutPayload, JavaBackendResponse
│       └── index.ts          ← Tipos generales
│
└── src/                      ← Aplicación Spring Boot
    └── main/java/com/example/stripe/v1/
        ├── V1Application.java
        ├── config/
        │   └── StripeConfig.java       ← Inicializa Stripe con API key
        ├── controller/
        │   ├── ProductCheckoutController.java ← POST /product/v1/checkout
        │   ├── PaymentController.java
        │   └── WebhookController.java         ← Webhooks de Stripe
        ├── dto/
        │   ├── CheckoutRequest.java    ← Recibe payload del front
        │   ├── CheckoutResponse.java   ← Devuelve { url }
        │   ├── ConversionData.java     ← Datos para Meta/Google
        │   └── ProductRequest.java
        └── service/
            ├── StripeServiceV1.java           ← Crea Stripe Session
            ├── MetaConversionService.java     ← Dispara evento a Meta API
            └── GoogleAnalyticsService.java    ← Dispara evento a GA4
```

---

## 5. Frontend — Next.js

### Flujo del formulario multi-paso (`MultiStepForm.tsx`)

```
Paso 1 — Datos Personales
  name, lastname, email, whatsapp
       ↓ (validación Zod)
Paso 2 — Datos de la Empresa
  companyName, activity, state (StateSelector), entityType (LLC | CORP)
       ↓ (validación Zod)
Paso 3 — Confirmación + Pago
  Resumen del pedido → TrustSeals → botón "Finalizar y Pagar"
       ↓ (onSubmit)
  POST /api/checkout  →  redirige a Stripe Checkout URL
```

### Esquema de validación (`lib/schema.ts` — Zod)

```typescript
RegistrationData {
  name:        string (min 3)
  lastname:    string (min 3)
  email:       string (regex)
  whatsapp:    string (min 10)
  companyName: string (min 2)
  activity:    string (min 5)
  entityType:  "LLC" | "CORP"
  state:       enum(USA_STATES)
  planId:      enum(PLAN_IDS)
}
```

### API Route: `/api/checkout` (`route.ts`)

Recibe el payload del formulario y lo enriquece antes de enviarlo a Java:

| Dato | Fuente |
|------|--------|
| `ip_address` | Header `x-forwarded-for` |
| `google_client_id` | Cookie `_ga` (parseada) |
| `fbp` | Cookie `_fbp` |
| `fbc` | Cookie `_fbc` o URL `fbclid` |
| `utm_source/medium/campaign/gclid` | Query params de la URL |
| `user_agent` | Enviado desde el cliente |

### Gestión de consentimiento de cookies (`ConsentContext.tsx`)

`TrackingScripts.tsx` carga GTM y Meta Pixel **sólo si** el usuario acepta mediante `CookieBanner.tsx`. El estado se persiste en `localStorage`.

---

## 6. Backend — Spring Boot

### Endpoints principales

| Método | Path | Descripción |
|--------|------|-------------|
| `POST` | `/product/v1/checkout` | Crea sesión de Stripe y dispara conversiones |
| `POST` | `/webhook` | Procesa eventos de Stripe (payment_intent, etc.) |

### Servicios

- **`StripeServiceV1`** — Crea una `Stripe Checkout Session` con los productos del plan seleccionado, incluyendo metadata de tracking.
- **`MetaConversionService`** — Envía el evento `Purchase` a la API de Conversiones de Meta con `fbp`, `fbc`, IP y User-Agent.
- **`GoogleAnalyticsService`** — Envía el evento `purchase` al Measurement Protocol de GA4 con `client_id` y `gclid`.

### DTOs relevantes

```java
// CheckoutRequest (recibe del front)
{
  priceId:       String,   // ID del precio en Stripe
  customerEmail: String,
  successUrl:    String,
  cancelUrl:     String,
  metadata:      Map<String, String>  // fbc, fbp, gclid, etc.
}

// CheckoutResponse (devuelve al front)
{
  url: String  // https://checkout.stripe.com/...
}
```

---

## 7. Flujo de Checkout

```
1. Usuario completa el formulario (3 pasos)
2. Front captura UTMs de la URL (?utm_source, ?gclid, ?fbclid)
3. POST /api/checkout → Next.js API Route
4. API Route lee cookies (_ga, _fbp, _fbc) e IP del header
5. Construye jsonParaJava con todos los datos enriquecidos
6. POST JAVA_BACKEND_URL → Spring Boot
7. Spring Boot crea Stripe Checkout Session
8. Spring Boot dispara MetaConversionService y GoogleAnalyticsService
9. Java devuelve { url: "https://checkout.stripe.com/..." }
10. Front redirige window.location.href = url
11. Usuario paga en Stripe → redirige a /gracias
12. Stripe dispara webhook → Spring Boot confirma pago
```

---

## 8. Variables de Entorno

### Frontend (`Front/.env.local`)

```env
JAVA_BACKEND_URL=http://localhost:8080/api/v1/checkout
BACKEND_API_KEY=tu_api_key_secreta

NEXT_PUBLIC_GOOGLE_TAG_ID=GTM-XXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=XXXXXXXXXXXXXXXXX
```

### Backend (`src/main/resources/application.properties`)

```properties
STRIPE_API_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

PIXEL_META_ID=...
PIXEL_META_TOKEN=...

PIXEL_GOOGLE_MEASUREMENT_ID=G-XXXXXXXX
PIXEL_GOOGLE_API_SECRET=...
```

---

## 9. Ramas Git

| Rama | Descripción |
|------|-------------|
| `dev` | Rama de integración principal |
| `front` | Desarrollo frontend (feature branch) |
| `frontend-daniel` | Branch de frontend alternativo (ya mergeado) |

---

## 10. Cómo levantar el proyecto

### Frontend

```bash
cd Front
npm install
npm run dev
# → http://localhost:3000
```

### Backend

```bash
# Requiere Java 17+ y Maven
./mvnw spring-boot:run
# → http://localhost:8080
```

### Variables requeridas para desarrollo

1. Copia `.env.local.example` → `.env.local` en `Front/`
2. Configura las keys de Stripe (modo test: `sk_test_...`)
3. El backend lee las variables desde el entorno del sistema o un archivo `.env`

---

*Última actualización: Febrero 2026 — Equipo 18, No Country S02-26*
