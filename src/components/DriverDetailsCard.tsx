import React from 'react';
import { User, Lock, Shield } from 'lucide-react';
import type { DriverProfile } from '../data/driverData';
import '../styles/cards.css';

interface DriverDetailsCardProps {
  profile: DriverProfile;
}

export const DriverDetailsCard: React.FC<DriverDetailsCardProps> = ({ profile }) => {
  return (
    <div className="gov-card" aria-label="चालकाची माहिती">
      <div className="watermark-pattern" />
      <div className="gov-card-header">
        <div className="gov-card-header-title">
          <User className="card-section-icon" size={20} />
          <div className="bilingual-header">
            <span className="primary-marathi">चालकाची माहिती</span>
            <span className="secondary-english">Driver Details</span>
          </div>
        </div>
        <span className="verified-pill">
          <span className="verified-pill-dot" />
          VERIFIED
        </span>
      </div>

      <div className="gov-card-body">
        {/* Full Name */}
        <div className="data-row">
          <div className="data-label">
            <span className="data-label-marathi">संपूर्ण नाव</span>
            <span className="data-label-english">Full Name</span>
          </div>
          <div className="data-value">
            <div style={{ color: 'var(--gov-navy-950)', fontWeight: 700 }}>
              {profile.nameMarathi}
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              {profile.nameEnglish}
            </div>
          </div>
        </div>

        {/* Date of Birth */}
        <div className="data-row">
          <div className="data-label">
            <span className="data-label-marathi">जन्म तारीख</span>
            <span className="data-label-english">Date of Birth</span>
          </div>
          <div className="data-value">
            <div>{profile.dateOfBirthMarathi}</div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              {profile.dateOfBirthEnglish}
            </div>
          </div>
        </div>

        {/* Driver ID */}
        <div className="data-row">
          <div className="data-label">
            <span className="data-label-marathi">चालक आयडी</span>
            <span className="data-label-english">Driver ID</span>
          </div>
          <div className="data-value">
            <span className="data-value-mono">{profile.driverId}</span>
          </div>
        </div>

        {/* Permit Number */}
        <div className="data-row">
          <div className="data-label">
            <span className="data-label-marathi">परवाना क्रमांक</span>
            <span className="data-label-english">Permit Number</span>
          </div>
          <div className="data-value">
            <span className="data-value-mono">{profile.permitNumber}</span>
          </div>
        </div>

        {/* Vehicle Type */}
        <div className="data-row">
          <div className="data-label">
            <span className="data-label-marathi">वाहन प्रकार</span>
            <span className="data-label-english">Vehicle Type</span>
          </div>
          <div className="data-value">
            <div>{profile.vehicleTypeMarathi}</div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              {profile.vehicleTypeEnglish}
            </div>
          </div>
        </div>

        {/* RTO Office */}
        <div className="data-row">
          <div className="data-label">
            <span className="data-label-marathi">आर.टी.ओ. विभाग</span>
            <span className="data-label-english">RTO Authority</span>
          </div>
          <div className="data-value">
            <div>{profile.rtoMarathi}</div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              {profile.rtoEnglish}
            </div>
          </div>
        </div>

        {/* License/Permit Validity */}
        <div className="data-row">
          <div className="data-label">
            <span className="data-label-marathi">वैधता मुदत</span>
            <span className="data-label-english">Permit Validity</span>
          </div>
          <div className="data-value">
            <div style={{ color: 'var(--gov-green-700)', fontWeight: 700 }}>
              {profile.validityDateMarathi}
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              {profile.validityDateEnglish}
            </div>
          </div>
        </div>

        {/* Aadhaar Masked Security Banner */}
        <div className="aadhaar-secure-box">
          <div className="aadhaar-title-group">
            <Lock className="aadhaar-lock-icon" size={18} />
            <div>
              <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--gov-navy-900)' }}>
                आधार क्रमांक (गोपनीय)
              </div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                Aadhaar (UIDAI Masked Format)
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div className="aadhaar-number-val">{profile.aadhaarMasked}</div>
            <div className="aadhaar-security-badge">
              <Shield size={10} style={{ display: 'inline', marginRight: '3px' }} />
              सुरक्षित नोंदणी
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
