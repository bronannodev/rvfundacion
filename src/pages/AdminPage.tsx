import React, { useState, useEffect } from 'react';
import {
  Lock,
  LogOut,
  Download,
  Search,
  Trash2,
  RefreshCw,
  Loader2,
  AlertCircle,
  ExternalLink,
  ArrowLeft,
  Compass,
  Users,
  MessageSquare,
  Timer,
  FileCode,
} from 'lucide-react';
import {
  adminLogin,
  adminLogout,
  checkAdminSession,
  getAllParticipantsAdmin,
  deleteParticipantAdmin,
  exportParticipantsToCsv,
  exportParticipantsToJson,
  exportTimingCsv,
} from '../services/adminService';
import { Participant } from '../types';

export const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const [participants, setParticipants] = useState<Participant[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterModality, setFilterModality] = useState<'all' | 'circuito_largo' | 'circuito_corto'>('all');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    verifySession();
  }, []);

  const verifySession = async () => {
    const session = await checkAdminSession();
    if (session.isAuthenticated) {
      setIsAuthenticated(true);
      setAdminUser(session.user);
      loadParticipants();
    } else {
      setIsAuthenticated(false);
      setAdminUser(null);
    }
  };

  const loadParticipants = async () => {
    setDataLoading(true);
    try {
      const data = await getAllParticipantsAdmin();
      setParticipants(data);
    } catch (e) {
      console.error(e);
    } finally {
      setDataLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoginLoading(true);

    try {
      const result = await adminLogin(email, password);
      if (result.success) {
        setIsAuthenticated(true);
        setAdminUser(result.user);
        setEmail('');
        setPassword('');
        loadParticipants();
      } else {
        setLoginError(result.error || 'Credenciales no válidas');
      }
    } catch (err: any) {
      setLoginError(err?.message || 'Error de autenticación');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await adminLogout();
    setIsAuthenticated(false);
    setAdminUser(null);
    setParticipants([]);
  };

  const handleDelete = async (id: string, dni: string, name: string) => {
    if (window.confirm(`¿Confirmás la eliminación del registro de ${name} (DNI: ${dni})?`)) {
      setDeletingId(id);
      const res = await deleteParticipantAdmin(id, dni);
      if (!res.success && res.error) {
        alert(`Atención al eliminar en la base de datos: ${res.error}`);
      }
      await loadParticipants();
      setDeletingId(null);
    }
  };

  const navigateToHome = () => {
    window.location.href = '/';
  };

  // Filter participants
  const filteredParticipants = participants.filter((p) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      `${p.firstName} ${p.lastName}`.toLowerCase().includes(query) ||
      p.dni.includes(query) ||
      p.email.toLowerCase().includes(query) ||
      p.registrationCode.toLowerCase().includes(query) ||
      p.locality.toLowerCase().includes(query);

    const matchesModality = filterModality === 'all' || p.modality === filterModality;

    return matchesSearch && matchesModality;
  });

  const countLargo = participants.filter((p) => p.modality === 'circuito_largo').length;
  const countCorto = participants.filter((p) => p.modality === 'circuito_corto').length;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FAFAFA] font-sans antialiased selection:bg-[#FF3D00] selection:text-[#0A0A0A] flex flex-col">
      
      {/* Top Accent Line */}
      <div className="h-1 w-full bg-[#FF3D00]" />

      {/* Clean Header */}
      <header className="border-b border-[#262626] bg-[#0A0A0A]/95 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={navigateToHome}
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#737373] hover:text-[#FAFAFA] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a la Web</span>
            </button>

            <span className="text-[#262626]">/</span>

            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FAFAFA]">
              Panel de Administración
            </span>
          </div>

          {isAuthenticated && (
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-xs font-mono text-[#737373]">
                {adminUser?.email}
              </span>

              <button
                onClick={handleLogout}
                className="px-3 py-1.5 border border-[#262626] text-xs font-mono uppercase tracking-wider text-[#737373] hover:text-red-400 hover:border-red-500/50 transition-all flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Salir</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {!isAuthenticated ? (
          /* ========================================================================= */
          /* LOGIN SCREEN — SIMPLE & FRIENDLY                                         */
          /* ========================================================================= */
          <div className="flex-1 flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-sm space-y-6">
              
              <div className="text-center space-y-1">
                <span className="text-xs font-mono tracking-widest text-[#FF3D00] uppercase block">
                  ACCESO RESTRINGIDO
                </span>
                <h1 className="text-2xl sm:text-3xl font-black uppercase text-[#FAFAFA] tracking-tight">
                  INICIAR SESIÓN
                </h1>
                <p className="text-xs text-[#737373] font-mono">
                  Ingresá con tu cuenta para gestionar los participantes.
                </p>
              </div>

              {loginError && (
                <div className="p-3 border border-[#FF3D00] bg-[#141414] text-[#FAFAFA] text-xs font-mono flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-[#FF3D00] shrink-0 mt-0.5" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#737373]">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="usuario@ejemplo.com"
                    required
                    className="w-full bg-[#141414] border border-[#262626] rounded-none px-3.5 py-2.5 text-sm text-[#FAFAFA] placeholder-[#525252] focus:border-[#FF3D00] focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#737373]">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full bg-[#141414] border border-[#262626] rounded-none px-3.5 py-2.5 text-sm text-[#FAFAFA] placeholder-[#525252] focus:border-[#FF3D00] focus:outline-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full py-3 bg-[#FF3D00] text-[#0A0A0A] uppercase tracking-wider font-bold text-xs rounded-none hover:bg-[#ff5722] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loginLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>VERIFICANDO...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>INGRESAR AL PANEL</span>
                    </>
                  )}
                </button>
              </form>

            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /* DASHBOARD SCREEN — CLEAN, FRIENDLY & TIMING-READY                         */
          /* ========================================================================= */
          <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8">
            
            {/* Title & Actions Row */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#262626] pb-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black uppercase text-[#FAFAFA] tracking-tight">
                  PARTICIPANTES
                </h1>
                <p className="text-xs font-mono text-[#737373] mt-1">
                  Listado oficial sincronizado con Supabase
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={loadParticipants}
                  disabled={dataLoading}
                  className="px-3 py-2 border border-[#262626] text-xs font-mono uppercase tracking-wider text-[#FAFAFA] hover:border-[#FF3D00] hover:text-[#FF3D00] transition-colors flex items-center gap-1.5"
                  title="Recargar participantes"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${dataLoading ? 'animate-spin' : ''}`} />
                  <span>Actualizar</span>
                </button>

                {/* JSON Export Button */}
                <button
                  onClick={() => exportParticipantsToJson(participants)}
                  disabled={participants.length === 0}
                  className="px-3 py-2 border border-[#3A3A3A] bg-[#171717] text-[#FAFAFA] font-bold text-xs font-mono uppercase tracking-wider hover:border-[#FAFAFA] transition-all flex items-center gap-1.5 disabled:opacity-50"
                  title="Descargar datos en formato JSON para software offline / IA"
                >
                  <FileCode className="w-3.5 h-3.5 text-[#FF3D00]" />
                  <span>JSON</span>
                </button>

                {/* Timing Export Button */}
                <button
                  onClick={() => exportTimingCsv(participants)}
                  disabled={participants.length === 0}
                  className="px-3 py-2 border border-[#FF3D00] text-[#FF3D00] bg-[#1A1A1A] font-bold text-xs font-mono uppercase tracking-wider hover:bg-[#FF3D00] hover:text-[#0A0A0A] transition-all flex items-center gap-1.5 disabled:opacity-50"
                  title="Descargar plantilla lista para cronometraje por vueltas"
                >
                  <Timer className="w-3.5 h-3.5" />
                  <span>CSV Cronometraje</span>
                </button>

                {/* Complete Export Button */}
                <button
                  onClick={() => exportParticipantsToCsv(participants)}
                  disabled={participants.length === 0}
                  className="px-3.5 py-2 bg-[#FAFAFA] text-[#0A0A0A] font-bold text-xs font-mono uppercase tracking-wider hover:bg-[#E5E5E5] transition-all flex items-center gap-1.5 disabled:opacity-50"
                  title="Descargar listado completo con todos los datos"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>CSV Completo</span>
                </button>
              </div>
            </div>

            {/* Quick Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 sm:p-5 bg-[#121212] border border-[#262626] flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#737373] block">
                    TOTAL REGISTRADOS
                  </span>
                  <span className="text-3xl sm:text-4xl font-black font-mono text-[#FAFAFA] block mt-0.5">
                    {participants.length}
                  </span>
                </div>
                <Users className="w-5 h-5 text-[#737373]" />
              </div>

              <div className="p-4 sm:p-5 bg-[#121212] border border-[#262626] flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#737373] block">
                    CIRCUITO LARGO (7,5K)
                  </span>
                  <span className="text-3xl sm:text-4xl font-black font-mono text-[#FF3D00] block mt-0.5">
                    {countLargo}
                  </span>
                </div>
                <Compass className="w-5 h-5 text-[#FF3D00]" />
              </div>

              <div className="p-4 sm:p-5 bg-[#121212] border border-[#262626] flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#737373] block">
                    CIRCUITO CORTO (5,14K)
                  </span>
                  <span className="text-3xl sm:text-4xl font-black font-mono text-[#FAFAFA] block mt-0.5">
                    {countCorto}
                  </span>
                </div>
                <Compass className="w-5 h-5 text-[#737373]" />
              </div>
            </div>

            {/* Search & Modality Filters */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                
                {/* Search Bar */}
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-[#737373] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar por nombre, DNI, ciudad..."
                    className="w-full bg-[#141414] border border-[#262626] pl-9 pr-3 py-2 text-xs font-mono text-[#FAFAFA] placeholder-[#525252] focus:border-[#FF3D00] focus:outline-none"
                  />
                </div>

                {/* Modality Filter Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                  <button
                    onClick={() => setFilterModality('all')}
                    className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider border transition-all whitespace-nowrap ${
                      filterModality === 'all'
                        ? 'border-[#FF3D00] text-[#FF3D00] font-bold bg-[#1A1A1A]'
                        : 'border-[#262626] text-[#737373] hover:text-[#FAFAFA]'
                    }`}
                  >
                    Todos ({participants.length})
                  </button>

                  <button
                    onClick={() => setFilterModality('circuito_largo')}
                    className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider border transition-all whitespace-nowrap ${
                      filterModality === 'circuito_largo'
                        ? 'border-[#FF3D00] text-[#FF3D00] font-bold bg-[#1A1A1A]'
                        : 'border-[#262626] text-[#737373] hover:text-[#FAFAFA]'
                    }`}
                  >
                    7,5 km ({countLargo})
                  </button>

                  <button
                    onClick={() => setFilterModality('circuito_corto')}
                    className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider border transition-all whitespace-nowrap ${
                      filterModality === 'circuito_corto'
                        ? 'border-[#FF3D00] text-[#FF3D00] font-bold bg-[#1A1A1A]'
                        : 'border-[#262626] text-[#737373] hover:text-[#FAFAFA]'
                    }`}
                  >
                    5,14 km ({countCorto})
                  </button>
                </div>

              </div>

              {/* Table */}
              <div className="border border-[#262626] overflow-hidden bg-[#0F0F0F]">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-[#141414] border-b border-[#262626] text-[#737373] uppercase tracking-wider">
                      <tr>
                        <th className="py-3 px-4">Dorsal / Código</th>
                        <th className="py-3 px-4">Corredor</th>
                        <th className="py-3 px-4">DNI</th>
                        <th className="py-3 px-4">Modalidad</th>
                        <th className="py-3 px-4">WhatsApp</th>
                        <th className="py-3 px-4">Email</th>
                        <th className="py-3 px-4">Ciudad</th>
                        <th className="py-3 px-4">Emergencia</th>
                        <th className="py-3 px-4 text-center">Acción</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1F1F1F] text-[#FAFAFA]">
                      {filteredParticipants.length === 0 ? (
                        <tr>
                          <td colSpan={9} className="py-12 text-center text-[#737373]">
                            {dataLoading ? 'Cargando registros...' : 'No se encontraron participantes.'}
                          </td>
                        </tr>
                      ) : (
                        filteredParticipants.map((p) => {
                          const cleanPhone = p.phone.replace(/\D/g, '');
                          const waUrl = cleanPhone ? `https://wa.me/${cleanPhone}` : null;
                          return (
                            <tr key={p.id} className="hover:bg-[#141414] transition-colors">
                              <td className="py-3 px-4 font-bold text-[#FF3D00] whitespace-nowrap">
                                #{p.registrationCode}
                              </td>
                              <td className="py-3 px-4 font-bold uppercase whitespace-nowrap">
                                {p.firstName} {p.lastName}
                              </td>
                              <td className="py-3 px-4 text-[#A3A3A3] whitespace-nowrap">{p.dni}</td>
                              <td className="py-3 px-4 whitespace-nowrap">
                                <span
                                  className={`px-2 py-0.5 text-[11px] border font-bold uppercase ${
                                    p.modality === 'circuito_largo'
                                      ? 'border-[#FF3D00] text-[#FF3D00]'
                                      : 'border-[#333333] text-[#FAFAFA]'
                                  }`}
                                >
                                  {p.modality === 'circuito_largo' ? '7,5 KM' : '5,14 KM'}
                                </span>
                              </td>
                              <td className="py-3 px-4 whitespace-nowrap">
                                {waUrl ? (
                                  <a
                                    href={waUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#FAFAFA] hover:text-[#FF3D00] inline-flex items-center gap-1 transition-colors"
                                    title="Abrir chat de WhatsApp"
                                  >
                                    <MessageSquare className="w-3 h-3 text-[#FF3D00]" />
                                    <span>{p.phone}</span>
                                    <ExternalLink className="w-2.5 h-2.5 text-[#737373]" />
                                  </a>
                                ) : (
                                  p.phone
                                )}
                              </td>
                              <td className="py-3 px-4 text-[#A3A3A3]">{p.email}</td>
                              <td className="py-3 px-4 uppercase text-[#A3A3A3] whitespace-nowrap">
                                {p.locality}
                              </td>
                              <td className="py-3 px-4 text-[11px] whitespace-nowrap">
                                <span className="text-[#FAFAFA] block uppercase font-medium">
                                  {p.emergencyContactName}
                                </span>
                                <span className="text-[#737373]">{p.emergencyContactPhone}</span>
                              </td>
                              <td className="py-3 px-4 text-center whitespace-nowrap">
                                <button
                                  onClick={() => handleDelete(p.id, p.dni, `${p.firstName} ${p.lastName}`)}
                                  disabled={deletingId === p.id}
                                  className="p-1.5 text-[#737373] hover:text-red-400 hover:bg-[#1F1F1F] transition-colors"
                                  title="Eliminar registro"
                                >
                                  {deletingId === p.id ? (
                                    <Loader2 className="w-3.5 h-3.5 animate-spin text-red-400" />
                                  ) : (
                                    <Trash2 className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
        )}
      </main>

    </div>
  );
};
