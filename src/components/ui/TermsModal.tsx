import React, { useEffect } from 'react';
import { X, FileText, Download, ShieldCheck, HeartHandshake } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#0E1015] border border-[#23272F] rounded-3xl shadow-2xl z-10 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#1E222A] flex items-center justify-between bg-[#12141A]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1A1D26] border border-[#2A2E38] flex items-center justify-center text-[#D97736]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#D97736] uppercase block">
                DOCUMENTO OFICIAL · FUNDACIÓN RV
              </span>
              <h2 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight">
                TÉRMINOS Y CONDICIONES
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/docs/TERMINOS_Y_CONDICIONES.pdf"
              download="TERMINOS_Y_CONDICIONES_BACKYARD_LA_PICADA.pdf"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#181B22] border border-[#2A2E38] text-xs font-mono text-[#D1D5DB] hover:text-white hover:border-[#D97736] transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-[#D97736]" />
              <span>Descargar PDF</span>
            </a>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#9CA3AF] hover:text-white hover:bg-[#181B22] transition-colors"
              aria-label="Cerrar ventana"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6 text-sm text-[#9CA3AF] leading-relaxed font-sans">
          
          {/* Alerta Solidaria Destacada */}
          <div className="p-4 rounded-2xl bg-[#171B22] border border-[#D97736]/30 flex items-start gap-3.5 text-[#E5E7EB]">
            <HeartHandshake className="w-5 h-5 text-[#D97736] shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm">
              <span className="font-bold text-white uppercase block mb-1">
                Requisito Solidario de Participación
              </span>
              Para completar la participación se solicitará la colaboración de <strong className="text-[#D97736]">1 alimento no perecedero</strong>, el cual será destinado a una acción solidaria comunitaria definida por la organización.
            </div>
          </div>

          {/* Secciones */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-mono text-white uppercase tracking-wider font-bold mb-2">
                1. Naturaleza de la actividad recreativa
              </h3>
              <p>
                El desafío es una actividad deportiva y recreativa de carácter comunitario, inspirada en la modalidad Backyard Ultra y adaptada a un formato propio de resistencia y superación personal. La participación es voluntaria y cada participante decide libremente hasta dónde desea continuar dentro de las 6 vueltas disponibles.
              </p>
            </div>

            <div>
              <h3 className="text-xs font-mono text-white uppercase tracking-wider font-bold mb-2">
                2. Participación y Aceptación
              </h3>
              <p>
                La participación implica la aceptación plena de los presentes términos y condiciones. Cada participante declara participar voluntariamente y bajo su propia responsabilidad, considerando las características, distancia, desnivel y exigencia física del recorrido. Se recomienda evaluar previamente la aptitud y preparación para realizar actividad física de estas características.
              </p>
            </div>

            <div>
              <h3 className="text-xs font-mono text-white uppercase tracking-wider font-bold mb-2">
                3. Responsabilidad Individual
              </h3>
              <p className="mb-2">Cada participante será responsable de:</p>
              <ul className="list-disc pl-5 space-y-1 text-xs text-[#D1D5DB]">
                <li>Su estado físico, preparación y aptitud médica.</li>
                <li>Su equipamiento, calzado de montaña y protección.</li>
                <li>Su hidratación y alimentación personal.</li>
                <li>Su indumentaria acorde a las condiciones climáticas.</li>
                <li>Su estrategia de carrera y ritmo que decida llevar.</li>
                <li>La decisión voluntaria de continuar o abandonar.</li>
              </ul>
              <p className="mt-2 text-xs text-[#9CA3AF]">
                La organización no presta un servicio de asistencia deportiva individual. Se limita a coordinar el funcionamiento general del desafío, registrar salidas, llegadas, tiempos y vueltas realizadas.
              </p>
            </div>

            <div>
              <h3 className="text-xs font-mono text-white uppercase tracking-wider font-bold mb-2">
                4. Asistencia y Avituallamiento
              </h3>
              <p>
                Cada participante podrá contar con su propio equipo de asistencia en la zona de concentración respetando las indicaciones generales. La organización dispondrá de un punto de avituallamiento general complementario, pero cada corredor deberá prever sus propias necesidades específicas.
              </p>
            </div>

            <div>
              <h3 className="text-xs font-mono text-white uppercase tracking-wider font-bold mb-2">
                5. Recorridos y Control de Tiempos
              </h3>
              <p>
                La actividad cuenta con dos modalidades: <strong>Circuito Largo (~7,5 km)</strong> y <strong>Circuito Corto (~5,14 km)</strong>. Los recorridos presentan desnivel y terreno irregular propio de montaña. Cada participante deberá respetar la señalización establecida. No está permitido modificar el trazado oficial.
              </p>
              <p className="mt-2 font-mono text-xs text-[#E5E7EB] bg-[#14161C] p-3 rounded-xl border border-[#23272F]">
                Nota Técnica: El tiempo de paso será controlado estrictamente mediante una variable algorítmica de tiempo promedio para certificar el correcto cumplimiento del circuito.
              </p>
            </div>

            <div>
              <h3 className="text-xs font-mono text-white uppercase tracking-wider font-bold mb-2">
                6. Salidas y Horarios
              </h3>
              <p>
                Las salidas se realizarán puntualmente cada 60 minutos. La primera salida será a las 08:00 y la última correspondiente a la sexta vuelta será a las 13:00 (cierre final a las 14:00).
              </p>
            </div>

            <div>
              <h3 className="text-xs font-mono text-white uppercase tracking-wider font-bold mb-2">
                7. Regla de Cambio de Modalidad
              </h3>
              <p>
                Los participantes registrados inicialmente en el Circuito Largo que completen su vuelta fuera del límite de 60 minutos podrán continuar participando en la siguiente ventana mediante el Circuito Corto. Su vuelta larga queda registrada y el corredor pasa a la subcategoría <strong>Cambio de Modalidad</strong>.
              </p>
            </div>

            <div>
              <h3 className="text-xs font-mono text-white uppercase tracking-wider font-bold mb-2">
                8. Cuidado del Entorno y Conducta
              </h3>
              <p>
                Es estricta obligación mantener limpio el recorrido y la zona de concentración. Los residuos deben depositarse en los lugares habilitados. Queda absolutamente prohibido arrojar residuos o envases en el sendero de montaña.
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-[#1E222A] bg-[#12141A] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-[#9CA3AF]">
            <ShieldCheck className="w-4 h-4 text-[#588157]" />
            <span>Fundación RV · Backyard La Picada</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href="/docs/TERMINOS_Y_CONDICIONES.pdf"
              download="TERMINOS_Y_CONDICIONES_BACKYARD_LA_PICADA.pdf"
              className="sm:hidden flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#1A1D24] text-xs font-mono text-white border border-[#2A2E38]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>PDF</span>
            </a>

            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-white text-black font-bold text-xs tracking-wider uppercase hover:bg-[#E5E7EB] transition-colors"
            >
              Entendido y Acepto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
