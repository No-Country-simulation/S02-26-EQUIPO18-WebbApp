plataforma_ecommerce: Landing page de conversión para servicios de incorporación legal en EE. UU.

├── app/              <-- SOLO RUTAS (Páginas y Layouts)
|   ├── api/checkout/
|   |   └── route.ts
│   ├── cookies/
│   ├── gracias/
│   ├── privacidad/
│   ├── reembolsos/
│   ├── terminos/
│   ├── layout.tsx
│   └── page.tsx
├── components/       <-- COMPONENTES VISUALES (Botones, Cards, Forms)
│   ├── ui/
|   |   └── CustomImage.tsx
│   ├── CookieBanner.tsx
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
│   ├── TrackingScripts.tsx
│   ├── TrustSeals.tsx
│   └── WhatsAppButton.tsx
└── context/          
│   └── ConsentContext.tsx
├── lib/              <-- LÓGICA Y UTILIDADES (Zod, Config de Pipedrive)
│   ├── schema.ts
│   └── constants.ts
├── types/             <-- MOLDES DE DATOS (Interfaces)
│   ├── checkout.ts
│   └── index.ts
└── public/           <-- IMÁGENES Y LOGOS
│   └── images/