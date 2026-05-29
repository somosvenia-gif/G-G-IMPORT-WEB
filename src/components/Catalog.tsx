import { useRef, useMemo, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingBag, SearchX } from 'lucide-react';
import { useCartStore } from '../store/useCart';
import { useUIStore } from '../store/useUI';
import { useProductStore } from '../store/useProducts';
import { CATEGORY_LABELS, DISCOUNTS, type Category, type Product } from '../data/products';
import { ProductDetailModal } from './ProductDetailModal';

gsap.registerPlugin(ScrollTrigger);

const TABS: { id: 'all' | Category; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'swimwear', label: 'Trajes de Baño' },
  { id: 'casual', label: 'Ropa Casual' },
  { id: 'dresses', label: 'Vestidos' },
  { id: 'accessories', label: 'Accesorios' },
];

export const Catalog = () => {
  const ref = useRef<HTMLDivElement>(null);
  const addItem = useCartStore(state => state.addItem);
  const { searchQuery, activeCategory, setActiveCategory } = useUIStore();
  const products = useProductStore(state => state.products);
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);

  // Filter products by category AND search query
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, products]);

  useGSAP(() => {
    gsap.from('.prod-item', {
      opacity: 0,
      y: 40,
      duration: 1,
      stagger: 0.08,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
      },
    });
  }, { scope: ref, dependencies: [] });

  // Animated section title
  const sectionTitle =
    searchQuery.trim() !== ''
      ? `Resultados: "${searchQuery}"`
      : CATEGORY_LABELS[activeCategory];

  return (
    <>
    <section className="w-full bg-bgLight py-24 px-6 border-t border-lightGray/10" id="catalog">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="flex flex-col items-center mb-12 relative">
          <div className="w-64 h-[2px] bg-brandDark/20 absolute top-1/2 -z-10" />
          <h2 className="font-sans font-normal text-4xl lg:text-5xl uppercase text-brandDark tracking-wider bg-bgLight px-8 text-center">
            {sectionTitle}
          </h2>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-all border ${
                activeCategory === tab.id
                  ? 'bg-brandDark text-white border-brandDark'
                  : 'bg-white text-deepBlack border-lightGray/20 hover:border-brandDark hover:bg-brandDark hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-lightGray gap-4">
            <SearchX size={48} strokeWidth={1.5} className="text-lightGray/40" />
            <p className="font-sans text-sm font-medium">
              No encontramos productos para tu búsqueda.
            </p>
            <button
              onClick={() => useUIStore.getState().resetFilters()}
              className="mt-2 px-6 py-2 border border-brandDark text-brandDark hover:bg-brandDark hover:text-white transition-colors text-xs uppercase tracking-widest font-bold"
            >
              Ver todos los productos
            </button>
          </div>
        ) : (
          <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="prod-item group flex flex-col relative bg-white shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                {/* Image & Discount Badge */}
                <div
                  className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100 cursor-pointer"
                  onClick={() => setDetailProduct(p)}
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Discount Badge */}
                  <div className="absolute top-4 left-4 bg-neonPink text-white font-bold text-xs px-2 py-1 shadow-sm">
                    {DISCOUNTS[p.id] ?? '-10% OFF'}
                  </div>

                  {/* Stock badge */}
                  {p.stock !== undefined && p.stock <= 5 && p.stock > 0 && (
                    <div className="absolute top-4 right-4 bg-amber-500 text-white font-bold text-[10px] px-2 py-1 shadow-sm">
                      ¡Últimas {p.stock}!
                    </div>
                  )}
                  {p.stock === 0 && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="text-white font-bold text-sm uppercase tracking-widest">Agotado</span>
                    </div>
                  )}

                  {/* Ver detalle overlay */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                    <span className="bg-white text-deepBlack text-[10px] font-bold uppercase tracking-widest px-4 py-2 shadow">
                      Ver detalle
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="flex flex-col items-center p-6 text-center">
                  <h3 className="font-sans text-xs text-lightGray uppercase tracking-widest mb-2">
                    {p.brand}
                  </h3>
                  <p className="font-sans font-medium text-deepBlack text-lg mb-2 line-clamp-1">
                    {p.name}
                  </p>
                  <div className="flex gap-3 items-center mb-4">
                    <span className="font-sans font-bold text-brandDark text-xl">€{p.price}</span>
                    <span className="font-sans text-lightGray text-sm line-through">
                      €{(p.price * 1.25).toFixed(0)}
                    </span>
                  </div>
                  <button
                    onClick={() => p.sizes?.length ? setDetailProduct(p) : addItem(p)}
                    disabled={p.stock === 0}
                    className="w-full bg-brandDark hover:bg-neonPink disabled:bg-gray-200 disabled:text-gray-400 text-white text-xs font-bold uppercase tracking-widest py-3 flex items-center justify-center gap-2 transition-colors"
                  >
                    <ShoppingBag size={14} />
                    {p.stock === 0 ? 'Agotado' : p.sizes?.length ? 'Elegir talla' : 'Agregar al carrito'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Product count */}
        {filteredProducts.length > 0 && (
          <p className="text-center text-xs text-lightGray uppercase tracking-widest mt-12">
            Mostrando {filteredProducts.length} de {products.length} productos
          </p>
        )}
      </div>
    </section>

    <ProductDetailModal product={detailProduct} onClose={() => setDetailProduct(null)} />
    </>
  );
};
