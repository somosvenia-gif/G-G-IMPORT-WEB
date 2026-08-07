import { create } from 'zustand';
import { trackEvent } from '../lib/analytics';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  brand: string;
  category?: string;
  sizes?: string[];
  colors?: string[];
  stock?: number;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  cartId: string; // id único: `${productId}-${size ?? ''}-${color ?? ''}`
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  isCheckoutOpen: boolean;
  addItem: (product: Product, selectedSize?: string, selectedColor?: string, qty?: number) => void;
  removeItem: (cartId: string) => void;
  toggleCart: () => void;
  closeCart: () => void;
  openCheckout: () => void;
  closeCheckout: () => void;
  getTotal: () => number;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,
  isCheckoutOpen: false,

  addItem: (product, selectedSize, selectedColor, qty = 1) => set((state) => {
    trackEvent('add_to_cart', {
      content_name: product.name,
      value: product.price * qty,
      currency: 'USD',
    });
    const cartId = `${product.id}-${selectedSize ?? ''}-${selectedColor ?? ''}`;
    const existing = state.items.find(i => i.cartId === cartId);
    if (existing) {
      return {
        items: state.items.map(i =>
          i.cartId === cartId ? { ...i, quantity: i.quantity + qty } : i
        ),
        isOpen: true,
      };
    }
    return {
      items: [...state.items, { ...product, selectedSize, selectedColor, quantity: qty, cartId }],
      isOpen: true,
    };
  }),

  removeItem: (cartId) => set((state) => ({
    items: state.items.filter(i => i.cartId !== cartId),
  })),

  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  closeCart: () => set({ isOpen: false }),

  openCheckout: () => set((state) => {
    trackEvent('begin_checkout', {
      value: state.items.reduce((total, item) => total + item.price * item.quantity, 0),
      currency: 'USD',
    });
    return { isCheckoutOpen: true, isOpen: false };
  }),
  closeCheckout: () => set({ isCheckoutOpen: false }),

  getTotal: () =>
    get().items.reduce((total, item) => total + item.price * item.quantity, 0),

  clearCart: () => set({ items: [] }),
}));
