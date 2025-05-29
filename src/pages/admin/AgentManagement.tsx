import React, { useState } from 'react';
import {
  Typography,
  Box,
  Tabs,
  Tab,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Avatar
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupIcon from '@mui/icons-material/Group';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import '../../styles/admin/AgentManagement.css';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`agent-tabpanel-${index}`}
      aria-labelledby={`agent-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

interface AgentData {
  id: string;
  username: string;
  name: string;
  email: string;
  phone: string;
  level: string;
  status: 'active' | 'pending' | 'suspended';
  players: number;
  commission: number;
  earnings: number;
}

const AgentManagement = () => {
  const [tabValue, setTabValue] = useState(0);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<AgentData | null>(null);
  const [newAgentData, setNewAgentData] = useState({
    username: '',
    name: '',
    email: '',
    phone: '',
    level: 'sub-agent'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setNewAgentData({
      username: '',
      name: '',
      email: '',
      phone: '',
      level: 'sub-agent'
    });
    setErrors({});
  };

  const handleOpenViewDialog = (agent: AgentData) => {
    setSelectedAgent(agent);
    setOpenViewDialog(true);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    setSelectedAgent(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAgentData({
      ...newAgentData,
      [name]: value
    });
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setNewAgentData({
      ...newAgentData,
      [name]: value
    });
    
    // Clear error for this field when user selects
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateAgentData = () => {
    const newErrors: Record<string, string> = {};
    
    if (!newAgentData.username) {
      newErrors.username = 'Username is required';
    }
    
    if (!newAgentData.name) {
      newErrors.name = 'Name is required';
    }
    
    if (!newAgentData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(newAgentData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!newAgentData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10,12}$/.test(newAgentData.phone)) {
      newErrors.phone = 'Phone number is invalid';
    }
    
    if (!newAgentData.level) {
      newErrors.level = 'Agent level is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddAgent = () => {
    if (validateAgentData()) {
      console.log('Adding new agent:', newAgentData);
      handleCloseAddDialog();
      setShowSuccess(true);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    }
  };

  // Mock data for agents
  const agents: AgentData[] = [
    {
      id: 'AG001',
      username: 'masteragent1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '09123456789',
      level: 'Master Agent',
      status: 'active',
      players: 120,
      commission: 5,
      earnings: 25000
    },
    {
      id: 'AG002',
      username: 'agent2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '09123456788',
      level: 'Sub-Agent',
      status: 'active',
      players: 45,
      commission: 3,
      earnings: 12000
    },
    {
      id: 'AG003',
      username: 'agent3',
      name: 'Robert Johnson',
      email: 'robert@example.com',
      phone: '09123456787',
      level: 'Sub-Agent',
      status: 'pending',
      players: 0,
      commission: 3,
      earnings: 0
    },
    {
      id: 'AG004',
      username: 'agent4',
      name: 'Maria Garcia',
      email: 'maria@example.com',
      phone: '09123456786',
      level: 'Sub-Agent',
      status: 'suspended',
      players: 28,
      commission: 3,
      earnings: 8500
    }
  ];

  // Filter agents
  const filteredAgents = agents.filter(agent => {
    const matchesSearch = 
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel ? agent.level === filterLevel : true;
    const matchesStatus = filterStatus ? agent.status === filterStatus : true;
    
    return matchesSearch && matchesLevel && matchesStatus;
  });

  // Mock data for agent statistics
  const agentStats = {
    totalAgents: 4,
    activeAgents: 2,
    pendingAgents: 1,
    suspendedAgents: 1,
    totalPlayers: 193,
    totalCommission: 45500
  };

  return (
    <div className="agent-page">
      {/* Header */}
      <div className="agent-header-bar">
        <div className="agent-header-left">
          <MenuIcon className="menu-icon" />
          <div className="agent-title">
            <GroupIcon />
            <span>Agent Management</span>
          </div>
          <div className="agent-subtitle">Casino Management System</div>
        </div>
        <div className="agent-header-right">
          <div className="notification-icon">
            <div className="notification-badge">2</div>
          </div>
          <div className="search-icon">
            <SearchIcon />
          </div>
          <div className="admin-avatar">
            <span>Admin</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="agent-content">
        <div className="agent-content-header">
          <h1>Agent Management</h1>
          <p>Manage agents, sub-agents, and commission structures</p>
        </div>

        <div className="agent-actions-bar">
          <div className="search-container">
            <SearchIcon />
            <input 
              type="text" 
              placeholder="Search agents..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="action-buttons">
            <button 
              className="filter-btn"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FilterListIcon /> Filters
            </button>
            
            <button 
              className="add-agent-btn"
            onClick={handleOpenAddDialog}
            >
              <PersonAddIcon /> Add New Agent
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="filters-panel">
            <div className="filter-group">
              <label>Level</label>
              <select 
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
              >
                <option value="">All Levels</option>
                <option value="Master Agent">Master Agent</option>
                <option value="Sub-Agent">Sub-Agent</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label>Status</label>
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="">All</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
            
            <button 
              className="clear-filter-btn"
              onClick={() => {
                setFilterLevel('');
                setFilterStatus('');
              }}
            >
              Clear Filters
            </button>
          </div>
        )}

        <div className="stats-cards">
          <div className="stat-card">
            <div className="stat-icon agents-icon">
              <GroupIcon />
            </div>
            <div className="stat-content">
              <h2>Agents</h2>
              <div className="stat-number">{agentStats.totalAgents}</div>
              <div className="stat-badges">
                <span className="badge active">{agentStats.activeAgents} Active</span>
                <span className="badge pending">{agentStats.pendingAgents} Pending</span>
                <span className="badge suspended">{agentStats.suspendedAgents} Suspended</span>
              </div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon players-icon">
              <PeopleAltIcon />
            </div>
            <div className="stat-content">
              <h2>Total Players</h2>
              <div className="stat-number">{agentStats.totalPlayers}</div>
              <div className="stat-subtitle">Across all agents</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon commission-icon">
              <AccountBalanceWalletIcon />
            </div>
            <div className="stat-content">
              <h2>Total Commission</h2>
              <div className="stat-number">₱{agentStats.totalCommission.toLocaleString()}</div>
              <div className="stat-subtitle">Paid out to agents</div>
            </div>
          </div>
        </div>

        <div className="tabs-section">
          <div className="tab-header agents-tab active">
            <GroupIcon />
            <span>AGENTS</span>
          </div>
        </div>

        <div className="agents-table-container">
          <table className="agents-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Name</th>
                <th>Level</th>
                <th>Status</th>
                <th>Players</th>
                <th>Commission</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAgents.map((agent) => (
                <tr key={agent.id}>
                  <td>{agent.username}</td>
                  <td>
                    <div className="agent-name-cell">
                      <div className="agent-avatar">
                        <PersonIcon />
                      </div>
                      <div className="agent-info">
                        <div className="agent-name">{agent.name}</div>
                        <div className="agent-email">{agent.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={`level-badge ${agent.level === 'Master Agent' ? 'master' : 'sub'}`}>
                      {agent.level}
                    </div>
                  </td>
                  <td>
                    <div className={`status-badge ${agent.status}`}>
                      {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                    </div>
                  </td>
                  <td>
                    <div className="players-cell">
                      <GroupIcon /> {agent.players}
                    </div>
                  </td>
                  <td>{agent.commission}%</td>
                  <td>
                    <div className="action-icons">
                      <button onClick={() => handleOpenViewDialog(agent)} className="view-btn">
                        <VisibilityIcon />
                      </button>
                      <button className="edit-btn">
                        <EditIcon />
                      </button>
                      <button className={`status-toggle-btn ${agent.status === 'active' ? 'suspend' : 'activate'}`}>
                        {agent.status === 'active' ? <BlockIcon /> : <CheckCircleIcon />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Agent Dialog */}
      <Dialog 
        open={openAddDialog} 
        onClose={handleCloseAddDialog} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          style: {
            backgroundColor: '#1e2130',
            color: '#e6edf3'
          }
        }}
      >
        <DialogTitle>Add New Agent</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={newAgentData.username}
                onChange={handleInputChange}
                error={!!errors.username}
                helperText={errors.username}
                margin="normal"
                InputLabelProps={{
                  style: { color: '#8b949e' }
                }}
                InputProps={{
                  style: { color: '#e6edf3' }
                }}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={newAgentData.name}
                onChange={handleInputChange}
                error={!!errors.name}
                helperText={errors.name}
                margin="normal"
                InputLabelProps={{
                  style: { color: '#8b949e' }
                }}
                InputProps={{
                  style: { color: '#e6edf3' }
                }}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={newAgentData.email}
                onChange={handleInputChange}
                error={!!errors.email}
                helperText={errors.email}
                margin="normal"
                InputLabelProps={{
                  style: { color: '#8b949e' }
                }}
                InputProps={{
                  style: { color: '#e6edf3' }
                }}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={newAgentData.phone}
                onChange={handleInputChange}
                error={!!errors.phone}
                helperText={errors.phone}
                margin="normal"
                InputLabelProps={{
                  style: { color: '#8b949e' }
                }}
                InputProps={{
                  style: { color: '#e6edf3' }
                }}
              />
            </Grid>
            <Grid xs={12}>
              <FormControl 
                fullWidth 
                margin="normal" 
                error={!!errors.level}
                sx={{
                  '& .MuiInputLabel-root': {
                    color: '#8b949e',
                  },
                  '& .MuiOutlinedInput-root': {
                    color: '#e6edf3',
                  }
                }}
              >
                <InputLabel id="agent-level-label">Agent Level</InputLabel>
                <Select
                  labelId="agent-level-label"
                  name="level"
                  value={newAgentData.level}
                  label="Agent Level"
                  onChange={handleSelectChange}
                >
                  <MenuItem value="master-agent">Master Agent</MenuItem>
                  <MenuItem value="sub-agent">Sub-Agent</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleCloseAddDialog}
            sx={{ color: '#8b949e' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleAddAgent} 
            variant="contained" 
            sx={{ 
              backgroundColor: 'var(--primary, #ff9a00)',
              '&:hover': {
                backgroundColor: 'var(--primary-hover, #ffb340)'
              }
            }}
          >
            Add Agent
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Agent Dialog */}
      <Dialog 
        open={openViewDialog} 
        onClose={handleCloseViewDialog} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          style: {
            backgroundColor: '#1e2130',
            color: '#e6edf3'
          }
        }}
      >
        {selectedAgent && (
          <>
            <DialogTitle>
              Agent Details
              <IconButton
                aria-label="close"
                onClick={handleCloseViewDialog}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: '#8b949e'
                }}
              >
                &times;
              </IconButton>
            </DialogTitle>
            <DialogContent dividers>
              <div className="agent-detail-profile">
                <Avatar sx={{ width: 80, height: 80, bgcolor: 'var(--primary, #ff9a00)' }}>
                  <PersonIcon sx={{ fontSize: 40 }} />
                </Avatar>
                <div className="agent-detail-info">
                  <Typography variant="h4" sx={{ color: '#e6edf3' }}>{selectedAgent.name}</Typography>
                  <Typography variant="subtitle1" sx={{ color: '#8b949e' }}>
                    {selectedAgent.username} - {selectedAgent.level}
                  </Typography>
                  <div className={`status-badge ${selectedAgent.status}`}>
                    {selectedAgent.status.charAt(0).toUpperCase() + selectedAgent.status.slice(1)}
                  </div>
                </div>
              </div>

              <div className="agent-detail-stats">
                <div className="detail-stat-card">
                  <div className="detail-stat-icon">
                    <GroupIcon />
                  </div>
                  <div className="detail-stat-content">
                    <div className="detail-stat-value">{selectedAgent.players}</div>
                    <div className="detail-stat-label">Players</div>
                  </div>
                </div>
                
                <div className="detail-stat-card">
                  <div className="detail-stat-icon">
                    <AccountBalanceWalletIcon />
                  </div>
                  <div className="detail-stat-content">
                    <div className="detail-stat-value">{selectedAgent.commission}%</div>
                    <div className="detail-stat-label">Commission Rate</div>
                  </div>
                </div>
                
                <div className="detail-stat-card">
                  <div className="detail-stat-icon">
                    <TrendingUpIcon />
                  </div>
                  <div className="detail-stat-content">
                    <div className="detail-stat-value">₱{selectedAgent.earnings.toLocaleString()}</div>
                    <div className="detail-stat-label">Total Earnings</div>
                  </div>
                </div>
              </div>

              <div className="agent-detail-section">
                <Typography variant="h6" sx={{ color: '#e6edf3', borderBottom: '1px solid #30363d', paddingBottom: '10px' }}>
                  Contact Information
                </Typography>
                <div className="agent-detail-grid">
                  <div className="detail-item">
                    <div className="detail-label">Email</div>
                    <div className="detail-value">{selectedAgent.email}</div>
                  </div>
                  <div className="detail-item">
                    <div className="detail-label">Phone</div>
                    <div className="detail-value">{selectedAgent.phone}</div>
                  </div>
                </div>
              </div>

              <div className="agent-detail-section">
                <Typography variant="h6" sx={{ color: '#e6edf3', borderBottom: '1px solid #30363d', paddingBottom: '10px' }}>
                  Agent Details
                </Typography>
                <div className="agent-detail-grid">
                  <div className="detail-item">
                    <div className="detail-label">ID</div>
                    <div className="detail-value">{selectedAgent.id}</div>
                  </div>
                  <div className="detail-item">
                    <div className="detail-label">Level</div>
                    <div className="detail-value">{selectedAgent.level}</div>
                  </div>
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              <Button 
                onClick={handleCloseViewDialog}
                sx={{ color: '#8b949e' }}
              >
                Close
              </Button>
              <Button 
                variant="contained" 
                startIcon={<EditIcon />}
                sx={{ 
                  backgroundColor: 'var(--primary, #ff9a00)',
                  '&:hover': {
                    backgroundColor: 'var(--primary-hover, #ffb340)'
                  }
                }}
              >
                Edit Agent
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
};

export default AgentManagement; 