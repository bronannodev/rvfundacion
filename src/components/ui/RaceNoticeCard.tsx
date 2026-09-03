import React from 'react';

export const RaceNoticeCard: React.FC = () => {
  return (
    <div className="w-full max-w-2xl mx-auto mt-8 text-left bg-[#0E1015] border border-[#23272F] p-5 sm:p-6 rounded-xl">
      <div className="flex items-center justify-between border-b border-[#23272F] pb-3 mb-4">
        <div>
          <span className="text-[11px] font-mono text-[#D97736] uppercase tracking-wider block">
            ¿Corrés este sábado?
          </span>
          <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-tight">
            Te recordamos
          </h3>
        </div>
        <span className="text-[11px] font-mono text-[#6B7280] uppercase">
          Información
        </span>
      </div>

      <ol className="space-y-3.5 text-xs sm:text-sm text-[#D1D5DB] leading-relaxed">
        <li className="flex items-start gap-3">
          <span className="font-mono font-bold text-[#D97736] text-sm leading-none pt-0.5">
            1.
          </span>
          <p>
            Necesitamos que seas puntual con tu presencia para darte tu{' '}
            <strong className="text-white font-semibold">DORSAL</strong>.
          </p>
        </li>

        <li className="flex items-start gap-3">
          <span className="font-mono font-bold text-[#D97736] text-sm leading-none pt-0.5">
            2.
          </span>
          <p>
            Recordá que el abastecimiento es{' '}
            <strong className="text-white font-semibold">PERSONAL</strong> y
            depende de cada uno. Podés venir a la concentración con tu equipamiento (
            <span className="text-[#9CA3AF]">sillas, mesas, etc.</span>).
          </p>
        </li>

        <li className="flex items-start gap-3">
          <span className="font-mono font-bold text-[#D97736] text-sm leading-none pt-0.5">
            3.
          </span>
          <p>
            Pediremos una colaboración de{' '}
            <strong className="text-white font-semibold">$3500 pesos</strong> por
            participante para cubrir gastos puramente destinados a la convocatoria y
            abastecimiento general.
          </p>
        </li>
      </ol>

      <div className="mt-4 pt-3 border-t border-[#23272F] flex items-center justify-between text-xs font-mono text-[#9CA3AF]">
        <span className="text-[#E5E7EB]">
          • No olvides tu alimento no perecedero
        </span>
      </div>
    </div>
  );
};
