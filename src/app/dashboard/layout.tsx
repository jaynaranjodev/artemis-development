'use client';

import Link from 'next/link';
import { useState } from 'react';
import AcademyHeader from '@/components/AcademyHeader';
import AcademySidebarTitle from '@/components/AcademySidebarTitle';
import LoginModal from '@/components/LoginModal';
import PageEditPanel from '@/components/PageEditPanel';
import ColorThemeModal from '@/components/ColorThemeModal';
import EditPageDetailsModal from '@/components/EditPageDetailsModal';
import { useAuth } from '@/context/AuthContext';
import { useModals } from '@/context/ModalContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isEditingPage, setIsEditingPage] = useState(false);
  const [academyColors, setAcademyColors] = useState({
    primary: '#FF9000',
    secondary: '#E66F00',
  });

  const { isAdmin } = useAuth();
  const modals = useModals();

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

        <AcademySidebarTitle academySlug={process.env.NEXT_PUBLIC_ACADEMY_SLUG || 'jj-grappling'} open={sidebarOpen} />

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

          {/* Edit Page Button - Only for Admins */}
          <PageEditPanel
            isAdmin={isAdmin}
            onEditColorTheme={() => modals.openColorThemeModal()}
            onEditPageDetails={() => modals.openEditPageDetailsModal()}
          />
        </div>
      </aside>

      {/* Top Bar */}
      <div className="dashboard-topbar">
        <AcademyHeader academySlug={process.env.NEXT_PUBLIC_ACADEMY_SLUG || 'jj-grappling'} />
        <div className="topbar-spacer"></div>
        <div className="topbar-actions">
          <Link href="/dashboard/store" className="topbar-icon-btn" title="Shopping Cart">
            🛒
          </Link>
          <button 
            className="topbar-profile-btn"
            onClick={() => modals.openLoginModal()}
          >
            👤 Account
          </button>
        </div>
      </div>

      {/* Modals */}
      <LoginModal isOpen={modals.loginModalOpen} onClose={() => modals.closeLoginModal()} />
      <ColorThemeModal
        isOpen={modals.colorThemeModalOpen}
        onClose={() => modals.closeColorThemeModal()}
        primaryColor={academyColors.primary}
        secondaryColor={academyColors.secondary}
        onSave={async (primary, secondary) => {
          const slug = process.env.NEXT_PUBLIC_ACADEMY_SLUG || 'jj-grappling';
          const response = await fetch(`/api/academy/${slug}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              primaryColor: primary,
              secondaryColor: secondary,
            }),
          });
          if (response.ok) {
            setAcademyColors({ primary, secondary });
          }
        }}
      />
      <EditPageDetailsModal
        isOpen={modals.editPageDetailsModalOpen}
        onClose={() => modals.closeEditPageDetailsModal()}
        onEditingChange={setIsEditingPage}
      />

      {/* Main Content */}
      <main className={`dashboard-main ${sidebarOpen ? '' : 'sidebar-closed'} ${isEditingPage ? 'edit-mode' : ''}`}>
        {children}
      </main>
    </div>
  );
}
