/**
 * Este componente se encarga de inyectar 
 * los scripts solo si hasConsent es verdadero.
 */

"use client";
import Script from "next/script";
import { useConsent } from "@/context/ConsentContext";

export default function TrackingScripts() {
  
  const googleTagId = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID;
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const { hasConsent } = useConsent();
  // Si el usuario no ha aceptado el banner, no renderizamos nada (cumplimiento legal)
  if (!hasConsent) return null;

  return (
    <>
           {/* Meta Pixel Base Code */}
            <Script id="fb-pixel" strategy="afterInteractive"> {/**strategy="afterInteractive":hace que el Píxel cargue justo después de que la página sea interactiva, para no ralentizar la velocidad de carga */}
              {`
                !function(f,b,e,v,n,t,s) 
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${metaPixelId}'); 
                fbq('track', 'PageView');
              `}

            </Script>
       {/* Google Tag (gtag.js) */}
            {googleTagId && (
              <>
                <Script
                  src={`https://www.googletagmanager.com/gtag/js?id=${googleTagId}`} //Descarga la librería principal de Google desde sus servidores usando el ID del cliente.
                  strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive"> {/**strategy="afterInteractive: El script sólo se carga después que el usuario pueda hacer clic en botones*/}
                  {`
                    window.dataLayer = window.dataLayer || []; 
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${googleTagId}');
                  `}

                </Script>
              </>
            )}   
    </>
  );
}