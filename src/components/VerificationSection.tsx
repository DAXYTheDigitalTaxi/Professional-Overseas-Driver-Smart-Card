import React from 'react';
import { CheckCircle2, ShieldCheck, Clock, FileCheck } from 'lucide-react';
import type { DriverProfile } from '../data/driverData';
import '../styles/cards.css';

interface VerificationSectionProps {
  profile: DriverProfile;
}

export const VerificationSection: React.FC<VerificationSectionProps> = ({ profile }) => {
  // Presentation demo timestamp (formatted realistically)
  const currentDemoTime = new Date().toLocaleDateString('mr-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <section className="gov-card" aria-label="डिजिटल पडताळणी तपशील">
      <div className="gov-card-header">
        <div className="gov-card-header-title">
          <ShieldCheck className="card-section-icon" size={20} />
          <div className="bilingual-header">
            <span className="primary-marathi">डिजिटल पडताळणी</span>
            <span className="secondary-english">Digital Verification & Status</span>
          </div>
        </div>
        <span className="verified-pill">
          <span className="verified-pill-dot" />
          ACTIVE / VERIFIED
        </span>
      </div>

      <div className="gov-card-body">
        {/* 4-Point Official Checklist */}
        <div className="verification-checklist">
          <div className="verification-check-item">
            <CheckCircle2 className="check-icon-green" size={20} />
            <div>
              <div className="check-text-primary">चालक ओळख पडताळणी पूर्ण</div>
              <div className="check-text-secondary">Driver Identity Verified</div>
            </div>
          </div>

          <div className="verification-check-item">
            <CheckCircle2 className="check-icon-green" size={20} />
            <div>
              <div className="check-text-primary">वाहन अधिकृत नोंदणी सक्रिय</div>
              <div className="check-text-secondary">Vehicle Record Verified</div>
            </div>
          </div>

          <div className="verification-check-item">
            <CheckCircle2 className="check-icon-green" size={20} />
            <div>
              <div className="check-text-primary">स्मार्ट कार्ड क्रमांक अधिकृत</div>
              <div className="check-text-secondary">Card Number Verified</div>
            </div>
          </div>

          <div className="verification-check-item">
            <CheckCircle2 className="check-icon-green" size={20} />
            <div>
              <div className="check-text-primary">आर.टी.ओ. परवाना माहिती वैध</div>
              <div className="check-text-secondary">Permit Information Available</div>
            </div>
          </div>
        </div>

        {/* Verification Metadata Rows */}
        <div className="data-row">
          <div className="data-label">
            <span className="data-label-marathi">पडताळणी आयडी</span>
            <span className="data-label-english">Verification ID</span>
          </div>
          <div className="data-value">
            <span className="data-value-mono">{profile.verificationId}</span>
          </div>
        </div>

        <div className="data-row">
          <div className="data-label">
            <span className="data-label-marathi">पडताळणी स्थिती</span>
            <span className="data-label-english">Verification Status</span>
          </div>
          <div className="data-value">
            <span
              style={{
                color: 'var(--gov-green-700)',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <FileCheck size={16} />
              सक्रिय व प्रमाणित (ACTIVE / VERIFIED)
            </span>
          </div>
        </div>

        <div className="data-row">
          <div className="data-label">
            <span className="data-label-marathi">शेवटची डिजिटल पडताळणी</span>
            <span className="data-label-english">Last Verification</span>
          </div>
          <div className="data-value">
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                color: 'var(--text-secondary)',
                fontSize: '0.875rem',
              }}
            >
              <Clock size={14} />
              <span>{currentDemoTime} (Real-time Live Sync)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
