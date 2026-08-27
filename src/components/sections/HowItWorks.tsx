import React from 'react';
import { Clock, Play, BatteryCharging, CheckCircle } from 'lucide-react';
import { RevealOnScroll } from '../ui/RevealOnScroll';

export const HowItWorks: React.FC = () => {
  const schedule = [
    { time: '08:00', title: 'VUELTA 1', desc: 'Primera largada simultánea', isFinal: false },
    { time: '09:00', title: 'VUELTA 2', desc: 'Segunda ventana horaria', isFinal: false },
    { time: '10:00', title: 'VUELTA 3', desc: 'Tercera ventana horaria', isFinal: false },
    { time: '11:00', title: 'VUELTA 4', desc: 'Cuarta ventana horaria', isFinal: false },
    { time: '12:00', title: 'VUELTA 5', desc: 'Quinta ventana horaria', isFinal: false },
    { time: '13:00', title: 'VUELTA 6', desc: 'Última vuelta del desafío', isFinal: false },
    { time: '14:00', title: 'FINAL', desc: 'Cierre de la jornada', isFinal: true },
  ];

  return (
    <section id="como-funciona" className="py-24 sm:py-32 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll direction="up">
          <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
            <span className="text-xs font-mono tracking-widest text-[#D97736] uppercase block mb-3">
              DINÁMICA DE LA ACTIVIDAD
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase mb-4">
              ¿CÓMO FUNCIONA?
            </h2>
          </div>
        </RevealOnScroll>

        {/* Timeline Desktop (Horizontal) */}
        <RevealOnScroll direction="up" delay={150}>
          <div className="hidden lg:block mb-20">
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-[#23272F] -translate-y-1/2 z-0" />

              <div className="grid grid-cols-7 gap-2 relative z-10">
                {schedule.map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center group">
                    <span className="font-mono text-sm font-bold text-[#E5E7EB] mb-3 group-hover:text-[#D97736] transition-colors">
                      {item.time}
                    </span>

                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                      item.isFinal
                        ? 'bg-[#18261F] border-[#2D5A46] text-[#588157]'
                        : 'bg-[#12141A] border-[#2A2E38] text-white group-hover:border-[#D97736]'
                    }`}>
                      {item.isFinal ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <span className="font-mono text-xs font-bold">{idx + 1}</span>
                      )}
                    </div>

                    <span className={`mt-3 font-bold text-xs tracking-wider uppercase ${
                      item.isFinal ? 'text-[#588157]' : 'text-white'
                    }`}>
                      {item.title}
                    </span>
                    <span className="text-[11px] text-[#6B7280] mt-0.5">
                      {item.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Timeline Mobile & Tablet (Vertical) */}
        <div className="lg:hidden relative pl-6 border-l-2 border-[#23272F] space-y-6 sm:space-y-8 mb-16 ml-3">
          {schedule.map((item, idx) => (
            <RevealOnScroll key={idx} direction="left" delay={idx * 60}>
              <div className="relative group">
                {/* Dot */}
                <div className={`absolute -left-[31px] top-1 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  item.isFinal
                    ? 'bg-[#18261F] border-[#2D5A46] text-[#588157]'
                    : 'bg-[#12141A] border-[#374151] text-[#E5E7EB]'
                }`}>
                  {item.isFinal ? (
                    <CheckCircle className="w-3.5 h-3.5" />
                  ) : (
                    <span className="font-mono text-[10px] font-bold">{idx + 1}</span>
                  )}
                </div>

                <div className="bg-[#12141A] border border-[#23272F] rounded-xl p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs font-semibold text-[#D97736]">
                      {item.time} hs
                    </span>
                    <span className={`text-[11px] font-mono uppercase tracking-wider ${
                      item.isFinal ? 'text-[#588157] font-bold' : 'text-[#9CA3AF]'
                    }`}>
                      {item.title}
                    </span>
                  </div>
                  <p className="text-xs text-[#9CA3AF]">{item.desc}</p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* 3 Explanation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <RevealOnScroll direction="up" delay={100}>
            <div className="bg-[#111317] border border-[#23272F] rounded-2xl p-6 hover:border-[#2D333F] transition-colors h-full">
              <div className="w-10 h-10 rounded-xl bg-[#181B22] flex items-center justify-center text-[#D97736] mb-4">
                <Play className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white uppercase tracking-wide mb-2">
                Salida en punto
              </h3>
              <p className="text-sm text-[#9CA3AF] leading-relaxed">
                Cada vuelta comienza exactamente en el inicio de una nueva hora. Todos los corredores activos parten simultáneamente.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={200}>
            <div className="bg-[#111317] border border-[#23272F] rounded-2xl p-6 hover:border-[#2D333F] transition-colors h-full">
              <div className="w-10 h-10 rounded-xl bg-[#181B22] flex items-center justify-center text-[#D97736] mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white uppercase tracking-wide mb-2">
                Ventana de 60 minutos
              </h3>
              <p className="text-sm text-[#9CA3AF] leading-relaxed">
                Tenés 60 minutos para completar el recorrido establecido y regresar al punto de largada antes del siguiente toque de hora.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={300}>
            <div className="bg-[#111317] border border-[#23272F] rounded-2xl p-6 hover:border-[#2D333F] transition-colors h-full">
              <div className="w-10 h-10 rounded-xl bg-[#181B22] flex items-center justify-center text-[#588157] mb-4">
                <BatteryCharging className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white uppercase tracking-wide mb-2">
                Tiempo de descanso
              </h3>
              <p className="text-sm text-[#9CA3AF] leading-relaxed">
                Una vez que terminás tu vuelta, podés descansar, hidratarte y alimentarte durante los minutos restantes hasta la siguiente salida.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};
