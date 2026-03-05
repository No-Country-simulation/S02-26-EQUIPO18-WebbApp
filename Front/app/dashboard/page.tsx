"use client";

import { useEffect, useState } from "react";
import { DollarSign, ShoppingCart, Users, TrendingUp } from "lucide-react";
import Link from "next/link";

interface OrderSummary {
  id: number;
  date: string;
  priceTotal: number;
  status: string;
  statusLabel: string;
  businessName: string;
  ownerEmail: string;
  planName: string;
}

const STATUS_COLORS: Record<string, string> = {
  PENDIENTE: "bg-yellow-100 text-yellow-800",
  PAGADO: "bg-green-100 text-green-800",
  CANCELADO: "bg-red-100 text-red-800",
  FACTURADO: "bg-blue-100 text-blue-800",
  EN_TRANSITO: "bg-purple-100 text-purple-800",
  ENTREGADO: "bg-emerald-100 text-emerald-800",
  RECHAZADO: "bg-red-200 text-red-900",
};

export default function DashboardPage() {
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando órdenes:", err);
        setLoading(false);
      });
  }, []);

  const totalRevenue = orders
    .filter((o) => o.status === "PAGADO" || o.status === "ENTREGADO")
    .reduce((sum, o) => sum + (o.priceTotal || 0), 0);

  const pendingCount = orders.filter((o) => o.status === "PENDIENTE").length;
  const paidCount = orders.filter(
    (o) => o.status === "PAGADO" || o.status === "ENTREGADO"
  ).length;

  const cards = [
    {
      title: "Ingresos Totales",
      value: `$${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-green-600 bg-green-50",
    },
    {
      title: "Total Ordenes",
      value: orders.length,
      icon: ShoppingCart,
      color: "text-blue-600 bg-blue-50",
    },
    {
      title: "Pagos Completados",
      value: paidCount,
      icon: TrendingUp,
      color: "text-emerald-600 bg-emerald-50",
    },
    {
      title: "Pendientes",
      value: pendingCount,
      icon: Users,
      color: "text-yellow-600 bg-yellow-50",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard</h1>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-500">
                {card.title}
              </span>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${card.color}`}>
                <card.icon size={20} />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {loading ? "..." : card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">
            Órdenes Recientes
          </h2>
          <Link
            href="/dashboard/pagos"
            className="text-sm text-blue-600 hover:underline"
          >
            Ver todas →
          </Link>
        </div>

        {loading ? (
          <div className="p-12 text-center text-gray-400">Cargando...</div>
        ) : orders.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            No hay órdenes registradas aún.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-gray-500 uppercase tracking-wider border-b border-gray-100">
                  <th className="px-6 py-3">ID</th>
                  <th className="px-6 py-3">Empresa</th>
                  <th className="px-6 py-3">Plan</th>
                  <th className="px-6 py-3">Monto</th>
                  <th className="px-6 py-3">Estado</th>
                  <th className="px-6 py-3">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 10).map((order) => (
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
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {order.businessName || "—"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {order.planName || "—"}
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
                        {order.statusLabel || order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {order.date
                        ? new Date(order.date).toLocaleDateString("es-ES")
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
