# Documentación de Decisiones de Diseño UX/UI
**Proyecto:** Optimización de Conversión E-commerce - Gestión Empresarial.

**Objetivo:** Maximizar el ROI de campañas de Ads mediante la reducción de fricción y el aumento de la confianza del usuario.



## 1. Estrategia de Flujo y Navegación

**Formulario Multi-step (Pasos Incrementales)**
  - **Decisión:** Dividir la recolección de datos en 3 etapas claras (Datos Personales, Datos de Empresa, Confirmación).
  - **Por qué:** Un formulario largo de un solo vistazo genera "fatiga cognitiva" y abandono. Al segmentarlo, el usuario siente que las tareas son pequeñas y manejables.
  - **Efecto:** Reduce la tasa de rebote inicial y aumenta el compromiso del usuario a medida que avanza.

**Ubicación en la misma Página (Single Page Flow)**

  - **Decisión:** El formulario aparece dinámicamente en la misma página de aterrizaje (Landing Page) al seleccionar un plan.
  - **Por qué:** Evitar saltos de página innecesarios mantiene al usuario en el "túnel de conversión". Cada segundo de carga en una página nueva es una oportunidad para que el usuario se distraiga o se vaya.
  - **UX Recommendation:** Implementamos un desplazamiento suave (scrollIntoView) hacia el formulario para orientar visualmente al usuario sin desorientarlo con cambios bruscos de contexto.


## 2. Elementos de Motivación y Confianza

**Barra de Progreso Dinámica**
- **Decisión:** Inclusión de una barra visual en la parte superior del formulario.
- **Por qué:** Aplica el principio de "Carga Cognitiva". El usuario necesita saber cuánto esfuerzo le falta para terminar. Ver que "solo faltan 2 pasos" activa el deseo psicológico de completar la tarea iniciada.

**Visualización de Estados (Cards Informativas)**
- **Decisión:** Presentar los estados (Wyoming, Delaware, etc.) en tarjetas visuales con sus beneficios específicos.
- **Por qué:** En lugar de un simple menú desplegable aburrido, las cards ayudan al usuario a tomar una decisión informada rápidamente sin salir del formulario para investigar en Google.

**Micro-copy de Reducción de Ansiedad**
- **Decisión:** Agregar notas como "No te preocupes, verificaremos la disponibilidad por ti".
- **Por qué:** El miedo a elegir un nombre ya ocupado es un punto de fricción común. Este texto actúa como un "balm" (bálsamo) que elimina la duda y permite al usuario seguir avanzando con confianza.


## 3. Identidad Visual y Psicología del Color

**Gama Cromática: Azul y Verde**
- **Decisión:** Uso de Azul Profesional para la estructura y Verde para la acción final.
- **Por qué:**
    - **Azul:** Transmite autoridad, seguridad y confianza (esencial para servicios financieros/legales).
    - **Verde (Botón de Pago):** Es el color universal de "Siga" y éxito. Destaca sobre el resto del diseño para indicar claramente el siguiente paso.

**Sellos de Seguridad y Feedback Visual**
- **Decisión:** Inclusión de iconos de candados y logotipos de "Pagos Seguros por Stripe".
- **Por qué:** El usuario está entregando datos sensibles. La presencia visual de Stripe reduce el miedo al fraude, transfiriendo la confianza de una marca global a nuestro sitio.


## 4. Optimización Técnica para Conversión (Ads & Performance)

**Diseño Responsive-First**
- **Decisión:** Interfaz optimizada para móviles con botones grandes (tap-friendly) y entradas de texto simplificadas.
- **Por qué:** La mayoría del tráfico de Ads (Meta/Google) proviene de dispositivos móviles. Una experiencia lenta o difícil de usar en móvil destruye la inversión en publicidad.

**Página de Gracias y Tracking Dinámico**
- **Decisión:** Redirección a /gracias tras el pago exitoso, enviando el valor real de la conversión al Píxel.
- **Por qué:** Es el requerimiento técnico para que los algoritmos de Meta y Google optimicen las campañas. Al reportar el valor exacto (ej. $499), el cliente puede medir el Retorno de Inversión (ROI) con precisión quirúrgica.