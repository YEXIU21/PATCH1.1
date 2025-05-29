import React from 'react';
import '../../styles/admin/AdminDashboard.css';

// Import icons
import PeopleIcon from '@mui/icons-material/People';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

const UserManagement: React.FC = () => {
  return (
    <div className="admin-dashboard">
      <h1>User Management</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-info">
            <h2>1,234</h2>
            <p>Total Users</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-info">
            <h2>892</h2>
            <p>Active Users</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-info">
            <h2>156</h2>
            <p>New Users (This Month)</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-info">
            <h2>15</h2>
            <p>Suspended Users</p>
          </div>
        </div>
      </div>
      
      <div className="table-container">
        <div className="table-header">
          <div className="search-bar">
            <SearchIcon />
            <input type="text" placeholder="Search users..." />
          </div>
          <button className="add-button">
            <AddIcon /> Add User
          </button>
        </div>
        
        <table className="data-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Status</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>john_doe</td>
              <td>john@example.com</td>
              <td><span className="status active">Active</span></td>
              <td>₱10,500.00</td>
            </tr>
            <tr>
              <td>maria_garcia</td>
              <td>maria@example.com</td>
              <td><span className="status active">Active</span></td>
              <td>₱25,750.00</td>
            </tr>
            <tr>
              <td>alex_smith</td>
              <td>alex@example.com</td>
              <td><span className="status suspended">Suspended</span></td>
              <td>₱5,200.00</td>
            </tr>
            <tr>
              <td>sarah_wong</td>
              <td>sarah@example.com</td>
              <td><span className="status active">Active</span></td>
              <td>₱15,300.00</td>
            </tr>
            <tr>
              <td>mike_johnson</td>
              <td>mike@example.com</td>
              <td><span className="status inactive">Inactive</span></td>
              <td>₱800.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement; 