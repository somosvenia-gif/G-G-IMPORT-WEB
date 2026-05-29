import { create } from 'zustand';
import { products as defaultProducts, type Product, type Category } from '../data/products';

export type { Product, Category };

interface ProductStore {
  products: Product[];
  addProduct: (data: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Omit<Product, 'id'>>) => void;
  deleteProduct: (id: string) => void;
  resetToDefaults: () => void;
}

// Sin persist: products.ts es la fuente de verdad permanente.
// Cada cambio se guarda en el archivo via /api/save-products.
export const useProductStore = create<ProductStore>()((set) => ({
  products: defaultProducts,

  addProduct: (data) =>
    set((state) => ({
      products: [
        ...state.products,
        { ...data, id: `custom-${Date.now()}` },
      ],
    })),

  updateProduct: (id, updates) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      ),
    })),

  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    })),

  resetToDefaults: () => set({ products: defaultProducts }),
}));
