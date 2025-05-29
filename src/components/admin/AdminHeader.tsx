import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../../styles/admin/AdminHeader.css';

// Import icons
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import CasinoIcon from '@mui/icons-material/Casino';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import BarChartIcon from '@mui/icons-material/BarChart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import DiceIcon from '@mui/icons-material/Casino';
import PaletteIcon from '@mui/icons-material/Palette';
import EditIcon from '@mui/icons-material/Edit';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import PaymentsIcon from '@mui/icons-material/Payments';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import MenuBookIcon from '@mui/icons-material/MenuBook';

interface AdminHeaderProps {
  toggleSidebar: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ toggleSidebar }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();
  
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setShowSearch(false);
  };
  
  const toggleSearch = () => {
    setShowSearch(!showSearch);
    setShowNotifications(false);
  };
  
  // Determine which section is active based on the current path
  const getActiveSection = () => {
    const path = location.pathname;
    
    if (path.includes('/admin/dashboard')) {
      return { title: 'Dashboard', icon: <DashboardIcon /> };
    } else if (path.includes('/admin/users')) {
      return { title: 'Users', icon: <PeopleIcon /> };
    } else if (path.includes('/admin/games')) {
      return { title: 'Games', icon: <CasinoIcon /> };
    } else if (path.includes('/admin/promotions')) {
      return { title: 'Promotions', icon: <LocalOfferIcon /> };
    } else if (path.includes('/admin/reports')) {
      return { title: 'Reports', icon: <BarChartIcon /> };
    } else if (path.includes('/admin/appearance')) {
      return { title: 'Appearance', icon: <PaletteIcon /> };
    } else if (path.includes('/admin/content')) {
      return { title: 'Content Management', icon: <EditIcon /> };
    } else if (path.includes('/admin/casino')) {
      return { title: 'Casino Games', icon: <DiceIcon /> };
    } else if (path.includes('/admin/slots')) {
      return { title: 'Slots Management', icon: <VideogameAssetIcon /> };
    } else if (path.includes('/admin/payments')) {
      return { title: 'Payment Settings', icon: <PaymentsIcon /> };
    } else if (path.includes('/admin/agents')) {
      return { title: 'Agent Management', icon: <SupervisorAccountIcon /> };
    } else if (path.includes('/admin/terms')) {
      return { title: 'Terms & Conditions', icon: <MenuBookIcon /> };
    } else if (path.includes('/admin/settings')) {
      return { title: 'System Settings', icon: <SettingsIcon /> };
    } else {
      return { title: 'MyCasino Admin', icon: <DashboardIcon /> };
    }
  };
  
  const activeSection = getActiveSection();
  
  return (
    <header className="admin-header">
      <div className="header-left">
        <button className="menu-toggle" onClick={toggleSidebar}>
          <MenuIcon />
        </button>
        <div className="header-title">
          <h1>
            {activeSection.icon}
            {activeSection.title}
          </h1>
          <p>Casino Management System</p>
        </div>
      </div>
      
      <div className="header-actions">
        <div className="notification-container">
          <button className="notification-button" onClick={toggleNotifications}>
            <NotificationsIcon />
            <span className="notification-badge">3</span>
          </button>
          
          {showNotifications && (
            <div className="notification-dropdown">
              <h3>Notifications</h3>
              <ul className="notification-list">
                <li className="notification-item">
                  <p className="notification-message">New user registered: john_doe</p>
                  <p className="notification-time">5 minutes ago</p>
                </li>
                <li className="notification-item">
                  <p className="notification-message">Payment received: ₱5,000.00</p>
                  <p className="notification-time">20 minutes ago</p>
                </li>
                <li className="notification-item">
                  <p className="notification-message">System update available</p>
                  <p className="notification-time">1 hour ago</p>
                </li>
              </ul>
              <button className="mark-all-read">Mark All as Read</button>
            </div>
          )}
        </div>
        
        <button className="header-action-button" onClick={toggleSearch}>
          <SearchIcon />
        </button>
        
        {showSearch && (
          <div className="search-dropdown">
            <div className="global-search-bar">
              <SearchIcon />
              <input type="text" placeholder="Search anything..." autoFocus />
            </div>
          </div>
        )}
        
        <div className="admin-profile">
          <button className="profile-button">
            <AccountCircleIcon />
            <span>Admin</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader; 