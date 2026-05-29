import { useEffect, useRef } from 'react';
import { useCartStore } from '../store/useCart';
import { X, ArrowRight, Trash2, Tag } from 'lucide-react';
import { gsap } from 'gsap';

export const Cart = () => {
  const { items, isOpen, closeCart, removeItem, getTotal, openCheckout } = useCartStore();
  const cartRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(overlayRef.current, { opacity: 1, pointerEvents: 'auto', duration: 0.3 });
      gsap.to(cartRef.current, { x: '0%', duration: 0.5, ease: 'power3.out' });
    } else {
      gsap.to(overlayRef.current, { opacity: 0, pointerEvents: 'none', duration: 0.3 });
      gsap.to(cartRef.current, { x: '100%', duration: 0.4, ease: 'power3.in' });
    }
  }, [isOpen]);

  return (
    <>
      <div
        ref={overlayRef}
        onClick={closeCart}
        className="fixed inset-0 bg-deepBlack/40 backdrop-blur-sm z-[100] opacity-0 pointer-events-none"
      />

      <div
        ref={cartRef}
        className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white shadow-2xl z-[101] translate-x-full flex flex-col pt-8"
      >
        <div className="flex items-center justify-between px-8 pb-6 border-b border-lightGray/10">
          <h2 className="font-sans font-bold text-xl text-deepBlack uppercase tracking-wide">
            Tu Carrito ({items.length})
          </h2>
          <button onClick={closeCart} className="text-lightGray hover:text-deepBlack transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-lightGray gap-4">
              <span className="text-4xl text-lightGray/50">🛒</span>
              <p className="font-sans text-sm font-medium">No hay productos en tu carrito.</p>
              <button
                onClick={closeCart}
                className="mt-4 px-6 py-2 border border-brandDark text-brandDark hover:bg-brandDark hover:text-white transition-colors text-sm uppercase tracking-widest font-bold"
              >
                Seguir Comprando
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.cartId} className="flex gap-4 group pb-6 border-b border-lightGray/10">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-28 object-cover bg-gray-100 flex-shrink-0"
                />
                <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
                  <div>
                    <h3 className="font-sans font-bold text-deepBlack leading-tight truncate">{item.name}</h3>
                    <p className="font-sans text-xs text-lightGray mt-0.5 uppercase tracking-widest">{item.brand}</p>
                    {item.selectedSize && (
                      <div className="flex items-center gap-1 mt-1.5">
                        <Tag size={10} className="text-lightGray" />
                        <span className="text-[10px] font-bold text-deepBlack uppercase tracking-widest bg-gray-100 px-1.5 py-0.5">
                          Talla {item.selectedSize}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between items-end mt-2">
                    <div>
                      <span className="font-sans font-bold text-brandDark">
                        €{(item.price * item.quantity).toFixed(2)}
                      </span>
                      <span className="text-xs text-lightGray font-normal ml-1">× {item.quantity}</span>
                    </div>
                    <button
                      onClick={() => removeItem(item.cartId)}
                      className="text-lightGray hover:text-neonPink transition-colors p-2 -mr-2"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="px-8 py-8 bg-gray-50 border-t border-lightGray/10 mt-auto">
          <div className="flex justify-between items-end mb-6">
            <span className="font-sans font-medium text-deepBlack uppercase tracking-wider">Subtotal</span>
            <span className="font-sans font-bold text-3xl text-brandDark">€${getTotal().toFixed(2)}</span>
          </div>
          <button
            onClick={openCheckout}
            disabled={items.length === 0}
            className="w-full bg-brandDark text-white py-5 font-bold uppercase tracking-widest hover:bg-neonPink transition-colors disabled:opacity-50 disabled:hover:bg-brandDark flex items-center justify-center gap-2"
          >
            Finalizar Compra <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </>
  );
};
