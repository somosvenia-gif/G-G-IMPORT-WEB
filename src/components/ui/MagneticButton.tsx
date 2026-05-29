import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { cn } from '../../lib/utils';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  active?: boolean;
}

export const MagneticButton = ({ children, className, active, ...props }: MagneticButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const button = buttonRef.current;
    if (!button) return;

    const xTo = gsap.quickTo(button, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(button, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = button.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * 0.3);
      yTo(y * 0.3);
      gsap.to(textRef.current, { x: x * 0.1, y: y * 0.1, duration: 1, ease: "power3.out" });
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
      gsap.to(button, { scale: 1, duration: 0.5, ease: "power3.out" });
      gsap.to(textRef.current, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
    };

    const handleMouseEnter = () => {
      gsap.to(button, { scale: 1.03, duration: 0.3, ease: "power3.out" });
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);
    button.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
      button.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      className={cn(
        "relative rounded-full px-6 py-3 overflow-hidden group font-mono text-sm transition-colors border",
        active ? "bg-white text-deepBlack border-transparent" : "bg-transparent text-lightGray border-white/10 hover:border-white/20",
        className
      )}
      {...props}
    >
      {/* Sliding Span Layer */}
      <span className="absolute inset-0 w-full h-full bg-neonPurple -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] rounded-full -z-10"></span>
      
      <span ref={textRef} className="block relative z-10 group-hover:text-white transition-colors duration-300">
        {children}
      </span>
    </button>
  );
};
