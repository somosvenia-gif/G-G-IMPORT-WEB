import { ShieldCheck, MapPin, Truck } from 'lucide-react';

const features = [
  { icon: ShieldCheck, title: "Compra Segura", desc: "Tus datos están protegidos en cada transacción." },
  { icon: Truck, title: "Envío Prioritario", desc: "Entrega inmediata en zonas seleccionadas." },
  { icon: MapPin, title: "Cobertura Nacional", desc: "Realizamos envíos a toda Venezuela sin complicaciones." }
];

export const Features = () => {
  return (
    <section className="w-full py-20 bg-white border-y border-lightGray/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-lightGray/20">
          {features.map((f, i) => (
            <div key={i} className="flex flex-col items-center text-center px-8 py-6 md:py-0">
              <f.icon size={36} className="text-brandDark mb-6" />
              <h3 className="font-sans font-bold text-deepBlack text-lg uppercase tracking-wider mb-2">{f.title}</h3>
              <p className="font-sans text-lightGray text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
