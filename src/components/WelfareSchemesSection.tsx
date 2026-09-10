import React from 'react';
import { Gift, ShieldCheck, Award, Smartphone } from 'lucide-react';
import { WELFARE_SCHEMES, type WelfareScheme } from '../data/driverData';
import '../styles/cards.css';

export const WelfareSchemesSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck size={20} className="card-section-icon" />;
      case 'Award':
        return <Award size={20} className="card-section-icon" />;
      case 'Smartphone':
        return <Smartphone size={20} className="card-section-icon" />;
      default:
        return <Gift size={20} className="card-section-icon" />;
    }
  };

  return (
    <section className="gov-card" aria-label="शासकीय योजना व लाभ">
      <div className="gov-card-header">
        <div className="gov-card-header-title">
          <Gift className="card-section-icon" size={20} />
          <div className="bilingual-header">
            <span className="primary-marathi">शासकीय योजना व लाभ</span>
            <span className="secondary-english">Government Schemes & Welfare Benefits</span>
          </div>
        </div>
        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: 'var(--gov-saffron-600)',
            background: 'var(--gov-saffron-50)',
            padding: '0.25rem 0.5rem',
            borderRadius: 'var(--radius-full)',
            border: '1px solid rgba(217, 83, 30, 0.2)',
          }}
        >
          कल्याण मंडळ उपक्रम
        </span>
      </div>

      <div className="gov-card-body">
        <div className="schemes-grid">
          {WELFARE_SCHEMES.map((scheme: WelfareScheme) => (
            <div key={scheme.id} className="scheme-card">
              <div>
                <div className="scheme-top-badge">
                  {getIcon(scheme.iconName)}
                  <span>{scheme.badgeMarathi}</span>
                </div>
                <h3 className="scheme-title-marathi">{scheme.titleMarathi}</h3>
                <div className="scheme-title-english">{scheme.titleEnglish}</div>
                <p className="scheme-desc-marathi">{scheme.descriptionMarathi}</p>
                <p className="scheme-desc-english">{scheme.descriptionEnglish}</p>
              </div>

              <div
                style={{
                  marginTop: '1rem',
                  paddingTop: '0.75rem',
                  borderTop: '1px dashed var(--border-hairline)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.75rem',
                  color: 'var(--gov-saffron-600)',
                  fontWeight: 600,
                }}
              >
                <span>नोंदणीकृत चालकांसाठी उपलब्ध</span>
                <span>सक्रिय ✓</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
