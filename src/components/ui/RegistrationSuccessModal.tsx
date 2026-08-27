import React, { useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { Participant } from '../../types';

interface RegistrationSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  participant?: Participant | null;
}

export const RegistrationSuccessModal: React.FC<RegistrationSuccessModalProps> = ({
  isOpen,
  onClose,
  participant,
}) => {
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

  const handleBackToTop = () => {
    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/85 transition-opacity"
        onClick={onClose}
      />

      {/* Flat & Simple Modal Box */}
      <div className="relative w-full max-w-md bg-[#0F1115] border border-[#23272F] p-6 sm:p-8 z-10 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#6B7280] hover:text-white p-1 transition-colors"
          aria-label="Cerrar ventana"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-mono text-[#588157] uppercase font-bold tracking-wider">
            <Check className="w-4 h-4 text-[#588157]" />
            <span>ANOTAMOS TU INFORMACIÓN</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
            ESTÁS REGISTRADO
          </h3>
          {participant && (
            <p className="text-sm text-[#D1D5DB] pt-1">
              Corredor/a: <strong className="text-white uppercase">{participant.firstName} {participant.lastName}</strong>
            </p>
          )}
        </div>

        {/* Simple Flat Details List */}
        <div className="border-t border-b border-[#23272F] py-4 space-y-2.5 font-mono text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[#6B7280] uppercase">Número asignado</span>
            <span className="font-bold text-[#D97736] text-sm">
              #{participant?.registrationCode || '001'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#6B7280] uppercase">DNI / Documento</span>
            <span className="text-white">{participant?.dni}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#6B7280] uppercase">Modalidad</span>
            <span className="text-white">
              {participant?.modality === 'circuito_largo' ? 'Circuito Largo (7,5 km)' : 'Circuito Corto (5,14 km)'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#6B7280] uppercase">Horario de Largada</span>
            <span className="text-white">08:00 hs (6 vueltas máx)</span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[#6B7280] uppercase">Estado</span>
            <span className="text-[#588157] font-bold uppercase">
              CONFIRMADO
            </span>
          </div>
        </div>

        {/* Flat Solidarity Notice */}
        <p className="text-xs text-[#9CA3AF] leading-relaxed">
          <strong className="text-white">Recordatorio:</strong> Para completar tu acreditación, recordá llevar <strong>1 alimento no perecedero</strong> para la acción comunitaria de la Fundación RV.
        </p>

        {/* Simple Button */}
        <div>
          <button
            onClick={handleBackToTop}
            className="w-full py-3 bg-white text-black font-bold text-xs tracking-wider uppercase hover:bg-[#E5E7EB] transition-colors"
          >
            VOLVER AL INICIO
          </button>
        </div>

      </div>
    </div>
  );
};
