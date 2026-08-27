import React from 'react';
import { ArrowUpRight, Clock, Calendar, Search } from 'lucide-react';

interface HeroProps {
  onOpenCheckModal?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCheckModal }) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id) || document.getElementById('inscripcion');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="relative min-h-[85vh] sm:min-h-screen flex items-center justify-center pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6 overflow-hidden">
      {/* Background Image with Dark Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src="/fotos-web/IMG_3019.webp"
          alt="Paisaje de montaña La Rioja"
          className="w-full h-full object-cover object-center scale-105"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090A0C] via-[#090A0C]/85 to-[#090A0C]/65" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#090A0C]/70 to-[#090A0C]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Main Logo */}
        <div className="mb-3 w-full flex justify-center">
          <h1 className="sr-only">DESAFÍO 60’ — Backyard Ultra : La Picada</h1>
          <img
            src="/logos/Backyard La Rioja.webp"
            alt="Backyard La Rioja"
            className="w-[68vw] max-w-[280px] h-auto aspect-square sm:w-72 sm:h-72 sm:max-w-none md:w-80 md:h-80 lg:w-[360px] lg:h-[360px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] hover:scale-105 transition-transform duration-300 ease-out"
          />
        </div>

        {/* Subtitle */}
        <div className="inline-flex items-center gap-2 sm:gap-3 text-xs sm:text-base md:text-lg font-mono tracking-widest text-[#D97736] font-semibold uppercase mb-6 sm:mb-8">
          <span>6 VUELTAS</span>
          <span className="text-[#6B7280]">·</span>
          <span>6 HORAS</span>
          <span className="text-[#6B7280]">·</span>
          <span>1 DESAFÍO</span>
        </div>

        {/* CTAs: 2 Essential Buttons */}
        <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-8">
          <button
            onClick={() => scrollToSection('registro')}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#D97736] text-white font-bold text-sm tracking-wider uppercase hover:bg-[#E58B4E] active:scale-[0.98] shadow-lg shadow-[#D97736]/20 transition-all flex items-center justify-center gap-2"
          >
            <span>QUIERO ANOTARME</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          {onOpenCheckModal && (
            <button
              onClick={onOpenCheckModal}
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-[#14161B]/90 hover:bg-[#1C1F26] text-[#E5E7EB] hover:text-white font-mono text-xs tracking-wider uppercase border border-[#2A2E38] transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              <Search className="w-4 h-4 text-[#D97736]" />
              <span>VER MI REGISTRO</span>
            </button>
          )}
        </div>

        {/* Schedule & Date */}
        <div className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-6 px-5 py-2.5 rounded-full bg-[#111317]/80 border border-[#23272F]/80 backdrop-blur-md text-xs font-mono text-[#9CA3AF]">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-[#D97736]" />
            <span className="text-[#E5E7EB] font-bold">SÁBADO 5 DE SEPTIEMBRE</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-[#374151] hidden sm:block" />
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-[#D97736]" />
            <span className="text-[#E5E7EB]">08:00 — 14:00</span>
          </div>
        </div>
      </div>
    </section>
  );
};
