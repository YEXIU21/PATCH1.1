import React from 'react';
import '../../styles/admin/AdminDashboard.css';

// Import icons
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleIcon from '@mui/icons-material/People';
import CasinoIcon from '@mui/icons-material/Casino';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const ReportsAnalytics: React.FC = () => {
  return (
    <div className="admin-dashboard">
      <h1>Reports & Analytics</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-info">
            <h2>₱123,456</h2>
            <p>Monthly Revenue</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-info">
            <h2>₱45,678</h2>
            <p>Weekly Revenue</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-info">
            <h2>₱9,876</h2>
            <p>Daily Revenue</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-info">
            <h2>18.5%</h2>
            <p>Growth Rate</p>
          </div>
        </div>
      </div>
      
      <div className="report-section">
        <h2 className="section-title">Report Types</h2>
        <div className="quick-actions-grid">
          <div className="action-card">
            <div className="action-icon">
              <BarChartIcon />
            </div>
            <p>Financial Reports</p>
          </div>
          
          <div className="action-card">
            <div className="action-icon">
              <PeopleIcon />
            </div>
            <p>User Activity</p>
          </div>
          
          <div className="action-card">
            <div className="action-icon">
              <CasinoIcon />
            </div>
            <p>Game Performance</p>
          </div>
          
          <div className="action-card">
            <div className="action-icon">
              <LocalOfferIcon />
            </div>
            <p>Promotion Results</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytics; 