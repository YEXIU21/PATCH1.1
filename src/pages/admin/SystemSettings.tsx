import React, { useState, useEffect } from 'react';
import '../../styles/admin/AdminDashboard.css';
import '../../styles/admin/SystemSettings.css';

// Import icons
import SecurityIcon from '@mui/icons-material/Security';
import LanguageIcon from '@mui/icons-material/Language';
import BackupIcon from '@mui/icons-material/Backup';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import EmailIcon from '@mui/icons-material/Email';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SaveIcon from '@mui/icons-material/Save';
import RestoreIcon from '@mui/icons-material/Restore';
import PaymentIcon from '@mui/icons-material/Payment';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const SystemSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [darkMode, setDarkMode] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [autoBackup, setAutoBackup] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [language, setLanguage] = useState('english');
  const [timezone, setTimezone] = useState('Asia/Manila');
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>('/mainicon.png');
  const [favicon, setFavicon] = useState<File | null>(null);
  const [faviconPreview, setFaviconPreview] = useState<string>('/mainicon.png');

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setLogo(selectedFile);
      
      // Create a preview URL for the selected image
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        if (e.target && e.target.result) {
          setLogoPreview(e.target.result as string);
        }
      };
      fileReader.readAsDataURL(selectedFile);
    }
  };

  const handleFaviconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFavicon(selectedFile);
      
      // Create a preview URL for the selected image
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        if (e.target && e.target.result) {
          setFaviconPreview(e.target.result as string);
        }
      };
      fileReader.readAsDataURL(selectedFile);
    }
  };

  const handleSaveSettings = () => {
    // In a real application, you would save these settings to the server
    alert('Settings saved successfully!');
  };

  const renderGeneralSettings = () => {
    return (
      <div className="settings-section">
        <h2>General Settings</h2>
        
        <div className="settings-card">
          <div className="settings-item">
            <div className="settings-item-header">
              <DarkModeIcon />
              <span>Dark Mode</span>
            </div>
            <div className="settings-item-control">
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={darkMode} 
                  onChange={() => setDarkMode(!darkMode)} 
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
          
          <div className="settings-item">
            <div className="settings-item-header">
              <LanguageIcon />
              <span>Default Language</span>
            </div>
            <div className="settings-item-control">
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                className="settings-select"
              >
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="filipino">Filipino</option>
                <option value="chinese">Chinese</option>
                <option value="japanese">Japanese</option>
              </select>
            </div>
          </div>
          
          <div className="settings-item">
            <div className="settings-item-header">
              <LanguageIcon />
              <span>Timezone</span>
            </div>
            <div className="settings-item-control">
              <select 
                value={timezone} 
                onChange={(e) => setTimezone(e.target.value)}
                className="settings-select"
              >
                <option value="Asia/Manila">Asia/Manila (GMT+8)</option>
                <option value="America/New_York">America/New_York (GMT-5)</option>
                <option value="Europe/London">Europe/London (GMT+0)</option>
                <option value="Asia/Tokyo">Asia/Tokyo (GMT+9)</option>
                <option value="Australia/Sydney">Australia/Sydney (GMT+11)</option>
              </select>
            </div>
          </div>
          
          <div className="settings-item">
            <div className="settings-item-header">
              <SecurityIcon />
              <span>Maintenance Mode</span>
            </div>
            <div className="settings-item-control">
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={maintenanceMode} 
                  onChange={() => setMaintenanceMode(!maintenanceMode)} 
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderNotificationSettings = () => {
    return (
      <div className="settings-section">
        <h2>Notification Settings</h2>
        
        <div className="settings-card">
          <div className="settings-item">
            <div className="settings-item-header">
              <EmailIcon />
              <span>Email Notifications</span>
            </div>
            <div className="settings-item-control">
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={emailNotifications} 
                  onChange={() => setEmailNotifications(!emailNotifications)} 
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
          
          <div className="settings-item">
            <div className="settings-item-header">
              <NotificationsIcon />
              <span>Push Notifications</span>
            </div>
            <div className="settings-item-control">
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={pushNotifications} 
                  onChange={() => setPushNotifications(!pushNotifications)} 
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
          
          <div className="settings-item">
            <div className="settings-item-header">
              <EmailIcon />
              <span>Email Service Configuration</span>
            </div>
            <div className="settings-item-control">
              <button className="settings-button">Configure SMTP</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderBackupSettings = () => {
    return (
      <div className="settings-section">
        <h2>Backup & Recovery</h2>
        
        <div className="settings-card">
          <div className="settings-item">
            <div className="settings-item-header">
              <BackupIcon />
              <span>Automatic Backups</span>
            </div>
            <div className="settings-item-control">
              <label className="toggle-switch">
                <input 
                  type="checkbox" 
                  checked={autoBackup} 
                  onChange={() => setAutoBackup(!autoBackup)} 
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
          
          <div className="settings-item">
            <div className="settings-item-header">
              <BackupIcon />
              <span>Backup Frequency</span>
            </div>
            <div className="settings-item-control">
              <select className="settings-select">
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>
          
          <div className="settings-item">
            <div className="settings-item-header">
              <BackupIcon />
              <span>Manual Backup</span>
            </div>
            <div className="settings-item-control">
              <button className="settings-button">Create Backup</button>
            </div>
          </div>
          
          <div className="settings-item">
            <div className="settings-item-header">
              <RestoreIcon />
              <span>Restore from Backup</span>
            </div>
            <div className="settings-item-control">
              <button className="settings-button secondary">Restore</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderIntegrationSettings = () => {
    return (
      <div className="settings-section">
        <h2>Integrations</h2>
        
        <div className="settings-card">
          <div className="settings-item">
            <div className="settings-item-header">
              <PaymentIcon />
              <span>Payment Gateways</span>
            </div>
            <div className="settings-item-control">
              <button className="settings-button">Manage Gateways</button>
            </div>
          </div>
          
          <div className="settings-item">
            <div className="settings-item-header">
              <IntegrationInstructionsIcon />
              <span>Game Providers</span>
            </div>
            <div className="settings-item-control">
              <button className="settings-button">Configure APIs</button>
            </div>
          </div>
          
          <div className="settings-item">
            <div className="settings-item-header">
              <IntegrationInstructionsIcon />
              <span>Analytics Integration</span>
            </div>
            <div className="settings-item-control">
              <button className="settings-button">Configure</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAppearanceSettings = () => {
    return (
      <div className="settings-section">
        <h2>Appearance Settings</h2>
        
        <div className="settings-card">
          <div className="settings-item">
            <div className="settings-item-header">
              <CloudUploadIcon />
              <span>Site Logo</span>
            </div>
            <div className="settings-item-control">
              <div className="logo-preview">
                <img src={logoPreview} alt="Current Logo" className="current-logo" />
              </div>
              <div className="file-upload">
                <input 
                  type="file" 
                  id="logo-upload" 
                  onChange={handleLogoChange} 
                  accept="image/*" 
                  className="file-input"
                />
                <label htmlFor="logo-upload" className="file-label">
                  {logo ? logo.name : 'Choose File'}
                </label>
              </div>
            </div>
          </div>
          
          <div className="settings-item">
            <div className="settings-item-header">
              <CloudUploadIcon />
              <span>Favicon</span>
            </div>
            <div className="settings-item-control">
              <div className="logo-preview small">
                <img src={faviconPreview} alt="Current Favicon" className="current-logo" />
              </div>
              <div className="file-upload">
                <input 
                  type="file" 
                  id="favicon-upload" 
                  onChange={handleFaviconChange} 
                  accept="image/*" 
                  className="file-input"
                />
                <label htmlFor="favicon-upload" className="file-label">
                  Choose File
                </label>
              </div>
            </div>
          </div>
          
          <div className="settings-item">
            <div className="settings-item-header">
              <LanguageIcon />
              <span>Primary Color</span>
            </div>
            <div className="settings-item-control">
              <input type="color" defaultValue="#ff9a00" className="color-picker" />
            </div>
          </div>
          
          <div className="settings-item">
            <div className="settings-item-header">
              <LanguageIcon />
              <span>Secondary Color</span>
            </div>
            <div className="settings-item-control">
              <input type="color" defaultValue="#1a1b2e" className="color-picker" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'backup':
        return renderBackupSettings();
      case 'integrations':
        return renderIntegrationSettings();
      case 'appearance':
        return renderAppearanceSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="admin-dashboard system-settings">
      <h1>System Settings</h1>
      <p className="settings-description">Configure system settings and preferences for your casino platform.</p>
      
      <div className="settings-container">
        <div className="settings-sidebar">
          <button 
            className={`settings-tab-button ${activeTab === 'general' ? 'active' : ''}`}
            onClick={() => setActiveTab('general')}
          >
            General
          </button>
          <button 
            className={`settings-tab-button ${activeTab === 'appearance' ? 'active' : ''}`}
            onClick={() => setActiveTab('appearance')}
          >
            Appearance
          </button>
          <button 
            className={`settings-tab-button ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            Notifications
          </button>
          <button 
            className={`settings-tab-button ${activeTab === 'backup' ? 'active' : ''}`}
            onClick={() => setActiveTab('backup')}
          >
            Backup & Recovery
          </button>
          <button 
            className={`settings-tab-button ${activeTab === 'integrations' ? 'active' : ''}`}
            onClick={() => setActiveTab('integrations')}
          >
            Integrations
          </button>
        </div>
        
        <div className="settings-content">
          {renderContent()}
        </div>
      </div>
      
      <div className="settings-actions">
        <button className="save-button" onClick={handleSaveSettings}>
          <SaveIcon /> Save Changes
        </button>
      </div>
    </div>
  );
};

export default SystemSettings; 