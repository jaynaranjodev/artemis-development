'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  primaryColor: string;
  secondaryColor: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [primaryColor, setPrimaryColor] = useState('#FF9000');
  const [secondaryColor, setSecondaryColor] = useState('#E66F00');

  // Fetch academy colors on mount
  useEffect(() => {
    const fetchAcademyColors = async () => {
      try {
        const slug = process.env.NEXT_PUBLIC_ACADEMY_SLUG || 'jj-grappling';
        const response = await fetch(`/api/academy/${slug}`);
        if (response.ok) {
          const data = await response.json();
          setPrimaryColor(data.primaryColor || '#FF9000');
          setSecondaryColor(data.secondaryColor || '#E66F00');

          // Update CSS variables
          updateCSSVariables(data.primaryColor || '#FF9000', data.secondaryColor || '#E66F00');
        }
      } catch (error) {
        console.error('Error fetching academy colors:', error);
      }
    };

    fetchAcademyColors();
  }, []);

  // Update CSS variables when colors change
  useEffect(() => {
    updateCSSVariables(primaryColor, secondaryColor);
  }, [primaryColor, secondaryColor]);

  return (
    <ThemeContext.Provider value={{ primaryColor, secondaryColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

function updateCSSVariables(primary: string, secondary: string) {
  const root = document.documentElement;
  root.style.setProperty('--primary-color', primary);
  root.style.setProperty('--secondary-color', secondary);

  // Derive lighter/darker versions for hover states
  root.style.setProperty('--primary-color-light', adjustBrightness(primary, 20));
  root.style.setProperty('--primary-color-dark', adjustBrightness(primary, -20));
  root.style.setProperty('--secondary-color-light', adjustBrightness(secondary, 20));
  root.style.setProperty('--secondary-color-dark', adjustBrightness(secondary, -20));
}

function adjustBrightness(color: string, amount: number): string {
  const usePound = color[0] === '#';
  const col = usePound ? color.slice(1) : color;
  const num = parseInt(col, 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + amount));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + amount));
  const b = Math.max(0, Math.min(255, (num & 0x0000ff) + amount));
  return (usePound ? '#' : '') + (0x1000000 + r * 0x10000 + g * 0x100 + b).toString(16).slice(1);
}
