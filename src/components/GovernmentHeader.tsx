import React from 'react';
import { RefreshCw, CreditCard } from 'lucide-react';
import '../styles/header.css';

interface GovernmentHeaderProps {
  onReverify: () => void;
  onOpenPhysicalCard: () => void;
}

export const GovernmentHeader: React.FC<GovernmentHeaderProps> = ({
  onReverify,
  onOpenPhysicalCard,
}) => {
  return (
    <header className="gov-header" role="banner">
      {/* Saffron-White-Green Micro Tricolor Accent Line */}
      <div className="state-stripe-accent" />

      <div className="gov-header-inner page-container">
        {/* Left: Emblem and Official Names */}
        <div className="gov-brand">
          <img
            src="./assets/maharashtra-seal.svg"
            alt="महाराष्ट्र शासन राजमुद्रा"
            className="gov-brand-emblem"
          />
          <div className="gov-brand-titles">
            <div className="gov-state-title">
              महाराष्ट्र शासन <span className="gov-state-eng">Govt. of Maharashtra</span>
            </div>
            <div className="gov-board-title">
              धर्मवीर आनंद दिघे साहेब महाराष्ट्र प्रवासी वाहन चालक कल्याण मंडळ
            </div>
          </div>
        </div>

        {/* Right: Digital Verification Status & Action Buttons */}
        <div className="gov-header-actions">
          <div className="status-badge-digital" title="अधिकृत डिजिटल पडताळणी प्रणाली">
            <span className="status-dot-green" />
            <span>VERIFIED PORTAL</span>
          </div>

          {/* Quick interactive buttons for presenter */}
          <button
            type="button"
            className="btn-view-card"
            onClick={onOpenPhysicalCard}
            title="भौतिक स्मार्ट कार्ड पहा"
          >
            <CreditCard size={14} />
            <span>स्मार्ट कार्ड</span>
          </button>

          <button
            type="button"
            className="btn-reverify"
            onClick={onReverify}
            title="पुन्हा डिजिटल पडताळणी करा"
          >
            <RefreshCw size={13} />
            <span>पुन्हा पडताळा</span>
          </button>
        </div>
      </div>
    </header>
  );
};
