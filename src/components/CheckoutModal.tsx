import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { X, Copy, Check, MessageCircle, ChevronRight } from 'lucide-react';
import { useCartStore } from '../store/useCart';

// ─── Payment methods data ────────────────────────────────────────────────────
const PAYMENT_METHODS = [
  { id: 'pagomovil', label: 'Pago Móvil' },
  { id: 'zelle', label: 'Zelle' },
  { id: 'binance', label: 'Binance' },
] as const;

type PaymentMethodId = typeof PAYMENT_METHODS[number]['id'];

const PAYMENT_DETAILS: Record<PaymentMethodId, { label: string; value: string }[]> = {
  pagomovil: [
    { label: 'Teléfono', value: '0424-609-0595' },
    { label: 'C.I.', value: '27.266.054' },
    { label: 'Nombre', value: 'Georgina Ramirez' },
  ],
  zelle: [
    { label: 'WhatsApp', value: 'Consultar al WhatsApp' },
  ],
  binance: [
    { label: 'Email', value: 'georginamilagrosramirez@gmail.com' },
    { label: 'Tipo', value: 'TRC20' },
    { label: 'Nombre', value: 'Georgina Ramirez' },
  ],
};

// ─── WhatsApp message generator ─────────────────────────────────────────────
const WHATSAPP_NUMBER = '584121627012';

function buildWhatsAppURL(
  items: { name: string; price: number; quantity: number }[],
  total: number,
  paymentMethod: string,
) {
  const lines = items.map(
    (i) => `  • ${i.name} x${i.quantity} → $${(i.price * i.quantity).toFixed(2)}`,
  );
  const msg = [
    '¡Hola! Me gustaría confirmar mi pedido de *G&G IMPORT* 🛍️',
    '',
    '📦 *Mi Pedido:*',
    ...lines,
    '',
    `💰 *Total: $${total.toFixed(2)}*`,
    '',
    `💳 *Método de pago:* ${paymentMethod}`,
    '',
    '¡Espero su confirmación. ¡Gracias! 😊',
  ].join('\n');
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

// ─── Copy-to-clipboard helper ────────────────────────────────────────────────
function CopyRow({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <div className="flex items-center justify-between py-3 border-b border-lightGray/10 last:border-0">
      <div>
        <p className="text-xs text-lightGray uppercase tracking-widest">{label}</p>
        <p className="font-medium text-deepBlack mt-0.5 text-sm">{value}</p>
      </div>
      <button
        onClick={copy}
        className="ml-4 p-2 text-lightGray hover:text-neonPink transition-colors flex-shrink-0"
        title="Copiar"
      >
        {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
      </button>
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
export const CheckoutModal = () => {
  const { items, isCheckoutOpen, closeCheckout, getTotal, clearCart } = useCartStore();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodId>('pagomovil');
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const total = getTotal();

  useEffect(() => {
    if (isCheckoutOpen) {
      gsap.to(overlayRef.current, { opacity: 1, pointerEvents: 'auto', duration: 0.3 });
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, y: 40, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'power3.out' },
      );
    } else {
      gsap.to(overlayRef.current, { opacity: 0, pointerEvents: 'none', duration: 0.25 });
      gsap.to(modalRef.current, { opacity: 0, y: 20, duration: 0.25, ease: 'power3.in' });
    }
  }, [isCheckoutOpen]);

  const handleWhatsApp = () => {
    const methodLabel = PAYMENT_METHODS.find(m => m.id === selectedMethod)?.label ?? selectedMethod;
    const url = buildWhatsAppURL(items, total, methodLabel);
    window.open(url, '_blank');
  };

  const handleConfirm = () => {
    handleWhatsApp();
    clearCart();
    closeCheckout();
  };

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={closeCheckout}
        className="fixed inset-0 bg-deepBlack/50 backdrop-blur-sm z-[110] opacity-0 pointer-events-none"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="fixed inset-0 z-[111] flex items-center justify-center p-4 pointer-events-none"
      >
        <div className={`bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col ${isCheckoutOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>

          {/* Header */}
          <div className="flex items-center justify-between px-8 py-6 border-b border-lightGray/10 sticky top-0 bg-white z-10">
            <div>
              <h2 className="font-sans font-bold text-xl text-deepBlack uppercase tracking-wide">
                Confirmar Pedido
              </h2>
              <p className="text-xs text-lightGray mt-0.5">{items.length} {items.length === 1 ? 'artículo' : 'artículos'}</p>
            </div>
            <button onClick={closeCheckout} className="text-lightGray hover:text-deepBlack transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="px-8 py-6 space-y-8">

            {/* Order Summary */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-lightGray mb-4">
                Resumen del Pedido
              </h3>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 object-cover bg-gray-100 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-deepBlack text-sm truncate">{item.name}</p>
                      <p className="text-xs text-lightGray">Cant: {item.quantity}</p>
                    </div>
                    <span className="font-bold text-brandDark text-sm flex-shrink-0">
                      €{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mt-6 pt-4 border-t border-lightGray/10">
                <span className="font-sans font-medium text-deepBlack uppercase tracking-wider text-sm">
                  Total
                </span>
                <span className="font-sans font-black text-3xl text-brandDark">
                  €{total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-lightGray mb-4">
                Método de Pago
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {PAYMENT_METHODS.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`py-3 px-2 text-xs font-bold uppercase tracking-widest border-2 transition-all ${
                      selectedMethod === method.id
                        ? 'border-neonPink bg-neonPink text-white'
                        : 'border-lightGray/20 text-deepBlack hover:border-neonPink'
                    }`}
                  >
                    {method.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Details */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-lightGray mb-4">
                Datos de Pago — {PAYMENT_METHODS.find(m => m.id === selectedMethod)?.label}
              </h3>
              <div className="bg-gray-50 px-6 py-2 rounded-sm">
                {PAYMENT_DETAILS[selectedMethod].map((row) => (
                  <CopyRow key={row.label} label={row.label} value={row.value} />
                ))}
              </div>
              <p className="text-xs text-lightGray mt-3 text-center">
                Toca el icono <Copy size={11} className="inline" /> para copiar cada dato
              </p>
            </div>

            {/* Instructions */}
            <div className="bg-neonPink/5 border border-neonPink/20 px-6 py-4 rounded-sm">
              <p className="text-xs text-deepBlack/80 leading-relaxed">
                <span className="font-bold block mb-1">¿Cómo confirmar?</span>
                1. Realiza el pago con los datos de arriba.<br />
                2. Haz clic en <strong>"Confirmar por WhatsApp"</strong>.<br />
                3. Envíanos el comprobante de pago por el mismo chat.
              </p>
            </div>

            {/* Políticas Esenciales para un Carrito de Compras */}
            <div className="mt-4 bg-white border border-gray-200 p-6 rounded-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider mb-2">Políticas Esenciales para un Carrito de Compras</h3>
              <ul className="list-disc list-inside text-xs space-y-1">
                <li><strong>Términos y Condiciones:</strong> Al finalizar tu compra, aceptas que eres mayor de edad y que los datos proporcionados son correctos. Nos reservamos el derecho de cancelar órdenes por errores de inventario o fallas del sistema. El proceso de compra se formaliza una vez verificado el pago.</li>
                <li><strong>Privacidad y Datos:</strong> Tus datos personales y de pago están 100% protegidos. Solo los utilizamos para procesar tu pedido y mejorar tu experiencia. No compartimos tu información con terceros bajo ningún concepto.</li>
                <li><strong>Envíos y Entregas:</strong> Maracaibo: Entregas mediante delivery en un lapso de 24 a 48 horas hábiles (costo variable según la zona). Nivel Nacional: Envíos cobro en destino (COD) a través de MRW / Zoom / Tealca. El tiempo de entrega final depende de la empresa de encomiendas.</li>
                <li><strong>Cambios y Devoluciones:</strong> Dispones de 7 días continuos tras recibir tu producto para solicitar un cambio, únicamente por defecto de fábrica. El artículo debe estar sin usar y en su empaque original. No realizamos reembolsos en dinero, se emitirá una nota de crédito en la tienda.</li>
                <li><strong>Precios y Métodos de Pago:</strong> Todos los precios publicados están expresados en Moneda, EURO / Bs BCV. Métodos aceptados: Pago Móvil, Zelle, USDT y Efectivo (solo para entregas personales en Maracaibo). El pedido se procesará una vez confirmado el ingreso del dinero.</li>
              </ul>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="px-8 py-6 bg-gray-50 border-t border-lightGray/10 mt-auto sticky bottom-0">
            <button
              onClick={handleConfirm}
              disabled={items.length === 0}
              className="w-full bg-[#25D366] text-white py-5 font-bold uppercase tracking-widest hover:bg-[#1ebe5d] transition-colors disabled:opacity-50 flex items-center justify-center gap-3 shadow-lg shadow-[#25D366]/20"
            >
              <MessageCircle size={20} />
              Confirmar por WhatsApp
              <ChevronRight size={18} />
            </button>
          </div>

        </div>
      </div>
    </>
  );
};
