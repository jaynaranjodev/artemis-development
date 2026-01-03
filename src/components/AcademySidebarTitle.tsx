'use client';

import { useState, useEffect } from 'react';

interface Academy {
  id: string;
  name: string;
  slug: string;
}

interface AcademySidebarProps {
  academySlug?: string;
  open: boolean;
}

// TODO: Extract academySlug from subdomain or user session for multi-tenant
export default function AcademySidebarTitle({ academySlug = process.env.NEXT_PUBLIC_ACADEMY_SLUG || 'jj-grappling', open }: AcademySidebarProps) {
  const [academy, setAcademy] = useState<Academy | null>(null);

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
      }
    };

    fetchAcademy();
  }, [academySlug]);

  if (!open || !academy) return null;

  return <div className="sidebar-title">🥋 {academy.name}</div>;
}
