import React, { useState, useEffect, useRef } from 'react';
import '../../styles/components/AppDownloadModal.css';
import { useNavigate } from 'react-router-dom';

// Import icons
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import GetAppIcon from '@mui/icons-material/GetApp';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

interface AppDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AppDownloadModal: React.FC<AppDownloadModalProps> = ({ isOpen, onClose }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isShrunk, setIsShrunk] = useState(false);
  const [isShrinking, setIsShrinking] = useState(false);
  const shrinkTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    let pulseInterval: NodeJS.Timeout;
    
    if (isOpen) {
      // Start the pulse animation when modal opens
      pulseInterval = setInterval(() => {
        setIsAnimating(prev => !prev);
      }, 2000);
      
      // Set timeout to start shrinking the modal after 3 seconds
      shrinkTimeoutRef.current = setTimeout(() => {
        setIsShrinking(true);
        
        // Complete the shrinking after a transition
        setTimeout(() => {
          setIsShrunk(true);
          setIsShrinking(false);
        }, 500);
      }, 3000);
    } else {
      // Reset states when modal is closed
      setIsShrunk(false);
      setIsShrinking(false);
      
      // Clear any pending timeouts
      if (shrinkTimeoutRef.current) {
        clearTimeout(shrinkTimeoutRef.current);
        shrinkTimeoutRef.current = null;
      }
    }
    
    return () => {
      clearInterval(pulseInterval);
      if (shrinkTimeoutRef.current) {
        clearTimeout(shrinkTimeoutRef.current);
        shrinkTimeoutRef.current = null;
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;
  
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isShrunk) {
      setIsShrunk(false);
      
      // Clear any existing timeouts
      if (shrinkTimeoutRef.current) {
        clearTimeout(shrinkTimeoutRef.current);
      }
      
      // Set a new timeout to shrink it again after 5 seconds
      shrinkTimeoutRef.current = setTimeout(() => {
        setIsShrinking(true);
        
        // Complete the shrinking after a transition
        setTimeout(() => {
          setIsShrunk(true);
          setIsShrinking(false);
        }, 500);
      }, 8000);
    }
  };
  
  const handleDownloadClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Redirect to download page
    navigate('/download');
    // Close the modal
    onClose();
  };

  return (
    <div className={`app-download-overlay ${isShrunk ? 'shrunk' : ''} ${isShrinking ? 'shrinking' : ''}`} onClick={onClose}>
      <div 
        className={`app-download-modal ${isAnimating ? 'pulse' : ''} ${isShrunk ? 'shrunk' : ''} ${isShrinking ? 'shrinking' : ''}`} 
        onClick={handleModalClick}
      >
        <button className="close-button" onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}>
          <CloseIcon />
        </button>
        
        <h2 className="app-download-title">Download Our App</h2>
        
        <p className="app-download-subtitle">
          Play your favorite casino games anytime, anywhere!
        </p>
        
        <div className="download-icon-container">
          <CloudDownloadIcon className="big-download-icon" />
        </div>
        
        <button 
          className={`download-now-button ${isAnimating ? 'pulse-button' : ''}`}
          onClick={handleDownloadClick}
        >
          <img 
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgLTk2MCA5NjAgOTYwIiB3aWR0aD0iMjQiIGZpbGw9IiNmZmZmZmYiPjxwYXRoIGQ9Ik00ODAgLTMyMCAyODAgLTUyMGw1NiAtNTggMTA0IDEwNHYtMzI2aDgwdjMyNmwxMDQgLTEwNCA1NiA1OC0yMDAgMjAwWk0yNDAgLTE2MHEtMzMgMCAtNTYuNSAtMjMuNVQxNjAgLTI0MHYtMTIwaDgwdjEyMGg0ODB2LTEyMGg4MHYxMjBxMCAzMyAtMjMuNSA1Ni41VDcyMCAtMTYwSDI0MFoiLz48L3N2Zz4=" 
            alt=""
            className="download-icon-img"
            style={{
              width: isShrunk || isShrinking ? '22px' : '24px',
              height: isShrunk || isShrinking ? '22px' : '24px',
              marginRight: '8px',
              verticalAlign: 'middle',
              position: 'relative',
              top: '0px'
            }}
          />
          <span style={{ position: 'relative', top: '1px' }}>Download Now</span>
        </button>
        
        <p className="app-device-support">Available for iOS and Android devices</p>
      </div>
    </div>
  );
};

export default AppDownloadModal; 