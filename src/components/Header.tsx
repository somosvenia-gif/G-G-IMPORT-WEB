import { useState, useRef, useEffect } from 'react';
import { Search, ShoppingCart, ChevronDown } from 'lucide-react';
import { useCartStore } from '../store/useCart';
import { useUIStore } from '../store/useUI';
import type { Category } from '../data/products';
import { InstagramIcon, FacebookIcon, TiktokIcon } from './icons/SocialIcons';

const CATEGORIES: { id: 'all' | Category; label: string }[] = [
  { id: 'all', label: 'Todos los Productos' },
  { id: 'swimwear', label: 'Trajes de Baño' },
  { id: 'casual', label: 'Ropa Casual' },
  { id: 'dresses', label: 'Vestidos' },
  { id: 'accessories', label: 'Accesorios' },
];

const scrollToCatalog = () => {
  document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
};

export const Header = () => {
  const cartItemsCount = useCartStore(
    state => state.items.reduce((acc, item) => acc + item.quantity, 0),
  );
  const toggleCart = useCartStore(state => state.toggleCart);
  const { searchQuery, setSearchQuery, setActiveCategory } = useUIStore();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleCategorySelect = (id: 'all' | Category) => {
    setActiveCategory(id);
    setDropdownOpen(false);
    scrollToCatalog();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // Auto-scroll to catalog when user types
    if (e.target.value.length === 1) {
      scrollToCatalog();
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') scrollToCatalog();
  };

  return (
    <header className="w-full bg-deepBlack sticky top-0 z-[90] px-4 md:px-8 py-4 border-b border-lightGray/20 shadow-sm">
      <div className="w-full flex items-center justify-between gap-4 lg:gap-8">

        {/* 1. Logo */}
        <div className="flex-shrink-0 mr-4">
          <img
            src="/logo-light.png"
            alt="G&G IMPORT"
            className="h-16 lg:h-20 w-auto object-contain"
          />
        </div>

        {/* 2. Navigation Buttons */}
        <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
          {/* All products */}
          <button
            onClick={() => { setActiveCategory('all'); setSearchQuery(''); scrollToCatalog(); }}
            className="bg-white text-deepBlack px-6 py-2.5 text-xs font-bold tracking-widest hover:bg-neonPink hover:text-white transition-colors shadow-sm rounded-sm whitespace-nowrap"
          >
            TODOS LOS PRODUCTOS
          </button>

          {/* Category dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(prev => !prev)}
              className="bg-white text-deepBlack px-6 py-2.5 text-xs font-bold tracking-widest flex items-center gap-2 hover:bg-neonPink hover:text-white transition-colors shadow-sm rounded-sm whitespace-nowrap"
            >
              CATEGORÍA <ChevronDown size={12} className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-52 bg-white shadow-xl z-[200] border border-lightGray/10">
                {CATEGORIES.slice(1).map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    className="w-full text-left px-5 py-3 text-xs font-bold tracking-widest text-deepBlack hover:bg-neonPink hover:text-white transition-colors uppercase"
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 3. Search Bar */}
        <div className="hidden md:flex flex-1 max-w-xl relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
            placeholder="Busque productos aquí..."
            className="w-full bg-white border border-transparent text-deepBlack px-4 py-2.5 text-sm focus:outline-none focus:border-neonPink transition-colors placeholder:text-deepBlack/50 rounded-sm shadow-inner"
          />
          <button
            onClick={scrollToCatalog}
            className="absolute right-0 top-0 h-full px-4 flex items-center text-deepBlack/60 hover:text-neonPink transition-colors"
          >
            <Search size={16} />
          </button>
        </div>

        {/* Mobile Spacer */}
        <div className="md:hidden flex-1" />

        {/* 4. Social & Cart */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="hidden lg:flex items-center gap-3 mr-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:bg-neonPink hover:border-neonPink hover:text-white transition-all text-white"
            >
              <InstagramIcon size={14} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:bg-neonPink hover:border-neonPink hover:text-white transition-all text-white"
            >
              <FacebookIcon size={14} />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:bg-neonPink hover:border-neonPink hover:text-white transition-all text-white"
            >
              <TiktokIcon size={14} />
            </a>
          </div>

          {/* Cart Icon */}
          <button
            onClick={toggleCart}
            className="w-12 h-10 bg-white text-deepBlack flex items-center justify-center relative hover:bg-neonPink hover:text-white transition-colors shadow-lg rounded-sm cursor-pointer"
          >
            <ShoppingCart size={18} />
            {cartItemsCount > 0 && (
              <div className="absolute -top-2 -left-2 w-5 h-5 bg-neonPink text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-md border border-white">
                {cartItemsCount}
              </div>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
