import { SiInstagram, SiFacebook } from "react-icons/si";

{/**
    Este componente es opcional, y si el cliente decide usarlo se recomienda colocarlo en el footer
    solamente y de forma discreta. 
    Nunca importar este componente en el menú superior (Header), porque estaríamos invitando al usuario
    a irse antes de ver los planes.

    CONSEJO: Las redes sociales son un arma de doble filo en una Landing Page de servicios legales o 
    corporativos. 

    1. PROS: El Impacto en la Confianza
    Validación de "Empresa Viva": Ver que una marca publica contenido recientemente en Instagram o 
            Facebook elimina el miedo del usuario a que la web sea una "estafa" o esté abandonada.

    Prueba Social Indirecta: Si el usuario entra a Instagram y ve comentarios de otros clientes o 
            fotos de las oficinas, la barrera de desconfianza cae inmediatamente.

    Humanización: Las redes permiten mostrar al equipo detrás de Total Incorporation, lo cual es 
            vital cuando pedimos pagos de $499 o $899.

    2. CONTRAS: El Peligro: "Puntos de Fuga"
    Distracción: El objetivo de LA Landing es que el usuario pague en Stripe. Si hace clic en el 
            icono de Instagram, se va a una plataforma diseñada para retener su atención con memes
            y videos, y es muy probable que no regrese a completar el formulario.

    Redes Abandonadas: Si el cliente no publica nada desde hace 6 meses, genera el efecto contrario:
            desconfianza total.
    */}

const SocialIcons = () => (

  //Con lucide-react 
    //   <div className="flex gap-5 justify-center md:justify-start items-center">
    //       {/* Instagram */}
    //       <a 
    //         href="#" 
    //         className="hover:text-pink-500 transition-colors" 
    //         aria-label="Instagram" 
    //         title="Instagram"
    //       >
    //         <Instagram className="w-6 h-6" />
    //       </a>
          
    //       {/* Facebook */}
    //       <a 
    //         href="#" 
    //         className="hover:text-blue-600 transition-colors" 
    //         aria-label="Facebook" 
    //         title="Facebook"
    //       >
    //         <Facebook className="w-6 h-6" />
    //       </a>
    // </div>

  //Con react-icons
      <div className="flex gap-5 justify-center md:justify-start items-center">
        <a href="#" className="hover:text-pink-500 transition-colors" aria-label="Instagram">
          <SiInstagram size={24} />
        </a>
        
        <a href="#" className="hover:text-blue-600 transition-colors" aria-label="Facebook">
          <SiFacebook size={24} />
        </a>
      </div>
);

export default SocialIcons


