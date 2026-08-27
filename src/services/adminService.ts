import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Participant } from '../types';

const STORAGE_KEY = 'desafio_backyard_participants';

export const adminLogin = async (email: string, password: string) => {
  if (!isSupabaseConfigured) {
    if (email === 'admin@backyard.com' && password === 'admin123') {
      localStorage.setItem('desafio_admin_session', JSON.stringify({ email, authenticated: true }));
      return { success: true, user: { email } };
    }
    return {
      success: false,
      error: 'Supabase no está configurado aún en .env. Podés ingresar con admin@backyard.com / admin123 para modo demo local.',
    };
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, user: data.user, session: data.session };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Error al iniciar sesión' };
  }
};

export const adminLogout = async () => {
  localStorage.removeItem('desafio_admin_session');
  if (isSupabaseConfigured) {
    await supabase.auth.signOut();
  }
};

export const checkAdminSession = async () => {
  if (!isSupabaseConfigured) {
    const local = localStorage.getItem('desafio_admin_session');
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (parsed.authenticated) {
          return { isAuthenticated: true, user: { email: parsed.email } };
        }
      } catch (e) {
        // ignore
      }
    }
    return { isAuthenticated: false, user: null };
  }

  try {
    const { data } = await supabase.auth.getSession();
    if (data?.session?.user) {
      return { isAuthenticated: true, user: data.session.user };
    }
    return { isAuthenticated: false, user: null };
  } catch (e) {
    return { isAuthenticated: false, user: null };
  }
};

export const getAllParticipantsAdmin = async (): Promise<Participant[]> => {
  let list: Participant[] = [];

  // Try Supabase first
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('participants')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        list = data.map((row) => ({
          id: row.id,
          registrationCode: row.registration_code,
          firstName: row.first_name,
          lastName: row.last_name,
          dni: row.dni,
          birthDate: row.birth_date,
          phone: row.phone,
          email: row.email,
          locality: row.locality,
          modality: row.modality,
          emergencyContactName: row.emergency_contact_name,
          emergencyContactPhone: row.emergency_contact_phone,
          trailExperience: row.trail_experience,
          weeklyKilometers: row.weekly_kilometers,
          referralSource: row.referral_source,
          status: row.status,
          createdAt: row.created_at,
        }));
        return list;
      }
    } catch (e) {
      console.warn('Could not fetch from Supabase, checking local storage:', e);
    }
  }

  // Fallback to local storage
  const localData = localStorage.getItem(STORAGE_KEY);
  if (localData) {
    try {
      list = JSON.parse(localData);
    } catch (e) {
      list = [];
    }
  }

  return list;
};

/**
 * Elimina un participante tanto de Supabase como de LocalStorage
 */
export const deleteParticipantAdmin = async (
  id: string,
  dni?: string
): Promise<{ success: boolean; error?: string }> => {
  let supabaseSuccess = true;
  let errorMsg: string | undefined = undefined;

  // 1. Eliminar de Supabase
  if (isSupabaseConfigured) {
    try {
      let query = supabase.from('participants').delete();
      if (dni) {
        query = query.or(`id.eq.${id},dni.eq.${dni}`);
      } else {
        query = query.eq('id', id);
      }

      const { error } = await query;
      if (error) {
        console.error('Error al eliminar en Supabase:', error);
        supabaseSuccess = false;
        errorMsg = error.message;
      }
    } catch (e: any) {
      console.error('Excepción al eliminar en Supabase:', e);
      supabaseSuccess = false;
      errorMsg = e?.message || 'Error de conexión con Supabase';
    }
  }

  // 2. Eliminar de LocalStorage (por id y por dni)
  try {
    const localData = localStorage.getItem(STORAGE_KEY);
    if (localData) {
      const list: Participant[] = JSON.parse(localData);
      const filtered = list.filter((p) => p.id !== id && (!dni || p.dni !== dni));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    }
  } catch (e) {
    console.error('Error eliminando de localStorage:', e);
  }

  return { success: supabaseSuccess, error: errorMsg };
};

/**
 * Vacía todos los registros (tanto de Supabase como de LocalStorage) para pruebas previas al lanzamiento
 */
export const clearAllParticipantsAdmin = async (): Promise<{ success: boolean; error?: string }> => {
  let supabaseSuccess = true;
  let errorMsg: string | undefined = undefined;

  if (isSupabaseConfigured) {
    try {
      const { error } = await supabase
        .from('participants')
        .delete()
        .neq('status', 'DUMMY_NEVER_MATCH');
      if (error) {
        supabaseSuccess = false;
        errorMsg = error.message;
      }
    } catch (e: any) {
      supabaseSuccess = false;
      errorMsg = e?.message || 'Error al vaciar base de datos';
    }
  }

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    // ignore
  }

  return { success: supabaseSuccess, error: errorMsg };
};

// Exportación JSON para aplicaciones offline
export const exportParticipantsToJson = (participants: Participant[]) => {
  const jsonContent = JSON.stringify(participants, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  const dateStr = new Date().toISOString().split('T')[0];
  link.setAttribute('download', `participantes_backyard_${dateStr}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Standard complete CSV Export
export const exportParticipantsToCsv = (participants: Participant[]) => {
  const headers = [
    'Código de Registro',
    'Nombre',
    'Apellido',
    'Nombre Completo',
    'DNI',
    'Fecha de Nacimiento',
    'Teléfono / WhatsApp',
    'Email',
    'Ciudad / Localidad',
    'Modalidad',
    'Modalidad ID',
    'Contacto Emergencia Nombre',
    'Contacto Emergencia Teléfono',
    'Experiencia',
    'Estado',
    'Fecha de Registro',
  ];

  const escapeCsv = (str: string | undefined | null) => {
    if (!str) return '""';
    const clean = String(str).replace(/"/g, '""');
    return `"${clean}"`;
  };

  const rows = participants.map((p) => [
    escapeCsv(p.registrationCode),
    escapeCsv(p.firstName),
    escapeCsv(p.lastName),
    escapeCsv(`${p.firstName} ${p.lastName}`.trim()),
    escapeCsv(p.dni),
    escapeCsv(p.birthDate),
    escapeCsv(p.phone),
    escapeCsv(p.email),
    escapeCsv(p.locality),
    escapeCsv(p.modality === 'circuito_largo' ? 'Circuito Largo (7,5 km)' : 'Circuito Corto (5,14 km)'),
    escapeCsv(p.modality === 'circuito_largo' ? 'LARGO' : 'CORTO'),
    escapeCsv(p.emergencyContactName),
    escapeCsv(p.emergencyContactPhone),
    escapeCsv(p.trailExperience),
    escapeCsv(p.status),
    escapeCsv(p.createdAt ? new Date(p.createdAt).toLocaleString('es-AR') : ''),
  ]);

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  const dateStr = new Date().toISOString().split('T')[0];
  link.setAttribute('download', `participantes_backyard_completo_${dateStr}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Specialized Timing / Cronometraje CSV Export (optimized for offline race clock/timing systems)
export const exportTimingCsv = (participants: Participant[]) => {
  const headers = [
    'Dorsal_Codigo',
    'DNI',
    'Corredor',
    'Modalidad',
    'Modalidad_ID',
    'V1_Tiempo',
    'V2_Tiempo',
    'V3_Tiempo',
    'V4_Tiempo',
    'V5_Tiempo',
    'V6_Tiempo',
    'Total_Vueltas',
    'Tiempo_Acumulado',
    'Estado',
    'Telefono',
    'Emergencia',
  ];

  const escapeCsv = (str: string | undefined | null) => {
    if (!str) return '""';
    const clean = String(str).replace(/"/g, '""');
    return `"${clean}"`;
  };

  const rows = participants.map((p) => [
    escapeCsv(p.registrationCode),
    escapeCsv(p.dni),
    escapeCsv(`${p.lastName.toUpperCase()}, ${p.firstName}`.trim()),
    escapeCsv(p.modality === 'circuito_largo' ? '7.5K Largo' : '5.14K Corto'),
    escapeCsv(p.modality === 'circuito_largo' ? 'LARGO' : 'CORTO'),
    '""', // V1
    '""', // V2
    '""', // V3
    '""', // V4
    '""', // V5
    '""', // V6
    '0',  // Total Vueltas
    '00:00:00', // Tiempo Acumulado
    escapeCsv(p.status),
    escapeCsv(p.phone),
    escapeCsv(`${p.emergencyContactName} (${p.emergencyContactPhone})`),
  ]);

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  const dateStr = new Date().toISOString().split('T')[0];
  link.setAttribute('download', `cronometraje_backyard_timing_${dateStr}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
