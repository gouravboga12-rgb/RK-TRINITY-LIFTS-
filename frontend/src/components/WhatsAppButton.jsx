import React, { useState, useEffect } from 'react';

export default function WhatsAppButton() {
  const whatsappUrl = "https://wa.me/917799383334?text=Hi%20RK%20Trinity%20Lifts%2C%20I%20would%20like%20to%20inquire%20about%20your%20services.";
  const [showTooltip, setShowTooltip] = useState(false);

  // Show the tooltip after a short delay on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {/* Speech Bubble Tooltip */}
      {showTooltip && (
        <div className="mb-3.5 bg-white text-slateText p-3.5 rounded-lg shadow-2xl border border-gray-100 flex items-start gap-3 max-w-[260px] animate-bounce-short relative">
          <div className="w-2 h-2 rounded-full bg-[#25D366] mt-1.5 shrink-0 animate-pulse"></div>
          <div>
            <h5 className="font-bold text-xs text-primary mb-0.5">Need Help?</h5>
            <p className="text-[10px] text-gray-500 leading-normal">Chat with our lift specialists on WhatsApp for instant pricing & designs!</p>
          </div>
          <button 
            onClick={() => setShowTooltip(false)}
            className="text-gray-400 hover:text-gray-600 text-xs font-bold leading-none shrink-0 p-0.5"
            title="Close"
          >
            ✕
          </button>
          {/* Triangle notch pointing down */}
          <div className="absolute top-full right-6 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white"></div>
        </div>
      )}

      {/* Main Gradient Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-green-600 to-emerald-400 text-white rounded-full shadow-[0_6px_24px_rgba(16,185,129,0.45)] hover:shadow-[0_8px_30px_rgba(16,185,129,0.65)] hover:scale-110 active:scale-95 transition-all duration-300 group relative"
        title="Chat with us on WhatsApp"
      >
        {/* Pulsing Glowing Ring */}
        <span className="absolute inset-0 w-full h-full rounded-full bg-emerald-400/35 animate-ping opacity-75 pointer-events-none"></span>

        {/* Pulsing indicator dot */}
        <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 border-2 border-white rounded-full flex items-center justify-center z-10">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
        </span>
        
        {/* WhatsApp Icon */}
        <svg 
          className="w-7 h-7 fill-current transform group-hover:rotate-12 transition-transform duration-300"
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.488 2.01 14.041.986 11.994.986 6.56 1.01 2.137 5.378 2.134 10.806c-.001 1.687.455 3.327 1.32 4.767l-.882 3.226 3.336-.882c1.4.765 2.978 1.168 4.542 1.171h.007zm11.163-7.513c-.279-.14-1.65-.815-1.906-.907-.256-.092-.441-.139-.627.139-.186.279-.72.907-.882 1.093-.163.186-.326.209-.605.069-.279-.14-1.18-.435-2.247-1.387-.83-.741-1.389-1.655-1.55-1.934-.163-.279-.017-.43.122-.569.126-.125.279-.326.418-.488.14-.163.186-.279.279-.465.093-.186.046-.349-.023-.488-.069-.14-.627-1.512-.859-2.07-.227-.546-.477-.473-.627-.48l-.535-.006c-.186 0-.488.07-.744.349-.256.279-1.023 1.001-1.023 2.443 0 1.443 1.047 2.839 1.192 3.037.145.197 2.057 3.143 4.984 4.41.696.302 1.24.482 1.662.617.7.223 1.338.192 1.843.116.563-.085 1.651-.675 1.884-1.326.233-.651.233-1.21.163-1.325-.07-.115-.256-.185-.535-.326z" />
        </svg>
      </a>
    </div>
  );
}
