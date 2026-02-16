import React from 'react'

const HowItWorks = () => {
  return (
        <section className="py-20 px-4 max-w-6xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900">Tu empresa lista en 3 simples pasos</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mb-4">1</div>
                    <h3 className="font-bold text-xl mb-2 text-gray-800">Elige tu Plan</h3>
                    <p className="text-gray-600">Selecciona el paquete que mejor se adapte a tus objetivos comerciales.</p>
                </div>

                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mb-4">2</div>
                    <h3 className="font-bold text-xl mb-2 text-gray-800">Completa tus Datos</h3>
                    <p className="text-gray-600">Dinos el nombre de tu empresa y la información básica de registro.</p>
                </div>

                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold mb-4">3</div>
                    <h3 className="font-bold text-xl mb-2 text-gray-800">Pago y Firma</h3>
                    <p className="text-gray-600">Paga de forma segura vía Stripe y firma tus documentos legalmente.</p>
                </div>
            </div>
        </section>
  )
}

export default HowItWorks
