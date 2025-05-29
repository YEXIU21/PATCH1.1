import React from 'react';
import '../../styles/admin/AdminDashboard.css';

// Import icons
import PeopleIcon from '@mui/icons-material/People';
import CasinoIcon from '@mui/icons-material/Casino';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CampaignIcon from '@mui/icons-material/Campaign';
import SettingsIcon from '@mui/icons-material/Settings';

const AdminDashboard: React.FC = () => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  return (
    <div className="admin-dashboard">
      <div className="welcome-section">
        <h1>Welcome back, Admin! 👋</h1>
        <p>{formattedDate}</p>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon users">
            <PeopleIcon />
          </div>
          <div className="stat-info">
            <h2>1,234</h2>
            <p>Total Users</p>
          </div>
          <div className="stat-trend positive">
            +12%
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon games">
            <CasinoIcon />
          </div>
          <div className="stat-info">
            <h2>45</h2>
            <p>Active Games</p>
          </div>
          <div className="stat-trend positive">
            +5%
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon revenue">
            <MonetizationOnIcon />
          </div>
          <div className="stat-info">
            <h2>₱123,456</h2>
            <p>Total Revenue</p>
          </div>
          <div className="stat-trend positive">
            +18%
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon promotions">
            <LocalOfferIcon />
          </div>
          <div className="stat-info">
            <h2>12</h2>
            <p>Active Promotions</p>
          </div>
          <div className="stat-trend positive">
            +2
          </div>
        </div>
      </div>
      
      <h2 className="section-title">Quick Actions</h2>
      <div className="quick-actions-grid">
        <div className="action-card">
          <div className="action-icon add-game">
            <AddCircleOutlineIcon />
          </div>
          <p>Add New Game</p>
        </div>
        
        <div className="action-card">
          <div className="action-icon add-user">
            <PersonAddIcon />
          </div>
          <p>Add New User</p>
        </div>
        
        <div className="action-card">
          <div className="action-icon create-promo">
            <CampaignIcon />
          </div>
          <p>Create Promotion</p>
        </div>
        
        <div className="action-card">
          <div className="action-icon settings">
            <SettingsIcon />
          </div>
          <p>Settings</p>
        </div>
      </div>
      
      <button className="save-button">Save Changes</button>
    </div>
  );
};

export default AdminDashboard; 