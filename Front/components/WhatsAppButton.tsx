import { MessageCircle } from "lucide-react";
import { trackEvent } from "@/lib/visitor";

const WhatsAppButton = () => {
  return (
    <a
        href="https://wa.me/1234567890?text=Hola!%20Me%20gustaría%20saber%20más%20sobre%20los%20planes%20de%20incorporación."
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("whatsapp_click")}
        className="fixed h-15 bottom-4 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all hover:scale-110 flex items-center justify-center group"
        aria-label="Contacto por WhatsApp"
      >
        <MessageCircle size={30} fill="currentColor" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-500 font-bold">
          ¿Dudas? Chatea con nosotros
        </span>
    </a>
  )
}

export default WhatsAppButton
