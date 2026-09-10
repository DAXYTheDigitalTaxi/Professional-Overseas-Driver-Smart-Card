import React from 'react';
import { Shield, Sparkles } from 'lucide-react';
import '../styles/footer.css';

export const GovernmentFooter: React.FC = () => {
  return (
    <footer className="gov-footer" role="contentinfo">
      <div className="page-container">
        <div className="footer-content">
          {/* Left Brand Details */}
          <div className="footer-brand-section">
            <img
              src="./assets/maharashtra-seal.svg"
              alt="महाराष्ट्र शासन राजमुद्रा"
              className="footer-emblem"
            />
            <div>
              <div className="footer-gov-title">
                महाराष्ट्र शासन <span className="footer-gov-eng">Govt. of Maharashtra</span>
              </div>
              <div className="footer-board-title">
                धर्मवीर आनंद दिघे साहेब महाराष्ट्र प्रवासी वाहन चालक कल्याण मंडळ
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px' }}>
                Digital Commercial Vehicle Driver Identity & Verification Initiative
              </div>

              <div className="footer-motto-badge">
                <Sparkles size={14} />
                <span>सुरक्षित प्रवास • समृद्ध महाराष्ट्र (Maharashtra Moves Together)</span>
              </div>
            </div>
          </div>

          {/* Right Presentation Information */}
          <div className="footer-info-section">
            <div className="footer-badge-prototype">
              <Shield size={13} style={{ display: 'inline', marginRight: '5px' }} />
              PROTOTYPE / PRESENTATION DEMO
            </div>
            <p style={{ maxWidth: '380px', lineHeight: 1.5 }}>
              हे संकेतस्थळ केवळ सादरीकरण व संकल्पना प्रदर्शनासाठी (Presentation Demo Prototype) तयार केलेले आहे. सर्व चालक व वाहन तपशील काल्पनिक आहेत.
            </p>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
              QR Code Enabled Commercial Vehicle Verification • Single Page Prototype
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div>
            © {new Date().getFullYear()} महाराष्ट्र शासन | प्रवासी वाहन चालक कल्याण मंडळ
          </div>
          <div>
            Designed for Live Mobile Presentation & GitHub Pages Deployment
          </div>
        </div>
      </div>
    </footer>
  );
};
