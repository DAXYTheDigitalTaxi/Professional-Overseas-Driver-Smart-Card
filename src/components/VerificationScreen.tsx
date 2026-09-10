import React, { useEffect, useState } from 'react';
import { ShieldCheck, Loader2 } from 'lucide-react';
import '../styles/verification.css';

interface VerificationScreenProps {
  cardNumber: string;
  onVerified: () => void;
  isOpen: boolean;
}

export const VerificationScreen: React.FC<VerificationScreenProps> = ({
  cardNumber,
  onVerified,
  isOpen,
}) => {
  const [stage, setStage] = useState<'scanning' | 'verified' | 'exiting'>('scanning');
  const [progress, setProgress] = useState<number>(20);

  useEffect(() => {
    if (!isOpen) return;

    setStage('scanning');
    setProgress(25);

    const timer1 = setTimeout(() => {
      setProgress(75);
    }, 400);

    const timer2 = setTimeout(() => {
      setProgress(100);
      setStage('verified');
    }, 1100);

    const timer3 = setTimeout(() => {
      setStage('exiting');
      setTimeout(() => {
        onVerified();
      }, 400);
    }, 2100);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isOpen, onVerified]);

  if (!isOpen) return null;

  return (
    <div
      className={`verification-overlay ${stage === 'exiting' ? 'fading-out' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Government Digital Verification"
    >
      <div className="verification-card">
        {/* Emblem & Scanning Ring */}
        <div className="verification-emblem-wrap">
          <div className={stage === 'scanning' ? 'scanning-ring' : 'scanning-pulse'} />
          <img
            src="./assets/maharashtra-seal.svg"
            alt="महाराष्ट्र शासन राजमुद्रा"
            className="verification-emblem"
          />
        </div>

        {/* Official Headings */}
        <div className="verification-org">महाराष्ट्र शासन</div>
        <h1 className="verification-title">डिजिटल वाहन पडताळणी</h1>
        <div className="verification-subtitle">Digital Vehicle Verification Portal</div>

        {/* Dynamic Verification Status Box */}
        <div className="verification-status-box">
          {stage === 'scanning' ? (
            <div>
              <div className="verifying-text">
                <Loader2 className="animate-spin" size={18} />
                <span>क्यूआर कोड तपासणी सुरू आहे...</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px' }}>
                Verifying QR Code & Identity Record
              </div>
            </div>
          ) : (
            <div>
              <div className="verified-success-text">
                <ShieldCheck className="verified-icon" size={24} />
                <span>✓ पडताळणी यशस्वी!</span>
              </div>
              <div style={{ fontSize: '0.8125rem', color: '#86efac', marginTop: '4px' }}>
                Vehicle & Driver Identity Verified
              </div>
            </div>
          )}

          {/* Progress Bar */}
          <div className="scan-progress-bar">
            <div
              className="scan-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Card Identifier */}
          <div className="card-id-tag">
            स्मार्ट कार्ड क्रमांक / Card ID:{' '}
            <span className="card-id-val">{cardNumber}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onVerified}
          className="btn-skip-verification"
          aria-label="Skip Verification Animation"
        >
          थेट माहिती पहा (Skip Animation)
        </button>
      </div>
    </div>
  );
};
