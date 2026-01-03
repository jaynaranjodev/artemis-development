'use client';

import { useState, useEffect } from 'react';
import styles from './AcademyHeader.module.css';

interface Academy {
  id: string;
  name: string;
  slug: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  phone?: string;
}

interface AcademyHeaderProps {
  academySlug?: string;
}

// TODO: Extract academySlug from subdomain (e.g., jj-grappling.artemis.com) or user session for multi-tenant
export default function AcademyHeader({ academySlug = process.env.NEXT_PUBLIC_ACADEMY_SLUG || 'jj-grappling' }: AcademyHeaderProps) {
  const [academy, setAcademy] = useState<Academy | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAcademy = async () => {
      try {
        const response = await fetch(`/api/academy/${academySlug}`);
        if (response.ok) {
          const data = await response.json();
          setAcademy(data);
        }
      } catch (error) {
        console.error('Error fetching academy:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAcademy();
  }, [academySlug]);

  const getFullAddress = () => {
    if (!academy) return '';
    const parts = [academy.address, academy.city, academy.state, academy.zipCode].filter(Boolean);
    return parts.join(', ');
  };

  if (loading || !academy) return null;

  return (
    <div className={styles.academyInfo}>
      {getFullAddress() && (
        <span className={styles.infoText}>📍 {getFullAddress()}</span>
      )}
      {academy.email && (
        <a href={`mailto:${academy.email}`} className={styles.phoneLink}>
          ✉️ {academy.email}
        </a>
      )}
      {academy.phone && (
        <a href={`tel:${academy.phone}`} className={styles.phoneLink}>
          📞 {academy.phone}
        </a>
      )}
    </div>
  );
}
