import { ShieldCheck, Lock, CreditCard, Scale } from "lucide-react"; // Usando Lucide para iconos limpios

export default function TrustSeals() {
  return (
    <div className="mt-6 p-4 border border-slate-100 bg-slate-50/50 rounded-xl">
      <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold text-center mb-4">
        Transacción 100% Segura
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
        
        <div className="flex flex-col items-center gap-1">
          <Lock className="w-5 h-5 text-green-600" />
          <span className="text-[10px] font-medium text-slate-600 text-center">SSL Encrypted</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <CreditCard className="w-5 h-5 text-blue-600" />
          <span className="text-[10px] font-medium text-slate-600 text-center">Stripe Verified</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <Scale className="w-5 h-5 text-amber-600" />
          <span className="text-[10px] font-medium text-slate-600 text-center">IRS Authorized</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <ShieldCheck className="w-5 h-5 text-indigo-600" />
          <span className="text-[10px] font-medium text-slate-600 text-center">Privacy Compliant</span>
        </div>

      </div>
    </div>
  );
}
