export const AnnouncementBar = () => {
  return (
    <div className="w-full bg-neonPink text-white py-10 px-6 text-center shadow-inner border-b border-lightGray/20">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        <h3 className="text-xl md:text-[22px] font-medium uppercase tracking-[0.05em] leading-normal">
          Haz tu pedido antes de las 12:00PM y te llega<br/>
          hoy mismo en Maracaibo o San Francisco
        </h3>
        
        <p className="text-sm md:text-[15px] uppercase tracking-wider">
          Delivery Maracaibo €3 San Francisco €2<br/>
          Envíos a toda Venezuela
        </p>
        
        <p className="text-[11px] md:text-sm uppercase tracking-wider opacity-80 mt-2">
          Ordenes mayores a €50 delivery completamente gratis en Maracaibo<br/><br/>
          San Francisco ordenes mayores a €35 delivery gratis
        </p>
      </div>
    </div>
  );
};
