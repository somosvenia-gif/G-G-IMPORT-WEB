import { create } from 'zustand';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  brand: string;
  category?: string;
  sizes?: string[];
  stock?: number;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  cartId: string; // id único: `${productId}-${size ?? ''}`
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  isCheckoutOpen: boolean;
  addItem: (product: Product, selectedSize?: string, qty?: number) => void;
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

  addItem: (product, selectedSize, qty = 1) => set((state) => {
    const cartId = `${product.id}-${selectedSize ?? ''}`;
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
      items: [...state.items, { ...product, selectedSize, quantity: qty, cartId }],
      isOpen: true,
    };
  }),

  removeItem: (cartId) => set((state) => ({
    items: state.items.filter(i => i.cartId !== cartId),
  })),

  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  closeCart: () => set({ isOpen: false }),

  openCheckout: () => set({ isCheckoutOpen: true, isOpen: false }),
  closeCheckout: () => set({ isCheckoutOpen: false }),

  getTotal: () =>
    get().items.reduce((total, item) => total + item.price * item.quantity, 0),

  clearCart: () => set({ items: [] }),
}));
