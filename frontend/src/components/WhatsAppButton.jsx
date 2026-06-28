import React from 'react';

export default function WhatsAppButton() {
  const whatsappUrl = "https://wa.me/917799383334?text=Hi%20RK%20Trinity%20Lifts%2C%20I%20would%20like%20to%20inquire%20about%20your%20services.";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_5px_20px_rgba(37,211,102,0.4)] hover:bg-[#20ba5a] hover:scale-110 transition-all duration-300 group"
      title="Contact us on WhatsApp"
    >
      {/* Pulsing Outer Rings */}
      <span className="absolute inset-0 w-full h-full rounded-full bg-[#25D366]/40 animate-ping opacity-75"></span>
      
      {/* WhatsApp SVG Icon */}
      <svg 
        className="w-7 h-7 fill-current transform group-hover:rotate-12 transition-transform duration-300"
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.488 2.01 14.041.986 11.994.986 6.56 1.01 2.137 5.378 2.134 10.806c-.001 1.687.455 3.327 1.32 4.767l-.882 3.226 3.336-.882c1.4.765 2.978 1.168 4.542 1.171h.007zm11.163-7.513c-.279-.14-1.65-.815-1.906-.907-.256-.092-.441-.139-.627.139-.186.279-.72.907-.882 1.093-.163.186-.326.209-.605.069-.279-.14-1.18-.435-2.247-1.387-.83-.741-1.389-1.655-1.55-1.934-.163-.279-.017-.43.122-.569.126-.125.279-.326.418-.488.14-.163.186-.279.279-.465.093-.186.046-.349-.023-.488-.069-.14-.627-1.512-.859-2.07-.227-.546-.477-.473-.627-.48l-.535-.006c-.186 0-.488.07-.744.349-.256.279-1.023 1.001-1.023 2.443 0 1.443 1.047 2.839 1.192 3.037.145.197 2.057 3.143 4.984 4.41.696.302 1.24.482 1.662.617.7.223 1.338.192 1.843.116.563-.085 1.651-.675 1.884-1.326.233-.651.233-1.21.163-1.325-.07-.115-.256-.185-.535-.326z" />
      </svg>
    </a>
  );
}
