import React from 'react';
import { Car, Award } from 'lucide-react';
import type { DriverProfile } from '../data/driverData';
import '../styles/cards.css';

interface VehicleDetailsCardProps {
  profile: DriverProfile;
}

export const VehicleDetailsCard: React.FC<VehicleDetailsCardProps> = ({ profile }) => {
  return (
    <div className="gov-card" aria-label="वाहनाची माहिती">
      <div className="watermark-pattern" />
      <div className="gov-card-header">
        <div className="gov-card-header-title">
          <Car className="card-section-icon" size={20} />
          <div className="bilingual-header">
            <span className="primary-marathi">वाहनाची माहिती</span>
            <span className="secondary-english">Vehicle Details</span>
          </div>
        </div>
        <span className="yellow-plate-badge">पिवळी पाटी (COMMERCIAL)</span>
      </div>

      <div className="gov-card-body">
        {/* Vehicle Type */}
        <div className="data-row">
          <div className="data-label">
            <span className="data-label-marathi">वाहन प्रकार</span>
            <span className="data-label-english">Vehicle Type</span>
          </div>
          <div className="data-value">
            <div style={{ color: 'var(--gov-navy-950)', fontWeight: 700 }}>
              {profile.vehicleTypeMarathi}
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              {profile.vehicleTypeEnglish}
            </div>
          </div>
        </div>

        {/* Registration / Permit Number */}
        <div className="data-row">
          <div className="data-label">
            <span className="data-label-marathi">नोंदणी / परवाना</span>
            <span className="data-label-english">Permit Number</span>
          </div>
          <div className="data-value">
            <span className="data-value-mono">{profile.permitNumber}</span>
          </div>
        </div>

        {/* RTO Jurisdiction */}
        <div className="data-row">
          <div className="data-label">
            <span className="data-label-marathi">आर.टी.ओ. अधिकार क्षेत्र</span>
            <span className="data-label-english">RTO Jurisdiction</span>
          </div>
          <div className="data-value">
            <div>{profile.rtoMarathi}</div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              {profile.rtoEnglish}
            </div>
          </div>
        </div>

        {/* Commercial Category */}
        <div className="data-row">
          <div className="data-label">
            <span className="data-label-marathi">वाहन प्रवर्ग</span>
            <span className="data-label-english">Vehicle Category</span>
          </div>
          <div className="data-value">
            <div style={{ color: '#b45309', fontWeight: 700 }}>
              व्यावसायिक (पिवळी नंबर प्लेट)
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              Commercial / Yellow Number Plate
            </div>
          </div>
        </div>

        {/* Smart Card Number */}
        <div className="data-row">
          <div className="data-label">
            <span className="data-label-marathi">स्मार्ट कार्ड क्रमांक</span>
            <span className="data-label-english">Smart Card Number</span>
          </div>
          <div className="data-value">
            <span className="data-value-mono" style={{ background: '#fef3c7', borderColor: '#fde68a' }}>
              {profile.cardNumber}
            </span>
          </div>
        </div>

        {/* Card Issue Date */}
        <div className="data-row">
          <div className="data-label">
            <span className="data-label-marathi">कार्ड जारी दिनांक</span>
            <span className="data-label-english">Card Issue Date</span>
          </div>
          <div className="data-value">
            <div>{profile.issueDateMarathi}</div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              {profile.issueDateEnglish}
            </div>
          </div>
        </div>

        {/* Card Renewal Date */}
        <div className="data-row">
          <div className="data-label">
            <span className="data-label-marathi">कार्ड नूतनीकरण</span>
            <span className="data-label-english">Card Renewal Date</span>
          </div>
          <div className="data-value">
            <div style={{ color: 'var(--gov-navy-950)', fontWeight: 700 }}>
              {profile.renewalDateMarathi}
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              {profile.renewalDateEnglish}
            </div>
          </div>
        </div>

        {/* Hologram & Anti-Counterfeit Notice */}
        <div className="hologram-seal-card">
          <div className="hologram-circle-badge">
            <div className="hologram-inner">
              <Award size={18} />
            </div>
          </div>
          <div className="hologram-text">
            <strong>अधिकृत होलोग्राम पडताळणी:</strong> हे वाहन धर्मवीर आनंद दिघे साहेब महाराष्ट्र प्रवासी वाहन चालक कल्याण मंडळाकडे अधिकृतपणे नोंदणीकृत आहे.
          </div>
        </div>
      </div>
    </div>
  );
};
