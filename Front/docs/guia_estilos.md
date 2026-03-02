# Guía de Estilos y decisiones de diseño (UX/UI)

El diseño de la interfaz ha sido desarrollado bajo un concepto de "Autoridad Confiable". Dado que el servicio implica trámites legales y financieros en EE. UU., la estética huye de lo puramente decorativo para centrarse en la claridad y el prestigio.

## 1. Paleta de Colores

- **Azul Marino Corporativo:** Utilizado como color base en componentes estructurales. Transmite estabilidad, seriedad y profesionalismo legal.

- **Azul de Acción (bg-blue-600):** Reservado exclusivamente para los Call to Action (CTA) y elementos de interacción principal. Guía al usuario hacia el siguiente paso del embudo.

- **Verde de Éxito (bg-green-600):** Utilizado para confirmaciones de pago y estados positivos. Proyecta seguridad y "vía libre".

- **Escala de Grises Sofisticada:** Los fondos y textos secundarios utilizan grises neutros para mantener un alto contraste y facilitar la lectura (Accesibilidad WCAG).

## 2. Estrategia de Imágenes y Tangibilidad

Como el producto final es un servicio digital/legal, se implementó una estrategia de "Tangibilidad Visual":

- **Product Mockups:** Uso de composiciones que muestran carpetas físicas, tablets y documentos. Esto ayuda al cerebro del usuario a asignar un valor físico al gasto realizado.

- **Iconografía 3D:** Se han seleccionado iconos con profundidad y sombras suaves para las secciones de procesos (How It Works), modernizando la percepción de la marca frente a la competencia tradicional.

## 3. Elementos de Prueba Social (Social Proof)

- **Logos de Confianza:** La sección de TrustLogos presenta identidades de entidades reconocidas (IRS, Stripe, SSL).

- **Tratamiento Visual:** Se presentan inicialmente en escala de grises (grayscale) para no saturar visualmente al usuario, activándose a color en el hover. Esto indica que son "certificaciones" más que simples adornos.

## 4. Tipografía y Jerarquía

- **Headers (Sans-Serif Bold):** Títulos grandes y directos que eliminan la ambigüedad. El uso de (font-black) en los títulos principales refuerza la seguridad del mensaje.

- **Microcopy:** Textos breves en formularios para reducir la carga cognitiva durante el registro.

## 5. Diseño Responsivo (Mobile First)

Todos los componentes han sido optimizados para la navegación móvil:

- **Target Táctil:** Botones con una altura mínima de 48px para facilitar el clic en pantallas pequeñas.

- **Carga Optimizada:** Uso del componente CustomImage para servir formatos WebP, garantizando que la alta calidad visual no penalice la velocidad de carga (Core Web Vitals).