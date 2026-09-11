import React, { useState, useRef, useEffect } from 'react';
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

  const [cardSide, setCardSide] = useState<'front' | 'back'>(() => {
    if (typeof window === 'undefined') return 'front';
    const side = new URLSearchParams(window.location.search).get('side');
    if (side === 'back') return 'back';
    return 'front';
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
  const videoSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    const section = videoSectionRef.current;
    if (!video || !section || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.muted = true;
            video
              .play()
              .then(() => setIsVideoPlaying(true))
              .catch(() => {});
          } else {
            if (!video.paused) {
              video.pause();
            }
          }
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

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

      {/* Card View Mode Selector (Front / Back) */}
      <div className="cardToggleWrap" role="tablist" aria-label="स्मार्ट कार्ड बाजू निवडा">
        <button
          type="button"
          className={`cardTab ${cardSide === 'front' ? 'active' : ''}`}
          id="tabFront"
          role="tab"
          aria-selected={cardSide === 'front'}
          onClick={() => setCardSide('front')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <path d="M7 8h10M7 12h4M7 16h6" />
          </svg>
          समोरची बाजू (Front)
        </button>
        <button
          type="button"
          className={`cardTab ${cardSide === 'back' ? 'active' : ''}`}
          id="tabBack"
          role="tab"
          aria-selected={cardSide === 'back'}
          onClick={() => setCardSide('back')}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <path d="m9 12 2 2 4-4" />
          </svg>
          मागील बाजू (Back)
        </button>
      </div>

      {/* Rebuilt Digital ID Card Showcase: 3D Flip Container */}
      <div className="cardShowcaseWrap" id="cardShowcase">
        <div className={`cardFlipContainer ${cardSide === 'back' ? 'isFlipped' : ''}`} id="cardFlipContainer">
          {/* FRONT CARD */}
          <section
            className="card smartCardCanvas"
            id="frontCard"
            aria-label="व्यावसायिक प्रवासी वाहन चालक स्मार्ट कार्ड (समोरची बाजू)"
          >
          <div className="scDigheCorner">
            <img
              src="./assets/card-dighe-corner.png"
              alt="धर्मवीर आनंद दिघे साहेब"
              onError={(e) => {
                (e.target as HTMLImageElement).src = './public/assets/card-dighe-corner.png';
              }}
            />
          </div>
          <div className="scHeaderBoard">
            <div className="scHeaderLeader">धर्मवीर आनंद दिघे साहेब</div>
            <div className="scHeaderOrg">
              महाराष्ट्र प्रवासी वाहन चालक<br />कल्याण मंडळ
            </div>
            <div className="scHeaderLine" aria-hidden="true" />
          </div>
          <div className="scAshokaEmblem">
            <img
              src="./assets/ashoka-emblem.png"
              alt="महाराष्ट्र शासन"
              onError={(e) => {
                (e.target as HTMLImageElement).src = './public/assets/ashoka-emblem.png';
              }}
            />
          </div>
          <div className="scTitleWrap">
            <div className="scTitleText">
              व्यावसायिक प्रवासी वाहन चालक<br />स्मार्ट कार्ड
            </div>
            <div className="scTitleLine" aria-hidden="true" />
          </div>
          <img
            className="scHologram"
            src="./assets/card-hologram.png"
            alt="सुरक्षा होलोग्राम"
            onError={(e) => {
              (e.target as HTMLImageElement).src = './public/assets/card-hologram.png';
            }}
          />
          <div className="scLeftStripe" aria-hidden="true" />
          <div className="scDriverPhoto">
            <img
              id="memberPhoto"
              src={profile.driverPhotoUrl}
              alt={profile.nameMarathi}
              onError={(e) => {
                (e.target as HTMLImageElement).src = './assets/driver-exact.jpg';
              }}
            />
          </div>
          <img className="scWatermark" src="./assets/maharashtra-watermark.png" alt="" aria-hidden="true" />
          <div className="scDetailsCol">
            <div className="scDetailRow">
              <div className="scDetailLabel">नाव</div>
              <div className="scDetailValue" id="name">{profile.nameMarathi}</div>
            </div>
            <div className="detailRow scDetailRow">
              <div className="scDetailLabel">जन्म तारीख</div>
              <div className="scDetailValue mono" id="dob">{profile.dateOfBirthMarathi}</div>
            </div>
            <div className="detailRow scDetailRow">
              <div className="scDetailLabel">वैधता</div>
              <div className="scDetailValue mono" id="valid">{profile.validityDateMarathi}</div>
            </div>
            <div className="detailRow scDetailRow">
              <div className="scDetailLabel">रक्त गट / Blood Group</div>
              <div className="scDetailValue" id="bloodGroup">B+</div>
            </div>
            <div className="detailRow scDetailRow">
              <div className="scDetailLabel">वाहन प्रकार</div>
              <div className="scDetailValue" id="vehicleType">{profile.vehicleTypeMarathi}</div>
            </div>
            <div className="detailRow scDetailRow">
              <div className="scDetailLabel">परवाना क्रमांक</div>
              <div className="scDetailValue mono" id="badge">{profile.permitNumber}</div>
            </div>
          </div>
          <div className="scVertDivider" aria-hidden="true" />
          <div className="scQrWrap">
            <div className="scQrInstruction">
              तपासणीसाठी<br />QR स्कॅन करा
            </div>
            <div className="scQrDash" aria-hidden="true" />
          </div>
          <div className="scQrCard">
            <img
              className="scQrImg"
              src="./assets/card-qr.png"
              alt="QR कोड"
              onError={(e) => {
                (e.target as HTMLImageElement).src = './public/assets/card-qr.png';
              }}
            />
          </div>
          <img
            className="scMahaMap"
            src="./assets/card-maha-map.png"
            alt="महाराष्ट्र"
            onError={(e) => {
              (e.target as HTMLImageElement).src = './public/assets/card-maha-map.png';
            }}
          />
          <div className="scFooterText">DAXY PROTOTYPE</div>
        </section>

        {/* BACK CARD */}
        <section
          className="card smartCardCanvas"
          id="backCard"
          aria-label="व्यावसायिक प्रवासी वाहन चालक स्मार्ट कार्ड (मागील बाजू)"
        >
          <div className="scBackHeaderBoard">
            <div className="scHeaderLeader">धर्मवीर आनंद दिघे साहेब</div>
            <div className="scHeaderOrg">
              महाराष्ट्र प्रवासी वाहन चालक<br />कल्याण मंडळ
            </div>
            <div className="scHeaderLine" aria-hidden="true" />
          </div>
          <div className="scAshokaEmblem">
            <img
              src="./assets/ashoka-emblem.png"
              alt="महाराष्ट्र शासन"
              onError={(e) => {
                (e.target as HTMLImageElement).src = './public/assets/ashoka-emblem.png';
              }}
            />
          </div>
          <div className="scBackFeatures">
            <div className="scBackRow">
              <div className="scBackIcon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
              <div className="scBackContent">
                <div className="scBackTitle">चालकाची माहिती</div>
                <div className="scBackSub">नाव, पत्ता, वाहन तपशील</div>
              </div>
            </div>

            <div className="scBackRow">
              <div className="scBackIcon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                </svg>
              </div>
              <div className="scBackContent">
                <div className="scBackTitle">शासकीय योजना व लाभ</div>
                <div className="scBackSub">कल्याणकारी योजना, विमा, आर्थिक मदत</div>
              </div>
            </div>

            <div className="scBackRow">
              <div className="scBackIcon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <div className="scBackContent">
                <div className="scBackTitle">माहिती व जनजागृती व्हिडीओ</div>
                <div className="scBackSub">रस्ते सुरक्षा, नियम, मार्गदर्शन</div>
              </div>
            </div>

            <div className="scBackRow">
              <div className="scBackIcon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
              </div>
              <div className="scBackContent">
                <div className="scBackTitle">आपत्कालीन संपर्क</div>
                <div className="scBackSub">अपघात / वैद्यकीय / तांत्रिक मदत</div>
              </div>
              <div className="scBackRight emergency">
                <div className="scEmerNum">112</div>
                <div className="scEmerLabel">(सर्व सेवा)</div>
              </div>
            </div>

            <div className="scBackRow">
              <div className="scBackIcon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
              </div>
              <div className="scBackContent">
                <div className="scBackTitle">आपत्कालीन संपर्क (वैयक्तिक)</div>
                <div className="scBackSub">Emergency Contact</div>
              </div>
              <div className="scBackRight personal">
                <div className="scPersonalNum">98765 43210</div>
              </div>
            </div>
          </div>

          <div className="scBridgeGraphic">
            <img
              src="./assets/card-back-bridge.png"
              alt="Maharashtra Moves Together"
              onError={(e) => {
                (e.target as HTMLImageElement).src = './public/assets/card-back-bridge.png';
              }}
            />
          </div>

          <div className="scFooterText scBackFooter">
            DAXY PROTOTYPE <span>|</span> केवळ संकल्पना नमुना <span>|</span> Not Government Issued
          </div>
        </section>
        </div>
      </div>

      {/* Verification Result Banner: Preserves instant field scan feedback and search params */}
      <div className="integrity" id="verificationResult">
        <div className="integrityIcon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 3 5 6v5c0 4.8 2.9 8.1 7 10 4.1-1.9 7-5.2 7-10V6l-7-3Z" />
            <path d="m8.8 12 2.1 2.2 4.4-4.5" />
          </svg>
        </div>
        <div>
          <strong>
            <span id="verifyLabel">{isStatusActive ? 'Verified Member' : `${status} Member`}</span> ·{' '}
            <span id="recordStatus" className={isStatusActive ? 'green' : ''} style={!isStatusActive ? { color: '#a33d33' } : undefined}>
              {isStatusActive ? 'Valid & Active' : status}
            </span>
          </strong>
          <p>
            SmartCard ID: <b id="member">{profile.driverId}</b> · RTO: <span id="rto">{profile.rtoMarathi}</span> ·{' '}
            <span id="verifyTime">{verifiedTime}</span>
          </p>
          <div style={{ display: 'none' }} aria-hidden="true">
            <span id="membership" className={isStatusActive ? 'active' : ''}>
              {status}
            </span>
            <span id="nameEn">{profile.nameEnglish}</span>
            <span id="districtChip">{profile.rtoMarathi}</span>
            <span id="aadhaar">{profile.aadhaarMasked}</span>
            <span id="issueDate">{profile.issueDateMarathi}</span>
            <span id="cardNumber">{profile.cardNumber}</span>
          </div>
        </div>
      </div>

      {/* Video Card Container */}
      <section
        ref={videoSectionRef}
        className="card videoCard"
        id="videoSection"
        aria-label="Official video content"
      >
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
