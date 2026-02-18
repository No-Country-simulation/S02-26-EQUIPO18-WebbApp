# Variables de Entorno (.env)

El proyecto utiliza variables de entorno para gestionar las claves de API y las URLs de los servidores. Estas variables deben configurarse en el entorno de despliegue (Vercel, Docker, etc.) y en el archivo .env.local para desarrollo.

## 1. Configuración del Backend (Java)

- **JAVA_BACKEND_URL:** URL absoluta del endpoint de Java (ej: https://api.tuempresa.com/v1/checkout). Es la dirección a la que Next.js enviará el JSON del contrato.

- **BACKEND_API_KEY: (Opcional)** Clave de seguridad para que el backend de Java valide que la petición proviene de nuestro frontend autorizado.

## 2. Configuración de Stripe

- **NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:** Clave pública de Stripe. Se usa en el frontend para cargar los elementos de pago seguros si fuera necesario.

- **STRIPE_SECRET_KEY:** (Manejo en Java) *Nota:* Esta clave NO debe estar en el frontend. Es responsabilidad exclusiva del backend en Java.

## 3. Configuración de Marketing (Tracking)

Estas variables alimentan los scripts del <head> y los eventos de conversión.

- **NEXT_PUBLIC_META_PIXEL_ID:** ID del Píxel de Meta (fijo).

- **NEXT_PUBLIC_GOOGLE_TAG_ID:** ID de Google Analytics / Tag Manager (fijo).

## 4. URLs de Redirección

- **NEXT_PUBLIC_BASE_URL:** URL raíz del sitio (ej: https://totalincorporation.com). Se usa para construir las URLs de retorno (success_url y cancel_url) que Java enviará a Stripe.

## 5. env.example

#Recordar configurar las siguientes variables en el .env.local y agregarlo a .gitignore:
JAVA_BACKEND_URL=http://nombreempresa/api/v1/checkout
BACKEND_API_KEY=your_api_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=tu_clave_publica_aqui
NEXT_PUBLIC_META_PIXEL_ID=12345678912345
NEXT_PUBLIC_GOOGLE_TAG_ID=G-XXXXXXXXXX
NEXT_PUBLIC_BASE_URL=tu_url_aqui
