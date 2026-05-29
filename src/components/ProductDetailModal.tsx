import { useState, useEffect } from 'react';
import { X, ShoppingBag, Share2, Send, MessageCircle, Link, Minus, Plus } from 'lucide-react';
import { useCartStore } from '../store/useCart';
import type { Product } from '../data/products';

interface Props {
  product: Product | null;
  onClose: () => void;
}

const WHATSAPP_NUMBER = '584121627012';

function buildBuyNowURL(product: Product, size: string | null, qty: number) {
  const sizeStr = size ? ` — Talla: ${size}` : '';
  const msg = [
    `¡Hola! Quiero comprar este producto de *G&G IMPORT* 🛍️`,
    ``,
    `👗 *${product.name}*${sizeStr}`,
    `🔢 Cantidad: ${qty}`,
    `💰 Total: $${(product.price * qty).toFixed(2)}`,
    ``,
    `¡Espero su confirmación! 😊`,
  ].join('\n');
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

function ShareButton({ icon: Icon, label, onClick }: { icon: any; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      title={label}
      className="w-9 h-9 rounded-full border border-lightGray/30 flex items-center justify-center hover:border-brandDark hover:text-brandDark text-lightGray transition-all"
    >
      <Icon size={14} />
    </button>
  );
}

export function ProductDetailModal({ product, onClose }: Props) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [copied, setCopied] = useState(false);
  const addItem = useCartStore(s => s.addItem);


  // Resetear estado cuando cambia el producto
  useEffect(() => {
    setSelectedSize(null);
    setQty(1);
    setCopied(false);
  }, [product?.id]);

  // Cerrar con Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!product) return null;

  const hasSizes = product.sizes && product.sizes.length > 0;
  const canAdd = !hasSizes || selectedSize !== null;
  const isOutOfStock = product.stock === 0;
  const maxQty = product.stock ?? 99;

  const handleAdd = () => {
    if (!canAdd || isOutOfStock) return;
    addItem(product, selectedSize ?? undefined, qty);
    onClose();
  };

  const handleBuyNow = () => {
    if (!canAdd || isOutOfStock) return;
    window.open(buildBuyNowURL(product, selectedSize, qty), '_blank');
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `Mira este producto en G&G IMPORT: ${product.name}`;
    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(text + '\n' + url)}`, '_blank');
    }
  };

  const discount = Math.round(((product.price * 1.25 - product.price) / (product.price * 1.25)) * 100);

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-4xl max-h-[92vh] flex flex-col md:flex-row shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* ── Columna izquierda: imagen ─────────────────────────── */}
        <div className="relative w-full md:w-[42%] flex-shrink-0 bg-gray-50 min-h-[240px] md:min-h-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover max-h-[44vh] md:max-h-full"
            onError={e => { (e.currentTarget as HTMLImageElement).src = 'https://placehold.co/400x500/f5f5f5/999?text=Imagen'; }}
          />
          {/* Badge descuento */}
          <div className="absolute top-4 left-4 bg-neonPink text-white text-xs font-bold px-2 py-1 shadow">
            -{discount}% OFF
          </div>
          {/* Botón cerrar mobile */}
          <button
            onClick={onClose}
            className="md:hidden absolute top-4 right-4 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow text-deepBlack"
          >
            <X size={16} />
          </button>
        </div>

        {/* ── Columna derecha: info ─────────────────────────────── */}
        <div className="flex-1 overflow-y-auto flex flex-col">
          {/* Header info */}
          <div className="px-8 pt-8 pb-0 relative">
            {/* Cerrar desktop */}
            <button
              onClick={onClose}
              className="hidden md:flex absolute top-5 right-5 text-lightGray hover:text-deepBlack transition-colors"
            >
              <X size={20} />
            </button>

            {/* Marca / SKU */}
            <p className="text-[10px] text-lightGray uppercase tracking-[0.2em] mb-2">
              {product.brand} · SKU: {product.id.replace('custom-', '').substring(0, 10)}
            </p>

            {/* Nombre */}
            <h2 className="font-sans font-bold text-2xl md:text-3xl text-deepBlack uppercase tracking-wide leading-tight mb-4">
              {product.name}
            </h2>

            {/* Precio */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-3xl font-bold text-brandDark">${product.price}</span>
              <span className="text-sm text-lightGray line-through">${(product.price * 1.25).toFixed(0)}</span>
            </div>

            {/* Stock */}
            {product.stock !== undefined && (
              <p className={`text-xs font-bold uppercase tracking-widest mb-4 ${
                isOutOfStock ? 'text-red-500' : product.stock <= 5 ? 'text-amber-500' : 'text-green-600'
              }`}>
                {isOutOfStock
                  ? '✕ Agotado'
                  : product.stock <= 5
                    ? `⚠ Solo ${product.stock} disponibles`
                    : `✓ ${product.stock} unidades disponibles`}
              </p>
            )}
          </div>

          {/* Tallas */}
          {hasSizes && (
            <div className="px-8 pt-4 pb-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-lightGray mb-3">Talla</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes!.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(s => s === size ? null : size)}
                    className={`min-w-[44px] h-11 px-2 border text-xs font-bold uppercase tracking-widest transition-all ${
                      selectedSize === size
                        ? 'bg-brandDark text-white border-brandDark'
                        : 'bg-white text-deepBlack border-lightGray/30 hover:border-brandDark hover:text-brandDark'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {!selectedSize && (
                <p className="text-[10px] text-neonPink mt-2 font-medium">
                  ↑ Selecciona una talla para continuar
                </p>
              )}
            </div>
          )}

          {/* Cantidad */}
          <div className="px-8 pt-6 pb-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-lightGray mb-3">Cantidad</p>
            <div className="flex items-center border border-lightGray/30 w-fit">
              <button
                onClick={() => setQty(q => Math.max(1, q - 1))}
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 text-deepBlack transition-colors"
              >
                <Minus size={14} />
              </button>
              <span className="w-12 text-center text-sm font-bold text-deepBlack select-none">
                {qty}
              </span>
              <button
                onClick={() => setQty(q => Math.min(maxQty, q + 1))}
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 text-deepBlack transition-colors"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="px-8 pt-6 pb-0 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAdd}
              disabled={!canAdd || isOutOfStock}
              className="flex-1 bg-brandDark hover:bg-neonPink disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white py-4 text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag size={15} /> Agregar al carrito
            </button>
            <button
              onClick={handleBuyNow}
              disabled={!canAdd || isOutOfStock}
              className="flex-1 border-2 border-brandDark text-brandDark hover:bg-brandDark hover:text-white disabled:border-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed py-4 text-xs font-bold uppercase tracking-widest transition-colors"
            >
              Comprar ahora
            </button>
          </div>

          {/* Compartir */}
          <div className="px-8 pt-6 pb-8 mt-auto">
            <div className="border-t border-lightGray/10 pt-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-lightGray mb-3">
                Compartir este producto
              </p>
              <div className="flex gap-2 items-center">
                <ShareButton icon={Share2} label="Facebook" onClick={() => handleShare('facebook')} />
                <ShareButton icon={Send} label="X / Twitter" onClick={() => handleShare('twitter')} />
                <ShareButton icon={MessageCircle} label="WhatsApp" onClick={() => handleShare('whatsapp')} />
                <button
                  onClick={() => handleShare('copy')}
                  title="Copiar enlace"
                  className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all text-xs font-bold ${
                    copied
                      ? 'border-green-400 text-green-600 bg-green-50'
                      : 'border-lightGray/30 text-lightGray hover:border-brandDark hover:text-brandDark'
                  }`}
                >
                  {copied ? '✓' : <Link size={14} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
