import React, { useState } from 'react';
import { User, CheckCircle2 } from 'lucide-react';
import { RevealOnScroll } from '../ui/RevealOnScroll';

export const TimingExample: React.FC = () => {
  const [tab, setTab] = useState<'standard' | 'switch'>('standard');

  const standardLaps = [
    { lap: 'VUELTA 1', circuit: 'Largo (7,5k)', time: '48:20', status: 'Completada' },
    { lap: 'VUELTA 2', circuit: 'Largo (7,5k)', time: '49:12', status: 'Completada' },
    { lap: 'VUELTA 3', circuit: 'Largo (7,5k)', time: '50:04', status: 'Completada' },
    { lap: 'VUELTA 4', circuit: 'Largo (7,5k)', time: '51:10', status: 'Completada' },
  ];

  const switchLaps = [
    { lap: 'VUELTA 1', circuit: 'Largo (7,5k)', time: '63:00', status: 'Fuera de 60m (+3m)' },
    { lap: 'VUELTA 2', circuit: 'Corto (5,14k)', time: '45:12', status: 'Completada' },
    { lap: 'VUELTA 3', circuit: 'Corto (5,14k)', time: '44:51', status: 'Completada' },
    { lap: 'VUELTA 4', circuit: 'Corto (5,14k)', time: '46:03', status: 'Completada' },
  ];

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 relative border-t border-[#1C1F26]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left / Explanatory Text */}
          <div className="lg:col-span-6 space-y-6">
            <RevealOnScroll direction="left">
              <span className="text-xs font-mono tracking-widest text-[#D97736] uppercase block mb-2">
                CRONOMETRAJE & CLASIFICACIÓN
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase leading-tight mb-4">
                ¿CÓMO SE DETERMINAN LOS RESULTADOS?
              </h2>

              <p className="text-base sm:text-lg text-[#D1D5DB] font-normal leading-relaxed mb-4">
                La clasificación oficial toma en cuenta primero la <strong>cantidad de vueltas completadas</strong> y luego el <strong>menor tiempo neto acumulado</strong>.
              </p>

              <p className="text-sm sm:text-base text-[#9CA3AF] leading-relaxed mb-6">
                El tiempo acumulado corresponde exclusivamente al tiempo empleado en completar las vueltas; los minutos de descanso entre salidas no se computan.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#111317] border border-[#23272F]">
                  <CheckCircle2 className="w-4 h-4 text-[#588157] shrink-0" />
                  <span className="text-xs text-[#D1D5DB]">
                    <strong>Regla de igualdad:</strong> A igual cantidad de vueltas, mejor ubicación para el menor tiempo acumulado.
                  </span>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* Right / Minimalist Interactive Example Card */}
          <div className="lg:col-span-6">
            <RevealOnScroll direction="right" delay={150}>
              <div className="max-w-md mx-auto bg-[#101217] border border-[#23272F] rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                
                {/* Switcher Tab */}
                <div className="flex p-1 rounded-xl bg-[#181B22] border border-[#2A2E38] mb-6">
                  <button
                    onClick={() => setTab('standard')}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-mono uppercase tracking-wider transition-all font-bold ${
                      tab === 'standard'
                        ? 'bg-[#D97736] text-white shadow-md'
                        : 'text-[#9CA3AF] hover:text-white'
                    }`}
                  >
                    Caso Regular
                  </button>
                  <button
                    onClick={() => setTab('switch')}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-mono uppercase tracking-wider transition-all font-bold ${
                      tab === 'switch'
                        ? 'bg-[#D97736] text-white shadow-md'
                        : 'text-[#9CA3AF] hover:text-white'
                    }`}
                  >
                    Cambio de Modalidad
                  </button>
                </div>

                {/* Header Card */}
                <div className="flex items-center justify-between border-b border-[#23272F] pb-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#1A1D24] border border-[#2A2E38] flex items-center justify-center text-[#E5E7EB]">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono tracking-wider text-[#6B7280] uppercase block">
                        FICHA DE CORREDOR
                      </span>
                      <span className="text-base font-bold text-white tracking-wide">
                        {tab === 'standard' ? 'MARTÍN R.' : 'CARLOS G.'}
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-[#D97736] bg-[#1E222A] px-3 py-1 rounded-full border border-[#2A2E38]">
                    {tab === 'standard' ? '4 VUELTAS LARGAS' : 'CAMBIO DE MODALIDAD'}
                  </span>
                </div>

                {/* Laps List */}
                <div className="space-y-2.5 mb-6">
                  {(tab === 'standard' ? standardLaps : switchLaps).map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between py-2.5 px-3.5 rounded-xl bg-[#14161C] border border-[#1E222A]"
                    >
                      <div className="flex flex-col">
                        <span className="text-xs font-mono font-bold text-[#D1D5DB]">{item.lap}</span>
                        <span className="text-[10px] text-[#6B7280]">{item.circuit}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-sm font-bold text-white tracking-wider block">
                          {item.time}
                        </span>
                        <span className={`text-[9px] font-mono ${item.status.includes('Fuera') ? 'text-[#D97736]' : 'text-[#588157]'}`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total Accumulated Time */}
                <div className="pt-4 border-t border-[#23272F] flex items-center justify-between bg-[#14171E] p-4 rounded-xl">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-[#9CA3AF] uppercase block">
                      TIEMPO TOTAL NETO
                    </span>
                    <span className="text-xs text-[#6B7280]">Suma de vueltas (sin descansos)</span>
                  </div>
                  <span className="font-mono text-xl sm:text-2xl font-black text-[#D97736] tracking-tight">
                    {tab === 'standard' ? '3:18:46' : '3:19:06'}
                  </span>
                </div>
              </div>
            </RevealOnScroll>
          </div>

        </div>
      </div>
    </section>
  );
};
