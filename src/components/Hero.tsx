import { useRef, useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { heroImages as defaultImages } from '../data/heroImages';
import { useHeroStore } from '../store/useHero';

export const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const images = useHeroStore(s => s.images);
  const slides = images.length > 0 ? images : defaultImages;

  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((index: number) => {
    if (animating || slides.length <= 1) return;
    setAnimating(true);
    setCurrent(index);
    setTimeout(() => setAnimating(false), 600);
  }, [animating, slides.length]);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, slides.length, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length);
  }, [current, slides.length, goTo]);

  // Auto-avance cada 4 segundos
  useEffect(() => {
    if (slides.length <= 1) return;
    timerRef.current = setTimeout(next, 4000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, slides.length, next]);

  useGSAP(() => {
    gsap.from(".hero-anim", {
      opacity: 0,
      y: 30,
      stagger: 0.15,
      duration: 1.2,
      ease: "power3.out",
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="w-full min-h-[85vh] bg-bgLight relative flex justify-center overflow-hidden">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 min-h-[85vh]">

        {/* ── Carrusel izquierdo — llena toda la columna ── */}
        <div className="hero-anim relative w-full min-h-[55vw] lg:min-h-0 overflow-hidden">

          {/* Slides: foto a pantalla completa */}
          {slides.map((img, i) => (
            <img
              key={img.id}
              src={img.src}
              alt={img.alt ?? `Slide ${i + 1}`}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
              style={{ opacity: i === current ? 1 : 0 }}
              onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
            />
          ))}

          {/* Overlay sutil para contraste */}
          <div className="absolute inset-0 bg-black/10 z-10" />

          {/* Flechas — solo si hay más de 1 imagen */}
          {slides.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/80 hover:bg-white shadow-md flex items-center justify-center text-deepBlack transition-all hover:scale-110"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/80 hover:bg-white shadow-md flex items-center justify-center text-deepBlack transition-all hover:scale-110"
              >
                <ChevronRight size={20} />
              </button>

              {/* Puntos */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === current ? 'bg-white w-6' : 'bg-white/50 w-2 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* ── Texto y CTA ─────────────────────────────── */}
        <div className="hero-anim flex flex-col justify-center items-center lg:items-end text-center lg:text-right px-8 py-16 lg:px-16 xl:px-24 bg-bgLight z-20">
          <span className="font-sans text-deepBlack/80 tracking-widest uppercase text-sm lg:text-base font-medium mb-4">
            LA MODA ESTA AQUI
          </span>
          <h1 className="font-sans font-black text-6xl md:text-7xl lg:text-[90px] xl:text-[100px] leading-[0.9] text-brandDark tracking-tighter mb-12 drop-shadow-sm">
            MEJORES <br className="hidden lg:block"/> PRECIOS
          </h1>

          <button
            onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-brandDark text-white px-10 py-5 text-sm md:text-base font-bold tracking-widest flex items-center gap-4 hover:bg-neonPink hover:scale-105 transition-all shadow-xl hover:shadow-neonPink/20 rounded-sm"
          >
            COMPRA AHORA <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </section>
  );
};
