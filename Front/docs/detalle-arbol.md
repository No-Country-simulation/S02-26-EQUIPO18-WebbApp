plataforma_ecommerce: Landing page de conversión para servicios de incorporación legal en EE. UU.

├── app/              <-- SOLO RUTAS (Páginas y Layouts)
|   ├── api/checkout/
|   |   └── route.ts
│   ├── gracias/
│   ├── privacidad/
│   ├── terminos/
│   ├── layout.tsx
│   └── page.tsx
├── components/       <-- COMPONENTES VISUALES (Botones, Cards, Forms)
│   ├── ui/
|   |   └── CustomImage.tsx
│   ├── FAQSection.tsx
│   ├── Footer.tsx
│   ├── HeroImage.tsx
│   ├── HeroSection.tsx
│   ├── HowItWorks.tsx
│   ├── MultiStepForm.tsx
│   ├── PricingSection.tsx
│   ├── ProductMockup.tsx
│   ├── RegistrationSection.tsx
│   ├── ServiceCard.tsx
│   ├── SocialIcons.tsx
│   ├── StateSelector.tsx
│   ├── TrustLogos.tsx
│   └── WhatsAppButton.tsx
├── lib/              <-- LÓGICA Y UTILIDADES (Zod, Config de Pipedrive)
│   ├── schema.ts
│   └── constants.ts
├── types/             <-- MOLDES DE DATOS (Interfaces)
│   ├── checkout.ts
│   └── index.ts
└── public/           <-- IMÁGENES Y LOGOS
│   └── images/