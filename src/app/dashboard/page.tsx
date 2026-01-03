import Link from 'next/link';
import ClassCalendar from '@/components/ClassCalendar';

export default function DashboardHome() {
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
          alt="JJ Grappling Arts Logo"
          style={{ width: '250px', height: 'auto', flexShrink: 0 }}
        />
        <div className="dashboard-hero-content" style={{ textAlign: 'left' }}>
          <h1>Welcome to JJ Grappling Arts</h1>
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
          <div style={{
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            border: '3px solid #FF9000',
          }}>
            <img 
              src="/images/academy/coach.avif" 
              alt="Coach"
              style={{ width: '100%', height: '300px', objectFit: 'cover' }}
            />
            <div style={{ padding: '1.5rem', background: 'white' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>Head Coach</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Brazilian Jiu-Jitsu Expert with 15+ years experience</p>
            </div>
          </div>
          
          <div style={{
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            border: '3px solid #FF9000',
          }}>
            <img 
              src="/images/academy/coach-teaching.avif" 
              alt="Teaching"
              style={{ width: '100%', height: '300px', objectFit: 'cover' }}
            />
            <div style={{ padding: '1.5rem', background: 'white' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>Training</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Personalized instruction for all skill levels</p>
            </div>
          </div>
          
          <div style={{
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
            border: '3px solid #FF9000',
          }}>
            <img 
              src="/images/academy/student.avif" 
              alt="Students"
              style={{ width: '100%', height: '300px', objectFit: 'cover' }}
            />
            <div style={{ padding: '1.5rem', background: 'white' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>Competition</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Challenge yourself and compete in tournaments</p>
            </div>
          </div>
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
              borderLeft: '4px solid var(--primary-color)',
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
                  background: '#FF9000',
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
