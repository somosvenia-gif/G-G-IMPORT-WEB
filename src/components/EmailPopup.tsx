import { useState, useEffect, useRef } from 'react';
import { X, Mail, CheckCircle } from 'lucide-react';
import { trackEvent } from '../lib/analytics';

const SHOW_DELAY_MS = 8000;
const SUBSCRIBED_KEY = 'gg_email_subscribed';
const DISMISSED_KEY = 'gg_email_popup_dismissed_at';
const DISMISS_COOLDOWN_DAYS = 7;
const DISCOUNT_CODE = 'BIENVENIDA10';

function encodeForm(data: Record<string, string>) {
  return Object.entries(data)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');
}

export function EmailPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (localStorage.getItem(SUBSCRIBED_KEY)) return;

    const dismissedAt = Number(localStorage.getItem(DISMISSED_KEY) ?? 0);
    const daysSinceDismiss = (Date.now() - dismissedAt) / (1000 * 60 * 60 * 24);
    if (dismissedAt && daysSinceDismiss < DISMISS_COOLDOWN_DAYS) return;

    timerRef.current = setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  const handleClose = () => {
    localStorage.setItem(DISMISSED_KEY, String(Date.now()));
    setVisible(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;

    setStatus('sending');
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodeForm({ 'form-name': 'newsletter', email, 'bot-field': '' }),
      });
      trackEvent('generate_lead', { content_name: 'email_popup' });
      localStorage.setItem(SUBSCRIBED_KEY, 'true');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative bg-white w-full max-w-sm shadow-2xl overflow-hidden">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-lightGray hover:text-deepBlack transition-colors z-10"
        >
          <X size={20} />
        </button>

        {status === 'success' ? (
          <div className="px-8 py-10 flex flex-col items-center text-center gap-3">
            <CheckCircle size={40} className="text-green-500" />
            <h3 className="font-bold text-lg text-deepBlack uppercase tracking-wide">¡Listo!</h3>
            <p className="text-sm text-lightGray">
              Usa el código
              <span className="mx-1.5 font-bold text-brandDark bg-gray-100 px-2 py-0.5">{DISCOUNT_CODE}</span>
              al confirmar tu pedido por WhatsApp para tu 10% de descuento.
            </p>
          </div>
        ) : (
          <>
            <div className="bg-deepBlack text-white px-8 py-6 text-center">
              <Mail size={28} className="mx-auto mb-2 text-neonPink" />
              <h3 className="font-bold text-xl uppercase tracking-wide">10% OFF</h3>
              <p className="text-xs text-white/70 mt-1">en tu primera compra</p>
            </div>
            <form onSubmit={handleSubmit} className="px-8 py-6">
              <p className="text-xs text-lightGray text-center mb-4">
                Déjanos tu correo y entérate primero de nuevos productos y ofertas.
              </p>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-neonPink rounded-sm mb-3"
              />
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-brandDark text-white py-3 font-bold uppercase tracking-widest text-xs hover:bg-neonPink transition-colors disabled:opacity-60"
              >
                {status === 'sending' ? 'Enviando...' : 'Quiero mi descuento'}
              </button>
              {status === 'error' && (
                <p className="text-red-500 text-xs text-center mt-2">Hubo un error, intenta de nuevo.</p>
              )}
              <button
                type="button"
                onClick={handleClose}
                className="w-full text-center text-[10px] text-lightGray hover:underline mt-3"
              >
                No, gracias
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
