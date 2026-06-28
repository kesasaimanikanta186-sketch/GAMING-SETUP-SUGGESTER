import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Copy, Download, Share2, Star, Check, RefreshCw, 
  MapPin, Monitor, Armchair, Lightbulb, Cable, ShoppingBag, 
  DollarSign, ShieldAlert, FileText, Send 
} from 'lucide-react';
import { API_BASE } from '../config';

const OutputResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.result;

  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [feedbackLoading, setFeedbackLoading] = useState(false);

  // Return to generator if no data is present
  if (!data) {
    return (
      <div className="container" style={{ padding: '120px 24px', textAlign: 'center' }}>
        <div className="glass-card" style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
          <ShieldAlert size={48} className="text-neon-pink" style={{ marginBottom: '16px' }} />
          <h2 style={{ marginBottom: '12px' }}>No Suggestions Data</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
            It looks like you haven't generated a setup suggestion yet or refreshed this screen.
          </p>
          <button onClick={() => navigate('/generate')} className="btn-neon-blue">
            Go to Design Lab
          </button>
        </div>
      </div>
    );
  }

  const { id, input, output, created_at } = data;

  // Format suggestions for Copy to Clipboard
  const formatMarkdownText = () => {
    let md = `# AI GAMING SETUP DESIGN PLAN - GAMING SECTORS\n`;
    md += `Customer: ${input.customer_name}\n`;
    md += `Theme: ${input.theme} | Device: ${input.device_type} | Budget: ₹${input.budget}\n`;
    md += `Created on: ${new Date(created_at).toLocaleDateString()}\n\n`;

    md += `## 1. DESK ARRANGEMENT\n${output.deskArrangement.description}\n`;
    output.deskArrangement.details.forEach(d => md += `- ${d}\n`);
    md += `\n`;

    md += `## 2. MONITOR & DEVICE PLACEMENT\n${output.devicePlacement.description}\n`;
    output.devicePlacement.details.forEach(d => md += `- ${d}\n`);
    md += `\n`;

    md += `## 3. CHAIR & ERGONOMICS\n${output.chairPlacement.description}\n`;
    output.chairPlacement.details.forEach(d => md += `- ${d}\n`);
    md += `\n`;

    md += `## 4. LIGHTING & AMBIENCE\n${output.lightingSuggestion.description}\n`;
    output.lightingSuggestion.details.forEach(d => md += `- ${d}\n`);
    md += `\n`;

    md += `## 5. CABLE MANAGEMENT\n${output.cableManagement.description}\n`;
    output.cableManagement.details.forEach(d => md += `- ${d}\n`);
    md += `\n`;

    md += `## 6. RECOMMENDATIONS FROM NETHI MALLIKARJUN GUPTA CATALOG\n`;
    output.accessories.list.forEach(a => {
      md += `- **${a.name}** (${a.brand}) - ${a.price}\n  *Reason:* ${a.reason}\n`;
    });
    md += `\n`;

    md += `## 7. BUDGET RECOMMENDATIONS\n${output.budgetRecommendations.description}\n`;
    output.budgetRecommendations.details.forEach(d => md += `- ${d}\n`);
    md += `\n`;

    md += `## 8. SAFETY & COMFORT TIPS\n${output.safetyComfortTips.description}\n`;
    output.safetyComfortTips.details.forEach(d => md += `- ${d}\n`);
    md += `\n`;

    md += `## SUMMARY\n${output.summary.description}\n`;
    return md;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(formatMarkdownText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/history/${id}`;
    navigator.clipboard.writeText(shareUrl);
    setShared(true);
    setTimeout(() => setShared(false), 2500);
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) return;

    setFeedbackLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          generation_id: id,
          rating,
          comment
        })
      });

      if (!response.ok) throw new Error('Failed to submit feedback');

      setFeedbackSubmitted(true);
    } catch (err) {
      console.error(err);
      alert('Could not submit feedback: ' + err.message);
    } finally {
      setFeedbackLoading(false);
    }
  };

  const handleRegenerate = () => {
    // Fill the same values in standard input
    navigate('/generate', { state: { refill: input } });
  };

  return (
    <div className="container" style={{ padding: '100px 24px 60px 24px' }}>
      {/* Action panel */}
      <div className="no-print" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '32px'
      }}>
        <button 
          onClick={() => navigate('/generate')} 
          style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
        >
          <ArrowLeft size={16} /> Back to Design Lab
        </button>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button onClick={handleRegenerate} className="btn-neon-purple" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
            <RefreshCw size={14} /> Re-configure
          </button>
          <button onClick={handleCopy} className="btn-neon-blue" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
            {copied ? <Check size={14} className="text-neon-blue" /> : <Copy size={14} />} {copied ? 'Copied' : 'Copy Text'}
          </button>
          <button onClick={handleDownloadPDF} className="btn-neon-blue" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
            <Download size={14} /> Download PDF
          </button>
          <button onClick={handleShare} className="btn-neon-pink" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
            {shared ? <Check size={14} /> : <Share2 size={14} />} {shared ? 'Copied Link' : 'Share'}
          </button>
        </div>
      </div>

      {/* Main Print Layout Content */}
      <div id="print-area">
        {/* Banner/Header */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.08) 0%, rgba(157, 78, 221, 0.08) 100%)',
          border: '1px dashed var(--neon-blue)',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <h5 style={{ fontFamily: 'var(--font-gaming)', color: 'var(--neon-blue)', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '4px' }}>
              Suggestions Generated Successful
            </h5>
            <h2 style={{ fontSize: '1.5rem', textTransform: 'uppercase' }} className="text-gradient">
              {input.customer_name}'s Battlestation
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px' }}>
              Reference ID: {id} | Created: {new Date(created_at).toLocaleString()}
            </p>
          </div>
          <div style={{
            background: 'rgba(0, 242, 254, 0.1)',
            border: '1px solid var(--neon-blue)',
            borderRadius: '8px',
            padding: '8px 16px',
            textAlign: 'center',
            fontSize: '0.8rem',
            fontFamily: 'var(--font-gaming)'
          }}>
            <span style={{ color: 'var(--text-secondary)', display: 'block' }}>THEME VIBE</span>
            <span className="text-neon-blue" style={{ fontSize: '1rem', fontWeight: 'bold' }}>{input.theme}</span>
          </div>
        </div>

        {/* Suggestion cards grid */}
        <div className="grid-container grid-2" style={{ marginBottom: '32px' }}>
          {/* Desk arrangement */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <MapPin className="text-neon-blue" size={24} />
              <h3 style={{ fontSize: '1.15rem', textTransform: 'uppercase' }}>Desk Arrangement</h3>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
              {output.deskArrangement.description}
            </p>
            <ul style={{ paddingLeft: '16px', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {output.deskArrangement.details.map((d, index) => (
                <li key={index} style={{ color: 'var(--text-secondary)' }}>{d}</li>
              ))}
            </ul>
          </div>

          {/* Device placement */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <Monitor className="text-neon-purple" size={24} />
              <h3 style={{ fontSize: '1.15rem', textTransform: 'uppercase' }}>Monitor & Hardware</h3>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
              {output.devicePlacement.description}
            </p>
            <ul style={{ paddingLeft: '16px', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {output.devicePlacement.details.map((d, index) => (
                <li key={index} style={{ color: 'var(--text-secondary)' }}>{d}</li>
              ))}
            </ul>
          </div>

          {/* Chair placement */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <Armchair className="text-neon-pink" size={24} />
              <h3 style={{ fontSize: '1.15rem', textTransform: 'uppercase' }}>Chair & Posture</h3>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
              {output.chairPlacement.description}
            </p>
            <ul style={{ paddingLeft: '16px', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {output.chairPlacement.details.map((d, index) => (
                <li key={index} style={{ color: 'var(--text-secondary)' }}>{d}</li>
              ))}
            </ul>
          </div>

          {/* Lighting */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <Lightbulb className="text-neon-blue" size={24} />
              <h3 style={{ fontSize: '1.15rem', textTransform: 'uppercase' }}>Lighting & Ambience</h3>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
              {output.lightingSuggestion.description}
            </p>
            <ul style={{ paddingLeft: '16px', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {output.lightingSuggestion.details.map((d, index) => (
                <li key={index} style={{ color: 'var(--text-secondary)' }}>{d}</li>
              ))}
            </ul>
          </div>

          {/* Cable management */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <Cable className="text-neon-purple" size={24} />
              <h3 style={{ fontSize: '1.15rem', textTransform: 'uppercase' }}>Cable Management</h3>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
              {output.cableManagement.description}
            </p>
            <ul style={{ paddingLeft: '16px', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {output.cableManagement.details.map((d, index) => (
                <li key={index} style={{ color: 'var(--text-secondary)' }}>{d}</li>
              ))}
            </ul>
          </div>

          {/* Budget */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <DollarSign className="text-neon-pink" size={24} />
              <h3 style={{ fontSize: '1.15rem', textTransform: 'uppercase' }}>Budget Optimization</h3>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
              {output.budgetRecommendations.description}
            </p>
            <ul style={{ paddingLeft: '16px', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {output.budgetRecommendations.details.map((d, index) => (
                <li key={index} style={{ color: 'var(--text-secondary)' }}>{d}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Nethi store recommendations */}
        <div className="glass-card" style={{ padding: '30px', marginBottom: '32px', borderColor: 'var(--neon-blue)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <ShoppingBag className="text-neon-blue" size={24} />
            <h3 style={{ fontSize: '1.3rem', textTransform: 'uppercase' }}>NETHI MALLIKARJUN GUPTA Hardware Accessories</h3>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
            {output.accessories.description}
          </p>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(0, 242, 254, 0.3)', color: 'var(--text-primary)' }}>
                  <th style={{ padding: '12px 8px', fontFamily: 'var(--font-gaming)', fontSize: '0.75rem' }}>Item</th>
                  <th style={{ padding: '12px 8px', fontFamily: 'var(--font-gaming)', fontSize: '0.75rem' }}>Model / Brand</th>
                  <th style={{ padding: '12px 8px', fontFamily: 'var(--font-gaming)', fontSize: '0.75rem', color: 'var(--neon-blue)' }}>Estimated Price</th>
                  <th style={{ padding: '12px 8px', fontFamily: 'var(--font-gaming)', fontSize: '0.75rem' }}>Integration Reason</th>
                </tr>
              </thead>
              <tbody>
                {output.accessories.list.map((item, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <td style={{ padding: '12px 8px', fontWeight: 'bold' }}>{item.name}</td>
                    <td style={{ padding: '12px 8px', color: 'var(--text-secondary)' }}>{item.brand}</td>
                    <td style={{ padding: '12px 8px', fontWeight: 'bold', color: 'var(--neon-blue)' }}>{item.price}</td>
                    <td style={{ padding: '12px 8px', color: 'var(--text-secondary)', maxWidth: '300px' }}>{item.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Safety tips and Summary */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px', marginBottom: '40px' }}>
          <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <ShieldAlert className="text-neon-purple" size={24} />
              <h3 style={{ fontSize: '1.15rem', textTransform: 'uppercase' }}>Safety & Comfort Tips</h3>
            </div>
            <ul style={{ paddingLeft: '16px', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {output.safetyComfortTips.details.map((d, index) => (
                <li key={index} style={{ color: 'var(--text-secondary)' }}>{d}</li>
              ))}
            </ul>
          </div>

          <div className="glass-card" style={{
            padding: '24px',
            background: 'linear-gradient(135deg, rgba(13, 16, 30, 0.75) 0%, rgba(157, 78, 221, 0.08) 100%)',
            borderColor: 'var(--neon-purple)'
          }}>
            <h3 style={{ fontSize: '1.25rem', textTransform: 'uppercase', marginBottom: '12px' }} className="text-neon-purple">
              Final Design Summary
            </h3>
            <p style={{ fontSize: '0.95rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
              {output.summary.description}
            </p>
          </div>
        </div>
      </div>

      {/* Star feedback rating box */}
      <div className="no-print glass-card" style={{ padding: '30px', maxWidth: '600px', margin: '0 auto' }}>
        <h3 style={{ fontSize: '1.2rem', textTransform: 'uppercase', marginBottom: '16px', textAlign: 'center' }}>
          Rate this Setup Plan
        </h3>

        {feedbackSubmitted ? (
          <div style={{ textAlign: 'center', padding: '10px' }}>
            <Check size={40} className="text-neon-blue" style={{ marginBottom: '12px' }} />
            <h4 style={{ textTransform: 'uppercase', marginBottom: '8px' }} className="text-neon-blue">Feedback Recorded!</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              Thank you for rating our suggestion system. Your feedback helps NETHI MALLIKARJUN GUPTA improve setups.
            </p>
          </div>
        ) : (
          <form onSubmit={handleFeedbackSubmit}>
            {/* Stars selection */}
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: star <= (hoverRating || rating) ? 'var(--neon-blue)' : 'rgba(255,255,255,0.15)',
                    transition: 'var(--transition-smooth)',
                    transform: star <= (hoverRating || rating) ? 'scale(1.15)' : 'scale(1)'
                  }}
                >
                  <Star size={32} fill={star <= (hoverRating || rating) ? 'var(--neon-blue)' : 'transparent'} />
                </button>
              ))}
            </div>

            {/* Comment field */}
            <div className="form-group">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Any suggestions or custom accessory inquiries for GAMING SECTORS Hyderabad? Leave a comment..."
                className="form-textarea"
                rows="3"
                required={rating > 0}
              />
            </div>

            <button
              type="submit"
              disabled={rating === 0 || feedbackLoading}
              className="btn-neon-blue"
              style={{
                width: '100%',
                opacity: rating === 0 ? 0.5 : 1,
                cursor: rating === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              {feedbackLoading ? 'Submitting...' : 'Submit Rating'} <Send size={14} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default OutputResultPage;
