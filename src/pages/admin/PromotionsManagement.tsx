import React from 'react';
import '../../styles/admin/AdminDashboard.css';

// Import icons
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

const PromotionsManagement: React.FC = () => {
  return (
    <div className="admin-dashboard">
      <h1>Promotions Management</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-info">
            <h2>12</h2>
            <p>Active Promotions</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-info">
            <h2>5</h2>
            <p>Upcoming Promotions</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-info">
            <h2>8</h2>
            <p>Expired Promotions</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-info">
            <h2>₱50K</h2>
            <p>Promotion Budget</p>
          </div>
        </div>
      </div>
      
      <div className="table-container">
        <div className="table-header">
          <div className="search-bar">
            <SearchIcon />
            <input type="text" placeholder="Search promotions..." />
          </div>
          <button className="add-button">
            <AddIcon /> Add Promotion
          </button>
        </div>
        
        <table className="data-table">
          <thead>
            <tr>
              <th>Promotion Name</th>
              <th>Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Welcome Bonus</td>
              <td>Deposit Bonus</td>
              <td>Permanent</td>
              <td>Permanent</td>
              <td><span className="status active">Active</span></td>
            </tr>
            <tr>
              <td>Weekend Cashback</td>
              <td>Cashback</td>
              <td>Every Friday</td>
              <td>Every Sunday</td>
              <td><span className="status active">Active</span></td>
            </tr>
            <tr>
              <td>Summer Special</td>
              <td>Free Spins</td>
              <td>Jun 1, 2023</td>
              <td>Aug 31, 2023</td>
              <td><span className="status inactive">Expired</span></td>
            </tr>
            <tr>
              <td>Holiday Giveaway</td>
              <td>Raffle</td>
              <td>Dec 1, 2023</td>
              <td>Dec 25, 2023</td>
              <td><span className="status active">Active</span></td>
            </tr>
            <tr>
              <td>Lunar New Year</td>
              <td>Deposit Bonus</td>
              <td>Jan 22, 2024</td>
              <td>Feb 5, 2024</td>
              <td><span className="status maintenance">Upcoming</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PromotionsManagement; 