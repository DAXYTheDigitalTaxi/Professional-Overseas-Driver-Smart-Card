import React, { useState } from 'react';
import { DEMO_DRIVER_DATA } from './data/driverData';
import { VerificationScreen } from './components/VerificationScreen';
import { GovernmentHeader } from './components/GovernmentHeader';
import { HeroProfile } from './components/HeroProfile';
import { GovernmentVideoSection } from './components/GovernmentVideoSection';
import { DriverDetailsCard } from './components/DriverDetailsCard';
import { VehicleDetailsCard } from './components/VehicleDetailsCard';
import { VerificationSection } from './components/VerificationSection';
import { QRInfoSection } from './components/QRInfoSection';
import { WelfareSchemesSection } from './components/WelfareSchemesSection';
import { PhysicalCardModal } from './components/PhysicalCardModal';
import { GovernmentFooter } from './components/GovernmentFooter';
import { CreditCard, RefreshCw } from 'lucide-react';
import './styles/global.css';

export const App: React.FC = () => {
  // Verification screen overlay state (starts open on first page load)
  const [showVerification, setShowVerification] = useState<boolean>(true);
  // Modal for inspecting physical smart card front/back
  const [isPhysicalCardModalOpen, setIsPhysicalCardModalOpen] = useState<boolean>(false);

  const handleReverify = () => {
    setShowVerification(true);
  };

  return (
    <div className="app-root">
      {/* 1. Initial Verification Screen (~1.2s animated transition) */}
      <VerificationScreen
        cardNumber={DEMO_DRIVER_DATA.cardNumber}
        isOpen={showVerification}
        onVerified={() => setShowVerification(false)}
      />

      {/* 2. Official Government Header */}
      <GovernmentHeader
        onReverify={handleReverify}
        onOpenPhysicalCard={() => setIsPhysicalCardModalOpen(true)}
      />

      {/* Main Presentation Container */}
      <main className="page-container" id="main-content">
        {/* 3. Verified Driver Profile Header (Hero Card) */}
        <HeroProfile profile={DEMO_DRIVER_DATA} />

        {/* 4. Dedicated Government Video Section (Pratap Sarnaik Address + 2 Reels) */}
        <GovernmentVideoSection />

        {/* 5. Driver & Vehicle Details Grid (Desktop 2-column, Mobile clean single-column) */}
        <div className="details-grid">
          <DriverDetailsCard profile={DEMO_DRIVER_DATA} />
          <VehicleDetailsCard profile={DEMO_DRIVER_DATA} />
        </div>

        {/* 6. Digital Verification Audit Record */}
        <VerificationSection profile={DEMO_DRIVER_DATA} />

        {/* 7. QR Information System Card */}
        <QRInfoSection
          profile={DEMO_DRIVER_DATA}
          onOpenPhysicalCard={() => setIsPhysicalCardModalOpen(true)}
        />

        {/* 8. Government Schemes & Benefits */}
        <WelfareSchemesSection />
      </main>

      {/* 9. Physical Card Modal (Front, Back & Poster Preview) */}
      <PhysicalCardModal
        isOpen={isPhysicalCardModalOpen}
        onClose={() => setIsPhysicalCardModalOpen(false)}
      />

      {/* 10. Official Government Footer */}
      <GovernmentFooter />

      {/* Mobile Sticky Quick Verification Bar */}
      <aside className="sticky-status-bar" aria-label="त्वरित पडताळणी माहिती">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="verified-pill-dot" />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#4ade80' }}>
              ✓ प्रमाणित चालक (VERIFIED)
            </span>
            <span style={{ fontSize: '0.6875rem', color: '#cbd5e1', fontFamily: 'var(--font-mono)' }}>
              {DEMO_DRIVER_DATA.driverId} • {DEMO_DRIVER_DATA.rtoMarathi}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            type="button"
            className="btn-gov"
            onClick={() => setIsPhysicalCardModalOpen(true)}
            style={{
              padding: '0.3rem 0.6rem',
              fontSize: '0.75rem',
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <CreditCard size={13} />
            <span>कार्ड</span>
          </button>

          <button
            type="button"
            className="btn-gov"
            onClick={handleReverify}
            style={{
              padding: '0.3rem 0.6rem',
              fontSize: '0.75rem',
              background: 'var(--gov-saffron-500)',
              color: '#ffffff',
            }}
          >
            <RefreshCw size={13} />
            <span>पडताळा</span>
          </button>
        </div>
      </aside>
    </div>
  );
};

export default App;
