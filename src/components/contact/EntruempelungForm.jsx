import React, { useState } from 'react';
import './EntruempelungForm.css';

const EntruempelungForm = () => {
  const [formData, setFormData] = useState({
    objektart: '',
    umfang: '',
    plz: '',
    ort: '',
    zeitrahmen: '',
    name: '',
    telefon: '',
    email: '',
    nachricht: ''
  });
  const [status, setStatus] = useState('idle'); // idle, sending, success, error
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    
    // Objektart
    if (!formData.objektart) {
      newErrors.objektart = 'Bitte wählen Sie eine Objektart';
    }
    
    // Umfang
    if (!formData.umfang) {
      newErrors.umfang = 'Bitte wählen Sie einen Umfang';
    }
    
    // PLZ
    if (!formData.plz) {
      newErrors.plz = 'PLZ ist erforderlich';
    } else if (!/^\d{5}$/.test(formData.plz)) {
      newErrors.plz = 'Bitte geben Sie eine gültige 5-stellige PLZ ein';
    }
    
    // Ort
    if (!formData.ort) {
      newErrors.ort = 'Ort ist erforderlich';
    } else if (formData.ort.length < 2) {
      newErrors.ort = 'Bitte geben Sie einen gültigen Ort ein';
    }
    
    // Zeitrahmen
    if (!formData.zeitrahmen) {
      newErrors.zeitrahmen = 'Bitte wählen Sie einen Zeitrahmen';
    }
    
    // Name
    if (!formData.name) {
      newErrors.name = 'Name ist erforderlich';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name muss mindestens 2 Zeichen lang sein';
    }
    
    // Telefon
    if (!formData.telefon) {
      newErrors.telefon = 'Telefon ist erforderlich';
    } else if (!/^[+\d\s\-()]+$/.test(formData.telefon)) {
      newErrors.telefon = 'Bitte geben Sie eine gültige Telefonnummer ein';
    }
    
    // Email (optional, aber wenn vorhanden dann validieren)
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate
    if (!validate()) {
      setStatus('error');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    setStatus('sending');
    
    // Prepare payload
    const payload = {
      ...formData,
      timestamp: new Date().toISOString()
    };
    
    try {
      const response = await fetch('https://mtmstudios.app.n8n.cloud/webhook/728d78c5-bfa5-4be3-b5f1-82e8875d9915', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        setStatus('success');
        // Reset form
        setFormData({
          objektart: '',
          umfang: '',
          plz: '',
          ort: '',
          zeitrahmen: '',
          name: '',
          telefon: '',
          email: '',
          nachricht: ''
        });
        setErrors({});
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setStatus('error');
        setErrors({ general: data.error || 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.' });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
      setErrors({ general: 'Netzwerkfehler. Bitte versuchen Sie es erneut oder rufen Sie uns direkt an.' });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="entruempelung-form-container">
      <form onSubmit={handleSubmit} noValidate>
        <div className="step-container">
          <h2>Kostenlose Anfrage stellen</h2>
          <p className="step-subtitle">
            Füllen Sie das Formular aus und wir melden uns schnellstmöglich bei Ihnen
          </p>
        </div>

        {/* Status Messages */}
        {status === 'success' && (
          <div className="success-page">
            <div className="success-icon">✅</div>
            <div>
              <h3>Vielen Dank für Ihre Anfrage!</h3>
              <p className="success-text">
                Wir haben Ihre Anfrage erhalten und melden uns schnellstmöglich bei Ihnen.
              </p>
              {formData.email && (
                <p className="success-note">Sie erhalten in Kürze eine Bestätigungs-E-Mail.</p>
              )}
            </div>
          </div>
        )}

        {status === 'error' && errors.general && (
          <div className="error-message">
            <span>❌</span>
            <div>
              <strong>Fehler beim Senden</strong>
              <p>{errors.general}</p>
            </div>
          </div>
        )}

        {/* Objektart */}
        <div className="form-group">
          <label htmlFor="objektart">Was möchten Sie räumen lassen? *</label>
          <select
            id="objektart"
            value={formData.objektart}
            onChange={(e) => handleChange('objektart', e.target.value)}
            className={errors.objektart ? 'error' : ''}
            required
            aria-invalid={!!errors.objektart}
            aria-describedby={errors.objektart ? 'objektart-error' : undefined}
          >
            <option value="">Bitte wählen...</option>
            <option value="wohnung">🏠 Wohnung</option>
            <option value="haus">🏘️ Haus</option>
            <option value="keller">📦 Keller / Dachboden</option>
            <option value="gewerbe">🏢 Gewerbe / Büro</option>
            <option value="diskret">🔒 Diskrete Räumung</option>
            <option value="sonstiges">📋 Sonstiges</option>
          </select>
          {errors.objektart && (
            <span id="objektart-error" className="error-text">
              {errors.objektart}
            </span>
          )}
        </div>

        {/* Umfang */}
        <div className="form-group">
          <label htmlFor="umfang">Wie groß ist der Umfang? *</label>
          <select
            id="umfang"
            value={formData.umfang}
            onChange={(e) => handleChange('umfang', e.target.value)}
            className={errors.umfang ? 'error' : ''}
            required
            aria-invalid={!!errors.umfang}
            aria-describedby={errors.umfang ? 'umfang-error' : undefined}
          >
            <option value="">Bitte wählen...</option>
            <option value="klein">📦 Klein (1-2 Räume, wenig Gegenstände)</option>
            <option value="mittel">📦📦 Mittel (3-4 Räume, normale Menge)</option>
            <option value="gross">📦📦📦 Groß (5+ Räume oder voller Haushalt)</option>
          </select>
          {errors.umfang && (
            <span id="umfang-error" className="error-text">
              {errors.umfang}
            </span>
          )}
        </div>

        {/* PLZ & Ort in einer Reihe */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="plz">PLZ *</label>
            <input
              type="text"
              id="plz"
              placeholder="z.B. 89073"
              value={formData.plz}
              onChange={(e) => handleChange('plz', e.target.value)}
              maxLength={5}
              className={errors.plz ? 'error' : ''}
              required
              aria-invalid={!!errors.plz}
              aria-describedby={errors.plz ? 'plz-error' : undefined}
            />
            {errors.plz && (
              <span id="plz-error" className="error-text">
                {errors.plz}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="ort">Ort *</label>
            <input
              type="text"
              id="ort"
              placeholder="z.B. Ulm"
              value={formData.ort}
              onChange={(e) => handleChange('ort', e.target.value)}
              className={errors.ort ? 'error' : ''}
              required
              aria-invalid={!!errors.ort}
              aria-describedby={errors.ort ? 'ort-error' : undefined}
            />
            {errors.ort && (
              <span id="ort-error" className="error-text">
                {errors.ort}
              </span>
            )}
          </div>
        </div>

        {/* Zeitrahmen */}
        <div className="form-group">
          <label htmlFor="zeitrahmen">Wann soll es stattfinden? *</label>
          <select
            id="zeitrahmen"
            value={formData.zeitrahmen}
            onChange={(e) => handleChange('zeitrahmen', e.target.value)}
            className={errors.zeitrahmen ? 'error' : ''}
            required
            aria-invalid={!!errors.zeitrahmen}
            aria-describedby={errors.zeitrahmen ? 'zeitrahmen-error' : undefined}
          >
            <option value="">Bitte wählen...</option>
            <option value="asap">⚡ So schnell wie möglich</option>
            <option value="1-2wochen">📅 In 1-2 Wochen</option>
            <option value="1monat">🗓️ In 1 Monat</option>
            <option value="flexibel">🕐 Flexibel</option>
          </select>
          {errors.zeitrahmen && (
            <span id="zeitrahmen-error" className="error-text">
              {errors.zeitrahmen}
            </span>
          )}
        </div>

        <hr style={{ margin: '24px 0', border: 'none', borderTop: '1px solid #e0e0e0' }} />

        {/* Name */}
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            placeholder="Ihr vollständiger Name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className={errors.name ? 'error' : ''}
            required
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <span id="name-error" className="error-text">
              {errors.name}
            </span>
          )}
        </div>

        {/* Telefon */}
        <div className="form-group">
          <label htmlFor="telefon">Telefon *</label>
          <input
            type="tel"
            id="telefon"
            placeholder="Ihre Telefonnummer"
            value={formData.telefon}
            onChange={(e) => handleChange('telefon', e.target.value)}
            className={errors.telefon ? 'error' : ''}
            required
            aria-invalid={!!errors.telefon}
            aria-describedby={errors.telefon ? 'telefon-error' : undefined}
          />
          {errors.telefon && (
            <span id="telefon-error" className="error-text">
              {errors.telefon}
            </span>
          )}
        </div>

        {/* Email (optional) */}
        <div className="form-group">
          <label htmlFor="email">E-Mail (optional)</label>
          <input
            type="email"
            id="email"
            placeholder="name@email.de"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className={errors.email ? 'error' : ''}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <span id="email-error" className="error-text">
              {errors.email}
            </span>
          )}
          <span className="field-hint">Für Bestätigung per E-Mail</span>
        </div>

        {/* Nachricht (optional) */}
        <div className="form-group">
          <label htmlFor="nachricht">Nachricht (optional)</label>
          <textarea
            id="nachricht"
            placeholder="Zusätzliche Informationen oder Fragen..."
            value={formData.nachricht}
            onChange={(e) => handleChange('nachricht', e.target.value)}
            rows={4}
          />
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={status === 'sending'}
          className="btn-primary"
        >
          {status === 'sending' ? (
            <>
              <span className="spinner"></span>
              Wird gesendet...
            </>
          ) : (
            <>Kostenlose Anfrage senden</>
          )}
        </button>

        <p className="form-privacy" style={{ textAlign: 'center', marginTop: '16px', color: '#666' }}>
          <small>
            Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Daten gemäß unserer{' '}
            <a href="/datenschutz" target="_blank" rel="noopener noreferrer">
              Datenschutzerklärung
            </a>{' '}
            zu.
          </small>
        </p>
      </form>
    </div>
  );
};

export default EntruempelungForm;
