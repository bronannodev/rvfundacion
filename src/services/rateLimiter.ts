/**
 * Rate Limiter con ventana deslizante (Sliding Window) para prevenir spam y abusos.
 */

const RATE_LIMIT_KEY = 'by_rate_limit_submissions';
const MAX_ATTEMPTS = 4; // Máximo 4 envíos permitidos
const WINDOW_MS = 10 * 60 * 1000; // Ventana de 10 minutos
const COOLDOWN_BETWEEN_SUBMISSIONS_MS = 5000; // Mínimo 5 segundos entre envíos consecutivos

interface RateLimitCheck {
  allowed: boolean;
  error?: string;
  retryAfterSeconds?: number;
}

export const checkRateLimit = (): RateLimitCheck => {
  try {
    const now = Date.now();
    const raw = localStorage.getItem(RATE_LIMIT_KEY);
    let attempts: number[] = raw ? JSON.parse(raw) : [];

    // 1. Filtrar intentos dentro de la ventana de tiempo (últimos 10 minutos)
    attempts = attempts.filter((timestamp) => now - timestamp < WINDOW_MS);

    // 2. Verificar cooldown entre envíos consecutivos (5 segundos)
    if (attempts.length > 0) {
      const lastAttempt = attempts[attempts.length - 1];
      const timeSinceLast = now - lastAttempt;
      if (timeSinceLast < COOLDOWN_BETWEEN_SUBMISSIONS_MS) {
        const waitSec = Math.ceil((COOLDOWN_BETWEEN_SUBMISSIONS_MS - timeSinceLast) / 1000);
        return {
          allowed: false,
          error: `Por favor esperá ${waitSec} segundos antes de volver a enviar el formulario.`,
          retryAfterSeconds: waitSec,
        };
      }
    }

    // 3. Verificar límite de intentos máximos en la ventana
    if (attempts.length >= MAX_ATTEMPTS) {
      const oldestAttempt = attempts[0];
      const timeToWait = WINDOW_MS - (now - oldestAttempt);
      const waitMinutes = Math.ceil(timeToWait / (60 * 1000));
      return {
        allowed: false,
        error: `Has superado el límite de registros permitidos. Por seguridad, por favor intentá nuevamente en ${waitMinutes} minutos.`,
        retryAfterSeconds: Math.ceil(timeToWait / 1000),
      };
    }

    return { allowed: true };
  } catch (e) {
    // Si localStorage falla, permitimos el envío por defecto
    return { allowed: true };
  }
};

export const recordRateLimitAttempt = () => {
  try {
    const now = Date.now();
    const raw = localStorage.getItem(RATE_LIMIT_KEY);
    let attempts: number[] = raw ? JSON.parse(raw) : [];

    // Limpiar viejos y registrar el actual
    attempts = attempts.filter((timestamp) => now - timestamp < WINDOW_MS);
    attempts.push(now);

    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(attempts));
  } catch (e) {
    // ignore
  }
};
