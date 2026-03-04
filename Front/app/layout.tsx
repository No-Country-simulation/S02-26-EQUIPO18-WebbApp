import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/authContext";
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
        <ConsentProvider>
          <AuthProvider>
            <TrackingScripts />
            <Toaster position="top-right" />
            {children}
            <CookieBanner />
          </AuthProvider>
        </ConsentProvider>
      </body>
    </html>
  );
}
