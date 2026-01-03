'use client';

import { useState } from 'react';

export default function ColorPicker() {
  const [hue, setHue] = useState(34); // Orange hue
  const [saturation, setSaturation] = useState(100); // Full saturation
  const [lightness, setLightness] = useState(50); // Mid lightness

  const hslColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  const hslColor2 = `hsl(${hue - 5}, ${saturation}%, ${lightness - 5}%)`;

  // Convert HSL to HEX for display
  const hslToHex = (h: number, s: number, l: number) => {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
  };

  const hex1 = hslToHex(hue, saturation, lightness);
  const hex2 = hslToHex(hue - 5, saturation, lightness - 5);

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Orange Color Picker</h1>
      
      <div style={{ marginBottom: '2rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>
          Hue: {hue}°
        </label>
        <input
          type="range"
          min="0"
          max="360"
          value={hue}
          onChange={(e) => setHue(Number(e.target.value))}
          style={{ width: '100%', height: '8px' }}
        />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>
          Saturation: {saturation}%
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={saturation}
          onChange={(e) => setSaturation(Number(e.target.value))}
          style={{ width: '100%', height: '8px' }}
        />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>
          Lightness: {lightness}%
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={lightness}
          onChange={(e) => setLightness(Number(e.target.value))}
          style={{ width: '100%', height: '8px' }}
        />
      </div>

      <div style={{
        background: `linear-gradient(135deg, ${hslColor} 0%, ${hslColor2} 100%)`,
        height: '200px',
        borderRadius: '12px',
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
      }}>
        Preview
      </div>

      <div style={{
        background: '#f0f0f0',
        padding: '1rem',
        borderRadius: '8px',
        fontFamily: 'monospace',
        fontSize: '1.1rem',
      }}>
        <p><strong>Primary Color:</strong> {hex1}</p>
        <p><strong>Secondary Color:</strong> {hex2}</p>
        <p style={{ marginTop: '1rem' }}>
          <strong>Gradient Code:</strong><br />
          <code>linear-gradient(135deg, {hex1} 0%, {hex2} 100%)</code>
        </p>
      </div>

      <div style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#666' }}>
        <p>Copy the gradient code above and replace it in the dashboard hero section when you find the perfect orange!</p>
      </div>
    </div>
  );
}
