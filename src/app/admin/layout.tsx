'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Top Banner */}
      <header style={{
        background: '#8B0000',
        color: 'white',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
      }}>
        <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>
          🔐 Admin Panel
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/dashboard" style={{
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
            transition: 'background 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
          >
            Back to Dashboard
          </Link>

          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              style={{
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'background 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            >
              👤 Admin
            </button>
            
            {profileOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                background: 'white',
                color: 'var(--text-primary)',
                borderRadius: '8px',
                boxShadow: '0 5px 20px rgba(0, 0, 0, 0.15)',
                minWidth: '150px',
                marginTop: '0.5rem',
                zIndex: 1000
              }}>
                <button style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  background: 'transparent',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  color: 'var(--text-primary)',
                  borderBottom: '1px solid #eee',
                  transition: 'background 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-secondary)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  Settings
                </button>
                <button style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  background: 'transparent',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  color: 'var(--text-primary)',
                  transition: 'background 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-secondary)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1 }}>
        {/* Sidebar */}
        <aside style={{
          width: sidebarOpen ? '250px' : '80px',
          background: '#1a1a1a',
          color: 'var(--text-light)',
          padding: '2rem 1rem',
          transition: 'width 0.3s ease',
          overflowY: 'auto',
          borderRight: '1px solid rgba(255,255,255,0.1)'
        }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: 'transparent',
              color: 'var(--text-light)',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              marginBottom: '2rem',
              width: '100%',
              textAlign: 'left',
              transition: 'opacity 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            ☰
          </button>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Link href="/admin" style={{
              color: 'var(--text-light)',
              textDecoration: 'none',
              padding: '1rem',
              borderRadius: '8px',
              transition: 'background 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              fontSize: '0.95rem'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <span style={{ fontSize: '1.3rem' }}>📊</span>
              {sidebarOpen && <span>Dashboard</span>}
            </Link>
            
            <Link href="/admin/classes" style={{
              color: 'var(--text-light)',
              textDecoration: 'none',
              padding: '1rem',
              borderRadius: '8px',
              transition: 'background 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              fontSize: '0.95rem'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <span style={{ fontSize: '1.3rem' }}>📅</span>
              {sidebarOpen && <span>Classes</span>}
            </Link>
            
            <Link href="/admin/members" style={{
              color: 'var(--text-light)',
              textDecoration: 'none',
              padding: '1rem',
              borderRadius: '8px',
              transition: 'background 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              fontSize: '0.95rem'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <span style={{ fontSize: '1.3rem' }}>👥</span>
              {sidebarOpen && <span>Members</span>}
            </Link>
            
            <Link href="/admin/store" style={{
              color: 'var(--text-light)',
              textDecoration: 'none',
              padding: '1rem',
              borderRadius: '8px',
              transition: 'background 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              fontSize: '0.95rem'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <span style={{ fontSize: '1.3rem' }}>📦</span>
              {sidebarOpen && <span>Store</span>}
            </Link>
            
            <Link href="/admin/payments" style={{
              color: 'var(--text-light)',
              textDecoration: 'none',
              padding: '1rem',
              borderRadius: '8px',
              transition: 'background 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              fontSize: '0.95rem'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <span style={{ fontSize: '1.3rem' }}>💳</span>
              {sidebarOpen && <span>Payments</span>}
            </Link>
            
            <Link href="/admin/settings" style={{
              color: 'var(--text-light)',
              textDecoration: 'none',
              padding: '1rem',
              borderRadius: '8px',
              transition: 'background 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              fontSize: '0.95rem'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <span style={{ fontSize: '1.3rem' }}>⚙️</span>
              {sidebarOpen && <span>Settings</span>}
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main style={{
          flex: 1,
          padding: '2rem',
          background: 'var(--bg-secondary)',
          overflowY: 'auto'
        }}>
          {children}
        </main>
      </div>
    </div>
  );
}
