import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Gamepad2, Menu, X, Cpu, History, BarChart3, ShieldAlert, Info, Play } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', icon: <Gamepad2 size={18} /> },
    { name: 'Generate Setup', path: '/generate', icon: <Play size={18} /> },
    { name: 'History', path: '/history', icon: <History size={18} /> },
    { name: 'Analytics', path: '/analytics', icon: <BarChart3 size={18} /> },
    { name: 'Admin', path: '/admin', icon: <ShieldAlert size={18} /> },
    { name: 'About', path: '/about', icon: <Info size={18} /> },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  // Styling helpers
  const navbarStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: 100 + '%',
    zIndex: 1000,
    transition: 'var(--transition-smooth)',
    background: scrolled ? 'rgba(11, 13, 25, 0.9)' : 'rgba(5, 6, 10, 0.4)',
    backdropFilter: 'blur(12px)',
    borderBottom: scrolled ? '1px solid rgba(0, 242, 254, 0.2)' : '1px solid rgba(255, 255, 255, 0.05)',
    boxShadow: scrolled ? '0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 1px 15px rgba(0, 242, 254, 0.05)' : 'none',
  };

  return (
    <nav style={navbarStyle}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '75px'
      }}>
        {/* Brand/Logo */}
        <Link to="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontFamily: 'var(--font-gaming)',
          fontWeight: 900,
          fontSize: '1.25rem',
          letterSpacing: '2px',
        }}>
          <Cpu className="text-neon-blue animate-pulse-slow" size={28} />
          <span>
            <span className="text-gradient">GAMING</span> <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>SECTOR</span>
          </span>
        </Link>

        {/* Desktop Nav Items */}
        <div style={{ display: 'none', gap: '8px' }} className="md-flex">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-gaming)',
                  letterSpacing: '1px',
                  fontWeight: 500,
                  transition: 'var(--transition-smooth)',
                  border: '1px solid transparent',
                  background: isActive ? 'rgba(0, 242, 254, 0.1)' : 'transparent',
                  color: isActive ? 'var(--neon-blue)' : 'var(--text-secondary)',
                  borderColor: isActive ? 'rgba(0, 242, 254, 0.2)' : 'transparent',
                  textShadow: isActive ? '0 0 10px var(--neon-blue-glow)' : 'none',
                }}
                className={isActive ? '' : 'nav-hover'}
              >
                {link.icon}
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={toggleMenu}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          className="md-hidden"
        >
          {isOpen ? <X size={28} className="text-neon-pink" /> : <Menu size={28} className="text-neon-blue" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div style={{
          background: 'rgba(11, 13, 25, 0.98)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border-neon-hover)',
          padding: '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          position: 'absolute',
          top: '75px',
          left: 0,
          width: 100 + '%',
          zIndex: 999,
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8)'
        }}>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  fontSize: '0.95rem',
                  fontFamily: 'var(--font-gaming)',
                  fontWeight: 600,
                  background: isActive ? 'rgba(157, 78, 221, 0.15)' : 'transparent',
                  color: isActive ? 'var(--neon-purple)' : 'var(--text-primary)',
                  borderLeft: isActive ? '4px solid var(--neon-purple)' : '4px solid transparent',
                  transition: 'var(--transition-smooth)',
                }}
              >
                {link.icon}
                {link.name}
              </Link>
            );
          })}
        </div>
      )}

      {/* Media Query Injector */}
      <style>{`
        @media (min-width: 768px) {
          .md-flex { display: flex !important; }
          .md-hidden { display: none !important; }
        }
        .nav-hover:hover {
          color: var(--text-primary) !important;
          background: rgba(255, 255, 255, 0.05);
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
