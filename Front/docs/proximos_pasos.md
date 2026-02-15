# Próximos Pasos y Hoja de Ruta (Roadmap)

La arquitectura técnica actual (Next.js + Make) fue diseñada precisamente para soportar cambios sin tener que reconstruir el sistema desde cero.

Una vez consolidada la fase actual de optimización de conversión, el sistema está preparado para escalar en las siguientes direcciones:

## 1. Expansión de Servicios y Upselling
- Nuevos Paquetes: Configurar en la web y en Stripe servicios adicionales como la obtención de EIN, acuerdos operativos o servicios de Agente Residente.

- Venta Cruzada (Cross-selling): Implementar una segunda etapa en Make que, tras un pago exitoso, envíe automáticamente ofertas de servicios contables o de cumplimiento anual.

## 2. Optimización Avanzada de Ads
- Google Analytics 4 (GA4): Configurar la medición de comercio electrónico mejorada para rastrear no solo compras, sino también en qué paso exacto del formulario los usuarios abandonan el proceso.

- Retargeting Dinámico: Utilizar los datos de "Registro Pendiente" en Pipedrive para crear audiencias en Meta Ads y mostrar anuncios específicos a quienes iniciaron el formulario pero no completaron el pago.

## 3. Internacionalización y Localización
- Multidioma: Adaptar el MultiStepForm para detectar el idioma del navegador y mostrar el contenido en inglés o español según el mercado objetivo.

- Nuevas Jurisdicciones: Escalar la sección de "Estados" para incluir registros en otros países o territorios, aprovechando la estructura flexible ya creada en las constantes del proyecto.

## 4. Automatización Post-Venta
- Onboarding Automático: Conectar Make con herramientas de firma digital (como PandaDoc o DocuSign) para que, apenas se reciba el pago de Stripe, el cliente reciba los documentos legales listos para firmar.

- Portal de Cliente: Evaluar la creación de un área privada donde el cliente pueda seguir el estatus de su registro en tiempo real basándose en la información actualizada en Pipedrive.