'use client';

import { useState } from 'react';

export default function FreeTrialPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    beltLevel: '',
    phone: ''
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you! Your free trial request has been submitted.');
    setFormData({ name: '', email: '', beltLevel: '', phone: '' });
  };

  return (
    <div className="dashboard-section" style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>Start Your 7-Day Free Trial</h2>
      
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '2rem',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        marginTop: '2rem'
      }}>
        <div style={{
          background: 'var(--gradient-1)',
          color: 'white',
          padding: '1.5rem',
          borderRadius: '8px',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '1.1rem' }}>🎉 No credit card required!</p>
          <p style={{ fontSize: '0.95rem', opacity: 0.9, marginTop: '0.5rem' }}>
            Experience unlimited classes for 7 days
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '600',
              color: 'var(--text-primary)'
            }}>
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '1rem',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
              placeholder="John Doe"
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '600',
              color: 'var(--text-primary)'
            }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '1rem',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '600',
              color: 'var(--text-primary)'
            }}>
              Belt Level
            </label>
            <select
              name="beltLevel"
              value={formData.beltLevel}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '1rem',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
            >
              <option value="">Select your belt level</option>
              <option value="white">White Belt (Beginner)</option>
              <option value="yellow">Yellow Belt</option>
              <option value="orange">Orange Belt</option>
              <option value="green">Green Belt</option>
              <option value="blue">Blue Belt</option>
              <option value="purple">Purple Belt</option>
              <option value="brown">Brown Belt</option>
              <option value="black">Black Belt</option>
            </select>
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: '600',
              color: 'var(--text-primary)'
            }}>
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '1rem',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
              placeholder="(555) 123-4567"
            />
          </div>

          <button
            type="submit"
            className="btn-hover"
            style={{
              width: '100%',
              background: 'var(--gradient-1)',
              color: 'white',
              border: 'none',
              padding: '1rem',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
              marginTop: '1rem'
            }}
          >
            Claim Your Free Trial
          </button>
        </form>

        <p style={{
          marginTop: '1.5rem',
          color: 'var(--text-secondary)',
          textAlign: 'center',
          fontSize: '0.9rem'
        }}>
          Your 7-day trial will automatically end unless you choose to subscribe.
        </p>
      </div>
    </div>
  );
}
