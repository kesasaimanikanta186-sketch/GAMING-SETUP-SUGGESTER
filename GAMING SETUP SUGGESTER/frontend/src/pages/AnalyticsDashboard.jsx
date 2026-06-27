import React, { useState, useEffect } from 'react';
import { Cpu, Star, BarChart3, PieChart, TrendingUp, HelpCircle } from 'lucide-react';

const AnalyticsDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/analytics')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch analytics');
        return res.json();
      })
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container" style={{ padding: '120px 24px', textAlign: 'center' }}>
        <Cpu className="text-neon-blue animate-spin-slow" size={36} style={{ marginBottom: '12px' }} />
        <p style={{ color: 'var(--text-secondary)' }}>Loading analytics data...</p>
      </div>
    );
  }

  // Calculate percentages helper
  const getPercentage = (count) => {
    if (!stats || stats.total_generations === 0) return 0;
    return Math.round((count / stats.total_generations) * 100);
  };

  // Helper colors for theme bars
  const themeColors = {
    'RGB': 'var(--neon-pink)',
    'Minimal': 'var(--neon-blue)',
    'Dark': '#4b5563',
    'Premium': 'var(--neon-purple)',
    'Futuristic': '#ff9f1c',
    'Unknown': 'var(--text-muted)'
  };

  return (
    <div className="container" style={{ padding: '100px 24px 60px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 className="page-title"><span className="text-gradient">ANALYTICS</span> RADAR</h1>
        <p className="page-subtitle">Examine system telemetry, generation parameters distribution, and customer satisfaction metrics.</p>
      </div>

      {/* Numerical Cards */}
      <div className="grid-container grid-4" style={{ marginBottom: '40px' }}>
        {/* Total generations */}
        <div className="glass-card" style={{ padding: '24px', textAlign: 'center' }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontFamily: 'var(--font-gaming)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Total Generations
          </span>
          <h2 className="text-neon-blue" style={{ fontSize: '2.5rem', margin: '8px 0 4px 0' }}>
            {stats.total_generations}
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Layout computations</p>
        </div>

        {/* Avg Rating */}
        <div className="glass-card" style={{ padding: '24px', textAlign: 'center' }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontFamily: 'var(--font-gaming)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Average Rating
          </span>
          <h2 className="text-neon-purple" style={{ fontSize: '2.5rem', margin: '8px 0 4px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            {stats.average_rating} <Star size={24} fill="var(--neon-purple)" />
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Based on feedback submissions</p>
        </div>

        {/* Top device */}
        <div className="glass-card" style={{ padding: '24px', textAlign: 'center' }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontFamily: 'var(--font-gaming)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Top Device
          </span>
          <h2 className="text-neon-pink" style={{ fontSize: '1.75rem', margin: '16px 0 12px 0', textTransform: 'uppercase' }}>
            {stats.most_selected_device}
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Most frequent hardware form</p>
        </div>

        {/* Top Theme */}
        <div className="glass-card" style={{ padding: '24px', textAlign: 'center' }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontFamily: 'var(--font-gaming)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Top Theme Vibe
          </span>
          <h2 style={{ fontSize: '1.75rem', margin: '16px 0 12px 0', textTransform: 'uppercase', color: 'var(--text-primary)' }}>
            {stats.most_selected_theme}
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Preferred interior aesthetic</p>
        </div>
      </div>

      {/* Charts section */}
      <div className="grid-container grid-2" style={{ marginBottom: '40px' }}>
        {/* Device type horizontal chart */}
        <div className="glass-card" style={{ padding: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <BarChart3 size={20} className="text-neon-blue" />
            <h3 style={{ fontSize: '1.1rem', textTransform: 'uppercase' }}>Gaming Device Popularity</h3>
          </div>

          {stats.total_generations === 0 ? (
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '20px' }}>No stats data to show yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {['PC', 'Console', 'Laptop', 'Multi-device'].map(dev => {
                const count = stats.device_counts[dev] || 0;
                const percentage = getPercentage(count);
                return (
                  <div key={dev}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                      <span style={{ fontWeight: 600 }}>{dev}</span>
                      <span style={{ color: 'var(--text-secondary)' }}>{count} ({percentage}%)</span>
                    </div>
                    {/* Bar track */}
                    <div style={{ background: 'rgba(255, 255, 255, 0.05)', height: '12px', borderRadius: '6px', overflow: 'hidden' }}>
                      <div style={{
                        background: 'linear-gradient(90deg, var(--neon-blue) 0%, var(--neon-purple) 100%)',
                        width: `${percentage}%`,
                        height: '100%',
                        borderRadius: '6px',
                        boxShadow: '0 0 10px var(--neon-blue-glow)',
                        transition: 'width 1s ease-out'
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Theme preference distribution */}
        <div className="glass-card" style={{ padding: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <PieChart size={20} className="text-neon-purple" />
            <h3 style={{ fontSize: '1.1rem', textTransform: 'uppercase' }}>Theme Selection Distribution</h3>
          </div>

          {stats.total_generations === 0 ? (
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '20px' }}>No stats data to show yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {['RGB', 'Minimal', 'Dark', 'Premium', 'Futuristic'].map(theme => {
                const count = stats.theme_counts[theme] || 0;
                const percentage = getPercentage(count);
                const color = themeColors[theme] || 'var(--neon-blue)';
                return (
                  <div key={theme} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: color,
                      boxShadow: `0 0 8px ${color}`
                    }} />
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                      <span style={{ fontWeight: 500 }}>{theme} Theme</span>
                      <span style={{ color: 'var(--text-secondary)' }}>{count} ({percentage}%)</span>
                    </div>
                    {/* Tiny inline chart bar */}
                    <div style={{ width: '100px', background: 'rgba(255, 255, 255, 0.05)', height: '6px', borderRadius: '3px' }}>
                      <div style={{ width: `${percentage}%`, height: '100%', background: color, borderRadius: '3px' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Quality Score Trend Table / Listing */}
      <div className="glass-card" style={{ padding: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
          <TrendingUp size={20} className="text-neon-pink" />
          <h3 style={{ fontSize: '1.1rem', textTransform: 'uppercase' }}>Recent Client Reviews</h3>
        </div>

        {stats.feedback_list.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '20px' }}>No feedback submissions registered yet.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {stats.feedback_list.slice(-3).reverse().map((fb) => (
              <div key={fb.id} style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-light)',
                borderRadius: '8px',
                padding: '16px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{fb.customer_name}</span>
                  <div style={{ display: 'flex', color: 'var(--neon-blue)', gap: '2px' }}>
                    {Array.from({ length: fb.rating }).map((_, i) => (
                      <Star key={i} size={12} fill="var(--neon-blue)" />
                    ))}
                  </div>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontStyle: 'italic' }}>
                  "{fb.comment || 'No comment left'}"
                </p>
                <span style={{ display: 'block', textAlign: 'right', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                  {new Date(fb.created_at).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
