import React from 'react';
import { ShieldCheck, Download, Clock, RefreshCw, Compass, Leaf } from 'lucide-react';
import { RevealOnScroll } from '../ui/RevealOnScroll';

export const Rules: React.FC = () => {
  const keyRules = [
    {
      title: 'Salidas Puntuales',
      desc: 'Primera salida a las 08:00 hs. Se realiza una largada simultánea cada 60 minutos (08:00, 09:00, 10:00, 11:00, 12:00 y 13:00 hs).',
      icon: Clock,
    },
    {
      title: 'Ventana de 60 Minutos',
      desc: 'Cada vuelta debe completarse y regresar a la zona de concentración dentro del margen de 60 minutos de cada hora.',
      icon: Compass,
    },
    {
      title: 'Cambio de Modalidad',
      desc: 'Si un corredor del Circuito Largo no completa la vuelta en 60 min, la registra y puede continuar el desafío pasando al Circuito Corto.',
      icon: RefreshCw,
    },
    {
      title: 'Autosuficiencia y Respeto',
      desc: 'Cada participante es responsable de su hidratación y equipamiento. Compromiso ecológico absoluto: cero residuos en el sendero.',
      icon: Leaf,
    },
  ];

  return (
    <section id="reglas" className="py-20 sm:py-28 px-4 sm:px-6 bg-[#0B0C0F] border-t border-[#1C1F26] relative">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <RevealOnScroll direction="up">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-4 h-4 text-[#D97736]" />
                <span className="text-xs font-mono tracking-widest text-[#D97736] uppercase">
                  REGLAMENTO
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase">
                BASES Y REGLAS
              </h2>
            </div>

            <div>
              <a
                href="/docs/BACKYARD_REGLAMENTO.pdf"
                download="REGLAMENTO_OFICIAL_BACKYARD_LA_PICADA.pdf"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#14161C] hover:bg-[#1E222A] text-white border border-[#2A2E38] font-mono text-xs tracking-wider uppercase transition-all shadow-md hover:border-[#D97736]"
              >
                <Download className="w-4 h-4 text-[#D97736]" />
                <span>Descargar Reglamento PDF</span>
              </a>
            </div>
          </div>
        </RevealOnScroll>

        {/* Essential Rules Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {keyRules.map((rule, idx) => {
            const Icon = rule.icon;
            return (
              <RevealOnScroll key={rule.title} direction="up" delay={idx * 60}>
                <div className="bg-[#12141A] border border-[#23272F] rounded-2xl p-5 sm:p-6 flex items-start gap-4 hover:border-[#353B47] transition-all h-full">
                  <div className="p-2.5 rounded-xl bg-[#181B22] text-[#D97736] border border-[#2A2E38] shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wide mb-1.5">
                      {rule.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#9CA3AF] leading-relaxed">
                      {rule.desc}
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>

      </div>
    </section>
  );
};
