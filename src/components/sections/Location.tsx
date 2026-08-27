import React, { useState } from 'react';
import { MapPin, Maximize2 } from 'lucide-react';
import { RevealOnScroll } from '../ui/RevealOnScroll';
import { ImageViewerModal } from '../ui/ImageViewerModal';

export const Location: React.FC = () => {
  const [activeCircuit, setActiveCircuit] = useState<'largo' | 'corto'>('largo');
  const [modalImage, setModalImage] = useState<{ src: string; title: string } | null>(null);

  const circuits = {
    largo: {
      name: 'Circuito Largo',
      distance: '7,5 km',
      elevation: '~390 m D+',
      maxAlt: '1.000 msnm',
      trackImg: '/circuitos/circuito-7k-track.png',
      altimetryImg: '/circuitos/circuito-7k-altimetria.png',
    },
    corto: {
      name: 'Circuito Corto',
      distance: '5,14 km',
      elevation: '~220 m D+',
      maxAlt: '830 msnm',
      trackImg: '/circuitos/circuito-5k-track.png',
      altimetryImg: '/circuitos/circuito-5k-altimetria.png',
    },
  };

  const current = circuits[activeCircuit];

  return (
    <section id="circuitos" className="py-20 sm:py-28 px-4 sm:px-6 relative border-t border-[#1C1F26]">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <RevealOnScroll direction="up">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-[#D97736]" />
              <span className="text-xs font-mono tracking-widest text-[#D97736] uppercase">
                TRAZADOS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase mb-6">
              LOS CIRCUITOS
            </h2>

            {/* Simple Switcher */}
            <div className="inline-flex p-1 rounded-xl bg-[#12141A] border border-[#23272F]">
              <button
                onClick={() => setActiveCircuit('largo')}
                className={`py-2 px-5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all font-bold ${
                  activeCircuit === 'largo'
                    ? 'bg-[#D97736] text-white shadow-md'
                    : 'text-[#9CA3AF] hover:text-white'
                }`}
              >
                Circuito Largo (7,5 km)
              </button>
              <button
                onClick={() => setActiveCircuit('corto')}
                className={`py-2 px-5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all font-bold ${
                  activeCircuit === 'corto'
                    ? 'bg-[#D97736] text-white shadow-md'
                    : 'text-[#9CA3AF] hover:text-white'
                }`}
              >
                Circuito Corto (5,14 km)
              </button>
            </div>
          </div>
        </RevealOnScroll>

        {/* Minimal metrics bar */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-[#9CA3AF] mb-8 pb-4 border-b border-[#1E222A]">
          <div>Distancia: <span className="text-white font-bold">{current.distance}</span></div>
          <div className="w-1 h-1 rounded-full bg-[#374151]" />
          <div>Desnivel: <span className="text-[#D97736] font-bold">{current.elevation}</span></div>
          <div className="w-1 h-1 rounded-full bg-[#374151]" />
          <div>Altitud máxima: <span className="text-white font-bold">{current.maxAlt}</span></div>
        </div>

        {/* Direct Images: Circuito - Perfil */}
        <RevealOnScroll direction="up" delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Circuito / Track */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase text-[#9CA3AF] tracking-wider block">
                Circuito — Track
              </span>
              <div
                onClick={() =>
                  setModalImage({
                    src: current.trackImg,
                    title: `${current.name} · Track`,
                  })
                }
                className="relative rounded-2xl bg-[#08090C] border border-[#1E222A] p-3 flex items-center justify-center cursor-pointer group"
              >
                <img
                  src={current.trackImg}
                  alt={`${current.name} Track`}
                  className="max-h-[320px] w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
                />
                <button
                  className="absolute bottom-3 right-3 p-1.5 rounded-lg bg-[#14161C]/90 text-[#9CA3AF] group-hover:text-white border border-[#23272F]"
                  aria-label="Ampliar"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Perfil / Altimetría */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase text-[#9CA3AF] tracking-wider block">
                Perfil — Altimetría
              </span>
              <div
                onClick={() =>
                  setModalImage({
                    src: current.altimetryImg,
                    title: `${current.name} · Perfil`,
                  })
                }
                className="relative rounded-2xl bg-[#08090C] border border-[#1E222A] p-3 flex items-center justify-center cursor-pointer group"
              >
                <img
                  src={current.altimetryImg}
                  alt={`${current.name} Altimetría`}
                  className="max-h-[320px] w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
                />
                <button
                  className="absolute bottom-3 right-3 p-1.5 rounded-lg bg-[#14161C]/90 text-[#9CA3AF] group-hover:text-white border border-[#23272F]"
                  aria-label="Ampliar"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </RevealOnScroll>

      </div>

      {/* Modal Zoom */}
      {modalImage && (
        <ImageViewerModal
          isOpen={Boolean(modalImage)}
          onClose={() => setModalImage(null)}
          imageSrc={modalImage.src}
          title={modalImage.title}
        />
      )}
    </section>
  );
};
