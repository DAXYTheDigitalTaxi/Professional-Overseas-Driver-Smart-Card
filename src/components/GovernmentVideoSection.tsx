import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Film } from 'lucide-react';
import '../styles/video.css';

interface VideoItem {
  id: string;
  titleMarathi: string;
  titleEnglish: string;
  source: string;
  isVertical: boolean;
  speaker: string;
  designation: string;
}

const VIDEO_PLAYLIST: VideoItem[] = [
  {
    id: 'pratap-sarnaik',
    titleMarathi: 'प्रताप सरनाईक यांचा अधिकृत संदेश',
    titleEnglish: 'Official Address by Pratap Sarnaik',
    source: './assets/pratap-sarnaik.mp4',
    isVertical: false,
    speaker: 'मा. आ. श्री. प्रताप सरनाईक',
    designation: 'महाराष्ट्र शासन उपक्रम • प्रवासी वाहन चालक कल्याण मंडळ',
  },
  {
    id: 'reel-1',
    titleMarathi: 'डिजिटल क्यूआर ओळखपत्र - विशेष रील १',
    titleEnglish: 'QR Identity Card - Special Reel 1',
    source: './assets/reel-1.mp4',
    isVertical: true,
    speaker: 'जनजागृती रील १',
    designation: 'प्रवासी व चालक जनजागृती मोहीम',
  },
  {
    id: 'reel-2',
    titleMarathi: 'सुरक्षित प्रवास, समृद्ध महाराष्ट्र - विशेष रील २',
    titleEnglish: 'Safe Travel Initiative - Special Reel 2',
    source: './assets/reel-2.mp4',
    isVertical: true,
    speaker: 'जनजागृती रील २',
    designation: 'कल्याणकारी योजना माहिती मोहीम',
  },
];

export const GovernmentVideoSection: React.FC = () => {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isInViewport, setIsInViewport] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentVideo = VIDEO_PLAYLIST[activeVideoIndex];

  // IntersectionObserver implementation for viewport-based autoplay/pause
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsInViewport(entry.isIntersecting);
      },
      {
        threshold: 0.45, // Trigger when 45% of video card is visible
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
      // Browsers allow autoplay ONLY when muted
      video.muted = isMuted;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setAutoplayBlocked(false);
          })
          .catch(() => {
            // Autoplay blocked by browser policy
            setAutoplayBlocked(true);
            setIsPlaying(false);
          });
      }
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [isInViewport, activeVideoIndex, isMuted]);

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
            Message from the Maharashtra Government • Passenger Vehicle Welfare Initiative
          </div>
        </div>

        {/* Video Selector Tabs: Pratap Sarnaik + 2 Instagram Reels */}
        <div className="video-selector-tabs" role="tablist">
          {VIDEO_PLAYLIST.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={activeVideoIndex === index}
              className={`video-tab-btn ${activeVideoIndex === index ? 'active' : ''}`}
              onClick={() => {
                setActiveVideoIndex(index);
                // When changing video, keep muted for autoplay compliance
                setIsMuted(true);
              }}
            >
              <span>{item.isVertical ? '📱' : '📺'}</span>
              <span>{item.titleMarathi.split(' - ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Video Frame */}
        <div
          className={`video-frame-wrapper ${
            currentVideo.isVertical ? 'aspect-vertical' : 'aspect-standard'
          }`}
        >
          <video
            ref={videoRef}
            key={currentVideo.source}
            className="gov-video-element"
            playsInline
            muted={isMuted}
            loop
            preload="metadata"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            <source src={currentVideo.source} type="video/mp4" />
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
            <div className="speaker-avatar-circle">
              {currentVideo.isVertical ? 'REEL' : 'GOV'}
            </div>
            <div className="speaker-name-title">
              <span className="speaker-name">{currentVideo.speaker}</span>
              <span className="speaker-post">{currentVideo.designation}</span>
            </div>
          </div>

          <div
            style={{
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              textAlign: 'right',
            }}
          >
            स्वयं-प्ले (Auto-play when visible)
          </div>
        </div>
      </div>
    </section>
  );
};
