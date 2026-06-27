import React from 'react';
import { Cpu, MapPin, Phone, MessageSquare, Compass, ShieldAlert } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="container" style={{ padding: '100px 24px 60px 24px' }}>
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 className="page-title"><span className="text-gradient">ABOUT</span> THE PROJECT</h1>
        <p className="page-subtitle">Learn about NETHI MALLIKARJUN GUPTA retail enterprise and this interior layout suggester platform.</p>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}>
        {/* Core Description card */}
        <div className="glass-card" style={{ padding: '36px' }}>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '16px', textTransform: 'uppercase' }} className="text-neon-blue">
            Business & Project Context
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.7' }}>
            <strong>NETHI MALLIKARJUN GUPTA</strong> is a well-established retail and wholesale business operating out of Hyderabad, India. The enterprise caters to gym owners, health clubs, and modern home office/gaming enthusiasts, supplying heavy duty commercial fitness equipment alongside premium ergonomic accessories.
          </p>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.7' }}>
            As customers frequently request setups suggestions, sales agents traditionally gathered parameters (dimensions, themes, device numbers, and styling configurations) manually over WhatsApp, which led to delays.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            This <strong>AI Gaming Setup Interior Design Suggester</strong> solves that friction. By linking room parameters with LLM reasoning, it delivers optimized ergonomic dimensions plans, wire management steps, theme guidelines, and immediate product suggestions directly to customers.
          </p>
        </div>

        {/* Catalog Items */}
        <div>
          <h2 style={{ fontSize: '1.4rem', textTransform: 'uppercase', marginBottom: '20px', textAlign: 'center' }}>
            Retail Accessories <span className="text-neon-purple">Portfolio</span>
          </h2>
          <div className="grid-container grid-3">
            <div className="glass-card" style={{ padding: '24px' }}>
              <h4 style={{ fontFamily: 'var(--font-gaming)', color: 'var(--neon-blue)', marginBottom: '8px', textTransform: 'uppercase' }}>Gym Equipment</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                Multi-gym towers, treadmills, plates, commercial dumbbells, bench sets, and gym floor mats distributed wholesale.
              </p>
            </div>
            <div className="glass-card" style={{ padding: '24px' }}>
              <h4 style={{ fontFamily: 'var(--font-gaming)', color: 'var(--neon-purple)', marginBottom: '8px', textTransform: 'uppercase' }}>Gaming Seating</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                Ergonomic leather gaming chairs, gas-lift office chairs, posture support pillows, and heavy mesh chairs.
              </p>
            </div>
            <div className="glass-card" style={{ padding: '24px' }}>
              <h4 style={{ fontFamily: 'var(--font-gaming)', color: 'var(--neon-pink)', marginBottom: '8px', textTransform: 'uppercase' }}>PC Peripherals</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                Wired/wireless mechanical keyboards, ergonomic vertical mice, RGB glide mousepads, and heavy-duty gas-spring screen arms.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Info and Location */}
        <div className="glass-card" style={{ padding: '36px', borderColor: 'var(--neon-purple)' }}>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '24px', textTransform: 'uppercase' }} className="text-neon-purple">
            Business Coordinates
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <MapPin className="text-neon-blue" size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <h4 style={{ textTransform: 'uppercase', fontSize: '0.9rem' }}>Showroom Location</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>
                    Secunderabad / Hyderabad Main Market,<br />Telangana, India
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Phone className="text-neon-blue" size={20} style={{ flexShrink: 0 }} />
                <div>
                  <h4 style={{ textTransform: 'uppercase', fontSize: '0.9rem' }}>Inquiries Hotline</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '2px' }}>
                    +91 98765 43210 (Sales Desk / WhatsApp)
                  </p>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Cpu className="text-neon-purple" size={20} style={{ flexShrink: 0 }} />
                <div>
                  <h4 style={{ textTransform: 'uppercase', fontSize: '0.9rem' }}>Project Owner</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '2px' }}>
                    NETHI MALLIKARJUN GUPTA
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Compass className="text-neon-purple" size={20} style={{ flexShrink: 0 }} />
                <div>
                  <h4 style={{ textTransform: 'uppercase', fontSize: '0.9rem' }}>Developer/Intern</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '2px' }}>
                    Project Implementation & Deployment Release
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
