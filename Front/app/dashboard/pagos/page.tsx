"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Filter } from "lucide-react";

interface Order {
  id: number;
  date: string;
  priceTotal: number;
  status: string;
  statusLabel: string;
  planId: string;
  planName: string;
  businessName: string;
  ownerEmail: string;
  ownerName: string;
  ownerLastName: string;
  stripeSessionId: string;
}

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

const ALL_STATUSES = [
  "PENDIENTE", "PAGADO", "CANCELADO", "FACTURADO", "PENDIENTE_ENVIO",
  "DISTRIBUCION_INTERNA", "LISTO_ENVIAR", "EN_TRANSITO", "LISTO_RECOJO",
  "ENTREGADO", "ANULADO", "RECHAZADO",
];

export default function PagosPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = orders.filter((o) => {
    const matchesSearch =
      search === "" ||
      o.businessName?.toLowerCase().includes(search.toLowerCase()) ||
      o.ownerEmail?.toLowerCase().includes(search.toLowerCase()) ||
      String(o.id).includes(search);
    const matchesStatus = statusFilter === "ALL" || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalFiltered = filtered.reduce((s, o) => s + (o.priceTotal || 0), 0);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Pagos</h1>
      <p className="text-sm text-gray-500 mb-6">
        Gestiona todas las órdenes y sus estados de pago.
      </p>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Buscar por empresa, email o ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="pl-10 pr-8 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 appearance-none cursor-pointer"
          >
            <option value="ALL">Todos los estados</option>
            {ALL_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s.replace(/_/g, " ")}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Summary Bar */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg px-6 py-3 mb-6 flex justify-between items-center">
        <span className="text-sm text-blue-800">
          {filtered.length} orden{filtered.length !== 1 ? "es" : ""} encontrada
          {filtered.length !== 1 ? "s" : ""}
        </span>
        <span className="text-sm font-bold text-blue-900">
          Total: ${totalFiltered.toLocaleString()} USD
        </span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
        {loading ? (
          <div className="p-12 text-center text-gray-400">Cargando órdenes...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            No se encontraron órdenes con los filtros aplicados.
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-500 uppercase tracking-wider border-b border-gray-100">
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Fecha</th>
                <th className="px-6 py-3">Empresa</th>
                <th className="px-6 py-3">Cliente</th>
                <th className="px-6 py-3">Plan</th>
                <th className="px-6 py-3">Monto</th>
                <th className="px-6 py-3">Estado</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm">
                    <Link
                      href={`/dashboard/ordenes/${order.id}`}
                      className="text-blue-600 hover:underline font-mono"
                    >
                      #{order.id}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {order.date
                      ? new Date(order.date).toLocaleDateString("es-ES", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "—"}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {order.businessName || "—"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div>{order.ownerName} {order.ownerLastName}</div>
                    <div className="text-xs text-gray-400">{order.ownerEmail}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {order.planName || order.planId || "—"}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                    ${order.priceTotal || 0}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full ${
                        STATUS_COLORS[order.status] || "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.statusLabel || order.status?.replace(/_/g, " ")}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
