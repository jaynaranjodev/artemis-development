export default function StorePage() {
  const products = [
    { id: 1, name: 'Karate Gi - White', price: '$49.99', category: 'Uniforms' },
    { id: 2, name: 'Training Gloves', price: '$59.99', category: 'Equipment' },
    { id: 3, name: 'Protective Gear Set', price: '$89.99', category: 'Safety' },
    { id: 4, name: 'Artemis Academy T-Shirt', price: '$24.99', category: 'Apparel' },
    { id: 5, name: 'Belt Set (All Ranks)', price: '$199.99', category: 'Uniforms' },
    { id: 6, name: 'Water Bottle - Academy Logo', price: '$19.99', category: 'Accessories' },
  ];

  return (
    <div>
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: '700',
        color: 'var(--text-primary)',
        marginBottom: '2rem'
      }}>
        Online Store
      </h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '2rem'
      }}>
        {products.map((product) => (
          <div key={product.id} className="card-hover" style={{
            background: 'white',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease'
          }}>
            <div style={{
              background: 'var(--gradient-2)',
              height: '150px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '2.5rem'
            }}>
              📦
            </div>
            <div style={{ padding: '1.5rem' }}>
              <p style={{
                fontSize: '0.85rem',
                color: 'var(--primary-color)',
                fontWeight: '600',
                marginBottom: '0.5rem'
              }}>
                {product.category}
              </p>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: '600',
                color: 'var(--text-primary)',
                marginBottom: '1rem'
              }}>
                {product.name}
              </h3>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <p style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: 'var(--primary-color)'
                }}>
                  {product.price}
                </p>
                <button style={{
                  background: 'var(--gradient-1)',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'transform 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
