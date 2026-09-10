import React, { useState } from 'react';
import { X, CreditCard } from 'lucide-react';
import '../styles/cards.css';

interface PhysicalCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PhysicalCardModal: React.FC<PhysicalCardModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeSide, setActiveSide] = useState<'front' | 'back' | 'poster'>('front');

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="भौतिक स्मार्ट कार्ड दृश्य"
      onClick={onClose}
    >
      <div
        className="modal-content-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CreditCard size={20} style={{ color: 'var(--gov-saffron-500)' }} />
            <div>
              <div style={{ fontWeight: 700, color: 'var(--gov-navy-950)', fontSize: '1rem' }}>
                भौतिक स्मार्ट कार्ड दृश्य (Physical ID Card)
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Commercial Passenger Vehicle Smart Card
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              padding: '0.25rem',
            }}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {/* Switcher Buttons */}
          <div className="card-view-switcher">
            <button
              type="button"
              className={`btn-gov ${activeSide === 'front' ? 'btn-gov-primary' : 'btn-gov-outline'}`}
              style={{ fontSize: '0.8125rem', padding: '0.35rem 0.75rem' }}
              onClick={() => setActiveSide('front')}
            >
              पुढील बाजू (Front Side)
            </button>
            <button
              type="button"
              className={`btn-gov ${activeSide === 'back' ? 'btn-gov-primary' : 'btn-gov-outline'}`}
              style={{ fontSize: '0.8125rem', padding: '0.35rem 0.75rem' }}
              onClick={() => setActiveSide('back')}
            >
              मागील बाजू (Back Side)
            </button>
            <button
              type="button"
              className={`btn-gov ${activeSide === 'poster' ? 'btn-gov-primary' : 'btn-gov-outline'}`}
              style={{ fontSize: '0.8125rem', padding: '0.35rem 0.75rem' }}
              onClick={() => setActiveSide('poster')}
            >
              संपूर्ण पोस्टर (Full Poster)
            </button>
          </div>

          {/* Active Image Display */}
          <div style={{ display: 'flex', justifyContent: 'center', minHeight: '340px' }}>
            {activeSide === 'front' && (
              <img
                src="./assets/front-card.jpg"
                alt="स्मार्ट कार्ड पुढील बाजू"
                className="card-preview-img"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = './assets/smart-card-poster.jpg';
                }}
              />
            )}
            {activeSide === 'back' && (
              <img
                src="./assets/back-card.jpg"
                alt="स्मार्ट कार्ड मागील बाजू"
                className="card-preview-img"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = './assets/smart-card-poster.jpg';
                }}
              />
            )}
            {activeSide === 'poster' && (
              <img
                src="./assets/smart-card-poster.jpg"
                alt="अधिकृत स्मार्ट कार्ड पोस्टर"
                className="card-preview-img"
              />
            )}
          </div>

          <div
            style={{
              marginTop: '1rem',
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              lineHeight: 1.4,
            }}
          >
            वरील स्मार्ट कार्डवरील QR कोड स्कॅन केल्यावर थेट हे डिजिटल पडताळणी संकेतस्थळ उघडते.
          </div>
        </div>
      </div>
    </div>
  );
};
