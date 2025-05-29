import React, { useState, useEffect } from 'react';
import mainIcon from '../../assets/logos/mainicon.png';
import '../../styles/SplashScreen.css';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Set a timer to trigger the fade-out animation after 2.5 seconds
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 2500);

    // Set another timer to call the onComplete callback after the fade-out animation
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3000); // 2.5s display + 0.5s fade out

    // Clean up timers on component unmount
    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  // Generate random casino chips
  const renderCasinoChips = () => {
    const chips = [];
    const chipColors = [
      'linear-gradient(135deg, #e61c1c 0%, #b71c1c 100%)',
      'linear-gradient(135deg, #1976d2 0%, #0d47a1 100%)',
      'linear-gradient(135deg, #388e3c 0%, #1b5e20 100%)',
      'linear-gradient(135deg, #ffa000 0%, #ff6f00 100%)',
      'linear-gradient(135deg, #7b1fa2 0%, #4a148c 100%)'
    ];
    
    for (let i = 0; i < 8; i++) {
      const size = 20 + Math.random() * 20;
      chips.push(
        <div 
          key={i} 
          className="casino-chip"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            background: chipColors[i % chipColors.length],
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${4 + Math.random() * 3}s`
          }}
        />
      );
    }
    
    return chips;
  };

  return (
    <div className={`splash-screen ${animationComplete ? 'fade-out' : ''}`}>
      {renderCasinoChips()}
      <div className="logo-container">
        <img 
          src={mainIcon} 
          alt="Casino Logo" 
          className="floating-logo"
        />
        <div className="glow-effect"></div>
        <div className="sparkles">
          {[...Array(30)].map((_, i) => (
            <div 
              key={i} 
              className="sparkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
      </div>
      <div className="welcome-text">
        <span>W</span>
        <span>E</span>
        <span>L</span>
        <span>C</span>
        <span>O</span>
        <span>M</span>
        <span>E</span>
      </div>
    </div>
  );
};

export default SplashScreen; 