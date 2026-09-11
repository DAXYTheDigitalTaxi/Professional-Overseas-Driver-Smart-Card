import React, { useState, useRef } from 'react';
import { DEMO_DRIVER_DATA, type DriverProfile } from './data/driverData';
import './styles/portal-card.css';

export const App: React.FC = () => {
  // Read dynamic URL query parameters or fall back to verified demo data
  const [profile] = useState<DriverProfile>(() => {
    if (typeof window === 'undefined') return DEMO_DRIVER_DATA;
    const params = new URLSearchParams(window.location.search);
    const p = { ...DEMO_DRIVER_DATA };

    const nameParam = params.get('name');
    if (nameParam) {
      p.nameEnglish = nameParam;
      p.nameMarathi = nameParam;
    }

    const memberParam = params.get('member');
    if (memberParam) {
      p.driverId = memberParam;
      p.cardNumber = memberParam;
    }

    const rtoParam = params.get('rto');
    if (rtoParam) {
      p.rtoMarathi = rtoParam;
      p.rtoEnglish = rtoParam;
    }

    const badgeParam = params.get('badge');
    if (badgeParam) {
      p.permitNumber = badgeParam;
    }

    const validParam = params.get('valid');
    if (validParam) {
      p.validityDateMarathi = validParam;
      p.validityDateEnglish = validParam;
    }

    const photoParam = params.get('photo');
    if (photoParam) {
      p.driverPhotoUrl = photoParam;
    }

    const videoParam = params.get('video');
    if (videoParam) {
      p.officialVideoUrl = videoParam;
    }

    return p;
  });

  const [status] = useState<string>(() => {
    if (typeof window === 'undefined') return 'Active';
    const params = new URLSearchParams(window.location.search);
    return params.get('status') || 'Active';
  });

  const [verifiedTime] = useState<string>(() => {
    const now = new Date();
    return (
      'Verified · ' +
      now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    );
  });

  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current
        .play()
        .then(() => setIsVideoPlaying(true))
        .catch(() => {
          // If unmuted autoplay is restricted by the browser, fallback to muted play
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().then(() => setIsVideoPlaying(true)).catch(() => {});
          }
        });
    }
  };

  const isStatusActive = status.toLowerCase() === 'active';

  return (
    <main className="page">
      {/* Tricolor Ribbon */}
      <div className="tricolor" aria-hidden="true"></div>

      {/* Header: MMVD Logo, Board Name, Anand Dighe Saheb Photo */}
      <header className="header">
        <div className="emblem" aria-label="MMVD Logo">
          <img
            src={profile.mmvdLogoUrl}
            alt="MMVD Logo"
            onError={(e) => {
              (e.target as HTMLImageElement).src = './assets/mmvd-logo.png';
            }}
          />
        </div>

        <div className="board">
          <div className="mr">
            धर्मवीर आनंद दिघे साहेब महाराष्ट्र<br />
            प्रवासी वाहन चालक कल्याणकारी मंडळ
          </div>
          <div className="en">
            Maharashtra Passenger Vehicle Drivers Welfare Board
          </div>
        </div>

        <img
          className="dighe"
          src={profile.anandDighePhotoUrl}
          alt="Dharmaveer Anand Dighe Saheb"
          onError={(e) => {
            (e.target as HTMLImageElement).src = './assets/anand-dighe-poster.jpg';
          }}
        />
      </header>

      {/* Verification Card */}
      <section className="card verify" aria-label="SmartCard member verification">
        <div className="verifyTop">
          <div className="verifiedBadge">
            <span className="check">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12.5 9.2 17 19 7" />
              </svg>
            </span>
            <span id="verifyLabel">
              {isStatusActive ? 'Verified Member' : `${status} Member`}
            </span>
          </div>
          <div className="liveRecord" id="verifyTime">{verifiedTime}</div>
        </div>

        {/* Identity: Driver Photo + Name + Chips */}
        <div className="identity">
          <div className="photo" aria-label="Member photograph">
            <img
              id="memberPhoto"
              src={profile.driverPhotoUrl}
              alt={profile.nameEnglish}
              onError={(e) => {
                (e.target as HTMLImageElement).src = './assets/driver-photo.jpg';
              }}
            />
            <span className="photoMark">Photo ID</span>
          </div>

          <div>
            <div className="name" id="name">{profile.nameMarathi}</div>
            <div className="name-en" id="nameEn">{profile.nameEnglish}</div>
            <div className="idline">SmartCard ID&nbsp; <b id="member">{profile.driverId}</b></div>
            <div className="chips">
              <span
                className={`chip ${isStatusActive ? 'active' : ''}`}
                id="membership"
                style={
                  !isStatusActive
                    ? { background: '#fff1f0', borderColor: '#f0cbc7', color: '#a33d33' }
                    : undefined
                }
              >
                {status}
              </span>
              <span className="chip" id="vehicleType">{profile.vehicleTypeMarathi}</span>
              <span className="chip" id="districtChip">{profile.rtoMarathi}</span>
            </div>
          </div>
        </div>

        {/* Detail Rows */}
        <div className="details">
          <div className="row">
            <div className="item">
              <div className="label">RTO</div>
              <div className="value" id="rto">{profile.rtoMarathi}</div>
            </div>
            <div className="item">
              <div className="label">Driver / Badge No.</div>
              <div className="value" id="badge">{profile.permitNumber}</div>
            </div>
          </div>

          <div className="row">
            <div className="item">
              <div className="label">Aadhaar Card No.</div>
              <div className="value" id="aadhaar">{profile.aadhaarMasked}</div>
            </div>
            <div className="item">
              <div className="label">Date of Birth</div>
              <div className="value" id="dob">{profile.dateOfBirthMarathi}</div>
            </div>
          </div>

          <div className="row">
            <div className="item">
              <div className="label">Card Issue Date</div>
              <div className="value" id="issueDate">{profile.issueDateMarathi}</div>
            </div>
            <div className="item">
              <div className="label">Membership Validity</div>
              <div
                className={`value ${isStatusActive ? 'green' : ''}`}
                id="valid"
                style={!isStatusActive ? { color: '#a33d33' } : undefined}
              >
                {profile.validityDateMarathi}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="item">
              <div className="label">Card Number</div>
              <div className="value" id="cardNumber">{profile.cardNumber}</div>
            </div>
            <div className="item">
              <div className="label">Record Status</div>
              <div
                className={`value ${isStatusActive ? 'green' : ''}`}
                id="recordStatus"
                style={!isStatusActive ? { color: '#a33d33' } : undefined}
              >
                {isStatusActive ? 'Valid & Active' : status}
              </div>
            </div>
          </div>
        </div>

        {/* Integrity Confirmation */}
        <div className="integrity">
          <div className="integrityIcon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 3 5 6v5c0 4.8 2.9 8.1 7 10 4.1-1.9 7-5.2 7-10V6l-7-3Z" />
              <path d="m8.8 12 2.1 2.2 4.4-4.5" />
            </svg>
          </div>
          <div>
            <strong>QR verification matched</strong>
            <p>
              This SmartCard record is shown as active in the verification prototype. Always scan the physical card QR for field verification.
            </p>
          </div>
        </div>
      </section>

      {/* Video Card Container */}
      <section className="card videoCard" id="videoSection" aria-label="Official video content">
        <div className="videoHead">
          <div>
            <h2>Member Information & Official Updates</h2>
            <p>One QR can also deliver approved welfare, safety and public-information content.</p>
          </div>
          <span className="officialTag">Official Content</span>
        </div>

        <div className="videoStage">
          <video
            ref={videoRef}
            id="infoVideo"
            playsInline
            controls
            controlsList="nodownload noplaybackrate"
            onPlay={() => setIsVideoPlaying(true)}
            onPause={() => setIsVideoPlaying(false)}
            onEnded={() => setIsVideoPlaying(false)}
          >
            <source src={profile.officialVideoUrl} type="video/mp4" />
            Your browser does not support video playback.
          </video>

          <div
            className={`poster ${isVideoPlaying ? 'hide' : ''}`}
            id="videoPoster"
            onClick={handlePlayVideo}
          >
            <div className="posterEyebrow">Welfare Board · Member Update</div>
            <div className="posterTitle">Safety. Welfare. Trust.</div>
            <button
              className="play"
              id="playVideo"
              type="button"
              aria-label="Play official video"
              onClick={(e) => {
                e.stopPropagation();
                handlePlayVideo();
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5.7v12.6L18.8 12 8 5.7Z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="videoFoot">
          <div>
            <strong>Dynamic content, without reprinting the card</strong>
            <span>Campaigns and welfare messages can be updated centrally.</span>
          </div>
          <div className="dynamic">QR → LIVE CONTENT</div>
        </div>
      </section>

      {/* Notice */}
      <div className="notice">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 11v6M12 7.5v.1" />
        </svg>
        <span>
          A screenshot of this page is not proof of validity. Field officers should verify by scanning the QR printed on the physical SmartCard.
        </span>
      </div>

      {/* Footer */}
      <footer className="footer">
        <b>SmartCard QR Verification</b>
        <br />
        Designed for fast field verification and member communication.
        <br />
        <span className="prototype">Daxy Prototype · Not an official government record</span>
      </footer>
    </main>
  );
};

export default App;
