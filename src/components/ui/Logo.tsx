import React, { useState, useEffect } from 'react';
import vipLogo from '../../assets/logos/VIPLOGO.png';
import '../../styles/VipStatusBar.css';

const Logo: React.FC<{ className?: string }> = ({ className }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isSmallMobile, setIsSmallMobile] = useState(window.innerWidth <= 480);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsSmallMobile(window.innerWidth <= 480);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // VIP status data - this would normally come from user data
  const vipProgress = 75; // Example: 75% of the way to next level
  const isHighBetter = vipProgress >= 50; // Example: High better if over 50%
  
  return (
    <div 
      className={`casino-logo ${className || ''}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100%',
        minWidth: isSmallMobile ? '90px' : (isMobile ? '110px' : '180px'),
        backgroundColor: '#161b22',
        padding: isSmallMobile ? '2px 0px 2px 0px' : (isMobile ? '3px 0px 3px 0px' : '8px 0px 8px 0px'),
        borderRadius: '4px',
        position: 'relative',
        marginLeft: isSmallMobile ? '-5px' : (isMobile ? '-10px' : '-15px'),
      }}
    >
      <div className="vip-logo-wrapper">
        <div className="vip-logo-image">
          <img 
            src={vipLogo} 
            alt="VIP Logo" 
            style={{
              height: isSmallMobile ? '35px' : (isMobile ? '40px' : '65px'),
              maxWidth: '100%',
              objectFit: 'contain',
              display: 'block',
              marginLeft: isSmallMobile ? '10px' : (isMobile ? '15px' : '25px'),
            }}
          />
        </div>
        
        {/* VIP Status Bar */}
        <div className={`vip-status-container ${isMobile ? 'mobile' : ''} ${isSmallMobile ? 'small-mobile' : ''}`}>
          <div 
            className={`vip-status-bar ${isHighBetter ? 'high-better' : ''}`}
            style={{ width: `${vipProgress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Logo; 