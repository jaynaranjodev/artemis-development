export default function ClassesPage() {
  const mockClasses = [
    { id: 1, name: 'Karate - Beginners', time: 'Mon, Wed, Fri - 4:00 PM', instructor: 'Sensei John', capacity: '15/20' },
    { id: 2, name: 'Karate - Advanced', time: 'Tue, Thu, Sat - 5:30 PM', instructor: 'Sensei Sarah', capacity: '12/15' },
    { id: 3, name: 'Boxing - All Levels', time: 'Mon, Wed, Fri - 6:00 PM', instructor: 'Coach Mike', capacity: '18/20' },
    { id: 4, name: 'Kickboxing', time: 'Tue, Thu, Sat - 7:00 PM', instructor: 'Coach Lisa', capacity: '10/15' },
  ];

  return (
    <div>
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: '700',
        color: 'var(--text-primary)',
        marginBottom: '2rem'
      }}>
        Class Calendar
      </h1>

      <div style={{
        display: 'grid',
        gap: '1.5rem'
      }}>
        {mockClasses.map((cls) => (
          <div key={cls.id} className="card-slide" style={{
            background: 'white',
            borderRadius: '12px',
            padding: '1.5rem',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            borderLeft: '4px solid var(--gradient-1)',
            transition: 'transform 0.3s ease'
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
                <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  👨‍🏫 {cls.instructor}
                </p>
                <p style={{ color: 'var(--text-secondary)' }}>
                  👥 {cls.capacity} spots filled
                </p>
              </div>
              <button style={{
                background: 'var(--gradient-1)',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                Enroll
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
