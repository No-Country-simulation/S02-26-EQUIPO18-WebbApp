import SocialIcons from "@/components/SocialIcons";
import { MapPin, Mail } from "lucide-react"; 
import Link from "next/link";
import CustomImage from "./ui/CustomImage";

const Footer = () => {
  return (
<footer className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-gray-800 pb-12">
          
          {/* Columna 1: Marca */}
          <div className="text-center md:text-left">
            <div className="h-26 w-full items-center justify-center flex mb-4">
              <CustomImage 
                src="/images/logos/logoTInc.png" 
                alt="(TI) Logo"  
                className="object-contain object-center" 
                containerClass="relative h-24 w-25"/>
            </div>
            <h3 className="text-2xl text-center font-bold text-blue-400 mb-4">Total Incorporation</h3>
            <p className="text-gray-400 text-center text-sm">
              Expertos en registro de LLC y servicios corporativos en Estados Unidos para emprendedores globales.
            </p>
          </div>

          {/* Columna 2: Contacto & Dirección */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h4 className="font-bold text-lg mb-2">Contactos</h4>
            <div className="flex items-start gap-3 text-gray-400 text-sm">
              <MapPin className="text-blue-500 shrink-0" size={20} />
              <p>
                16192 Coastal Highway,<br />
                Lewes, Delaware 19958,<br />
                United States
              </p>
            </div>
            <div className="flex items-center gap-3 text-gray-400 text-sm">
              <Mail className="text-blue-500" size={20} />
              <p>soporte@totalincorporation.com</p>
            </div>
            <SocialIcons/>
          </div>

          {/* Columna 3: Horario, Confianza y Legal */}
          <div className="text-center md:text-right flex flex-col items-center md:items-end">
            <h4 className="font-bold text-lg mb-2">Información</h4>
            <p className="text-gray-400 text-sm">Lunes a Viernes: 9:00 AM - 6:00 PM (EST)</p>
            
            {/* Enlaces Legales: Estratégicos para ADS */}
            <nav className="mt-4 flex flex-col gap-2 text-xs text-gray-500">
                <Link href="/terminos" className="hover:text-blue-400 transition-colors">
                Términos y Condiciones
                </Link>
                <Link href="/privacidad" className="hover:text-blue-400 transition-colors">
                Política de Privacidad
                </Link>
            </nav>

            <div className="mt-6 flex justify-center md:justify-end gap-2">
                <div className="bg-gray-800 px-3 py-1 rounded text-xs font-mono text-gray-400 border border-gray-700">
                SECURE PAYMENT STRIPE
                </div>
            </div>
            
            <p className="text-[10px] text-gray-600 mt-4 italic max-w-50">
                Disclaimer: No somos una firma de abogados ni proporcionamos asesoría legal.
            </p>
          </div>
          
        </div>

        <div className="text-center pt-8 text-gray-500 text-xs">
          © {new Date().getFullYear()} Total Incorporation. Registered Agent Service.
        </div>
      </footer>
  )
}

export default Footer
