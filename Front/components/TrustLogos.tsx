import React from 'react'

const TrustLogos = () => {
  return (
        <section className="flex flex-wrap justify-center items-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all">
            
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-gray-800 italic">Stripe</span>
              <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">Verified</span>
            </div>

            <div className="h-8 w-px bg-gray-300 hidden md:block"></div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-gray-800 uppercase">IRS</span>
              <span className="text-xs font-semibold text-gray-500">Authorized</span>
            </div>

            <div className="h-8 w-px bg-gray-300 hidden md:block"></div>
            <div className="text-gray-800 font-bold">SSL Secure 🔒</div>
        </section>
  )
}

export default TrustLogos
