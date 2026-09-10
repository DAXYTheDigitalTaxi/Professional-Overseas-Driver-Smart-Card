import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Film } from 'lucide-react';
import '../styles/video.css';

export const GovernmentVideoSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isInViewport, setIsInViewport] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver implementation for viewport-based autoplay/pause
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsInViewport(entry.isIntersecting);
      },
      {
        threshold: 0.35, // Trigger when 35% of video card is visible
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Handle play/pause reacting to viewport visibility
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isInViewport) {
      video.muted = isMuted;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setAutoplayBlocked(false);
          })
          .catch(() => {
            setAutoplayBlocked(true);
            setIsPlaying(false);
          });
      }
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [isInViewport, isMuted]);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video
        .play()
        .then(() => {
          setIsPlaying(true);
          setAutoplayBlocked(false);
        })
        .catch(() => {
          setAutoplayBlocked(true);
        });
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.requestFullscreen) {
      video.requestFullscreen();
    }
  };

  return (
    <section
      ref={containerRef}
      className="gov-video-section"
      aria-label="शासकीय संदेश व माहितीपर व्हिडिओ"
    >
      <div className="video-container-card">
        {/* Official Header */}
        <div className="video-header-banner">
          <div className="video-badge-official">
            <Film size={13} />
            <span>अधिकृत शासन संदेश • OFFICIAL BROADCAST</span>
          </div>
          <h2 className="video-title-marathi">
            महाराष्ट्राच्या सुरक्षित प्रवासासाठी एक नवा डिजिटल उपक्रम
          </h2>
          <div className="video-title-english">
            Message from the Maharashtra Government • प्रताप सरनाईक
          </div>
        </div>

        {/* Single Video Frame (No tabs) */}
        <div className="video-frame-wrapper aspect-standard">
          <video
            ref={videoRef}
            className="gov-video-element"
            playsInline
            muted={isMuted}
            loop
            preload="auto"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            <source src="./assets/pratap-sarnaik.mp4" type="video/mp4" />
            आपला ब्राऊझर व्हिडिओ टॅगला समर्थन देत नाही. (Browser does not support HTML5 video)
          </video>

          {/* Interactive Controls Overlay */}
          <div className="video-controls-overlay">
            {/* Top Bar */}
            <div className="video-top-bar">
              <span className="video-live-tag">
                <span>●</span>
                <span>{isInViewport ? 'VIEWPORT ACTIVE' : 'STANDBY'}</span>
              </span>

              <button
                type="button"
                className="video-control-pill-btn"
                onClick={toggleMute}
                title={isMuted ? 'आवाज सुरू करा (Unmute Audio)' : 'आवाज बंद करा (Mute)'}
              >
                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                <span>{isMuted ? 'Unmute Audio' : 'Audio On'}</span>
              </button>
            </div>

            {/* Center Big Play Button (if paused or autoplay blocked) */}
            {(!isPlaying || autoplayBlocked) && (
              <div className="video-center-action">
                <button
                  type="button"
                  className="btn-big-play"
                  onClick={togglePlayPause}
                  aria-label="Play Video"
                >
                  <Play size={28} fill="currentColor" style={{ marginLeft: '4px' }} />
                </button>
              </div>
            )}

            {/* Bottom Bar */}
            <div className="video-bottom-bar">
              <button
                type="button"
                className="video-control-pill-btn"
                onClick={togglePlayPause}
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                <span>{isPlaying ? 'Pause' : 'Play'}</span>
              </button>

              <button
                type="button"
                className="video-control-pill-btn"
                onClick={toggleFullscreen}
                title="पूर्ण स्क्रीन (Fullscreen)"
              >
                <Maximize size={14} />
                <span>Fullscreen</span>
              </button>
            </div>
          </div>
        </div>

        {/* Video Speaker Footer Information */}
        <div className="video-card-footer">
          <div className="video-speaker-info">
            <div className="speaker-avatar-circle">GOV</div>
            <div className="speaker-name-title">
              <span className="speaker-name">मा. आ. श्री. प्रताप सरनाईक</span>
              <span className="speaker-post">
                महाराष्ट्र शासन उपक्रम • धर्मवीर आनंद दिघे साहेब महाराष्ट्र प्रवासी वाहन चालक कल्याण मंडळ
              </span>
            </div>
          </div>

          <div
            style={{
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              textAlign: 'right',
            }}
          >
            स्वयं-प्ले (Auto-play on scroll)
          </div>
        </div>
      </div>
    </section>
  );
};
