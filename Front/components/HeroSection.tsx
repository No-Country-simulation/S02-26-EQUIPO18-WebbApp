import HeroImage from './HeroImage'
import TrustLogos from './TrustLogos'

const HeroSection = () => {
  return (
    <section className="bg-white py-20 px-4 border-b border-gray-100">
        <div className="max-w-6xl mx-auto text-center">

          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            Impulsa tu negocio con <span className="text-blue-600">Total Incorporation</span>
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Registramos tu empresa en Estados Unidos de forma rápida, segura y 100% online. 
            Sin complicaciones burocráticas.
          </p>
          
          {/* Logos de Confianza / Seguridad */}
           <TrustLogos/> 
          {/* Imagen de Impacto */}
            <HeroImage /> 
        </div>
    </section>
  )
}

export default HeroSection
