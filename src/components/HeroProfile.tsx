import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import type { DriverProfile } from '../data/driverData';
import '../styles/profile.css';

interface HeroProfileProps {
  profile: DriverProfile;
}

export const HeroProfile: React.FC<HeroProfileProps> = ({ profile }) => {
  return (
    <section className="hero-profile-card" aria-label="प्रमाणित व्यावसायिक वाहन चालक ओळख">
      {/* State Saffron Top Accent */}
      <div className="state-stripe-accent" />

      {/* Top Banner with Anand Dighe Saheb Photo */}
      <div className="hero-card-banner">
        <div className="hero-banner-info">
          <div className="hero-banner-tag">
            <ShieldCheck size={14} />
            <span>महाराष्ट्र शासन अधिकृत</span>
          </div>
          <h1 className="hero-banner-title">व्यावसायिक प्रवासी वाहन चालक स्मार्ट कार्ड</h1>
          <div className="hero-banner-subtitle">
            Commercial Passenger Vehicle Driver Smart Card
          </div>
        </div>

        {/* Dharmaveer Anand Dighe Saheb's Portrait from Physical Card */}
        <div className="hero-dighe-portrait-wrap" title="धर्मवीर आनंद दिघे साहेब">
          <img
            src={profile.anandDighePhotoUrl}
            alt="धर्मवीर आनंद दिघे साहेब"
            className="hero-dighe-img"
            onError={(e) => {
              // Fallback if asset path issue
              (e.target as HTMLImageElement).src = './assets/anand-dighe.png';
            }}
          />
          <span className="hero-dighe-name">आनंद दिघे साहेब</span>
        </div>
      </div>

      {/* Main Profile Body */}
      <div className="hero-body">
        {/* Driver Photo & Verification Badge */}
        <div className="hero-photo-container">
          <div className="hero-photo-wrapper">
            <img
              src={profile.driverPhotoUrl}
              alt={`${profile.nameMarathi} - व्यावसायिक चालक`}
              className="hero-driver-photo"
              onError={(e) => {
                (e.target as HTMLImageElement).src = './assets/driver-photo.jpg';
              }}
            />
            <div className="photo-verified-badge" title="अधिकृत प्रमाणित चालक">
              <CheckCircle2 size={16} />
            </div>
          </div>
          <div className="hero-signature-wrap">
            <span className="hero-signature-img">{profile.signatureText}</span>
            <div className="hero-signature-label">चालकाची सही (Signature)</div>
          </div>
        </div>

        {/* Detailed Info */}
        <div className="hero-info-content">
          {/* Badge Row */}
          <div className="hero-badge-row">
            <span className="verified-pill">
              <span className="verified-pill-dot" />
              ✓ VERIFIED DRIVER
            </span>
            <span className="yellow-plate-badge">
              COMMERCIAL • {profile.rtoEnglish.split(' ')[0]} (MH 12)
            </span>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--gov-navy-800)',
                background: 'var(--gov-navy-50)',
                padding: '0.25rem 0.5rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-hairline)',
              }}
            >
              स्मार्ट कार्ड वैध
            </span>
          </div>

          {/* Driver Name Bilingual */}
          <div className="hero-driver-names">
            <div className="driver-name-marathi">{profile.nameMarathi}</div>
            <div className="driver-name-english">{profile.nameEnglish}</div>
          </div>

          {/* Quick Specs Grid */}
          <div className="hero-quick-specs">
            <div className="hero-spec-item">
              <div className="hero-spec-label">
                <span>चालक आयडी</span>
                <span className="font-english">Driver ID</span>
              </div>
              <div className="hero-spec-value font-mono">{profile.driverId}</div>
            </div>

            <div className="hero-spec-item">
              <div className="hero-spec-label">
                <span>वाहन प्रकार</span>
                <span className="font-english">Vehicle Type</span>
              </div>
              <div className="hero-spec-value">{profile.vehicleTypeMarathi}</div>
            </div>

            <div className="hero-spec-item">
              <div className="hero-spec-label">
                <span>आर.टी.ओ. विभाग</span>
                <span className="font-english">RTO Authority</span>
              </div>
              <div className="hero-spec-value">{profile.rtoMarathi}</div>
            </div>

            <div className="hero-spec-item">
              <div className="hero-spec-label">
                <span>वैधता मुदत</span>
                <span className="font-english">Valid Till</span>
              </div>
              <div className="hero-spec-value" style={{ color: 'var(--gov-green-700)' }}>
                {profile.validityDateMarathi}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slogan & Quote from Physical Card */}
      <div className="hero-card-footer-motto">
        <div className="hero-motto-marathi">
          <span>🚩</span>
          <span>{profile.sloganMarathi}</span>
        </div>
        <div className="hero-motto-quote">
          "{profile.quoteMarathi}" – {profile.quoteAuthor}
        </div>
      </div>
    </section>
  );
};
