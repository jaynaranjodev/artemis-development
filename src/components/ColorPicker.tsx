'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './ColorPicker.module.css';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
}

export default function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [lightness, setLightness] = useState(50);
  const onChangeRef = useRef(onChange);

  // Keep onChange ref updated
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  // Initialize from hex color when prop changes externally
  useEffect(() => {
    if (value && value.startsWith('#')) {
      const rgb = hexToRgb(value);
      if (rgb) {
        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
        setHue(hsl.h);
        setSaturation(hsl.s);
        setLightness(hsl.l);
      }
    }
  }, [value]);

  const handleColorChange = (h: number, s: number, l: number) => {
    setHue(h);
    setSaturation(s);
    setLightness(l);
    const hex = hslToHex(h, s, l);
    onChangeRef.current(hex);
  };

  function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  function rgbToHsl(
    r: number,
    g: number,
    b: number
  ): { h: number; s: number; l: number } {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  }

  function hslToHex(h: number, s: number, l: number): string {
    const c = ((1 - Math.abs(2 * l / 100 - 1)) * s) / 100;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l / 100 - c / 2;
    let r = 0,
      g = 0,
      b = 0;

    if (h >= 0 && h < 60) {
      r = c;
      g = x;
    } else if (h >= 60 && h < 120) {
      r = x;
      g = c;
    } else if (h >= 120 && h < 180) {
      g = c;
      b = x;
    } else if (h >= 180 && h < 240) {
      g = x;
      b = c;
    } else if (h >= 240 && h < 300) {
      r = x;
      b = c;
    } else if (h >= 300 && h < 360) {
      r = c;
      b = x;
    }

    const toHex = (n: number) => {
      const val = Math.round((n + m) * 255);
      return val.toString(16).padStart(2, '0').toUpperCase();
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>

      <div className={styles.previewBox} style={{ backgroundColor: value }} />

      <div className={styles.sliderGroup}>
        <label>Hue</label>
        <div className={styles.sliderContainer}>
          <input
            type="range"
            min="0"
            max="360"
            value={hue}
            onChange={(e) => handleColorChange(Number(e.target.value), saturation, lightness)}
            className={styles.slider}
            style={{
              background: `linear-gradient(to right, 
                hsl(0, 100%, 50%), 
                hsl(60, 100%, 50%), 
                hsl(120, 100%, 50%), 
                hsl(180, 100%, 50%), 
                hsl(240, 100%, 50%), 
                hsl(300, 100%, 50%), 
                hsl(360, 100%, 50%))`,
            }}
          />
          <span className={styles.value}>{hue}°</span>
        </div>
      </div>

      <div className={styles.sliderGroup}>
        <label>Saturation</label>
        <div className={styles.sliderContainer}>
          <input
            type="range"
            min="0"
            max="100"
            value={saturation}
            onChange={(e) => handleColorChange(hue, Number(e.target.value), lightness)}
            className={styles.slider}
            style={{
              background: `linear-gradient(to right, 
                hsl(${hue}, 0%, ${lightness}%), 
                hsl(${hue}, 100%, ${lightness}%))`,
            }}
          />
          <span className={styles.value}>{saturation}%</span>
        </div>
      </div>

      <div className={styles.sliderGroup}>
        <label>Lightness</label>
        <div className={styles.sliderContainer}>
          <input
            type="range"
            min="0"
            max="100"
            value={lightness}
            onChange={(e) => handleColorChange(hue, saturation, Number(e.target.value))}
            className={styles.slider}
            style={{
              background: `linear-gradient(to right, 
                hsl(${hue}, ${saturation}%, 0%), 
                hsl(${hue}, ${saturation}%, 50%), 
                hsl(${hue}, ${saturation}%, 100%))`,
            }}
          />
          <span className={styles.value}>{lightness}%</span>
        </div>
      </div>

      <div className={styles.hexInput}>
        <label>Hex Value</label>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            const hex = e.target.value;
            if (hex.startsWith('#') && hex.length === 7) {
              const rgb = hexToRgb(hex);
              if (rgb) {
                const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
                handleColorChange(hsl.h, hsl.s, hsl.l);
              }
            }
          }}
          placeholder="#FF9000"
        />
      </div>
    </div>
  );
}
