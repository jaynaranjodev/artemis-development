import { ReactNode } from 'react';

export interface AcademyConfig {
  id: string;
  name: string;
  slug: string;
  email: string;
  phone?: string;
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  logoUrl?: string;
  bannerUrl?: string;
  address?: string;
  city?: string;
  state?: string;
  website?: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

// Fetch academy configuration from API
export async function fetchAcademyConfig(slug: string): Promise<AcademyConfig | null> {
  try {
    const response = await fetch(`/api/academy/${slug}`);
    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    console.error('Error fetching academy config:', error);
    return null;
  }
}

// Fetch classes for an academy
export async function fetchClasses(academyId: string) {
  try {
    const response = await fetch(`/api/classes?academyId=${academyId}`);
    if (!response.ok) return [];
    return response.json();
  } catch (error) {
    console.error('Error fetching classes:', error);
    return [];
  }
}

// Apply academy branding to CSS variables
export function applyAcademyBranding(academy: AcademyConfig) {
  if (typeof document === 'undefined') return;
  
  const root = document.documentElement;
  root.style.setProperty('--primary-color', academy.primaryColor);
  root.style.setProperty('--secondary-color', academy.secondaryColor);
  root.style.setProperty('--text-primary', academy.textColor);
}
