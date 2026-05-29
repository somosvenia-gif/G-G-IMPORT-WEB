import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const WHATSAPP_NUMBER = '584121627012';

export const WhatsAppButton = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-[90] flex items-center gap-3">
      {/* Tooltip */}
      {showTooltip && (
        <div className="bg-white text-deepBlack px-4 py-3 rounded-lg shadow-xl shadow-black/10 flex items-center gap-3 border border-lightGray/10">
          <span className="text-sm font-medium">Envíanos un mensaje de WhatsApp</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-lightGray hover:text-deepBlack transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Button */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('¡Hola! Visité su tienda G&G IMPORT y quisiera más información 😊')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-xl shadow-[#25D366]/30 hover:scale-110 hover:shadow-[#25D366]/50 transition-all cursor-pointer"
      >
        <MessageCircle size={30} strokeWidth={2.5} />
      </a>
    </div>
  );
};
