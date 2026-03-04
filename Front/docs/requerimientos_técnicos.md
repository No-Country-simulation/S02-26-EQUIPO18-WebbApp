# Requerimientos Técnicos y Justificación del Stack

**Introducción:**

Para cumplir con el objetivo de aumentar la tasa de conversión y permitir un rastreo preciso de campañas de Ads, se ha seleccionado un stack tecnológico que prioriza la seguridad, la velocidad y la automatización.

## 1. Next.js: El Motor de Alta Performance
Next.js fue elegido como el framework principal para el frontend y la lógica del servidor por las siguientes razones:

- **Seguridad de Datos Sensibles:** Gracias a las API Routes (/api/checkout), las credenciales críticas como la clave secreta de Stripe y la URL de Make permanecen ocultas en el servidor y nunca se exponen al navegador del usuario.

- **Velocidad de Carga:** Al ser un framework optimizado, reduce los tiempos de carga, lo cual es fundamental para que Google Ads no penalice el costo por clic debido a una mala experiencia de usuario.

- **Manejo de Variables de Entorno:** El uso de archivos .env.local permite separar la configuración técnica del código fuente, garantizando que las llaves de acceso estén protegidas.

- **Validación en Tiempo Real:** Permite integrar validaciones inmediatas para que la información que llega al CRM sea precisa y libre de errores humanos.

## 2. Java & Spring Boot: El Núcleo de la Lógica de Negocio
Para el backend, se ha diseñado una arquitectura robusta centrada en la integridad de los datos y la facilidad de mantenimiento:

- **Arquitectura Hexagonal (Puertos y Adaptadores):** Hemos aplicado un diseño que desacopla el núcleo del negocio (el dominio) de las tecnologías externas (base de datos, controladores REST). Esto garantiza que el sistema sea fácil de probar, evolucionar y que las reglas de negocio permanezcan intactas ante cambios tecnológicos.

- **Java 17 & Spring Boot 3:** Utilizamos las versiones más actuales y estables de la industria, aprovechando mejoras de rendimiento y seguridad. Spring Boot nos permite una configuración rápida y una integración fluida de todos los componentes.
  
- **Maven:** Gestión de Ciclo de Vida y Dependencias: El proyecto utiliza Apache Maven como motor de construcción. Esto garantiza que todas las librerías necesarias se gestionen de forma centralizada y que el proceso de despliegue sea repetible y profesional.
  
- **Lombok:** Para reducir el código repetitivo (boilerplate), permitiendo un desarrollo más rápido y limpio.
  
- **MapStruct:** Para una conversión automática y eficiente entre entidades de base de datos y objetos de transferencia de datos (DTOs).
  
- **jjwt (Java JWT):** Librería especializada para la creación y validación de tokens de seguridad.
  
- **Seguridad con JWT (JSON Web Token):** Implementamos una seguridad stateless (sin estado). El servidor emite un token firmado digitalmente tras la autenticación, lo que permite una comunicación segura y escalable entre el frontend y el backend sin exponer sesiones de usuario en el servidor.
  
- **Gestión de Datos con Spring Data JPA & H2:** El acceso a la base de datos se maneja de forma abstracta y eficiente. El uso de validaciones automáticas mediante Bean Validation asegura que solo los datos que cumplen con los requisitos de negocio sean persistidos, evitando inconsistencias.
  
- **Documentación Automatizada con Swagger/OpenAPI:** El backend expone una consola de documentación interactiva que facilita la integración para el equipo de frontend, permitiendo probar los endpoints en tiempo real y asegurando que la API sea siempre clara y funcional.


## 3. Stripe Checkout: Seguridad y Conversión
En lugar de procesar pagos internamente, delegamos la transacción a Stripe por los siguientes motivos:

- **Cumplimiento y Seguridad:** Stripe se encarga de toda la seguridad bancaria (PCI Compliance), protegiendo al cliente de riesgos financieros.

- **Tracking de Ads de Alta Precisión:** Stripe permite redirigir al usuario a una página de /gracias personalizada enviando el valor real de la compra. Esto es lo que permite que el Píxel de Meta y Google Ads calculen el ROI exacto de la inversión.

- **Reducción de Fricción:** La interfaz de Stripe está optimizada para dispositivos móviles, facilitando el pago rápido con tarjeta o billeteras digitales.

## Resumen de Beneficios para el Cliente

- **Escalabilidad:** El sistema puede manejar desde 10 hasta 1,000 registros diarios sin cambios en la infraestructura.

- **Medición Total:** El cliente puede ver exactamente cuánto dinero ingresa por cada dólar invertido en publicidad.

- **Automatización de Ventas:** El equipo comercial recibe los datos organizados en Pipedrive automáticamente, eliminando la carga administrativa manual.

## Resumen de Beneficios Técnicos para el Desarrollo

- **Clean Code:** La separación por capas facilita que cualquier desarrollador pueda entender qué hace cada parte del código rápidamente.

- **Seguridad por Diseño:** Desde la validación de formularios hasta el cifrado de tokens, la seguridad es una prioridad transversal, no un parche posterior.
  
- **Listo para Escalar:** La arquitectura está preparada para migrar a bases de datos más complejas (como PostgreSQL) o servicios de nube sin necesidad de reescribir la lógica de negocio.