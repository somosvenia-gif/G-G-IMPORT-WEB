import { cn } from '../../lib/utils';

export const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex flex-col items-center justify-center leading-none", className)}>
      <span className="text-2xl font-black tracking-tighter text-transparent" style={{ WebkitTextStroke: '1px #ffffff' }}>
        G&G
      </span>
      <span className="text-[0.6rem] font-mono tracking-[0.2em] text-neonPurple font-bold">
        IMPORT
      </span>
    </div>
  );
};
