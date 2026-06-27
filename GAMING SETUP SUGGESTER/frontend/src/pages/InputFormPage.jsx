import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, Sparkles, LayoutGrid, Wrench, RefreshCw, Cpu, Layers } from 'lucide-react';

const InputFormPage = () => {
  const navigate = useNavigate();
  
  // State for templates
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  
  // Loading and Error state
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [apiError, setApiError] = useState('');
  
  // Form fields
  const [formValues, setFormValues] = useState({
    customer_name: '',
    room_length: '',
    room_width: '',
    room_height: '9', // Default standard
    budget: '',
    device_type: 'PC',
    current_setup: '',
    theme: 'RGB',
    desk_size: 'Standard Straight Desk',
    lighting: 'RGB backlighting, screenbar',
    cable_management: 'Under-desk tray, sleeves',
    storage: 'None',
    notes: ''
  });

  const [formErrors, setFormErrors] = useState({});

  // Fetch templates on mount
  useEffect(() => {
    fetch('http://localhost:5000/api/templates')
      .then(res => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then(data => setTemplates(data))
      .catch(err => console.error('Failed to load templates:', err));
  }, []);

  // Loading animation messages
  const loadingMessages = [
    "Analyzing room dimensions and orientation...",
    "Scanning NETHI MALLIKARJUN GUPTA accessory catalogs...",
    "Simulating Cable Routing path flows...",
    "Designing ambient RGB lighting zones...",
    "Calibrating desk layout ergonomics...",
    "Polishing the final gaming setup plan..."
  ];

  useEffect(() => {
    let interval;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingStep(prev => (prev + 1) % loadingMessages.length);
      }, 2000);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  // Handle template selection
  const handleTemplateChange = (e) => {
    const tplId = e.target.value;
    setSelectedTemplate(tplId);
    if (!tplId) return;

    const template = templates.find(t => t.id === tplId);
    if (template && template.input_values) {
      setFormValues({
        ...formValues,
        ...template.input_values
      });
      setFormErrors({});
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Field validations
  const validateForm = () => {
    const errors = {};
    if (!formValues.customer_name.trim()) errors.customer_name = 'Customer name is required';
    
    if (!formValues.room_length) {
      errors.room_length = 'Room length is required';
    } else if (isNaN(formValues.room_length) || parseFloat(formValues.room_length) <= 0) {
      errors.room_length = 'Must be a number greater than 0';
    }

    if (!formValues.room_width) {
      errors.room_width = 'Room width is required';
    } else if (isNaN(formValues.room_width) || parseFloat(formValues.room_width) <= 0) {
      errors.room_width = 'Must be a number greater than 0';
    }

    if (!formValues.room_height) {
      errors.room_height = 'Room height is required';
    } else if (isNaN(formValues.room_height) || parseFloat(formValues.room_height) <= 0) {
      errors.room_height = 'Must be a number greater than 0';
    }

    if (!formValues.budget) {
      errors.budget = 'Budget is required';
    } else if (isNaN(formValues.budget) || parseFloat(formValues.budget) <= 0) {
      errors.budget = 'Must be a positive number';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setApiError('');

    try {
      const response = await fetch('http://localhost:5000/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues)
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Generation failed');
      }

      const responseData = await response.json();
      
      // Successfully generated
      setIsLoading(false);
      navigate('/generate/result', { state: { result: responseData } });

    } catch (err) {
      console.error(err);
      setIsLoading(false);
      setApiError(`Could not generate suggestions: ${err.message}. Running fallback database save.`);
    }
  };

  if (isLoading) {
    return (
      <div style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        textAlign: 'center'
      }}>
        <div style={{
          position: 'relative',
          width: '120px',
          height: '120px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '32px'
        }}>
          {/* Spinners */}
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            border: '4px solid transparent',
            borderTopColor: 'var(--neon-blue)',
            borderBottomColor: 'var(--neon-blue)',
            borderRadius: '50%'
          }} className="animate-spin-slow" />
          <div style={{
            position: 'absolute',
            width: '80%',
            height: '80%',
            border: '4px solid transparent',
            borderLeftColor: 'var(--neon-purple)',
            borderRightColor: 'var(--neon-purple)',
            borderRadius: '50%',
            animationDirection: 'reverse'
          }} className="animate-spin-slow" />
          <Cpu className="text-neon-blue" size={40} />
        </div>
        <h2 style={{
          fontFamily: 'var(--font-gaming)',
          fontSize: '1.75rem',
          marginBottom: '12px'
        }} className="text-neon-blue">Generating Battlestation Suggestions</h2>
        <p style={{
          color: 'var(--text-secondary)',
          maxWidth: '500px',
          height: '24px',
          fontWeight: 500
        }}>
          {loadingMessages[loadingStep]}
        </p>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '100px 24px 60px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 className="page-title"><span className="text-gradient">DESIGN</span> LAB</h1>
        <p className="page-subtitle">Prefill from standard templates or input custom specs to initialize AI design suggestions.</p>
      </div>

      <div style={{ maxWidth: '850px', margin: '0 auto' }}>
        {/* Template Selector */}
        <div className="glass-card" style={{ padding: '20px 24px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <Layers className="text-neon-purple" size={24} />
          <div style={{ flex: 1, minWidth: '200px' }}>
            <h4 style={{ fontFamily: 'var(--font-gaming)', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '4px' }}>Load Design Template</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Auto-fill form fields with preconfigured configurations.</p>
          </div>
          <select 
            value={selectedTemplate} 
            onChange={handleTemplateChange}
            className="form-select"
            style={{ minWidth: '250px', flexShrink: 0 }}
          >
            <option value="">-- Select A Template (Optional) --</option>
            {templates.map(t => (
              <option key={t.id} value={t.id}>{t.template_name}</option>
            ))}
          </select>
        </div>

        {apiError && (
          <div style={{
            background: 'rgba(255, 0, 127, 0.15)',
            border: '1px solid var(--neon-pink)',
            borderRadius: '8px',
            color: 'var(--text-primary)',
            padding: '16px',
            marginBottom: '24px',
            fontSize: '0.9rem'
          }}>
            {apiError}
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="glass-card" style={{ padding: '36px' }}>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '24px', borderBottom: '1px solid var(--border-neon)', paddingBottom: '12px', textTransform: 'uppercase' }} className="text-neon-blue">
            Room & Budget Specifications
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="grid-container">
            {/* Customer Name */}
            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label className="form-label">Customer Name *</label>
              <input 
                type="text" 
                name="customer_name" 
                value={formValues.customer_name} 
                onChange={handleChange} 
                className="form-input" 
                placeholder="e.g. Sravan Kumar"
              />
              {formErrors.customer_name && <span className="form-error">{formErrors.customer_name}</span>}
            </div>

            {/* Room Dimensions */}
            <div className="form-group">
              <label className="form-label">Room Length (ft) *</label>
              <input 
                type="number" 
                name="room_length" 
                value={formValues.room_length} 
                onChange={handleChange} 
                className="form-input" 
                placeholder="e.g. 12"
              />
              {formErrors.room_length && <span className="form-error">{formErrors.room_length}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Room Width (ft) *</label>
              <input 
                type="number" 
                name="room_width" 
                value={formValues.room_width} 
                onChange={handleChange} 
                className="form-input" 
                placeholder="e.g. 10"
              />
              {formErrors.room_width && <span className="form-error">{formErrors.room_width}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Room Height (ft) *</label>
              <input 
                type="number" 
                name="room_height" 
                value={formValues.room_height} 
                onChange={handleChange} 
                className="form-input" 
                placeholder="e.g. 9"
              />
              {formErrors.room_height && <span className="form-error">{formErrors.room_height}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Budget (₹ INR) *</label>
              <input 
                type="number" 
                name="budget" 
                value={formValues.budget} 
                onChange={handleChange} 
                className="form-input" 
                placeholder="e.g. 60000"
              />
              <span className="form-helper">Maximum budget allocation for the interior upgrade.</span>
              {formErrors.budget && <span className="form-error">{formErrors.budget}</span>}
            </div>
          </div>

          <h2 style={{ fontSize: '1.4rem', margin: '36px 0 24px 0', borderBottom: '1px solid var(--border-neon)', paddingBottom: '12px', textTransform: 'uppercase' }} className="text-neon-purple">
            Hardware & Theme Preferences
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="grid-container">
            {/* Gaming Device */}
            <div className="form-group">
              <label className="form-label">Gaming Device Type *</label>
              <select name="device_type" value={formValues.device_type} onChange={handleChange} className="form-select">
                <option value="PC">PC (Tower + Monitor)</option>
                <option value="Console">Console (Playstation/Xbox/Switch)</option>
                <option value="Laptop">Gaming Laptop</option>
                <option value="Multi-device">Multi-Device (PC + Workstation + Console)</option>
              </select>
            </div>

            {/* Preferred Theme */}
            <div className="form-group">
              <label className="form-label">Preferred Vibe / Theme *</label>
              <select name="theme" value={formValues.theme} onChange={handleChange} className="form-select">
                <option value="RGB">RGB Cyberpunk (Vibrant Neons)</option>
                <option value="Minimal">Minimalist (Cozy, Warm Woods, White)</option>
                <option value="Dark">Dark Room (Matte Black, Focus lights)</option>
                <option value="Premium">Premium Exec (Walnut Wood, Leather, Executive)</option>
                <option value="Futuristic">Futuristic Command (Holographic, Violet/Silver)</option>
              </select>
            </div>

            {/* Current setup */}
            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label className="form-label">Current Setup Details</label>
              <textarea 
                name="current_setup" 
                value={formValues.current_setup} 
                onChange={handleChange} 
                className="form-textarea" 
                rows="2"
                placeholder="What table, chair, and screen do you have right now?"
              />
            </div>

            {/* Desk Size */}
            <div className="form-group">
              <label className="form-label">Desk Size Preference</label>
              <input 
                type="text" 
                name="desk_size" 
                value={formValues.desk_size} 
                onChange={handleChange} 
                className="form-input" 
                placeholder="e.g. 5ft L-Shape, 4ft standard, Height adjustable"
              />
            </div>

            {/* Cable management */}
            <div className="form-group">
              <label className="form-label">Cable Management Level</label>
              <select name="cable_management" value={formValues.cable_management} onChange={handleChange} className="form-select">
                <option value="Basic (Under desk wire ties)">Basic (Under desk wire ties)</option>
                <option value="Standard (Under desk routing tray)">Standard (Under desk routing tray)</option>
                <option value="Advanced (Invisible in-wall run)">Advanced (Invisible in-wall run)</option>
              </select>
            </div>

            {/* Lighting preference */}
            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label className="form-label">Lighting Preferences</label>
              <input 
                type="text" 
                name="lighting" 
                value={formValues.lighting} 
                onChange={handleChange} 
                className="form-input" 
                placeholder="e.g. Smart strip backlights, monitor screenbar, overhead light panel"
              />
            </div>

            {/* Storage requirement */}
            <div className="form-group">
              <label className="form-label">Storage/Accessory Requirements</label>
              <input 
                type="text" 
                name="storage" 
                value={formValues.storage} 
                onChange={handleChange} 
                className="form-input" 
                placeholder="e.g. Floating wall shelves, pegboard panel, drawer cabinets"
              />
            </div>

            {/* Additional notes */}
            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label className="form-label">Additional Requests / Notes</label>
              <textarea 
                name="notes" 
                value={formValues.notes} 
                onChange={handleChange} 
                className="form-textarea" 
                rows="3"
                placeholder="Any physical room restrictions? Do you sit on a sofa or floor? Mention specific height requirements or requests."
              />
            </div>
          </div>

          <div style={{ marginTop: '36px', textAlign: 'center' }}>
            <button 
              type="submit" 
              className="btn-neon-blue glow-pulse"
              style={{ width: '100%', padding: '14px', fontSize: '1rem' }}
            >
              <Sparkles size={18} /> Generate Setup Suggestions
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputFormPage;
