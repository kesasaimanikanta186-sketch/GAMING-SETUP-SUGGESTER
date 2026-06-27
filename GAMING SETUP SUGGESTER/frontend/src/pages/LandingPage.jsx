import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Gamepad2, ArrowRight, Zap, Lightbulb, Compass, Award, ShieldCheck, Heart } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero Section */}
      <header style={{
        padding: '160px 0 80px 0',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        {/* Glow Spheres */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '15%',
          width: '300px',
          height: '300px',
          background: 'rgba(0, 242, 254, 0.15)',
          borderRadius: '50%',
          filter: 'blur(100px)',
          zIndex: -1
        }} />
        <div style={{
          position: 'absolute',
          top: '30%',
          right: '15%',
          width: '300px',
          height: '300px',
          background: 'rgba(157, 78, 221, 0.15)',
          borderRadius: '50%',
          filter: 'blur(100px)',
          zIndex: -1
        }} />

        <div className="container" style={{ maxWidth: '850px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(0, 242, 254, 0.3)',
            padding: '6px 16px',
            borderRadius: '20px',
            marginBottom: '24px',
            fontSize: '0.8rem',
            fontFamily: 'var(--font-gaming)',
            letterSpacing: '1px',
            color: 'var(--neon-blue)',
            textTransform: 'uppercase'
          }}>
            <Gamepad2 size={14} className="animate-spin-slow" />
            <span>AI-Driven Room Interior Architecture</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            lineHeight: '1.1',
            marginBottom: '20px',
            textTransform: 'uppercase',
            fontWeight: 900
          }}>
            Design Your Ultimate <span className="text-gradient">Gaming Setup</span>
          </h1>

          <p style={{
            color: 'var(--text-secondary)',
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            maxWidth: '650px',
            margin: '0 auto 40px auto',
            lineHeight: '1.6'
          }}>
            Enter your room measurements and budget, and let our AI model suggest cable layout, lighting accents, desk arrangement, and accessories custom-fit for your home.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick={() => navigate('/generate')} 
              className="btn-neon-blue glow-pulse"
              style={{ padding: '14px 36px', fontSize: '1rem' }}
            >
              Start Generating Setup <ArrowRight size={18} />
            </button>
            <button 
              onClick={() => navigate('/about')} 
              className="btn-neon-purple"
              style={{ padding: '14px 36px', fontSize: '1rem' }}
            >
              Explore Products
            </button>
          </div>
        </div>
      </header>

      {/* Business Catalog Highlights */}
      <section style={{ padding: '60px 0', position: 'relative' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{ fontSize: '1.8rem', textTransform: 'uppercase', marginBottom: '8px' }}>
              NETHI MALLIKARJUN GUPTA <span className="text-neon-blue">HIGHLIGHTS</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto' }}>
              We stock the standard accessories and furniture that complete the recommendations.
            </p>
          </div>

          <div className="grid-container grid-3">
            <div className="glass-card" style={{ padding: '30px' }}>
              <div style={{
                background: 'rgba(0, 242, 254, 0.1)',
                width: '50px',
                height: '50px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--neon-blue)',
                marginBottom: '20px'
              }}>
                <Award size={24} />
              </div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '10px', textTransform: 'uppercase' }}>Gaming Chairs</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Fully adjustable, premium-leather, and heavy mesh chairs with dynamic lumbar supports built to handle long, marathon gaming sessions.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '30px' }}>
              <div style={{
                background: 'rgba(157, 78, 221, 0.1)',
                width: '50px',
                height: '50px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--neon-purple)',
                marginBottom: '20px'
              }}>
                <Zap size={24} />
              </div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '10px', textTransform: 'uppercase' }}>Mechanical Accessories</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Keyboards with hot-swappable switches, low-latency wireless mice, and spatial headsets available wholesale or retail in Hyderabad.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '30px' }}>
              <div style={{
                background: 'rgba(255, 0, 127, 0.1)',
                width: '50px',
                height: '50px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--neon-pink)',
                marginBottom: '20px'
              }}>
                <Compass size={24} />
              </div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '10px', textTransform: 'uppercase' }}>Ergonomic Desks</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                L-shape, dual-motor standing, and standard setups configured for optimal structural monitor and arm mounting configurations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose AI Planner */}
      <section style={{ padding: '60px 0', background: 'rgba(5, 6, 10, 0.3)' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px',
            alignItems: 'center'
          }}>
            <div>
              <h2 style={{ fontSize: '2rem', textTransform: 'uppercase', marginBottom: '16px' }}>
                Why Use the <span className="text-neon-purple">AI Setup Planner</span>?
              </h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: '1.7' }}>
                Don't guess where your desk fits. Our layout algorithm calculates exact spaces using your inputs, considering doors, windows, and monitors for zero-glare comfort.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <ShieldCheck className="text-neon-blue" size={24} style={{ flexShrink: 0 }} />
                  <div>
                    <h4 style={{ fontSize: '0.95rem', textTransform: 'uppercase' }}>Accurate Dimensions</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Prevents ordering bulky furniture that crowds or blocks your room layout.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <Lightbulb className="text-neon-purple" size={24} style={{ flexShrink: 0 }} />
                  <div>
                    <h4 style={{ fontSize: '0.95rem', textTransform: 'uppercase' }}>Theme Customization</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Supports RGB Cyberpunk, Cozy Warm Wood, Dark Obsidians, or Futuristic designs.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Callout Graphic */}
            <div className="glass-card" style={{
              padding: '40px',
              border: '2px solid var(--border-neon-hover)',
              boxShadow: '0 0 30px rgba(157, 78, 221, 0.15)'
            }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '20px', textTransform: 'uppercase' }} className="text-neon-blue">
                Setup Suggestions Output Preview
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.9rem' }}>
                <li style={{ borderLeft: '3px solid var(--neon-blue)', paddingLeft: '12px' }}>
                  <strong>Desk Placement:</strong> Placed along the north wall (12ft) to avoid window glare.
                </li>
                <li style={{ borderLeft: '3px solid var(--neon-purple)', paddingLeft: '12px' }}>
                  <strong>Ergonomic Target:</strong> NETHI Titan Series Chair set to 105° tilt.
                </li>
                <li style={{ borderLeft: '3px solid var(--neon-pink)', paddingLeft: '12px' }}>
                  <strong>Cable Flow:</strong> Under-desk wire tray routed through single power surge cord.
                </li>
              </ul>
              <div style={{ marginTop: '24px', textAlign: 'center' }}>
                <button 
                  onClick={() => navigate('/generate')} 
                  className="btn-neon-purple"
                  style={{ width: '100%' }}
                >
                  Generate Yours Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
