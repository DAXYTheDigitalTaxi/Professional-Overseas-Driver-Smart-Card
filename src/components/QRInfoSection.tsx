import React from 'react';
import { QrCode, CheckCircle, Info } from 'lucide-react';
import type { DriverProfile } from '../data/driverData';
import '../styles/cards.css';

interface QRInfoSectionProps {
  profile: DriverProfile;
  onOpenPhysicalCard: () => void;
}

export const QRInfoSection: React.FC<QRInfoSectionProps> = ({
  profile,
  onOpenPhysicalCard,
}) => {
  return (
    <section className="gov-card" aria-label="QR आधारित डिजिटल ओळख माहिती">
      <div className="watermark-pattern" />
      <div className="gov-card-header">
        <div className="gov-card-header-title">
          <QrCode className="card-section-icon" size={20} />
          <div className="bilingual-header">
            <span className="primary-marathi">QR आधारित डिजिटल ओळख</span>
            <span className="secondary-english">QR-Enabled Digital Identity</span>
          </div>
        </div>
        <span className="verified-pill">
          <span className="verified-pill-dot" />
          SECURE QR
        </span>
      </div>

      <div className="gov-card-body">
        <div
          style={{
            background: 'var(--bg-surface-warm)',
            border: '1px solid var(--border-hairline)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem',
          }}
        >
          <Info
            size={22}
            style={{ color: 'var(--gov-saffron-500)', flexShrink: 0, marginTop: '2px' }}
          />
          <div>
            <div
              style={{
                fontFamily: 'var(--font-marathi)',
                fontWeight: 700,
                color: 'var(--gov-navy-900)',
                fontSize: '0.9375rem',
                lineHeight: 1.35,
              }}
            >
              हा QR कोड भौतिक ओळखपत्राशी थेट जोडलेला असून त्वरित डिजिटल पडताळणी उपलब्ध करून देतो.
            </div>
            <div
              style={{
                fontFamily: 'var(--font-english)',
                fontSize: '0.8125rem',
                color: 'var(--text-secondary)',
                marginTop: '4px',
                lineHeight: 1.4,
              }}
            >
              This QR code on the physical smart card provides instantaneous access to the
              verified vehicle and driver credentials associated with this identity card.
            </div>
          </div>
        </div>

        <div className="data-row">
          <div className="data-label">
            <span className="data-label-marathi">स्मार्ट कार्ड क्रमांक</span>
            <span className="data-label-english">Smart Card ID</span>
          </div>
          <div className="data-value">
            <span className="data-value-mono">{profile.cardNumber}</span>
          </div>
        </div>

        <div className="data-row">
          <div className="data-label">
            <span className="data-label-marathi">पडताळणी निष्पत्ती</span>
            <span className="data-label-english">Verification State</span>
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
              <CheckCircle size={16} />
              वैध व अधिकृत (Valid & Authenticated)
            </span>
          </div>
        </div>

        {/* Physical Smart Card Button */}
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <button
            type="button"
            className="btn-gov btn-gov-outline"
            onClick={onOpenPhysicalCard}
            style={{ width: '100%' }}
          >
            💳 भौतिक स्मार्ट कार्डची पुढील व मागील बाजू तपासा (View Physical Smart Card)
          </button>
        </div>
      </div>
    </section>
  );
};
