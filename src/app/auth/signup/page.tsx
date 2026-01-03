'use client';

import Link from 'next/link';

export default function SignupPage() {
  return (
    <div style={{
      background: 'white',
      padding: '3rem',
      borderRadius: '20px',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '400px',
      textAlign: 'center'
    }}>
      <h1 style={{
        fontSize: '2rem',
        fontWeight: '700',
        marginBottom: '0.5rem',
        color: 'var(--text-primary)'
      }}>
        Create Account
      </h1>
      <p style={{
        color: 'var(--text-secondary)',
        marginBottom: '2rem'
      }}>
        Join our community and start your membership
      </p>

      <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="text"
          placeholder="Full Name"
          style={{
            padding: '0.75rem',
            border: '1px solid #ccc',
            borderRadius: '8px',
            fontSize: '1rem',
            fontFamily: 'inherit'
          }}
        />
        <input
          type="email"
          placeholder="Email"
          style={{
            padding: '0.75rem',
            border: '1px solid #ccc',
            borderRadius: '8px',
            fontSize: '1rem',
            fontFamily: 'inherit'
          }}
        />
        <input
          type="password"
          placeholder="Password"
          style={{
            padding: '0.75rem',
            border: '1px solid #ccc',
            borderRadius: '8px',
            fontSize: '1rem',
            fontFamily: 'inherit'
          }}
        />
        <button
          type="submit"
          className="btn-hover"
          style={{
            padding: '0.75rem 1.5rem',
            background: 'var(--gradient-1)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'transform 0.3s ease'
          }}
        >
          Sign Up
        </button>
      </form>

      <p style={{ marginTop: '1.5rem', color: 'var(--text-secondary)' }}>
        Already have an account?{' '}
        <Link href="/auth/login" style={{
          color: 'var(--primary-color)',
          textDecoration: 'none',
          fontWeight: '600'
        }}>
          Login
        </Link>
      </p>
    </div>
  );
}
