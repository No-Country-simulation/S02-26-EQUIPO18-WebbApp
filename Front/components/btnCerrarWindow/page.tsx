"use client";


import { X } from 'lucide-react'



const BtnCloseWindow = () => {
  return (
        
        <div className="mb-8"  onClick={()=>window.close()}>
            <button className="cursor-pointer inline-flex items-start gap-1 text-m font-medium text-blue-600 hover:text-blue-800 transition-colors"><X size={20} /> CERRAR</button> 
        </div>   
  )
}

export default BtnCloseWindow
