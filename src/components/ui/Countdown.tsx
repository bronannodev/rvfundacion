import React, { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isFinished: boolean;
}

interface CountdownProps {
  targetDate?: Date | string;
  className?: string;
}

export const Countdown: React.FC<CountdownProps> = ({
  // Sábado 5 de septiembre a las 08:00 hs (hora local / Argentina UTC-3)
  targetDate = '2026-09-05T08:00:00-03:00',
  className = '',
}) => {
  const calculateTimeLeft = (): TimeLeft => {
    const target = new Date(targetDate).getTime();
    const now = new Date().getTime();
    const difference = target - now;

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isFinished: true,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isFinished: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: 'DÍAS', value: timeLeft.days },
    { label: 'HORAS', value: timeLeft.hours },
    { label: 'MIN', value: timeLeft.minutes },
    { label: 'SEG', value: timeLeft.seconds },
  ];

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Countdown Grid */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3.5 w-full max-w-[340px] sm:max-w-md">
        {timeUnits.map((unit) => (
          <div
            key={unit.label}
            className="relative flex flex-col items-center justify-center p-2.5 sm:p-3.5 rounded-2xl bg-gradient-to-b from-[#16181F]/90 to-[#0F1015]/90 border border-[#262A34] shadow-lg shadow-black/40 backdrop-blur-md group hover:border-[#D97736]/50 transition-all duration-300"
          >
            {/* Subtle top light reflection */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-t-2xl" />

            <div className="font-mono text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight tabular-nums drop-shadow-sm">
              {String(unit.value).padStart(2, '0')}
            </div>
            <div className="font-mono text-[9px] sm:text-[10px] md:text-[11px] font-bold text-[#D97736] tracking-widest mt-1">
              {unit.label}
            </div>

            {/* Micro accent dot */}
            <div className="absolute bottom-1 w-1 h-1 rounded-full bg-[#D97736]/30 group-hover:bg-[#D97736] transition-colors" />
          </div>
        ))}
      </div>
    </div>
  );
};
