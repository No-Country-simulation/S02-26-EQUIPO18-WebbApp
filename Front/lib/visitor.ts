/**
 * Visitor Tracking Utility
 * 
 * Genera un visitor_uid unico por navegador y lo persiste en localStorage.
 * Envia eventos de interaccion al backend para analisis.
 */

const VISITOR_UID_KEY = "ti_visitor_uid";
const VISITOR_SESSION_KEY = "ti_session_id";

/** Genera un UUID v4 simple */
function generateUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/** Obtiene o crea el visitor_uid persistente */
export function getVisitorUID(): string {
  if (typeof window === "undefined") return "";
  let uid = localStorage.getItem(VISITOR_UID_KEY);
  if (!uid) {
    uid = generateUID();
    localStorage.setItem(VISITOR_UID_KEY, uid);
  }
  return uid;
}

/** Obtiene o crea un session_id (por tab/sesion) */
export function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let sid = sessionStorage.getItem(VISITOR_SESSION_KEY);
  if (!sid) {
    sid = generateUID();
    sessionStorage.setItem(VISITOR_SESSION_KEY, sid);
  }
  return sid;
}

/** Tipos de eventos que rastreamos */
export type TrackingEvent =
  | "page_view"
  | "navbar_click"
  | "plan_view"
  | "plan_select"
  | "form_start"
  | "form_step_1"
  | "form_step_2"
  | "form_step_3"
  | "form_submit"
  | "checkout_redirect"
  | "faq_open"
  | "whatsapp_click"
  | "contact_page"
  | "scroll_50"
  | "scroll_100";

interface TrackingPayload {
  visitor_uid: string;
  session_id: string;
  event: TrackingEvent;
  page: string;
  referrer: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  extra?: Record<string, string>;
}

/** Envia un evento de tracking al backend */
export async function trackEvent(
  event: TrackingEvent,
  extra?: Record<string, string>
): Promise<void> {
  try {
    const url = new URL(window.location.href);
    const payload: TrackingPayload = {
      visitor_uid: getVisitorUID(),
      session_id: getSessionId(),
      event,
      page: url.pathname,
      referrer: document.referrer || "",
      utm_source: url.searchParams.get("utm_source") || "",
      utm_medium: url.searchParams.get("utm_medium") || "",
      utm_campaign: url.searchParams.get("utm_campaign") || "",
      extra,
    };

    // Fire-and-forget: no bloqueamos la UI
    const backendUrl = process.env.NEXT_PUBLIC_TRACKING_URL || "/api/track";
    const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
    if (typeof navigator.sendBeacon === "function") {
      navigator.sendBeacon(backendUrl, blob);
    } else {
      fetch(backendUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      });
    }
  } catch {
    // Tracking nunca debe romper la experiencia del usuario
  }
}
