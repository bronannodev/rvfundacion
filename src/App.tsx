import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { Footer } from './components/layout/Footer';
import { AdminPage } from './pages/AdminPage';
import { useSmoothScroll } from './hooks/useSmoothScroll';

// Secciones ocultadas tras finalizar la competencia:
// import { ChallengeStats } from './components/sections/ChallengeStats';
// import { HowItWorks } from './components/sections/HowItWorks';
// import { Location } from './components/sections/Location';
// import { Rules } from './components/sections/Rules';
// import { TimingExample } from './components/sections/TimingExample';
// import { FAQ } from './components/sections/FAQ';
// import { RegistrationForm } from './components/sections/RegistrationForm';
// import { CheckRegistrationModal } from './components/ui/CheckRegistrationModal';
// import { TermsModal } from './components/ui/TermsModal';

export const App: React.FC = () => {
  useSmoothScroll();

  const [currentPath, setCurrentPath] = useState(
    window.location.pathname.toLowerCase()
  );

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname.toLowerCase());
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // If visiting /admin or #admin, render the standalone AdminPage
  if (currentPath === '/admin' || window.location.hash === '#admin') {
    return <AdminPage />;
  }

  return (
    <div className="min-h-screen bg-[#090A0C] text-[#F3F4F6] selection:bg-[#D97736] selection:text-white flex flex-col justify-between">
      {/* Header / Navbar */}
      <Navbar />

      {/* Main Content: Hero minimalista post-competencia */}
      <main className="flex-1 flex flex-col justify-center">
        <Hero />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;

