import { create } from 'zustand';
import type { Category } from '../data/products';

type ActiveCategory = 'all' | Category;

interface UIStore {
  searchQuery: string;
  activeCategory: ActiveCategory;
  setSearchQuery: (q: string) => void;
  setActiveCategory: (cat: ActiveCategory) => void;
  resetFilters: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  searchQuery: '',
  activeCategory: 'all',
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setActiveCategory: (activeCategory) => set({ activeCategory }),
  resetFilters: () => set({ searchQuery: '', activeCategory: 'all' }),
}));
