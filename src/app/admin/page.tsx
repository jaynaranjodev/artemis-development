export default function AdminDashboard() {
  const stats = [
    { label: 'Total Members', value: '156', icon: '👥' },
    { label: 'Active Classes', value: '12', icon: '📅' },
    { label: 'Monthly Revenue', value: '$12,450', icon: '💰' },
    { label: 'New Signups', value: '24', icon: '⭐' },
  ];

  return (
    <div>
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: '700',
        color: 'var(--text-primary)',
        marginBottom: '2rem'
      }}>
        Admin Dashboard
      </h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '3rem'
      }}>
        {stats.map((stat, idx) => (
          <div key={idx} style={{
            background: 'white',
            borderRadius: '12px',
            padding: '2rem',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{
              fontSize: '2rem',
              marginBottom: '0.5rem'
            }}>
              {stat.icon}
            </div>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '0.9rem',
              marginBottom: '0.5rem'
            }}>
              {stat.label}
            </p>
            <p style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: 'var(--text-primary)'
            }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '2rem',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          marginBottom: '1rem',
          color: 'var(--text-primary)'
        }}>
          Quick Actions
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          {[
            { label: 'Add New Class', icon: '➕' },
            { label: 'Manage Members', icon: '👥' },
            { label: 'View Reports', icon: '📊' },
            { label: 'Settings', icon: '⚙️' }
          ].map((action, idx) => (
            <button key={idx} style={{
              background: 'var(--gradient-1)',
              color: 'white',
              border: 'none',
              padding: '1rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.95rem',
              transition: 'transform 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <span style={{ fontSize: '1.2rem' }}>{action.icon}</span>
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
