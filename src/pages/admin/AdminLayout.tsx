import React, { useState, useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import '../../styles/admin/AdminLayout.css';

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile && !sidebarOpen) {
        setSidebarOpen(true);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [sidebarOpen]);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  
  const handleTouchEnd = () => {
    // Minimum swipe distance (in px)
    const minSwipeDistance = 50;
    
    // Calculate swipe distance
    const swipeDistance = touchEndX.current - touchStartX.current;
    
    // If the swipe is long enough and in the right direction
    if (Math.abs(swipeDistance) > minSwipeDistance) {
      // Right swipe (open sidebar)
      if (swipeDistance > 0 && !sidebarOpen) {
        setSidebarOpen(true);
      }
      // Left swipe (close sidebar)
      else if (swipeDistance < 0 && sidebarOpen && isMobile) {
        setSidebarOpen(false);
      }
    }
  };
  
  return (
    <div 
      className="admin-layout"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="sidebar-container">
        <AdminSidebar isOpen={sidebarOpen} />
      </div>
      
      {isMobile && sidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}
      
      <div className={`admin-content ${sidebarOpen ? '' : 'sidebar-closed'}`}>
        <AdminHeader toggleSidebar={toggleSidebar} />
        <main className="admin-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 