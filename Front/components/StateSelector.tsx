"use client";

import { USAState } from "@/types";
import { USA_STATES_INFO } from "@/lib/constants";

// Definimos que el componente recibe el estado seleccionado 
// y una función para cambiarlo. Es nuestro contrato de comunicación
interface StateSelectorProps {
  selectedState: string;
  onSelect: (state: USAState["id"]) => void;//utilizamos nuestro tipo para hacerlo más seguro
}

export default function StateSelector({ selectedState, onSelect }: StateSelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {USA_STATES_INFO.map((state) => (
        <button
          key={state.id}
          type="button" // Evita que el formulario se envíe al hacer clic
          onClick={() => onSelect(state.id)}
          className={`relative p-4 text-left border-2 rounded-xl transition-all duration-200 ${
            selectedState === state.id
              ? "border-blue-600 bg-blue-50 ring-2 ring-blue-100"
              : "border-gray-100 hover:border-blue-200 bg-white"
          }`}
        >
          {state.tag && (
            <span className="absolute top-2 right-2 text-[10px] font-bold uppercase px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
              {state.tag}
            </span>
          )}
          <h4 className="font-bold text-gray-900">{state.label}</h4>
          <p className="text-xs text-gray-500 mt-1">{state.info}</p>
        </button>
      ))}
    </div>
  );
}