import React from 'react';
import '../../styles/admin/AdminDashboard.css';

// Import icons
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

const GameManagement: React.FC = () => {
  return (
    <div className="admin-dashboard">
      <h1>Game Management</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-info">
            <h2>45</h2>
            <p>Total Games</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-info">
            <h2>1,567</h2>
            <p>Active Players</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-info">
            <h2>₱2.5M</h2>
            <p>Total Bets Today</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-info">
            <h2>2</h2>
            <p>In Maintenance</p>
          </div>
        </div>
      </div>
      
      <div className="table-container">
        <div className="table-header">
          <div className="search-bar">
            <SearchIcon />
            <input type="text" placeholder="Search games..." />
          </div>
          <button className="add-button">
            <AddIcon /> Add Game
          </button>
        </div>
        
        <table className="data-table">
          <thead>
            <tr>
              <th>Game Name</th>
              <th>Category</th>
              <th>Provider</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Slots Paradise</td>
              <td>Slots</td>
              <td>Evolution Gaming</td>
              <td><span className="status active">Active</span></td>
            </tr>
            <tr>
              <td>Blackjack Pro</td>
              <td>Table Games</td>
              <td>Pragmatic Play</td>
              <td><span className="status active">Active</span></td>
            </tr>
            <tr>
              <td>Mega Roulette</td>
              <td>Table Games</td>
              <td>Evolution Gaming</td>
              <td><span className="status maintenance">Maintenance</span></td>
            </tr>
            <tr>
              <td>Lucky Fortune</td>
              <td>Slots</td>
              <td>NetEnt</td>
              <td><span className="status active">Active</span></td>
            </tr>
            <tr>
              <td>Dragon Baccarat</td>
              <td>Table Games</td>
              <td>Pragmatic Play</td>
              <td><span className="status inactive">Inactive</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GameManagement; 