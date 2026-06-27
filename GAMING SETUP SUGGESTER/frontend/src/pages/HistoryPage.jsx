import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Eye, Filter, Cpu, Calendar, Tag, ArrowRight } from 'lucide-react';

const HistoryPage = () => {
  const navigate = useNavigate();
  const [historyList, setHistoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDevice, setSelectedDevice] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/history')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load history');
        return res.json();
      })
      .then(data => {
        setHistoryList(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleViewDetails = (item) => {
    // We parse them in backend, but double check
    navigate('/generate/result', { 
      state: { 
        result: {
          id: item.id,
          input: item.input_json,
          output: item.ai_response,
          created_at: item.created_at
        } 
      } 
    });
  };

  // Filter lists
  const filteredList = historyList.filter(item => {
    const matchesSearch = item.customer_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDevice = selectedDevice ? item.device_type === selectedDevice : true;
    const matchesTheme = selectedTheme ? item.theme === selectedTheme : true;
    return matchesSearch && matchesDevice && matchesTheme;
  });

  return (
    <div className="container" style={{ padding: '100px 24px 60px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 className="page-title"><span className="text-gradient">CALCULATION</span> HISTORY</h1>
        <p className="page-subtitle">Inspect previous AI configuration plans, parameters, and recommendations.</p>
      </div>

      {/* Filter panel */}
      <div className="glass-card" style={{ padding: '20px 24px', marginBottom: '32px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px'
        }}>
          {/* Search */}
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search by customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
              style={{ width: '100%', paddingLeft: '40px' }}
            />
            <Search 
              size={16} 
              style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} 
              className="text-text-muted"
            />
          </div>

          {/* Device filter */}
          <select
            value={selectedDevice}
            onChange={(e) => setSelectedDevice(e.target.value)}
            className="form-select"
          >
            <option value="">All Devices</option>
            <option value="PC">PC (Tower)</option>
            <option value="Console">Console</option>
            <option value="Laptop">Laptop</option>
            <option value="Multi-device">Multi-Device</option>
          </select>

          {/* Theme filter */}
          <select
            value={selectedTheme}
            onChange={(e) => setSelectedTheme(e.target.value)}
            className="form-select"
          >
            <option value="">All Themes</option>
            <option value="RGB">RGB Cyberpunk</option>
            <option value="Minimal">Minimalist</option>
            <option value="Dark">Dark Room</option>
            <option value="Premium">Premium Exec</option>
            <option value="Futuristic">Futuristic Command</option>
          </select>
        </div>
      </div>

      {/* History listing */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <Cpu className="text-neon-blue animate-spin-slow" size={36} style={{ marginBottom: '12px' }} />
          <p style={{ color: 'var(--text-secondary)' }}>Loading design history...</p>
        </div>
      ) : filteredList.length === 0 ? (
        <div className="glass-card" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
          <p>No matching generation entries found.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredList.map((item) => (
            <div 
              key={item.id} 
              className="glass-card" 
              style={{ 
                padding: '20px 24px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                flexWrap: 'wrap', 
                gap: '16px',
                cursor: 'pointer'
              }}
              onClick={() => handleViewDetails(item)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                {/* Visual Avatar */}
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '10px',
                  background: 'rgba(0, 242, 254, 0.08)',
                  border: '1px solid rgba(0, 242, 254, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--neon-blue)',
                  flexShrink: 0
                }}>
                  <Cpu size={24} />
                </div>

                <div>
                  <h3 style={{ fontSize: '1.05rem', textTransform: 'uppercase', marginBottom: '4px' }}>
                    {item.customer_name}
                  </h3>
                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={12} /> {new Date(item.created_at).toLocaleDateString()}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Tag size={12} /> {item.device_type} / {item.theme}
                    </span>
                    <span className="text-neon-blue" style={{ fontWeight: 'bold' }}>
                      ₹{item.budget.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Latency: {item.response_time_ms} ms
                </span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewDetails(item);
                  }}
                  className="btn-neon-blue" 
                  style={{ padding: '8px 16px', fontSize: '0.75rem' }}
                >
                  View Design <ArrowRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
