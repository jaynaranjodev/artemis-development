'use client';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
      observer.observe(el);
    });

    // Enhanced navbar on scroll
    const handleScroll = () => {
      const nav = document.querySelector('nav');
      if (nav) {
        if (window.scrollY > 100) {
          nav.style.background = 'rgba(255, 255, 255, 0.98)';
          nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
          nav.style.background = 'rgba(255, 255, 255, 0.95)';
          nav.style.boxShadow = 'none';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Navigation */}
      <nav>
        <div className="nav-container">
          <div className="logo">Artemis Development</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <ul className="nav-links">
              <li><a href="#features">Features</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
            <a href="/signup" style={{ 
              display: 'inline-block',
              background: 'var(--primary-color)',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '50px',
              textDecoration: 'none',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Register
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Build Something Amazing</h1>
          <p>A modern, sleek platform designed to showcase your incredible work and connect with your audience in meaningful ways.</p>
          <a href="#features" className="cta-button">Explore Features</a>
        </div>
      </section>

      {/* Section 1: Features */}
      <section id="features" className="section section-1">
        <h2 className="section-title fade-in">Powerful Features</h2>
        <div className="features-grid">
          <div className="feature-card fade-in">
            <div className="feature-icon">🚀</div>
            <h3>Lightning Fast</h3>
            <p>Built for speed and performance. Experience blazing-fast load times and smooth interactions that keep your users engaged and coming back for more.</p>
          </div>
          <div className="feature-card fade-in">
            <div className="feature-icon">🎨</div>
            <h3>Beautiful Design</h3>
            <p>Crafted with attention to detail and modern design principles. Every element is thoughtfully designed to create an exceptional user experience.</p>
          </div>
          <div className="feature-card fade-in">
            <div className="feature-icon">📱</div>
            <h3>Fully Responsive</h3>
            <p>Looks amazing on every device. From desktop to mobile, your content adapts seamlessly to provide the perfect viewing experience.</p>
          </div>
        </div>
      </section>

      {/* Section 2: About */}
      <section id="about" className="section section-2">
        <h2 className="section-title fade-in">About This Project</h2>
        <div className="about-content">
          <div className="about-text fade-in">
            <p>With over 10 years experience developing web applications for industry leading companies, our team is devoted to providing personalized web solutions that exceed expectations. We work closely with businesses of all sizes to create custom websites and applications that perfectly align with their goals, brand identity, and user needs.</p>
            <br />
            <p>This project represents the perfect blend of modern design and cutting-edge technology. We've carefully crafted every detail to ensure your users have an unforgettable experience.</p>
            <br />
            <p>Our approach focuses on clean aesthetics, intuitive navigation, and powerful functionality that scales with your needs. Whether you're showcasing a portfolio, launching a product, or building a community, this platform provides the foundation for success.</p>
          </div>
          <div className="about-visual fade-in"></div>
        </div>
      </section>

      {/* Section 3: Contact */}
      <section id="contact" className="section section-3">
        <h2 className="section-title fade-in">Let's Connect</h2>
        <div className="contact-content">
          <p className="fade-in">Ready to take your project to the next level? We'd love to hear from you.</p>
          <div className="contact-buttons fade-in">
            <a href="mailto:jaynaranjodev@gmail.com" className="contact-btn primary">Get In Touch</a>
            <a href="https://github.com/jaynaranjodev/artemis-development" className="contact-btn">View on GitHub</a>
            <a href="#" className="contact-btn">Learn More</a>
          </div>
        </div>
      </section>
    </>
  );
}

