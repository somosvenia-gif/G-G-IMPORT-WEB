import { useCartStore } from '../store/useCart';

interface FooterProps {
  onAdminClick: () => void;
}

export const Footer = ({ onAdminClick }: FooterProps) => {
  const openCheckout = useCartStore(state => state.openCheckout);
  const items = useCartStore(state => state.items);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#2A2526] py-16 px-6 text-white border-t-4 border-neonPink">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">

        {/* Logo — bigger */}
        <div className="mb-8">
          <img
            src="/logo-light.png"
            alt="G&G IMPORT"
            className="h-28 md:h-36 w-auto object-contain block mx-auto"
          />
        </div>

        <p className="font-sans text-white/50 text-sm max-w-sm mb-12">
          La mejor selección de piezas de moda. El estándar de la importación inteligente.
        </p>

        <div className="flex gap-8 font-sans font-medium text-sm text-white/80 uppercase tracking-widest">
          <button onClick={() => scrollTo('catalog')} className="hover:text-neonPink transition-colors">
            Catálogo
          </button>
          <a href="#" className="hover:text-neonPink transition-colors">Nosotros</a>
          <button
            onClick={() => { if (items.length > 0) openCheckout(); else scrollTo('catalog'); }}
            className="hover:text-neonPink transition-colors"
          >
            Soporte
          </button>
        </div>

        <div className="w-full h-[1px] bg-white/10 my-10" />

        <div className="flex items-center justify-between w-full">
          <p className="font-sans text-xs text-white/30">
            © {new Date().getFullYear()} <a href="https://instagram.com/somos_venia" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors underline decoration-white/30 underline-offset-2">SOMOS VENIA</a>. TODOS LOS DERECHOS RESERVADOS.
          </p>
          <button
              onClick={() => { console.log('Admin button clicked'); onAdminClick(); }}
              className="font-sans text-[10px] text-white/20 hover:text-white/60 transition-colors uppercase tracking-widest"
            >
              ⚙ Admin
            </button>
        </div>

      </div>
    </footer>
  );
};
