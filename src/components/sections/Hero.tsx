import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center pt-20 pb-16 px-4 sm:px-6 overflow-hidden">
      {/* Background Image with Dark Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src="/fotos-web/IMG_3019.webp"
          alt="Paisaje de montaña La Rioja"
          className="w-full h-full object-cover object-center scale-105"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090A0C] via-[#090A0C]/85 to-[#090A0C]/65" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#090A0C]/70 to-[#090A0C]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
        {/* Main Logo */}
        <div className="mb-6 sm:mb-8 w-full flex justify-center">
          <h1 className="sr-only">Backyard Ultra : La Picada</h1>
          <img
            src="/logos/Backyard La Rioja.webp"
            alt="Backyard La Rioja"
            className="w-[72vw] max-w-[280px] sm:max-w-[340px] md:max-w-[380px] h-auto aspect-square object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.95)] hover:scale-105 transition-transform duration-500 ease-out"
          />
        </div>

        {/* Minimalist Message */}
        <div className="space-y-4 max-w-2xl px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Gracias por participar, pronto estarán los resultados
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#D97736] font-medium tracking-wide">
            ¡Esperamos sea la primera edición de muchas!
          </p>
        </div>
      </div>
    </section>
  );
};

