import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { ChallengeStats } from './components/sections/ChallengeStats';
import { HowItWorks } from './components/sections/HowItWorks';
import { Location } from './components/sections/Location';
import { Rules } from './components/sections/Rules';
import { TimingExample } from './components/sections/TimingExample';
import { FAQ } from './components/sections/FAQ';
import { RegistrationForm } from './components/sections/RegistrationForm';
import { Footer } from './components/layout/Footer';

import { CheckRegistrationModal } from './components/ui/CheckRegistrationModal';
import { TermsModal } from './components/ui/TermsModal';
import { AdminPage } from './pages/AdminPage';

import { useSmoothScroll } from './hooks/useSmoothScroll';

export const App: React.FC = () => {
  useSmoothScroll();

  const [currentPath, setCurrentPath] = useState(
    window.location.pathname.toLowerCase()
  );
  const [isCheckModalOpen, setIsCheckModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

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

  const handleGoToRegister = () => {
    setIsCheckModalOpen(false);
    const element = document.getElementById('registro') || document.getElementById('inscripcion');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#090A0C] text-[#F3F4F6] selection:bg-[#D97736] selection:text-white">
      {/* Header / Navbar */}
      <Navbar />

      {/* Main Content: Clean, minimal and direct */}
      <main>
        <Hero onOpenCheckModal={() => setIsCheckModalOpen(true)} />
        <ChallengeStats />
        <HowItWorks />
        <Location />
        <Rules />
        <TimingExample />
        <FAQ />
        <RegistrationForm onOpenTerms={() => setIsTermsModalOpen(true)} />
      </main>

      {/* Footer */}
      <Footer onOpenTerms={() => setIsTermsModalOpen(true)} />

      {/* Global Modals */}
      <CheckRegistrationModal
        isOpen={isCheckModalOpen}
        onClose={() => setIsCheckModalOpen(false)}
        onGoToRegister={handleGoToRegister}
      />

      <TermsModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
      />
    </div>
  );
};

export default App;
