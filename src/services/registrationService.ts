import { supabase, isSupabaseConfigured } from '../lib/supabase';
import {
  RegistrationFormData,
  RegistrationSubmissionResult,
  VerificationResult,
  Participant,
} from '../types';
import { checkRateLimit, recordRateLimitAttempt } from './rateLimiter';

const LOCAL_STORAGE_KEY = 'desafio_backyard_participants';

/**
 * Sanitiza una cadena de texto eliminando etiquetas HTML, caracteres de control
 * y recortando la longitud máxima para prevenir desbordes y ataques XSS.
 */
export const sanitizeText = (input: string | undefined | null, maxLength = 60): string => {
  if (!input) return '';
  return String(input)
    .replace(/<[^>]*>?/gm, '') // Elimina etiquetas HTML/Scripts
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // Elimina caracteres de control
    .trim()
    .slice(0, maxLength);
};

export const getLocalParticipants = (): Participant[] => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error al leer de localStorage:', e);
    return [];
  }
};

export const saveLocalParticipant = (participant: Participant) => {
  try {
    const list = getLocalParticipants();
    const existingIndex = list.findIndex((p) => p.dni === participant.dni);
    if (existingIndex >= 0) {
      list[existingIndex] = participant;
    } else {
      list.push(participant);
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error('Error al guardar en localStorage:', e);
  }
};

export const removeLocalParticipantByDni = (dni: string) => {
  try {
    const list = getLocalParticipants();
    const filtered = list.filter((p) => p.dni !== dni);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));
  } catch (e) {
    console.error('Error al eliminar de localStorage:', e);
  }
};

export const clearAllLocalParticipants = () => {
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  } catch (e) {
    console.error('Error limpiando localStorage:', e);
  }
};

// Generar número de registro simple (del 1 al 200)
const generateSimpleRegistrationNumber = async (): Promise<string> => {
  let count = 0;
  if (isSupabaseConfigured) {
    try {
      const { count: dbCount } = await supabase
        .from('participants')
        .select('*', { count: 'exact', head: true });
      if (dbCount !== null && dbCount !== undefined) {
        count = dbCount;
      }
    } catch (e) {
      count = getLocalParticipants().length;
    }
  } else {
    count = getLocalParticipants().length;
  }

  const nextNumber = Math.min(Math.max(count + 1, 1), 200);
  return String(nextNumber).padStart(3, '0');
};

export const REGISTRATIONS_OPEN = false;

/**
 * Registra un nuevo participante con Rate Limiting, validación estricta y sanitización.
 */
export const registerParticipant = async (
  formData: RegistrationFormData
): Promise<RegistrationSubmissionResult> => {
  // 0. Comprobación de inscripciones abiertas
  if (!REGISTRATIONS_OPEN) {
    return {
      success: false,
      error: 'El registro online ha concluido. ¡Te esperamos directamente este sábado!',
    };
  }

  // 1. Verificación de Rate Limit
  const rateLimit = checkRateLimit();
  if (!rateLimit.allowed) {
    return {
      success: false,
      error: rateLimit.error || 'Límite de solicitudes alcanzado. Por favor esperá unos minutos.',
    };
  }

  // Registrar intento en el Rate Limiter
  recordRateLimitAttempt();

  // 2. Sanitización de campos
  const cleanFirstName = sanitizeText(formData.firstName, 40);
  const cleanLastName = sanitizeText(formData.lastName, 40);
  const cleanDni = formData.dni.replace(/\D/g, '').trim().slice(0, 10);
  const cleanPhone = sanitizeText(formData.phone, 25);
  const cleanEmail = sanitizeText(formData.email, 80).toLowerCase();
  const cleanLocality = sanitizeText(formData.locality, 50);
  const cleanEmergencyName = sanitizeText(formData.emergencyContactName, 50);
  const cleanEmergencyPhone = sanitizeText(formData.emergencyContactPhone, 25);
  const cleanModality = formData.modality === 'circuito_corto' ? 'circuito_corto' : 'circuito_largo';

  // 3. Validaciones de integridad y formato
  if (!cleanFirstName || cleanFirstName.length < 2) {
    return { success: false, error: 'El nombre debe tener al menos 2 caracteres válidos.' };
  }
  if (!cleanLastName || cleanLastName.length < 2) {
    return { success: false, error: 'El apellido debe tener al menos 2 caracteres válidos.' };
  }
  if (!cleanDni || cleanDni.length < 6 || cleanDni.length > 10) {
    return { success: false, error: 'El número de DNI debe tener entre 6 y 10 dígitos numéricos.' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!cleanEmail || !emailRegex.test(cleanEmail)) {
    return { success: false, error: 'Por favor ingresá una dirección de email válida.' };
  }

  if (!cleanPhone || cleanPhone.length < 6) {
    return { success: false, error: 'Por favor ingresá un número de teléfono o WhatsApp válido.' };
  }

  if (!formData.birthDate) {
    return { success: false, error: 'La fecha de nacimiento es obligatoria.' };
  }

  // 4. Verificar si ya existe registro previo con este DNI
  const existing = await getParticipantByDni(cleanDni);
  if (existing.found && existing.participant) {
    return {
      success: false,
      error: `Ya existe un registro con el DNI ${cleanDni} (${existing.participant.firstName} ${existing.participant.lastName}). Podés consultar tu estado en "Ver mi registro".`,
    };
  }

  const timestamp = new Date().toISOString();
  const registrationCode = await generateSimpleRegistrationNumber();

  const newParticipant: Participant = {
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `local-${Date.now()}`,
    registrationCode,
    firstName: cleanFirstName,
    lastName: cleanLastName,
    dni: cleanDni,
    birthDate: formData.birthDate,
    phone: cleanPhone,
    email: cleanEmail,
    locality: cleanLocality,
    modality: cleanModality,
    emergencyContactName: cleanEmergencyName,
    emergencyContactPhone: cleanEmergencyPhone,
    trailExperience: formData.trailExperience || 'beginner',
    weeklyKilometers: formData.weeklyKilometers || 'N/A',
    referralSource: formData.referralSource || 'Directo',
    status: 'CONFIRMADO',
    createdAt: timestamp,
  };

  // Guardar en local
  saveLocalParticipant(newParticipant);

  // Si Supabase está configurado, guardar en la base de datos
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('participants')
        .insert([
          {
            registration_code: newParticipant.registrationCode,
            first_name: newParticipant.firstName,
            last_name: newParticipant.lastName,
            dni: newParticipant.dni,
            birth_date: newParticipant.birthDate,
            phone: newParticipant.phone,
            email: newParticipant.email,
            locality: newParticipant.locality,
            modality: newParticipant.modality,
            emergency_contact_name: newParticipant.emergencyContactName,
            emergency_contact_phone: newParticipant.emergencyContactPhone,
            trail_experience: newParticipant.trailExperience,
            weekly_kilometers: newParticipant.weeklyKilometers,
            referral_source: newParticipant.referralSource,
            status: newParticipant.status,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error('Error insertando en Supabase:', error);
        if (error.code === '23505') {
          return {
            success: false,
            error: `El DNI ${cleanDni} ya se encuentra registrado en el sistema.`,
          };
        }
      } else if (data) {
        newParticipant.id = data.id;
      }
    } catch (dbError) {
      console.warn('Excepción al conectar con Supabase. Guardado en modo local fallback:', dbError);
    }
  } else {
    await new Promise((resolve) => setTimeout(resolve, 300));
  }

  return {
    success: true,
    registrationId: newParticipant.registrationCode,
    participant: newParticipant,
    timestamp,
  };
};

/**
 * Consulta un participante por su número de DNI.
 */
export const getParticipantByDni = async (dni: string): Promise<VerificationResult> => {
  const cleanDni = dni.replace(/\D/g, '').trim().slice(0, 10);

  if (!cleanDni || cleanDni.length < 6) {
    return {
      found: false,
      error: 'Ingresá un número de DNI válido.',
    };
  }

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('participants')
        .select('*')
        .eq('dni', cleanDni)
        .maybeSingle();

      if (!error) {
        if (data) {
          const participant: Participant = {
            id: data.id,
            registrationCode: data.registration_code || `${cleanDni}`,
            firstName: data.first_name,
            lastName: data.last_name,
            dni: data.dni,
            birthDate: data.birth_date,
            phone: data.phone,
            email: data.email,
            locality: data.locality,
            modality: data.modality,
            emergencyContactName: data.emergency_contact_name,
            emergencyContactPhone: data.emergency_contact_phone,
            trailExperience: data.trail_experience,
            weeklyKilometers: data.weekly_kilometers,
            referralSource: data.referral_source,
            status: data.status || 'CONFIRMADO',
            createdAt: data.created_at,
          };
          return {
            found: true,
            participant,
          };
        } else {
          removeLocalParticipantByDni(cleanDni);
          return {
            found: false,
          };
        }
      } else {
        console.warn('Error consultando Supabase por DNI:', error);
      }
    } catch (e) {
      console.warn('Fallo de red Supabase, buscando en almacenamiento local fallback:', e);
    }
  }

  // Fallback para modo offline / sin Supabase
  const localList = getLocalParticipants();
  const match = localList.find((p) => p.dni === cleanDni);

  if (match) {
    return {
      found: true,
      participant: match,
    };
  }

  return {
    found: false,
  };
};
