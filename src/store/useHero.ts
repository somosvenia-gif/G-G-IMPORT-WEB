import { create } from 'zustand';
import { heroImages as defaultImages, type HeroImage } from '../data/heroImages';

interface HeroStore {
  images: HeroImage[];
  setImages: (images: HeroImage[]) => void;
  addImage: (img: HeroImage) => void;
  removeImage: (id: string) => void;
}

// Sin persist: heroImages.ts es la fuente de verdad permanente.
export const useHeroStore = create<HeroStore>()((set) => ({
  images: defaultImages,

  setImages: (images) => set({ images }),

  addImage: (img) =>
    set((state) => ({ images: [...state.images, img] })),

  removeImage: (id) =>
    set((state) => ({ images: state.images.filter((i) => i.id !== id) })),
}));
