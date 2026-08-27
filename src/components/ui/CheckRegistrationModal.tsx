import React, { useState } from 'react';
import {
  X,
  Search,
  AlertCircle,
  Loader2,
  Check,
} from 'lucide-react';
import { getParticipantByDni } from '../../services/registrationService';
import { Participant } from '../../types';

interface CheckRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToRegister: () => void;
}

export const CheckRegistrationModal: React.FC<CheckRegistrationModalProps> = ({
  isOpen,
  onClose,
  onGoToRegister,
}) => {
  const [dniInput, setDniInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [participant, setParticipant] = useState<Participant | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanDni = dniInput.replace(/\D/g, '').trim();

    if (!cleanDni || cleanDni.length < 6) {
      setErrorMsg('Por favor ingresá un número de DNI válido.');
      return;
    }

    setErrorMsg(null);
    setLoading(true);
    setSearched(false);
    setParticipant(null);

    try {
      const result = await getParticipantByDni(cleanDni);
      setSearched(true);
      if (result.found && result.participant) {
        setParticipant(result.participant);
      } else {
        setParticipant(null);
      }
    } catch (err) {
      setErrorMsg('Error al consultar. Por favor probá nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setDniInput('');
    setSearched(false);
    setParticipant(null);
    setErrorMsg(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 transition-opacity"
        onClick={handleClose}
      />

      {/* Flat & Simple Modal Container */}
      <div className="relative w-full max-w-md bg-[#0F1115] border border-[#23272F] p-6 sm:p-8 z-10 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#23272F] pb-4">
          <h2 className="text-base sm:text-lg font-black text-white uppercase tracking-tight">
            VER MI REGISTRO
          </h2>

          <button
            onClick={handleClose}
            className="text-[#6B7280] hover:text-white p-1 transition-colors"
            aria-label="Cerrar ventana"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="space-y-2">
          <label className="block text-xs font-mono text-[#9CA3AF] uppercase">
            Número de DNI / Documento
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={dniInput}
              onChange={(e) => {
                setDniInput(e.target.value);
                setErrorMsg(null);
              }}
              placeholder="Ej: 38450120"
              className="flex-1 bg-[#14161C] border border-[#23272F] px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-[#D97736]"
              autoFocus
            />
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 bg-[#D97736] text-white font-bold text-xs uppercase hover:bg-[#E58B4E] transition-colors disabled:opacity-50 flex items-center gap-1.5"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              <span>BUSCAR</span>
            </button>
          </div>
        </form>

        {/* Error Notice */}
        {errorMsg && (
          <div className="p-3 bg-red-950/40 border border-red-800/50 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Result Found: Simple Flat Data */}
        {searched && participant && (
          <div className="border border-[#23272F] p-4 bg-[#14161C] space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-[#23272F] pb-2">
              <span className="text-[#588157] font-bold uppercase flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                <span>ESTÁS REGISTRADO</span>
              </span>
              <span className="text-[#D97736] font-bold">
                DORSAL #{participant.registrationCode}
              </span>
            </div>

            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Corredor:</span>
                <span className="text-white font-bold uppercase">
                  {participant.firstName} {participant.lastName}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#6B7280]">DNI:</span>
                <span className="text-white">{participant.dni}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#6B7280]">Modalidad:</span>
                <span className="text-white">
                  {participant.modality === 'circuito_largo' ? 'Circuito Largo (7,5 km)' : 'Circuito Corto (5,14 km)'}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#6B7280]">Ciudad:</span>
                <span className="text-white">{participant.locality}</span>
              </div>
            </div>

            <p className="pt-2 border-t border-[#23272F] text-[11px] text-[#9CA3AF] font-sans">
              Recordá concurrir a la acreditación con <strong>1 alimento no perecedero</strong>.
            </p>
          </div>
        )}

        {/* Result Not Found */}
        {searched && !participant && !errorMsg && (
          <div className="border border-[#23272F] p-4 text-center space-y-3 bg-[#14161C]">
            <p className="text-xs text-[#9CA3AF]">
              No encontramos registros con el DNI <span className="text-white font-mono">{dniInput}</span>.
            </p>
            <button
              type="button"
              onClick={() => {
                handleClose();
                onGoToRegister();
              }}
              className="px-4 py-2 bg-white text-black font-bold text-xs uppercase hover:bg-[#E5E7EB] transition-colors"
            >
              Anotarme Ahora
            </button>
          </div>
        )}

        {/* Close */}
        <div className="flex justify-end pt-2">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-[#181B22] text-[#9CA3AF] hover:text-white border border-[#23272F] text-xs font-mono uppercase transition-colors"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};
