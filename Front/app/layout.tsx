import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ConsentProvider } from "@/context/ConsentContext";
import TrackingScripts from "@/components/TrackingScripts";
import CookieBanner from "@/components/CookieBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Total Incorporation",
  description: "Registro de empresas en EE. UU.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //const googleTagId = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID;
  // const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  return (
    <html lang="es">

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConsentProvider>{/*Envolvemos el contenido con el proveedor de consentimiento para gestionar las preferencias de cookies y seguimiento*/}
          <TrackingScripts />{/*Este componente se encargará de cargar los scripts de seguimiento (Google Tag Manager, Meta Pixel, etc.) sólo si el usuario ha dado su consentimiento*/}
          {children}
          <CookieBanner />{/*Banner que se muestra a los usuarios para solicitar su consentimiento para el uso de cookies y seguimiento. Este componente actualizará el estado de consentimiento en el contexto, lo que a su vez controlará la carga de los scripts de seguimiento.*/}
        </ConsentProvider>
      </body>
    </html>
  );
}
