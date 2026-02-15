import React from 'react'

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
  <div className="flex gap-5 justify-center md:justify-start">
    {/* Instagram */}
    <a href="#" className="hover:text-pink-500 transition-colors" aria-label="Instagram" title='Instagram'>
      <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M12 0C8.74 0 8.333.015 7.053.072 4.526.188 3.123 1.586 3.007 4.113 2.95 5.393 2.936 5.803 2.936 9.06s.015 3.667.072 4.947c.116 2.525 1.517 3.927 4.043 4.043 1.28.057 1.69.072 4.948.072s3.668-.015 4.948-.072c2.525-.116 3.927-1.517 4.043-4.043.057-1.28.072-1.69.072-4.948s-.015-3.668-.072-4.948c-.116-2.525-1.517-3.927-4.043-4.043C15.667.015 15.257 0 12 0zm0 2.16c3.203 0 3.58.016 4.85.074 2.353.108 3.122.882 3.23 3.233.058 1.27.073 1.647.073 4.853s-.015 3.583-.074 4.85c-.108 2.352-.882 3.122-3.233 3.23-1.27.058-1.647.073-4.853.073s-3.583-.015-4.85-.074c-2.352-.108-3.122-.882-3.23-3.233-.058-1.27-.073-1.647-.073-4.853s.015-3.583.074-4.85c.108-2.352.882-3.122 3.233-3.23 1.27-.058 1.647-.073 4.853-.073zm0 3.678a3.162 3.162 0 100 6.324 3.162 3.162 0 000-6.324zM12 10a1.838 1.838 0 110 3.676 1.838 1.838 0 010-3.676zm5.338-3.057a.66.66 0 110 1.32.66.66 0 010-1.32z"/>
      </svg>
    </a>
    
    {/* Facebook */}
    <a href="#" className="hover:text-blue-500 transition-colors" aria-label="Facebook" title='Facebook'>
      <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    </a>
  </div>
);

export default SocialIcons


