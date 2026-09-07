import React, { useState, useEffect } from 'react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-out py-3 sm:py-4 ${
        isScrolled
          ? 'bg-[#090A0C]/95 backdrop-blur-md shadow-lg shadow-black/40'
          : 'bg-gradient-to-b from-black/80 via-black/20 to-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 group focus:outline-none"
        >
          <img
            src="/logos/Backyard La Rioja.webp"
            alt="Backyard La Rioja"
            className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain transition-transform duration-300 ease-out ${
              isScrolled ? 'scale-90 group-hover:scale-95' : 'scale-100 group-hover:scale-105'
            }`}
          />
        </a>

        {/* Right Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-[#14161B]/80 border border-[#2A2E38] text-xs font-mono text-[#9CA3AF] backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-[#D97736]" />
          <span className="text-[#E5E7EB] font-medium tracking-wider uppercase text-[11px] sm:text-xs">
            La Rioja, Argentina
          </span>
        </div>
      </div>
    </header>
  );
};

