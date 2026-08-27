import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const navLinks = [
    { label: 'EL DESAFÍO', href: '#desafio' },
    { label: 'CÓMO FUNCIONA', href: '#como-funciona' },
    { label: 'CIRCUITOS', href: '#circuitos' },
    { label: 'REGLAMENTO', href: '#reglas' },
    { label: 'PREGUNTAS', href: '#faq' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href) || document.getElementById('inscripcion');
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

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono tracking-wider">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-[#9CA3AF] hover:text-white transition-colors duration-150 py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center">
          <a
            href="#registro"
            onClick={(e) => handleLinkClick(e, '#registro')}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-[#D97736] text-white font-bold text-xs tracking-wider uppercase hover:bg-[#E58B4E] active:scale-[0.98] transition-all duration-200 shadow-md shadow-[#D97736]/20"
          >
            <span>ANOTARME</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href="#registro"
            onClick={(e) => handleLinkClick(e, '#registro')}
            className="px-3.5 py-1.5 rounded-md bg-[#D97736] text-white font-bold text-[11px] font-mono tracking-wider uppercase"
          >
            ANOTARME
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#9CA3AF] hover:text-white focus:outline-none"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[64px] sm:top-[74px] bg-[#0C0E12]/95 backdrop-blur-xl border-b border-[#23272F] p-6 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-4 font-mono text-sm">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-[#D1D5DB] hover:text-white py-2 border-b border-[#1E222A] flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-xs text-[#6B7280]">→</span>
              </a>
            ))}

            <div className="pt-3">
              <a
                href="#registro"
                onClick={(e) => handleLinkClick(e, '#registro')}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#D97736] text-white font-bold text-xs tracking-wider uppercase"
              >
                <span>QUIERO ANOTARME</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
