'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ClassCalendar from '@/components/ClassCalendar';

interface AcademyCard {
  title: string;
  description: string;
  image: string;
}

interface Academy {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  card1Title?: string;
  card1Description?: string;
  card1Image?: string;
  card2Title?: string;
  card2Description?: string;
  card2Image?: string;
  card3Title?: string;
  card3Description?: string;
  card3Image?: string;
}

export default function DashboardHome() {
  const [academy, setAcademy] = useState<Academy | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAcademy = async () => {
      try {
        const slug = process.env.NEXT_PUBLIC_ACADEMY_SLUG || 'jj-grappling';
        const response = await fetch(`/api/academy/${slug}`);
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
  }, []);

  const cards: AcademyCard[] = academy ? [
    {
      title: academy.card1Title || 'Head Coach',
      description: academy.card1Description || 'Brazilian Jiu-Jitsu Expert with 15+ years experience',
      image: academy.card1Image || '/images/academy/coach.avif'
    },
    {
      title: academy.card2Title || 'Training',
      description: academy.card2Description || 'Personalized instruction for all skill levels',
      image: academy.card2Image || '/images/academy/coach-teaching.avif'
    },
    {
      title: academy.card3Title || 'Competition',
      description: academy.card3Description || 'Challenge yourself and compete in tournaments',
      image: academy.card3Image || '/images/academy/student.avif'
    }
  ] : [];

  const primaryColor = academy?.primaryColor || '#FF9000';
  const heroTitle = academy?.name || 'Welcome';

  return (
    <>
      {/* Hero Section */}
      <div 
        className="dashboard-hero"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
          minHeight: '300px',
          padding: '2rem',
          backgroundColor: '#1a1a1a',
        }}
      >
        <img 
          src="/images/academy/logo.png" 
          alt={`${heroTitle} Logo`}
          style={{ width: '250px', height: 'auto', flexShrink: 0 }}
        />
        <div className="dashboard-hero-content" style={{ textAlign: 'left' }}>
          <h1>Welcome to {heroTitle}</h1>
          <p>Master Brazilian Jiu-Jitsu and Wrestling. Build strength, discipline, and confidence.</p>
          <Link href="/dashboard/free-trial">
            <button className="hero-btn">
              Start Your Free Trial
            </button>
          </Link>
        </div>
      </div>

      {/* Team Section */}
      <div id="about-section" className="dashboard-section">
        <h2>Meet Our Team</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginTop: '2rem'
        }}>
          {cards.map((card, idx) => (
            <div key={idx} style={{
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
              border: `3px solid ${primaryColor}`,
            }}>
              <img 
                src={card.image}
                alt={card.title}
                style={{ width: '100%', height: '300px', objectFit: 'cover' }}
              />
              <div style={{ padding: '1.5rem', background: 'white' }}>
                <h3 style={{ marginBottom: '0.5rem' }}>{card.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Classes Section */}
      <div className="dashboard-section">
        <h2>Upcoming Classes</h2>
        <div style={{
          display: 'grid',
          gap: '1.5rem'
        }}>
          {[
            { id: 1, name: 'Brazilian Jiu-Jitsu - Beginners', time: 'Mon, Wed, Fri - 4:00 PM', instructor: 'Sensei John' },
            { id: 2, name: 'Brazilian Jiu-Jitsu - Advanced', time: 'Tue, Thu, Sat - 5:30 PM', instructor: 'Sensei Sarah' },
            { id: 3, name: 'Boxing - All Levels', time: 'Mon, Wed, Fri - 6:00 PM', instructor: 'Coach Mike' },
          ].map((cls) => (
            <div key={cls.id} className="card-slide" style={{
              background: 'white',
              borderRadius: '12px',
              padding: '1.5rem',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
              borderLeft: `4px solid ${primaryColor}`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div>
                  <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: '600',
                    color: 'var(--text-primary)',
                    marginBottom: '0.5rem'
                  }}>
                    {cls.name}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                    📅 {cls.time}
                  </p>
                  <p style={{ color: 'var(--text-secondary)' }}>
                    👨‍🏫 {cls.instructor}
                  </p>
                </div>
                <button className="enroll-btn" style={{
                  background: primaryColor,
                  color: '#1a1a2e',
                  border: '2px solid #1a1a2e',
                  padding: '0.75rem 1.75rem',
                  borderRadius: '50px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  letterSpacing: '0.5px',
                }}>
                  Enroll
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Calendar Section */}
      <div id="classes-calendar" className="dashboard-section" style={{ marginTop: '3rem' }}>
        <h2>Class Calendar</h2>
        <ClassCalendar />
      </div>
    </>
  );
}
