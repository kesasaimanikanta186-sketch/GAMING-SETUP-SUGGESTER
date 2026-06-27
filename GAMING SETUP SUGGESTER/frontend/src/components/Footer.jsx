import React from 'react';
import { Mail, Phone, MapPin, Cpu } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{
      background: 'rgba(5, 6, 10, 0.9)',
      borderTop: '1px solid var(--border-light)',
      padding: '40px 0 20px 0',
      marginTop: '80px',
      fontSize: '0.85rem',
      color: 'var(--text-secondary)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '32px',
          marginBottom: '30px'
        }}>
          {/* Company Brief */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-gaming)',
              fontSize: '1.1rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '16px'
            }}>
              <Cpu className="text-neon-purple" size={20} />
              <span>NETHI MALLIKARJUN GUPTA</span>
            </div>
            <p style={{ lineHeight: '1.6', marginBottom: '12px' }}>
              Your ultimate hub in Hyderabad for premium gaming setups, accessories, ergonomic furniture, and wholesale/retail gym equipment.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-gaming)',
              color: 'var(--text-primary)',
              marginBottom: '16px',
              fontSize: '0.9rem',
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}>Products Offered</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>• Ergonomic Gaming Chairs</li>
              <li>• Multi-Monitor Display Arms</li>
              <li>• Mechanical Gaming Keyboards</li>
              <li>• Precision Optical Mice & Headsets</li>
              <li>• Complete Heavy-Duty Gym Equipment</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-gaming)',
              color: 'var(--text-primary)',
              marginBottom: '16px',
              fontSize: '0.9rem',
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}>Contact & Business</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <MapPin size={16} className="text-neon-blue" style={{ marginTop: '2px', flexShrink: 0 }} />
                <span>Hyderabad, Telangana, India</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={16} className="text-neon-blue" style={{ flexShrink: 0 }} />
                <span>+91 98765 43210 (Calls / WhatsApp)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={16} className="text-neon-blue" style={{ flexShrink: 0 }} />
                <span>contact@gamingsectors.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          paddingTop: '20px',
          textAlign: 'center',
          color: 'var(--text-muted)',
          fontSize: '0.75rem'
        }}>
          <p>© {new Date().getFullYear()} NETHI MALLIKARJUN GUPTA. All Rights Reserved. AI Gaming Setup Designer Portal.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
