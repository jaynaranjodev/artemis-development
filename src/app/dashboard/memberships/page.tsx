export default function MembershipsPage() {
  const membershipPlans = [
    { id: 1, name: 'Monthly Plan', price: '$49', features: ['Unlimited classes', 'Member discounts', 'Online support'] },
    { id: 2, name: 'Quarterly Plan', price: '$129', features: ['Unlimited classes', 'Member discounts', 'Priority support', 'Save 12%'] },
    { id: 3, name: 'Annual Plan', price: '$449', features: ['Unlimited classes', 'Member discounts', 'VIP support', 'Free merchandise', 'Save 23%'] },
  ];

  return (
    <div>
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: '700',
        color: 'var(--text-primary)',
        marginBottom: '2rem'
      }}>
        Membership Plans
      </h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {membershipPlans.map((plan) => (
          <div key={plan.id} className="card-hover" style={{
            background: 'white',
            borderRadius: '12px',
            padding: '2rem',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            border: plan.id === 2 ? '2px solid var(--primary-color)' : '1px solid #eee',
            transition: 'transform 0.3s ease'
          }}>
            {plan.id === 2 && (
              <div style={{
                background: 'var(--primary-color)',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                display: 'inline-block',
                marginBottom: '1rem',
                fontSize: '0.85rem',
                fontWeight: '600'
              }}>
                Most Popular
              </div>
            )}
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: 'var(--text-primary)',
              marginBottom: '0.5rem'
            }}>
              {plan.name}
            </h3>
            <p style={{
              fontSize: '2rem',
              fontWeight: '700',
              background: 'var(--gradient-1)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1.5rem'
            }}>
              {plan.price}
              <span style={{ fontSize: '0.5em', color: 'var(--text-secondary)' }}>/month</span>
            </p>

            <div style={{ marginBottom: '2rem' }}>
              {plan.features.map((feature, idx) => (
                <div key={idx} style={{
                  padding: '0.75rem 0',
                  color: 'var(--text-secondary)',
                  borderBottom: idx < plan.features.length - 1 ? '1px solid #eee' : 'none'
                }}>
                  ✓ {feature}
                </div>
              ))}
            </div>

            <button style={{
              width: '100%',
              background: plan.id === 2 ? 'var(--gradient-1)' : 'var(--bg-secondary)',
              color: plan.id === 2 ? 'white' : 'var(--text-primary)',
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
              Subscribe Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
