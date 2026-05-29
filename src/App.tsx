import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Philosophy } from './components/Philosophy';
import { Protocol } from './components/Protocol';
import { Catalog } from './components/Catalog';
import { Footer } from './components/Footer';
import { Cart } from './components/Cart';
import { CheckoutModal } from './components/CheckoutModal';
import { AdminPanel } from './components/AdminPanel';
import { WhatsAppButton } from './components/ui/WhatsAppButton';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [adminOpen, setAdminOpen] = useState(false);

  // Atajo de teclado: Ctrl + Shift + A abre el panel de admin
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        setAdminOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-bgLight">
      <Cart />
      <CheckoutModal />
      {adminOpen && <AdminPanel onClose={() => setAdminOpen(false)} />}
      <Header />
      <main>
        <Hero />
        <AnnouncementBar />
        <Features />
        <Philosophy />
        <Protocol />
        <Catalog />
      </main>
      <Footer onAdminClick={() => setAdminOpen(true)} />
      <WhatsAppButton />
    </div>
  );
}

export default App;
