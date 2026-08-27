import React, { useState, useRef } from 'react';
import {
  UserPlus,
  ArrowRight,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { RegistrationFormData, Participant, CircuitModality } from '../../types';
import { registerParticipant } from '../../services/registrationService';
import { RegistrationSuccessModal } from '../ui/RegistrationSuccessModal';
import { RevealOnScroll } from '../ui/RevealOnScroll';

interface RegistrationFormProps {
  onOpenTerms?: () => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ onOpenTerms }) => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    firstName: '',
    lastName: '',
    dni: '',
    birthDate: '',
    phone: '',
    email: '',
    locality: '',
    modality: 'circuito_largo',
    emergencyContactName: '',
    emergencyContactPhone: '',
    trailExperience: 'beginner',
    weeklyKilometers: '',
    referralSource: '',
    declaredAccurate: false,
    acceptedRules: false,
    acceptedTerms: false,
    acceptedDonation: false,
    declaredFitness: false,
  });

  // Honeypot anti-bot
  const [honeypot, setHoneypot] = useState('');
  const lastSubmitTime = useRef<number>(0);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [createdParticipant, setCreatedParticipant] = useState<Participant | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (name === 'dni') {
      // Permitir solo números y limitar a 10 caracteres
      const numeric = value.replace(/\D/g, '').slice(0, 10);
      setFormData((prev) => ({ ...prev, [name]: numeric }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const setModality = (mod: CircuitModality) => {
    setFormData((prev) => ({ ...prev, modality: mod }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // 1. Detección de Bot vía Honeypot
    if (honeypot.trim() !== '') {
      console.warn('Bot submission blocked via honeypot.');
      return;
    }

    // 2. Throttling anti-flood (mínimo 2.5s entre reintentos)
    const now = Date.now();
    if (now - lastSubmitTime.current < 2500) {
      setErrorMsg('Por favor esperá un instante antes de volver a enviar.');
      return;
    }
    lastSubmitTime.current = now;

    const cleanDni = formData.dni.replace(/\D/g, '').trim();

    // 3. Validaciones de presencia
    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !cleanDni ||
      !formData.birthDate ||
      !formData.phone.trim() ||
      !formData.email.trim() ||
      !formData.locality.trim() ||
      !formData.emergencyContactName.trim() ||
      !formData.emergencyContactPhone.trim()
    ) {
      setErrorMsg('Por favor completá todos los campos requeridos.');
      return;
    }

    // 4. Validaciones de longitud y formato
    if (formData.firstName.trim().length < 2) {
      setErrorMsg('El nombre debe tener al menos 2 caracteres.');
      return;
    }

    if (formData.lastName.trim().length < 2) {
      setErrorMsg('El apellido debe tener al menos 2 caracteres.');
      return;
    }

    if (cleanDni.length < 6 || cleanDni.length > 10) {
      setErrorMsg('Ingresá un número de DNI válido (entre 6 y 10 dígitos).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMsg('Ingresá un formato de email válido (ej: nombre@dominio.com).');
      return;
    }

    // 5. Verificación de casillas obligatorias
    if (
      !formData.declaredAccurate ||
      !formData.acceptedRules ||
      !formData.acceptedTerms ||
      !formData.acceptedDonation ||
      !formData.declaredFitness
    ) {
      setErrorMsg('Por favor aceptá todas las condiciones para completar tu registro.');
      return;
    }

    setLoading(true);

    try {
      const result = await registerParticipant(formData);
      if (result.success && result.participant) {
        setCreatedParticipant(result.participant);
        setSuccessModalOpen(true);
        setFormData({
          firstName: '',
          lastName: '',
          dni: '',
          birthDate: '',
          phone: '',
          email: '',
          locality: '',
          modality: 'circuito_largo',
          emergencyContactName: '',
          emergencyContactPhone: '',
          trailExperience: 'beginner',
          weeklyKilometers: '',
          referralSource: '',
          declaredAccurate: false,
          acceptedRules: false,
          acceptedTerms: false,
          acceptedDonation: false,
          declaredFitness: false,
        });
      } else {
        setErrorMsg(result.error || 'Ocurrió un error al procesar tu registro.');
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Error de conexión. Intentá nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="registro" className="py-20 sm:py-28 px-4 sm:px-6 relative border-t border-[#1C1F26]">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <RevealOnScroll>
          <div className="text-center space-y-2 mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A1815] border border-[#3D2817] text-[#D97736] text-xs font-mono tracking-widest uppercase">
              <UserPlus className="w-3.5 h-3.5" />
              <span>REGISTRO</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white uppercase">
              ANOTATE AQUI
            </h2>
            <p className="text-xs sm:text-sm text-[#9CA3AF] max-w-lg mx-auto">
              Completá tus datos para registrarte.
            </p>
          </div>
        </RevealOnScroll>

        {/* Form Container */}
        <RevealOnScroll delay={100}>
          <form
            onSubmit={handleSubmit}
            className="bg-[#0F1115] border border-[#23272F] rounded-2xl p-6 sm:p-10 space-y-6"
            autoComplete="on"
          >
            {/* Honeypot invisible para bloquear bots */}
            <div className="hidden" aria-hidden="true">
              <input
                type="text"
                name="website_trap"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-800/50 text-red-300 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Selector de Modalidad */}
            <div>
              <label className="block text-xs font-mono text-[#9CA3AF] uppercase mb-2">
                Elegí tu Modalidad *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setModality('circuito_largo')}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    formData.modality === 'circuito_largo'
                      ? 'bg-[#1D1712] border-[#D97736] text-white shadow-sm'
                      : 'bg-[#14161C] border-[#23272F] text-[#9CA3AF] hover:border-[#353A45]'
                  }`}
                >
                  <span className="block text-xs font-mono text-[#D97736] font-bold uppercase">
                    Circuito Largo
                  </span>
                  <span className="block text-base font-bold text-white mt-0.5">
                    7,5 km / ~390m D+
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setModality('circuito_corto')}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    formData.modality === 'circuito_corto'
                      ? 'bg-[#1D1712] border-[#D97736] text-white shadow-sm'
                      : 'bg-[#14161C] border-[#23272F] text-[#9CA3AF] hover:border-[#353A45]'
                  }`}
                >
                  <span className="block text-xs font-mono text-[#D97736] font-bold uppercase">
                    Circuito Corto
                  </span>
                  <span className="block text-base font-bold text-white mt-0.5">
                    5,14 km / ~220m D+
                  </span>
                </button>
              </div>
            </div>

            {/* Datos Personales */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-[#9CA3AF] uppercase mb-1">
                  Nombre *
                </label>
                <input
                  type="text"
                  name="firstName"
                  maxLength={40}
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-[#14161C] border border-[#23272F] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#D97736] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#9CA3AF] uppercase mb-1">
                  Apellido *
                </label>
                <input
                  type="text"
                  name="lastName"
                  maxLength={40}
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-[#14161C] border border-[#23272F] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#D97736] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#9CA3AF] uppercase mb-1">
                  DNI / Documento *
                </label>
                <input
                  type="text"
                  name="dni"
                  maxLength={10}
                  inputMode="numeric"
                  value={formData.dni}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-[#14161C] border border-[#23272F] rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-[#D97736] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#9CA3AF] uppercase mb-1">
                  Fecha de Nacimiento *
                </label>
                <input
                  type="date"
                  name="birthDate"
                  min="1930-01-01"
                  max="2012-12-31"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-[#14161C] border border-[#23272F] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#D97736] transition-all [color-scheme:dark]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#9CA3AF] uppercase mb-1">
                  WhatsApp / Teléfono *
                </label>
                <input
                  type="tel"
                  name="phone"
                  maxLength={20}
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-[#14161C] border border-[#23272F] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#D97736] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#9CA3AF] uppercase mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  maxLength={80}
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-[#14161C] border border-[#23272F] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#D97736] transition-all"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-mono text-[#9CA3AF] uppercase mb-1">
                  Ciudad / Localidad *
                </label>
                <input
                  type="text"
                  name="locality"
                  maxLength={50}
                  value={formData.locality}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-[#14161C] border border-[#23272F] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#D97736] transition-all"
                />
              </div>
            </div>

            {/* Contacto de Emergencia */}
            <div className="pt-2 border-t border-[#1E222A]">
              <span className="block text-xs font-mono text-[#D97736] uppercase tracking-wider mb-3">
                Contacto de Emergencia
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[#9CA3AF] uppercase mb-1">
                    Nombre y vínculo *
                  </label>
                  <input
                    type="text"
                    name="emergencyContactName"
                    maxLength={50}
                    value={formData.emergencyContactName}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-[#14161C] border border-[#23272F] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#D97736] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#9CA3AF] uppercase mb-1">
                    Teléfono de Emergencia *
                  </label>
                  <input
                    type="tel"
                    name="emergencyContactPhone"
                    maxLength={20}
                    value={formData.emergencyContactPhone}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-[#14161C] border border-[#23272F] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#D97736] transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Declaraciones Simples */}
            <div className="pt-2 border-t border-[#1E222A] space-y-2.5 text-xs text-[#9CA3AF]">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="declaredAccurate"
                  checked={formData.declaredAccurate}
                  onChange={handleInputChange}
                  className="mt-0.5 accent-[#D97736] rounded"
                />
                <span>Declaro que los datos proporcionados son correctos.</span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="acceptedRules"
                  checked={formData.acceptedRules}
                  onChange={handleInputChange}
                  className="mt-0.5 accent-[#D97736] rounded"
                />
                <span>Acepto el reglamento y bases del desafío.</span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="acceptedTerms"
                  checked={formData.acceptedTerms}
                  onChange={handleInputChange}
                  className="mt-0.5 accent-[#D97736] rounded"
                />
                <span>
                  Acepto los{' '}
                  {onOpenTerms ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        onOpenTerms();
                      }}
                      className="text-[#D97736] underline hover:text-[#E58B4E]"
                    >
                      Términos y Condiciones
                    </button>
                  ) : (
                    'Términos y Condiciones'
                  )}
                  .
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="acceptedDonation"
                  checked={formData.acceptedDonation}
                  onChange={handleInputChange}
                  className="mt-0.5 accent-[#D97736] rounded"
                />
                <span>
                  Me comprometo a entregar <strong>1 alimento no perecedero</strong> en la acreditación.
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="declaredFitness"
                  checked={formData.declaredFitness}
                  onChange={handleInputChange}
                  className="mt-0.5 accent-[#D97736] rounded"
                />
                <span>Declaro encontrarme en aptitud física adecuada para la actividad.</span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-[#D97736] text-white font-bold text-xs tracking-wider uppercase hover:bg-[#E58B4E] active:scale-[0.99] disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#D97736]/20"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>REGISTRANDO...</span>
                  </>
                ) : (
                  <>
                    <span>CONFIRMAR REGISTRO</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </form>
        </RevealOnScroll>

      </div>

      {/* Confirmation Modal */}
      <RegistrationSuccessModal
        isOpen={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
        participant={createdParticipant}
      />
    </section>
  );
};
