import React, { useState, useEffect } from 'react';
import { Shield, Eye, Trash2, Cpu, FileText, CheckCircle, RefreshCw, X, MessageSquare } from 'lucide-react';

const AdminDashboard = () => {
  const [generations, setGenerations] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null); // Detail Inspect Modal
  const [activeTab, setActiveTab] = useState('generations'); // generations | feedback

  const fetchAdminData = () => {
    setLoading(true);
    Promise.all([
      fetch('https://gaming-setup-suggester-1.onrender.com/api/history').then(res => res.json()),
      fetch('https://gaming-setup-suggester-1.onrender.com/api/analytics').then(res => res.json())
    ])
      .then(([historyData, analyticsData]) => {
        setGenerations(historyData);
        setAnalytics(analyticsData);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleInspect = (id) => {
    // Fetch details of specific item
    fetch(`https://gaming-setup-suggester-1.onrender.com/api/history/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch item details');
        return res.json();
      })
      .then(data => {
        setSelectedItem(data);
      })
      .catch(err => alert(err.message));
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '120px 24px', textAlign: 'center' }}>
        <Cpu className="text-neon-blue animate-spin-slow" size={36} style={{ marginBottom: '12px' }} />
        <p style={{ color: 'var(--text-secondary)' }}>Loading Admin Portal...</p>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '100px 24px 60px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 className="page-title"><span className="text-gradient">ADMIN</span> SECTOR</h1>
        <p className="page-subtitle">Inspect raw computational prompts, latency metrics, and audit system ratings logs.</p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px' }}>
        <button
          onClick={() => setActiveTab('generations')}
          className="btn-neon-blue"
          style={{
            background: activeTab === 'generations' ? 'var(--neon-blue)' : 'transparent',
            color: activeTab === 'generations' ? 'var(--bg-darker)' : 'var(--neon-blue)',
            padding: '6px 16px',
            fontSize: '0.8rem'
          }}
        >
          Generations Log ({generations.length})
        </button>
        <button
          onClick={() => setActiveTab('feedback')}
          className="btn-neon-purple"
          style={{
            background: activeTab === 'feedback' ? 'var(--neon-purple)' : 'transparent',
            color: activeTab === 'feedback' ? 'var(--text-primary)' : 'var(--neon-purple)',
            padding: '6px 16px',
            fontSize: '0.8rem'
          }}
        >
          Customer Feedback ({analytics?.feedback_list?.length || 0})
        </button>
        <button
          onClick={fetchAdminData}
          style={{
            marginLeft: 'auto',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.8rem'
          }}
        >
          <RefreshCw size={12} /> Sync Logs
        </button>
      </div>

      {activeTab === 'generations' ? (
        /* Generations Log Table */
        <div className="glass-card" style={{ padding: '24px', overflowX: 'auto' }}>
          {generations.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No generations calculated yet.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-neon)', color: 'var(--text-primary)' }}>
                  <th style={{ padding: '12px', fontFamily: 'var(--font-gaming)' }}>ID</th>
                  <th style={{ padding: '12px', fontFamily: 'var(--font-gaming)' }}>Client</th>
                  <th style={{ padding: '12px', fontFamily: 'var(--font-gaming)' }}>Theme</th>
                  <th style={{ padding: '12px', fontFamily: 'var(--font-gaming)' }}>Device</th>
                  <th style={{ padding: '12px', fontFamily: 'var(--font-gaming)' }}>Budget</th>
                  <th style={{ padding: '12px', fontFamily: 'var(--font-gaming)' }}>Latency</th>
                  <th style={{ padding: '12px', fontFamily: 'var(--font-gaming)', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {generations.map((gen) => (
                  <tr key={gen.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <td style={{ padding: '12px', fontFamily: 'monospace', color: 'var(--neon-blue)' }}>{gen.id}</td>
                    <td style={{ padding: '12px', fontWeight: 'bold' }}>{gen.customer_name}</td>
                    <td style={{ padding: '12px' }}>{gen.theme}</td>
                    <td style={{ padding: '12px' }}>{gen.device_type}</td>
                    <td style={{ padding: '12px' }}>₹{gen.budget.toLocaleString('en-IN')}</td>
                    <td style={{ padding: '12px', color: gen.response_time_ms > 2000 ? 'var(--neon-pink)' : 'var(--neon-blue)' }}>
                      {gen.response_time_ms} ms
                    </td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      <button
                        onClick={() => handleInspect(gen.id)}
                        className="btn-neon-blue"
                        style={{ padding: '6px 12px', fontSize: '0.75rem', textTransform: 'none' }}
                      >
                        <Eye size={12} /> Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ) : (
        /* Feedback List Table */
        <div className="glass-card" style={{ padding: '24px' }}>
          {!analytics || analytics.feedback_list.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No feedback comments submitted yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {analytics.feedback_list.map((fb) => (
                <div
                  key={fb.id}
                  style={{
                    border: '1px solid var(--border-light)',
                    borderRadius: '8px',
                    padding: '20px',
                    background: 'rgba(255,255,255,0.01)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h4 style={{ textTransform: 'uppercase', fontSize: '0.9rem' }}>{fb.customer_name}</h4>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Linked Generation: <span style={{ fontFamily: 'monospace', color: 'var(--neon-blue)' }}>{fb.generation_id}</span>
                      </span>
                    </div>
                    <div style={{ display: 'flex', color: 'var(--neon-blue)', gap: '2px' }}>
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          size={16}
                          fill={idx < fb.rating ? 'var(--neon-blue)' : 'transparent'}
                          color={idx < fb.rating ? 'var(--neon-blue)' : 'rgba(255,255,255,0.1)'}
                        />
                      ))}
                    </div>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.6', background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '6px' }}>
                    {fb.comment || 'No written comment supplied.'}
                  </p>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'right' }}>
                    Submitted: {new Date(fb.created_at).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Inspect Item Modal */}
      {selectedItem && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(8px)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div className="glass-card" style={{
            width: '100%',
            maxWidth: '800px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '32px',
            borderColor: 'var(--neon-blue)'
          }}>
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-neon)', paddingBottom: '16px', marginBottom: '24px' }}>
              <div>
                <h3 style={{ textTransform: 'uppercase', fontSize: '1.2rem' }} className="text-neon-blue">
                  Inspect Generation
                </h3>
                <span style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  ID: {selectedItem.id}
                </span>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                style={{ background: 'none', border: 'none', color: 'var(--neon-pink)', cursor: 'pointer' }}
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '0.85rem' }}>
              {/* Form Input parameters */}
              <div>
                <h4 style={{ fontFamily: 'var(--font-gaming)', color: 'var(--text-primary)', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Parsed User Inputs (JSON)
                </h4>
                <pre style={{
                  background: 'rgba(0,0,0,0.4)',
                  border: '1px solid var(--border-light)',
                  padding: '16px',
                  borderRadius: '8px',
                  overflowX: 'auto',
                  fontFamily: 'monospace',
                  color: 'var(--text-secondary)'
                }}>
                  {JSON.stringify(selectedItem.input_json, null, 2)}
                </pre>
              </div>

              {/* AI Response parameters */}
              <div>
                <h4 style={{ fontFamily: 'var(--font-gaming)', color: 'var(--text-primary)', marginBottom: '8px', textTransform: 'uppercase' }}>
                  AI Suggestion Response (JSON)
                </h4>
                <pre style={{
                  background: 'rgba(0,0,0,0.4)',
                  border: '1px solid var(--border-light)',
                  padding: '16px',
                  borderRadius: '8px',
                  overflowX: 'auto',
                  fontFamily: 'monospace',
                  color: 'var(--text-secondary)'
                }}>
                  {JSON.stringify(selectedItem.ai_response, null, 2)}
                </pre>
              </div>

              {/* Telemetry info */}
              <div style={{ display: 'flex', gap: '20px', background: 'rgba(0, 242, 254, 0.05)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(0, 242, 254, 0.2)' }}>
                <div>
                  <strong>Calculated At:</strong> {new Date(selectedItem.created_at).toLocaleString()}
                </div>
                <div>
                  <strong>Response Latency:</strong> {selectedItem.response_time_ms} ms
                </div>
                <div>
                  <strong>AI Mode:</strong> {selectedItem.ai_response.isMock ? 'Mock Simulation' : 'Gemini 1.5 Flash API'}
                </div>
              </div>
            </div>

            <div style={{ marginTop: '24px', textAlign: 'right' }}>
              <button onClick={() => setSelectedItem(null)} className="btn-neon-pink">
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
