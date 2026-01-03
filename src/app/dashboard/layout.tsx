'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isAdmin = false;

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${sidebarOpen ? '' : 'closed'}`}>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="sidebar-toggle"
        >
          ☰
        </button>

        {sidebarOpen && (
          <div className="sidebar-title">
            🥋 JJ Grappling
          </div>
        )}

        <div className="sidebar-nav">
          <Link href="/dashboard" className="nav-link">
            <span className="nav-icon">🏠</span>
            {sidebarOpen && <span>Home</span>}
          </Link>
          
          <Link href="/dashboard#about-section" className="nav-link" onClick={(e) => {
            e.preventDefault();
            const element = document.getElementById('about-section');
            element?.scrollIntoView({ behavior: 'smooth' });
          }}>
            <span className="nav-icon">ℹ️</span>
            {sidebarOpen && <span>About</span>}
          </Link>
          
          <Link href="/dashboard#classes-calendar" className="nav-link" onClick={(e) => {
            e.preventDefault();
            const element = document.getElementById('classes-calendar');
            element?.scrollIntoView({ behavior: 'smooth' });
          }}>
            <span className="nav-icon">📅</span>
            {sidebarOpen && <span>Classes</span>}
          </Link>
          
          <Link href="/dashboard/free-trial" className="nav-link">
            <span className="nav-icon">⭐</span>
            {sidebarOpen && <span>Free Trial</span>}
          </Link>
          
          <Link href="/dashboard/schedule-private" className="nav-link">
            <span className="nav-icon">👤</span>
            {sidebarOpen && <span>Schedule Private</span>}
          </Link>
          
          <Link href="/dashboard/memberships" className="nav-link">
            <span className="nav-icon">💳</span>
            {sidebarOpen && <span>Memberships</span>}
          </Link>
          
          <Link href="/dashboard/store" className="nav-link">
            <span className="nav-icon">🛍️</span>
            {sidebarOpen && <span>Shop Now</span>}
          </Link>
          
          <Link href="/dashboard/contact" className="nav-link">
            <span className="nav-icon">💬</span>
            {sidebarOpen && <span>Contact</span>}
          </Link>
          
          <Link href="/dashboard/events" className="nav-link">
            <span className="nav-icon">🎉</span>
            {sidebarOpen && <span>Events</span>}
          </Link>
        </div>
      </aside>

      {/* Top Bar */}
      <div className="dashboard-topbar">
        <div className="topbar-spacer"></div>
        <div className="topbar-actions">
          <Link href="/dashboard/store" className="topbar-icon-btn" title="Shopping Cart">
            🛒
          </Link>
          <button className="topbar-profile-btn">👤 Account</button>
        </div>
      </div>

      {/* Main Content */}
      <main className={`dashboard-main ${sidebarOpen ? '' : 'sidebar-closed'}`}>
        {children}
      </main>
    </div>
  );
}
