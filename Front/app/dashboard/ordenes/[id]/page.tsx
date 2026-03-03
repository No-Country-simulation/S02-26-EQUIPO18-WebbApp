"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

interface OrderDetail {
  id: number;
  date: string;
  priceTotal: number;
  status: string;
  statusLabel: string;
  planId: string;
  planName: string;
  businessName: string;
  businessActivity: string;
  businessType: string;
  businessState: string;
  ownerName: string;
  ownerLastName: string;
  ownerEmail: string;
  ownerPhone: string;
  stripeSessionId: string;
}

const ALL_STATUSES = [
  { value: "PENDIENTE", label: "Pendiente de aprobación", code: 0 },
  { value: "PAGADO", label: "Pago aceptado", code: 1 },
  { value: "CANCELADO", label: "Pedido cancelado", code: 2 },
  { value: "FACTURADO", label: "Facturado", code: 3 },
  { value: "PENDIENTE_ENVIO", label: "Pendiente de envío", code: 4 },
  { value: "DISTRIBUCION_INTERNA", label: "Listo para distribución interna", code: 5 },
  { value: "LISTO_ENVIAR", label: "Listo para enviar", code: 6 },
  { value: "EN_TRANSITO", label: "En tránsito", code: 7 },
  { value: "LISTO_RECOJO", label: "Listo para recojo", code: 8 },
  { value: "ENTREGADO", label: "Entregado", code: 9 },
  { value: "ANULADO", label: "Anulación de operación", code: 10 },
  { value: "RECHAZADO", label: "Rechazado", code: 11 },
];

const STATUS_COLORS: Record<string, string> = {
  PENDIENTE: "bg-yellow-100 text-yellow-800",
  PAGADO: "bg-green-100 text-green-800",
  CANCELADO: "bg-red-100 text-red-800",
  FACTURADO: "bg-blue-100 text-blue-800",
  PENDIENTE_ENVIO: "bg-orange-100 text-orange-800",
  DISTRIBUCION_INTERNA: "bg-indigo-100 text-indigo-800",
  LISTO_ENVIAR: "bg-cyan-100 text-cyan-800",
  EN_TRANSITO: "bg-purple-100 text-purple-800",
  LISTO_RECOJO: "bg-teal-100 text-teal-800",
  ENTREGADO: "bg-emerald-100 text-emerald-800",
  ANULADO: "bg-gray-100 text-gray-800",
  RECHAZADO: "bg-red-200 text-red-900",
};

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;

  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/orders/${orderId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        setOrder(data);
        setSelectedStatus(data.status || "");
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        toast.error("Orden no encontrada");
      });
  }, [orderId]);

  const handleSaveStatus = async () => {
    if (!selectedStatus || selectedStatus === order?.status) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: selectedStatus }),
      });
      if (!res.ok) throw new Error("Error updating");
      const updated = await res.json();
      setOrder(updated);
      toast.success("Estado actualizado correctamente");
    } catch {
      toast.error("Error al actualizar el estado");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 mb-4">Orden #{orderId} no encontrada.</p>
        <Link href="/dashboard/pagos" className="text-blue-600 hover:underline">
          ← Volver a pagos
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orden #{order.id}</h1>
          <p className="text-sm text-gray-500">
            {order.date
              ? new Date(order.date).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "Sin fecha"}
          </p>
        </div>
        <span
          className={`ml-auto px-3 py-1.5 text-sm font-semibold rounded-full ${
            STATUS_COLORS[order.status] || "bg-gray-100 text-gray-800"
          }`}
        >
          {order.statusLabel || order.status}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT: Product / Plan info + Status Update */}
        <div className="space-y-6">
          {/* Plan Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Producto / Plan</h2>
            <div className="space-y-3">
              <InfoRow label="Plan" value={order.planName || order.planId} />
              <InfoRow label="Plan ID" value={order.planId} mono />
              <InfoRow label="Monto Total" value={`$${order.priceTotal} USD`} bold />
              {order.stripeSessionId && (
                <InfoRow label="Stripe Session" value={order.stripeSessionId} mono />
              )}
            </div>
          </div>

          {/* Status Update */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Actualizar Estado</h2>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg text-sm text-gray-900 mb-4"
            >
              {ALL_STATUSES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.code} - {s.label}
                </option>
              ))}
            </select>
            <button
              onClick={handleSaveStatus}
              disabled={saving || selectedStatus === order.status}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Guardando...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Guardar Cambios
                </>
              )}
            </button>
          </div>
        </div>

        {/* RIGHT: Customer / Business info */}
        <div className="space-y-6">
          {/* Owner Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Datos del Cliente</h2>
            <div className="space-y-3">
              <InfoRow label="Nombre" value={`${order.ownerName || ""} ${order.ownerLastName || ""}`} />
              <InfoRow label="Email" value={order.ownerEmail} />
              <InfoRow label="Teléfono" value={order.ownerPhone} />
            </div>
          </div>

          {/* Business Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Datos de la Empresa</h2>
            <div className="space-y-3">
              <InfoRow label="Nombre Empresa" value={order.businessName} />
              <InfoRow label="Actividad" value={order.businessActivity} />
              <InfoRow label="Tipo" value={order.businessType} />
              <InfoRow label="Estado (USA)" value={order.businessState} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  label,
  value,
  mono = false,
  bold = false,
}: {
  label: string;
  value?: string | null;
  mono?: boolean;
  bold?: boolean;
}) {
  return (
    <div className="flex justify-between items-start">
      <span className="text-sm text-gray-500">{label}</span>
      <span
        className={`text-sm text-right max-w-[60%] break-all ${
          mono ? "font-mono text-xs" : ""
        } ${bold ? "font-bold text-gray-900" : "text-gray-800"}`}
      >
        {value || "—"}
      </span>
    </div>
  );
}
