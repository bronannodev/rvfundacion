import React from 'react';
import { Compass, Timer, RotateCw } from 'lucide-react';
import { RevealOnScroll } from '../ui/RevealOnScroll';

export const ChallengeStats: React.FC = () => {
  const stats = [
    {
      value: '2',
      label: 'CIRCUITOS',
      desc: '7,5 km (Largo) y 5,14 km (Corto)',
      icon: Compass,
    },
    {
      value: '60’',
      label: 'VENTANA HORARIA',
      desc: 'Una largada simultánea cada hora',
      icon: Timer,
    },
    {
      value: '6',
      label: 'VUELTAS MÁXIMO',
      desc: 'De 08:00 a 14:00 hs',
      icon: RotateCw,
    },
  ];

  return (
    <section id="desafio" className="py-20 sm:py-28 px-4 sm:px-6 bg-[#0D0E12] border-t border-b border-[#1E222A] relative">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
            <div>
              <span className="text-xs font-mono tracking-widest text-[#D97736] uppercase block mb-2">
                ESTRUCTURA DE LA ACTIVIDAD
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase">
                EL DESAFÍO
              </h2>
            </div>
          </div>
        </RevealOnScroll>

        {/* 3 Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <RevealOnScroll key={idx} direction="up" delay={idx * 80}>
                <div className="bg-[#12141A] border border-[#23272F] rounded-2xl p-5 sm:p-7 flex flex-col justify-between hover:border-[#353B47] transition-colors group h-full">
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-[10px] sm:text-xs text-[#6B7280]">0{idx + 1}</span>
                    <Icon className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#D97736] transition-colors" />
                  </div>
                  <div>
                    <span className="text-3xl sm:text-5xl font-black font-mono text-white tracking-tight block mb-2">
                      {stat.value}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#E5E7EB] uppercase tracking-wider block mb-1">
                      {stat.label}
                    </span>
                    <span className="text-[11px] text-[#6B7280] font-mono block">
                      {stat.desc}
                    </span>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>

        {/* Clarification Box */}
        <RevealOnScroll direction="up" delay={350}>
          <div className="max-w-3xl mx-auto rounded-2xl bg-[#14171E] border border-[#23272F] p-4 sm:p-5 flex items-start gap-3.5">
            <Compass className="w-5 h-5 text-[#D97736] shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed">
              <span className="text-white font-medium">Importante:</span> Elegís tu distancia inicial al momento de anotarte. Si en el circuito largo no llegás dentro de los 60 minutos, podés continuar completando el desafío en el circuito corto.
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};
