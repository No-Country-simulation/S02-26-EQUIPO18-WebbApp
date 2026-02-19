# Guía de Cumplimiento, Legitimidad y Credibilidad Digital
**Proyecto:** Total Incorporation - Landing Page de Servicios Legales.

**Estado:** Documentación de Soporte para el Cliente.

## 1. Introducción
Para operar legalmente y maximizar la tasa de conversión, el sitio web debe reflejar transparencia y seguridad. El uso de sellos de confianza (Trust Badges) no es solo estético; requiere el cumplimiento de normativas de seguridad y privacidad específicas.

---

## 2. Protocolos de Seguridad Requeridos

### A. Certificado SSL (Secure Sockets Layer)
El sitio debe operar obligatoriamente bajo el protocolo `HTTPS`.
* **Estado:** Crítico.
* **Trámite para el cliente:** Asegurar que el dominio tenga un certificado activo (vía Vercel, Let's Encrypt o Cloudflare).
* **Beneficio:** Cifra los datos del formulario de registro y mejora el posicionamiento en Google (SEO).

### B. Cumplimiento PCI-DSS (Stripe)
Al procesar pagos, el negocio debe cumplir con los estándares de seguridad de la industria de tarjetas de pago.
* **Trámite para el cliente:**
    1. Completar la validación de identidad (KYC) en el Dashboard de Stripe.
    2. Mantener la cuenta en estado "Live" (Producción).
* **Uso del Sello:** Solo se permite el logo "Powered by Stripe" si la pasarela está activa y vinculada al dominio oficial.

---

## 3. Legitimidad ante Organismos (IRS y Agentes Registrados)

### A. Relación con el IRS
Dado que se ofrecen servicios de tramitación de EIN y Tax ID, el cliente debe ser consciente de lo siguiente:
* **Restricción Legal:** Es ilegal utilizar el escudo oficial del gobierno de EE. UU. o del IRS.
* **Recomendación:** Utilizar sellos descriptivos como *"Authorized EIN Submitter"* o *"IRS Tax Form Processing"*.
* **Requisito:** El cliente debe poseer un PTIN (Preparer Tax Identification Number) si actúa como preparador de impuestos profesional.

---

## 4. Documentación Legal Obligatoria (El "Pie de Página")

Para que los sellos de seguridad sean válidos y Stripe no suspenda la cuenta, el sitio **debe** incluir enlaces visibles a:

1. **Políticas de Privacidad:** Explicar cómo se manejan los datos personales (GDPR/CCPA compliant).
2. **Términos y Condiciones:** Definir las responsabilidades del servicio y alcances legales.
3. **Política de Reembolsos:** Crucial para reducir disputas en la pasarela de pagos.

---

## 5. Checklist de Activación para el Cliente

Antes de habilitar los sellos de seguridad en la versión de producción, el cliente debe confirmar:

- [ ] Cuenta de Stripe verificada y en modo producción.
- [ ] Certificado SSL activo y forzado.
- [ ] Documento de Términos y Condiciones redactado y publicado.
- [ ] Registro como Agente Registrado (si aplica) o capacidad legal para formar empresas en los estados ofrecidos (DE, WY, FL, etc.).

---

## 6. Recomendación de Terceros (Opcional)
Para elevar la credibilidad al nivel máximo en el mercado estadounidense, se sugiere iniciar el trámite de acreditación en:
* **Better Business Bureau (BBB):** Incrementa la confianza en un 70% para clientes en EE. UU.
* **Trustpilot:** Para la gestión de reseñas públicas reales.

---

## 7. Aviso de Cookies y Privacidad (GDPR/CCPA Compliant)

Dado que el sitio utiliza herramientas de seguimiento para marketing (Meta Pixel y Google Analytics), es imperativo implementar un sistema de gestión de consentimiento.

### A. Requisitos Legales
* **GDPR (General Data Protection Regulation):** Obligatorio si hay usuarios de la Unión Europea. Requiere que el usuario dé su consentimiento *antes* de que se activen las cookies de rastreo.
* **CCPA (California Consumer Privacy Act):** Obligatorio para usuarios en California. Exige informar qué datos se recolectan y dar la opción de "No vender mi información personal".

### B. Implementación Técnica Sugerida
1. **Banner de Consentimiento:** Debe aparecer al cargar la página por primera vez.
2. **Bloqueo Preventivo:** Los scripts de `Next.js` para Meta y Google deben permanecer inactivos hasta que el usuario haga clic en "Aceptar".
3. **Panel de Preferencias:** El usuario debe poder elegir qué cookies acepta (Esenciales, Analíticas, Marketing).

### C. Trámite para el Cliente
* **Redacción del "Cookie Policy":** Un documento técnico que liste cada cookie (ej: `_fbp`, `_ga`), su duración y su propósito.
* **Configuración en el CMS/Código:** Si el cliente utiliza una plataforma de gestión de consentimiento (CMP) como *Cookiebot* o *Termly*, debe proporcionar la API Key para integrarla en el proyecto.

### D. Impacto en el Proyecto
* **Aviso:** Si el usuario rechaza las cookies, los IDs de tracking que enviamos al backend en el `route.ts` vendrán como `no-detectado`. El sistema debe estar preparado para procesar la venta normalmente, respetando la privacidad del usuario.
* **Nota técnica**: El banner de cookies está configurado para no interferir con el flujo de venta. El botón de 'Aceptar' utiliza un color de acción (Primary Color) para incentivar el consentimiento sin forzar al usuario, manteniendo la legalidad y el flujo de datos para marketing.

---

*Este documento es una guía consultiva y no constituye asesoría legal formal.*