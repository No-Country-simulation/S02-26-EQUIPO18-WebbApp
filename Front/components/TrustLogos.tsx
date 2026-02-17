import React from 'react'
import CustomImage from './ui/CustomImage'
// import Image from 'next/image' // Usamos Image directo para evitar el recorte del wrapper

const TrustLogos = () => {
  return (
    <section className="flex flex-wrap justify-center items-center gap-8 md:gap-12 py-8 opacity-70 grayscale">
      
      {/* Logo Stripe */}
      <div className="relative h-12 md:h-10 w-24 hover:grayscale-0 transition-all duration-500">
        <CustomImage 
          src="/images/logos/stripe.png" 
          alt="Stripe" 
          className="object-contain object-center"
          containerClass="relative h-full w-full"
        />
      </div>

      <div className="h-6 w-px bg-gray-300 hidden md:block"></div>

      {/* Logo IRS */}
      <div className="relative h-10 md:h-10 w-28 hover:grayscale-0 transition-all duration-500">
        <CustomImage 
          src="/images/logos/IRS.png" 
          alt="IRS" 
          className="object-contain object-center" 
          containerClass="relative h-full w-full"
        />
      </div>

      <div className="h-6 w-px bg-gray-300 hidden md:block"></div>

      {/* Logo SSL Secure */}
      <div className="relative h-12 md:h-12 w-24 hover:grayscale-0 transition-all duration-500">
        <CustomImage 
          src="/images/logos/SSL.png" 
          alt="SSL Secure" 
          className="object-contain object-center " 
          containerClass="relative h-full w-full"
        />
      </div>

    </section>
  )
}

export default TrustLogos