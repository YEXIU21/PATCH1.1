import React, { useState } from 'react';
import '../../App.css';
import '../../styles/admin/AdminDashboard.css';
import '../../styles/admin/PaymentSettings.css';

// Import MUI components
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Paper,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  ThemeProvider,
  createTheme,
  Snackbar,
  Alert
} from '@mui/material';

// Import icons
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PaymentIcon from '@mui/icons-material/Payment';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SecurityIcon from '@mui/icons-material/Security';
import SettingsIcon from '@mui/icons-material/Settings';
import SaveIcon from '@mui/icons-material/Save';

// Create theme matching the global app theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#ff9a00',
      light: 'rgba(255, 154, 0, 0.1)',
    },
    secondary: {
      main: '#21262d',
    },
    background: {
      default: '#0d1117',
      paper: '#161b22',
    },
    text: {
      primary: '#e6edf3',
      secondary: '#c9d1d9',
    },
    error: {
      main: '#ff4757',
    },
    success: {
      main: '#3fb950',
    },
    warning: {
      main: '#f7b955',
    },
  },
});

// Custom card header styles
const cardHeaderStyle = {
  backgroundColor: '#ff9a00',
  color: '#e6edf3',
};

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
      id={`payment-tabpanel-${index}`}
      aria-labelledby={`payment-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

interface PaymentMethod {
  id: string;
  name: string;
  type: string;
  fee: number;
  minAmount: number;
  maxAmount: number;
  status: boolean;
}

const PaymentSettings: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: '1', name: 'Visa/Mastercard', type: 'card', fee: 2.5, minAmount: 10, maxAmount: 5000, status: true },
    { id: '2', name: 'Bank Transfer', type: 'bank', fee: 1.0, minAmount: 50, maxAmount: 50000, status: true },
    { id: '3', name: 'PayPal', type: 'digital', fee: 3.0, minAmount: 5, maxAmount: 2000, status: true },
    { id: '4', name: 'Cryptocurrency', type: 'crypto', fee: 0.5, minAmount: 20, maxAmount: 100000, status: false },
  ]);
  
  // General settings
  const [defaultCurrency, setDefaultCurrency] = useState('PHP');
  const [withdrawalLimit, setWithdrawalLimit] = useState(10000);
  const [depositLimit, setDepositLimit] = useState(50000);
  const [autoApproveWithdrawals, setAutoApproveWithdrawals] = useState(false);
  
  // Security settings
  const [requireKYC, setRequireKYC] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [maxLoginAttempts, setMaxLoginAttempts] = useState(5);
  
  // Notification states
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState<'success' | 'error'>('success');
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleToggleStatus = (id: string) => {
    try {
      setPaymentMethods(methods => 
        methods.map(method => 
          method.id === id ? { ...method, status: !method.status } : method
        )
      );
    } catch (error) {
      setNotificationMessage('Failed to update payment method status');
      setNotificationType('error');
      setShowNotification(true);
      console.error('Error toggling payment method status:', error);
    }
  };

  const handleSaveSettings = () => {
    try {
      // In a real app, this would save the settings to a database
      setNotificationMessage('Payment settings saved successfully!');
      setNotificationType('success');
      setShowNotification(true);
    } catch (error) {
      setNotificationMessage('Failed to save settings');
      setNotificationType('error');
      setShowNotification(true);
      console.error('Error saving settings:', error);
    }
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="admin-dashboard">
        <h1>Payment Settings</h1>
        <p className="section-description">Manage payment methods, currencies, and transaction settings</p>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="payment settings tabs"
            variant="fullWidth"
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab icon={<PaymentIcon />} label="PAYMENT METHODS" />
            <Tab icon={<SettingsIcon />} label="GENERAL SETTINGS" />
            <Tab icon={<SecurityIcon />} label="SECURITY" />
          </Tabs>
        </Box>
        
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <button className="add-button">
              <AddCircleOutlineIcon /> Add Payment Method
            </button>
          </Box>
          
          <TableContainer component={Paper} className="table-container">
            <Table className="data-table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Fee (%)</TableCell>
                  <TableCell>Min Amount</TableCell>
                  <TableCell>Max Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paymentMethods.map((method) => (
                  <TableRow key={method.id}>
                    <TableCell>{method.name}</TableCell>
                    <TableCell>
                      <span className={`status ${method.type.toLowerCase()}`}>
                        {method.type.charAt(0).toUpperCase() + method.type.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>{method.fee}%</TableCell>
                    <TableCell>₱{method.minAmount}</TableCell>
                    <TableCell>₱{method.maxAmount}</TableCell>
                    <TableCell>
                      <span 
                        className={`status ${method.status ? 'active' : 'inactive'}`}
                        onClick={() => handleToggleStatus(method.id)}
                        style={{ cursor: 'pointer' }}
                      >
                        {method.status ? "Active" : "Inactive"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="action-buttons">
                        <button className="action-btn edit-btn">
                          <EditIcon />
                        </button>
                        <button className="action-btn delete-btn">
                          <DeleteIcon />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <div className="settings-grid">
            <div className="settings-card">
              <div className="settings-card-header">
                <h3>Currency Settings</h3>
              </div>
              <div className="settings-card-content">
                <div className="form-group">
                  <label>Default Currency</label>
                  <select 
                    value={defaultCurrency}
                    onChange={(e) => setDefaultCurrency(e.target.value)}
                    className="form-select"
                  >
                    <option value="PHP">Philippine Peso (₱)</option>
                    <option value="USD">US Dollar ($)</option>
                    <option value="EUR">Euro (€)</option>
                    <option value="GBP">British Pound (£)</option>
                  </select>
                </div>
                
                <div className="toggle-group">
                  <div className="toggle-switch-container">
                    <label className="toggle-switch-label">
                      <input 
                        type="checkbox" 
                        checked={true}
                        onChange={() => {}}
                        className="toggle-switch-input"
                      />
                      <span className="toggle-switch-ui"></span>
                    </label>
                  </div>
                  <span className="toggle-switch-text">Allow multiple currencies</span>
                </div>
              </div>
            </div>
            
            <div className="settings-card">
              <div className="settings-card-header">
                <h3>Transaction Limits</h3>
              </div>
              <div className="settings-card-content">
                <div className="form-group">
                  <label>Maximum Withdrawal (per day)</label>
                  <div className="input-with-prefix">
                    <span className="input-prefix">₱</span>
                    <input
                      type="number"
                      value={withdrawalLimit}
                      onChange={(e) => setWithdrawalLimit(Number(e.target.value))}
                      className="form-input"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Maximum Deposit (per transaction)</label>
                  <div className="input-with-prefix">
                    <span className="input-prefix">₱</span>
                    <input
                      type="number"
                      value={depositLimit}
                      onChange={(e) => setDepositLimit(Number(e.target.value))}
                      className="form-input"
                    />
                  </div>
                </div>
                
                <div className="toggle-group">
                  <div className="toggle-switch-container">
                    <label className="toggle-switch-label">
                      <input 
                        type="checkbox" 
                        checked={autoApproveWithdrawals}
                        onChange={(e) => setAutoApproveWithdrawals(e.target.checked)}
                        className="toggle-switch-input"
                      />
                      <span className="toggle-switch-ui"></span>
                    </label>
                  </div>
                  <span className="toggle-switch-text">Auto-approve withdrawals under ₱1,000</span>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
        
        <TabPanel value={tabValue} index={2}>
          <div className="settings-grid">
            <div className="settings-card">
              <div className="settings-card-header">
                <h3>KYC Verification</h3>
              </div>
              <div className="settings-card-content">
                <div className="toggle-group">
                  <div className="toggle-switch-container">
                    <label className="toggle-switch-label">
                      <input 
                        type="checkbox" 
                        checked={requireKYC}
                        onChange={(e) => setRequireKYC(e.target.checked)}
                        className="toggle-switch-input"
                      />
                      <span className="toggle-switch-ui"></span>
                    </label>
                  </div>
                  <span className="toggle-switch-text">Require KYC for withdrawals</span>
                </div>
                
                <div className="section-subheader">
                  <h4>KYC Level Requirements</h4>
                </div>
                
                <div className="toggle-list">
                  <div className="toggle-group">
                    <div className="toggle-switch-container">
                      <label className="toggle-switch-label">
                        <input 
                          type="checkbox" 
                          defaultChecked={true}
                          className="toggle-switch-input"
                        />
                        <span className="toggle-switch-ui"></span>
                      </label>
                    </div>
                    <span className="toggle-switch-text">Level 1: ID Verification</span>
                  </div>
                  
                  <div className="toggle-group">
                    <div className="toggle-switch-container">
                      <label className="toggle-switch-label">
                        <input 
                          type="checkbox" 
                          defaultChecked={true}
                          className="toggle-switch-input"
                        />
                        <span className="toggle-switch-ui"></span>
                      </label>
                    </div>
                    <span className="toggle-switch-text">Level 2: Address Verification</span>
                  </div>
                  
                  <div className="toggle-group">
                    <div className="toggle-switch-container">
                      <label className="toggle-switch-label">
                        <input 
                          type="checkbox" 
                          defaultChecked={true}
                          className="toggle-switch-input"
                        />
                        <span className="toggle-switch-ui"></span>
                      </label>
                    </div>
                    <span className="toggle-switch-text">Level 3: Income Verification</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="settings-card">
              <div className="settings-card-header">
                <h3>Authentication Settings</h3>
              </div>
              <div className="settings-card-content">
                <div className="toggle-group">
                  <div className="toggle-switch-container">
                    <label className="toggle-switch-label">
                      <input 
                        type="checkbox" 
                        checked={twoFactorAuth}
                        onChange={(e) => setTwoFactorAuth(e.target.checked)}
                        className="toggle-switch-input"
                      />
                      <span className="toggle-switch-ui"></span>
                    </label>
                  </div>
                  <span className="toggle-switch-text">Enable 2FA for withdrawals</span>
                </div>
                
                <div className="form-group horizontal-form-group">
                  <label>Maximum Login Attempts</label>
                  <div className="input-with-prefix">
                    <span className="input-prefix">#</span>
                    <input
                      type="number"
                      value={maxLoginAttempts}
                      onChange={(e) => setMaxLoginAttempts(Number(e.target.value))}
                      className="form-input"
                    />
                  </div>
                </div>
                
                <div className="toggle-group">
                  <div className="toggle-switch-container">
                    <label className="toggle-switch-label">
                      <input 
                        type="checkbox" 
                        defaultChecked={true}
                        className="toggle-switch-input"
                      />
                      <span className="toggle-switch-ui"></span>
                    </label>
                  </div>
                  <span className="toggle-switch-text">Email notification for large transactions</span>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
        
        <div className="button-container">
          <button className="save-button" onClick={handleSaveSettings}>
            <SaveIcon /> Save Settings
          </button>
        </div>
        
        <Snackbar 
          open={showNotification} 
          autoHideDuration={6000} 
          onClose={handleCloseNotification}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={handleCloseNotification} severity={notificationType} sx={{ width: '100%' }}>
            {notificationMessage}
          </Alert>
        </Snackbar>
      </div>
    </ThemeProvider>
  );
};

export default PaymentSettings; 