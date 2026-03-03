"use client";

import { useEffect, useState, useMemo } from "react";
import { Globe, MousePointerClick, Eye, BarChart3 } from "lucide-react";

interface VisitorEvent {
  id: number;
  visitorUid: string;
  sessionId: string;
  event: string;
  page: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  ipAddress: string;
  createdAt: string;
}

export default function VisitantesPage() {
  const [events, setEvents] = useState<VisitorEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/visitors")
      .then((res) => res.json())
      .then((data) => {
        setEvents(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const stats = useMemo(() => {
    const uniqueVisitors = new Set(events.map((e) => e.visitorUid)).size;
    const uniqueSessions = new Set(events.map((e) => e.sessionId)).size;
    const totalEvents = events.length;

    // Events by type
    const byType: Record<string, number> = {};
    events.forEach((e) => {
      byType[e.event] = (byType[e.event] || 0) + 1;
    });

    // Top campaigns
    const byCampaign: Record<string, number> = {};
    events.forEach((e) => {
      if (e.utmCampaign) {
        byCampaign[e.utmCampaign] = (byCampaign[e.utmCampaign] || 0) + 1;
      }
    });

    // Top sources
    const bySource: Record<string, number> = {};
    events.forEach((e) => {
      if (e.utmSource) {
        bySource[e.utmSource] = (bySource[e.utmSource] || 0) + 1;
      }
    });

    // Form funnel
    const formStarts = events.filter((e) => e.event === "form_start").length;
    const formStep2 = events.filter((e) => e.event === "form_step_2").length;
    const formStep3 = events.filter((e) => e.event === "form_step_3").length;
    const formSubmits = events.filter((e) => e.event === "form_submit").length;

    return {
      uniqueVisitors,
      uniqueSessions,
      totalEvents,
      byType,
      byCampaign,
      bySource,
      funnel: { formStarts, formStep2, formStep3, formSubmits },
    };
  }, [events]);

  const sortedByType = Object.entries(stats.byType)
    .sort(([, a], [, b]) => b - a);

  const sortedByCampaign = Object.entries(stats.byCampaign)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);

  const sortedBySource = Object.entries(stats.bySource)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);

  const cards = [
    { title: "Visitantes Únicos", value: stats.uniqueVisitors, icon: Globe, color: "text-blue-600 bg-blue-50" },
    { title: "Sesiones", value: stats.uniqueSessions, icon: Eye, color: "text-purple-600 bg-purple-50" },
    { title: "Total Eventos", value: stats.totalEvents, icon: MousePointerClick, color: "text-green-600 bg-green-50" },
    { title: "Formularios Iniciados", value: stats.funnel.formStarts, icon: BarChart3, color: "text-orange-600 bg-orange-50" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Analítica de Visitantes</h1>
      <p className="text-sm text-gray-500 mb-6">
        Interacciones de usuarios con la página, formularios y productos.
      </p>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card) => (
          <div key={card.title} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-500">{card.title}</span>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Form Funnel */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Embudo del Formulario</h2>
          {loading ? (
            <div className="text-gray-400 text-center py-8">Cargando...</div>
          ) : (
            <div className="space-y-3">
              {[
                { label: "Iniciaron formulario", value: stats.funnel.formStarts, color: "bg-blue-500" },
                { label: "Paso 2 (Empresa)", value: stats.funnel.formStep2, color: "bg-indigo-500" },
                { label: "Paso 3 (Confirmación)", value: stats.funnel.formStep3, color: "bg-purple-500" },
                { label: "Enviaron (checkout)", value: stats.funnel.formSubmits, color: "bg-green-500" },
              ].map((step) => {
                const maxVal = Math.max(stats.funnel.formStarts, 1);
                const pct = Math.round((step.value / maxVal) * 100);
                return (
                  <div key={step.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{step.label}</span>
                      <span className="font-semibold text-gray-900">{step.value} ({pct}%)</span>
                    </div>
                    <div className="w-full bg-gray-100 h-3 rounded-full">
                      <div
                        className={`h-3 rounded-full ${step.color} transition-all duration-500`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Events by Type */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Eventos por Tipo</h2>
          {loading ? (
            <div className="text-gray-400 text-center py-8">Cargando...</div>
          ) : sortedByType.length === 0 ? (
            <div className="text-gray-400 text-center py-8">Sin datos</div>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {sortedByType.map(([type, count]) => (
                <div key={type} className="flex justify-between items-center py-1.5 px-2 rounded hover:bg-gray-50">
                  <span className="text-sm text-gray-700 font-mono">{type}</span>
                  <span className="text-sm font-bold text-gray-900">{count}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Campaigns */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Campañas (UTM)</h2>
          {sortedByCampaign.length === 0 ? (
            <div className="text-gray-400 text-center py-8">Sin datos de campañas</div>
          ) : (
            <div className="space-y-2">
              {sortedByCampaign.map(([campaign, count]) => (
                <div key={campaign} className="flex justify-between items-center py-1.5 px-2 rounded hover:bg-gray-50">
                  <span className="text-sm text-gray-700">{campaign || "(directo)"}</span>
                  <span className="text-sm font-bold text-gray-900">{count}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top Sources */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Fuentes de Tráfico</h2>
          {sortedBySource.length === 0 ? (
            <div className="text-gray-400 text-center py-8">Sin datos de fuentes</div>
          ) : (
            <div className="space-y-2">
              {sortedBySource.map(([source, count]) => (
                <div key={source} className="flex justify-between items-center py-1.5 px-2 rounded hover:bg-gray-50">
                  <span className="text-sm text-gray-700">{source || "(directo)"}</span>
                  <span className="text-sm font-bold text-gray-900">{count}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
