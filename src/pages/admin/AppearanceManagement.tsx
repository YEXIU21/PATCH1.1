import React, { useState } from 'react';
import '../../styles/admin/AdminDashboard.css';
import '../../styles/admin/AppearanceManagement.css';

// Import icons
import ColorLensIcon from '@mui/icons-material/ColorLens';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import ImageIcon from '@mui/icons-material/Image';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SaveIcon from '@mui/icons-material/Save';
import VisibilityIcon from '@mui/icons-material/Visibility';
import GridViewIcon from '@mui/icons-material/GridView';
import StyleIcon from '@mui/icons-material/Style';

const AppearanceManagement: React.FC = () => {
  const [primaryColor, setPrimaryColor] = useState('#ff9a00');
  const [secondaryColor, setSecondaryColor] = useState('#21262d');
  const [accentColor, setAccentColor] = useState('#f7b955');
  const [backgroundColor, setBackgroundColor] = useState('#0d1117');
  const [textColor, setTextColor] = useState('#e6edf3');
  const [theme, setTheme] = useState('dark');
  const [previewMode, setPreviewMode] = useState(false);

  const handleSaveTheme = () => {
    // In a real app, this would save the theme settings to a database
    alert('Theme settings saved successfully!');
  };

  const togglePreviewMode = () => {
    setPreviewMode(!previewMode);
  };

  return (
    <div className="admin-dashboard">
      <h1>Appearance Management</h1>
      <p className="section-description">Customize the look and feel of your casino platform</p>
      
      <div className="appearance-container">
        <div className="appearance-sidebar">
          <div className="appearance-section">
            <h3><ColorLensIcon /> Colors</h3>
            <div className="color-setting">
              <label>Primary Color</label>
              <div className="color-input-container">
                <input 
                  type="color" 
                  value={primaryColor} 
                  onChange={(e) => setPrimaryColor(e.target.value)} 
                  className="color-picker"
                />
                <input 
                  type="text" 
                  value={primaryColor} 
                  onChange={(e) => setPrimaryColor(e.target.value)} 
                  className="color-text"
                />
              </div>
            </div>
            
            <div className="color-setting">
              <label>Secondary Color</label>
              <div className="color-input-container">
                <input 
                  type="color" 
                  value={secondaryColor} 
                  onChange={(e) => setSecondaryColor(e.target.value)} 
                  className="color-picker"
                />
                <input 
                  type="text" 
                  value={secondaryColor} 
                  onChange={(e) => setSecondaryColor(e.target.value)} 
                  className="color-text"
                />
              </div>
            </div>
            
            <div className="color-setting">
              <label>Accent Color</label>
              <div className="color-input-container">
                <input 
                  type="color" 
                  value={accentColor} 
                  onChange={(e) => setAccentColor(e.target.value)} 
                  className="color-picker"
                />
                <input 
                  type="text" 
                  value={accentColor} 
                  onChange={(e) => setAccentColor(e.target.value)} 
                  className="color-text"
                />
              </div>
            </div>
            
            <div className="color-setting">
              <label>Background Color</label>
              <div className="color-input-container">
                <input 
                  type="color" 
                  value={backgroundColor} 
                  onChange={(e) => setBackgroundColor(e.target.value)} 
                  className="color-picker"
                />
                <input 
                  type="text" 
                  value={backgroundColor} 
                  onChange={(e) => setBackgroundColor(e.target.value)} 
                  className="color-text"
                />
              </div>
            </div>
            
            <div className="color-setting">
              <label>Text Color</label>
              <div className="color-input-container">
                <input 
                  type="color" 
                  value={textColor} 
                  onChange={(e) => setTextColor(e.target.value)} 
                  className="color-picker"
                />
                <input 
                  type="text" 
                  value={textColor} 
                  onChange={(e) => setTextColor(e.target.value)} 
                  className="color-text"
                />
              </div>
            </div>
          </div>
          
          <div className="appearance-section">
            <h3><StyleIcon /> Theme</h3>
            <div className="theme-options">
              <button 
                className={`theme-option ${theme === 'dark' ? 'active' : ''}`}
                onClick={() => setTheme('dark')}
              >
                <DarkModeIcon />
                <span>Dark</span>
              </button>
              <button 
                className={`theme-option ${theme === 'light' ? 'active' : ''}`}
                onClick={() => setTheme('light')}
              >
                <LightModeIcon />
                <span>Light</span>
              </button>
            </div>
          </div>
          
          <div className="appearance-section">
            <h3><GridViewIcon /> Layout</h3>
            <div className="layout-setting">
              <label>Content Width</label>
              <select className="appearance-select">
                <option value="wide">Wide</option>
                <option value="standard">Standard</option>
                <option value="narrow">Narrow</option>
              </select>
            </div>
            
            <div className="layout-setting">
              <label>Sidebar Position</label>
              <select className="appearance-select">
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            </div>
          </div>
          
          <div className="appearance-section">
            <h3><FormatSizeIcon /> Typography</h3>
            <div className="typography-setting">
              <label>Font Family</label>
              <select className="appearance-select">
                <option value="inter">Inter</option>
                <option value="roboto">Roboto</option>
                <option value="poppins">Poppins</option>
                <option value="opensans">Open Sans</option>
              </select>
            </div>
            
            <div className="typography-setting">
              <label>Base Font Size</label>
              <select className="appearance-select">
                <option value="14px">14px</option>
                <option value="16px">16px</option>
                <option value="18px">18px</option>
              </select>
            </div>
          </div>
          
          <div className="appearance-section">
            <h3><ImageIcon /> Images</h3>
            <div className="image-setting">
              <label>Logo</label>
              <div className="file-upload">
                <input type="file" id="logo-upload" className="file-input" />
                <label htmlFor="logo-upload" className="file-label">Choose File</label>
              </div>
            </div>
            
            <div className="image-setting">
              <label>Favicon</label>
              <div className="file-upload">
                <input type="file" id="favicon-upload" className="file-input" />
                <label htmlFor="favicon-upload" className="file-label">Choose File</label>
              </div>
            </div>
            
            <div className="image-setting">
              <label>Login Background</label>
              <div className="file-upload">
                <input type="file" id="login-bg-upload" className="file-input" />
                <label htmlFor="login-bg-upload" className="file-label">Choose File</label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="appearance-preview">
          <div className="preview-header">
            <h3>Theme Preview</h3>
            <button className="preview-toggle" onClick={togglePreviewMode}>
              <VisibilityIcon /> {previewMode ? 'Edit Mode' : 'Preview Mode'}
            </button>
          </div>
          
          <div className="preview-container" style={{ 
            backgroundColor: backgroundColor,
            color: textColor
          }}>
            <div className="preview-navbar" style={{ backgroundColor: secondaryColor }}>
              <div className="preview-logo" style={{ backgroundColor: primaryColor }}>LOGO</div>
              <div className="preview-nav-items">
                <div className="preview-nav-item" style={{ color: textColor }}>Home</div>
                <div className="preview-nav-item active" style={{ color: primaryColor }}>Games</div>
                <div className="preview-nav-item" style={{ color: textColor }}>Promotions</div>
                <div className="preview-nav-item" style={{ color: textColor }}>Support</div>
              </div>
              <div className="preview-buttons">
                <button className="preview-button" style={{ backgroundColor: primaryColor, color: '#fff' }}>Login</button>
                <button className="preview-button outline" style={{ borderColor: primaryColor, color: primaryColor }}>Sign Up</button>
              </div>
            </div>
            
            <div className="preview-content">
              <div className="preview-heading" style={{ color: textColor }}>Featured Games</div>
              <div className="preview-cards">
                <div className="preview-card" style={{ backgroundColor: secondaryColor }}>
                  <div className="preview-card-image" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
                  <div className="preview-card-title" style={{ color: textColor }}>Slot Game</div>
                  <button className="preview-card-button" style={{ backgroundColor: primaryColor, color: '#fff' }}>Play Now</button>
                </div>
                <div className="preview-card" style={{ backgroundColor: secondaryColor }}>
                  <div className="preview-card-image" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
                  <div className="preview-card-title" style={{ color: textColor }}>Poker</div>
                  <button className="preview-card-button" style={{ backgroundColor: primaryColor, color: '#fff' }}>Play Now</button>
                </div>
                <div className="preview-card" style={{ backgroundColor: secondaryColor }}>
                  <div className="preview-card-image" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
                  <div className="preview-card-title" style={{ color: textColor }}>Blackjack</div>
                  <button className="preview-card-button" style={{ backgroundColor: primaryColor, color: '#fff' }}>Play Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="appearance-actions">
        <button className="save-button" onClick={handleSaveTheme}>
          <SaveIcon /> Save Theme
        </button>
      </div>
    </div>
  );
};

export default AppearanceManagement; 