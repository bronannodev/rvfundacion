import React from 'react';
import { ArrowUp, Lock } from 'lucide-react';

interface FooterProps {
  onOpenTerms?: () => void;
}

export const Footer: React.FC<FooterProps> = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 sm:py-16 px-4 sm:px-6 bg-[#07080A] border-t border-[#1C1F26] w-full">
      <div className="max-w-5xl mx-auto flex flex-col items-center justify-center text-center">
        
        {/* Logos Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 md:gap-14 mb-8 w-full">
          {/* Logo Backyard Negro */}
          <div className="flex items-center justify-center">
            <img
              src="/logos/Backyard la rioja negro.webp"
              alt="Backyard La Rioja"
              className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 object-contain drop-shadow-md hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Separador Organizado Por */}
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-6 sm:w-8 bg-[#23272F] hidden sm:block" />
            <span className="text-[11px] sm:text-xs font-mono tracking-widest text-[#9CA3AF] uppercase whitespace-nowrap">
              ORGANIZADO POR
            </span>
            <span className="h-px w-6 sm:w-8 bg-[#23272F] hidden sm:block" />
          </div>

          {/* Logo Fundación RV Blanco */}
          <div className="flex items-center justify-center">
            <img
              src="/logos/fundacion RV blanco.webp"
              alt="Fundación RV"
              className="h-10 sm:h-12 md:h-14 w-auto object-contain brightness-95 contrast-125 hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Contacto, Acceso Admin & Volver Arriba */}
        <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-3xl pt-6 border-t border-[#1C1F26] gap-4 text-xs font-mono text-[#9CA3AF]">
          <div>
            <span>Contacto: </span>
            <a
              href="tel:+5493804592633"
              className="text-white hover:text-[#D97736] transition-colors font-bold"
            >
              +54 9 3804 59-2633
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="/admin"
              className="inline-flex items-center gap-1.5 text-[#6B7280] hover:text-[#D97736] transition-colors"
              title="Panel de administración"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Acceso Admin</span>
            </a>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111317] border border-[#23272F] text-[#9CA3AF] hover:text-white hover:border-[#353A45] transition-all group"
              aria-label="Volver arriba"
            >
              <span>VOLVER ARRIBA</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform text-[#D97736]" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
