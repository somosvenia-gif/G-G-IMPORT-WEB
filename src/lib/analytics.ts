// Carga Google Analytics (GA4) y Meta Pixel solo si sus IDs están configurados
// como variables de entorno en Netlify (VITE_GA_MEASUREMENT_ID, VITE_META_PIXEL_ID).
// Si no están configurados, no hace nada — no rompe nada en local ni antes de tenerlos.

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID as string | undefined;

type Fbq = ((...args: unknown[]) => void) & { callMethod?: (...args: unknown[]) => void; queue?: unknown[]; loaded?: boolean; version?: string };

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    fbq?: Fbq;
    _fbq?: unknown;
  }
}

let initialized = false;

export function initAnalytics() {
  if (initialized) return;
  initialized = true;

  if (GA_ID) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);
  }

  if (META_PIXEL_ID) {
    (function (f: Window, b: Document, e: string, v: string) {
      if (f.fbq) return;
      const n: Fbq = Object.assign(
        (...args: unknown[]) => {
          if (n.callMethod) n.callMethod(...args);
          else n.queue!.push(args);
        },
        { queue: [] as unknown[], loaded: true, version: '2.0' },
      );
      f.fbq = n;
      f._fbq = n;
      const t = b.createElement(e) as HTMLScriptElement;
      t.async = true;
      t.src = v;
      const s = b.getElementsByTagName(e)[0];
      s.parentNode?.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

    window.fbq?.('init', META_PIXEL_ID);
    window.fbq?.('track', 'PageView');
  }
}

type AnalyticsEvent = 'view_item' | 'add_to_cart' | 'begin_checkout' | 'generate_lead' | 'contact';

// Mapea el nombre de evento GA4 al equivalente estándar de Meta Pixel.
const META_EVENT_MAP: Record<AnalyticsEvent, string> = {
  view_item: 'ViewContent',
  add_to_cart: 'AddToCart',
  begin_checkout: 'InitiateCheckout',
  generate_lead: 'Lead',
  contact: 'Contact',
};

export function trackEvent(name: AnalyticsEvent, params?: Record<string, unknown>) {
  if (GA_ID && window.gtag) window.gtag('event', name, params);
  if (META_PIXEL_ID && window.fbq) window.fbq('track', META_EVENT_MAP[name], params);
}
