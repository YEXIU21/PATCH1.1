import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/Header.css';

// Import icons
import HomeIcon from '@mui/icons-material/Home';
import CasinoIcon from '@mui/icons-material/Casino';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import TableBarIcon from '@mui/icons-material/TableBar';
import StreamIcon from '@mui/icons-material/Stream';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ShareIcon from '@mui/icons-material/Share';

// Import components
import Logo from '../ui/Logo';
import AuthModals from '../auth/AuthModals';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showAuth, setShowAuth] = useState(false);
  const [initialModal, setInitialModal] = useState<'login' | 'signup' | 'forgotPassword' | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsSearchOpen(false);
        setIsMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsSearchOpen(false);
    
    // Toggle the sidebar active class
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      sidebar.classList.toggle('active', !isMenuOpen);
    }
  };
  
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
    
    // Remove active class from sidebar
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      sidebar.classList.remove('active');
    }
  };
  
  const isActive = (path: string) => {
    if (path === '/casino' && (location.pathname.includes('/slots') || location.pathname.includes('/casino'))) {
      return true;
    }
    return location.pathname === path;
  };

  const handleLogin = () => {
    setInitialModal('login');
    setShowAuth(true);
    closeMenu();
  };

  const handleSignup = () => {
    setInitialModal('signup');
    setShowAuth(true);
    closeMenu();
  };

  const closeAuth = () => {
    setShowAuth(false);
    setInitialModal(null);
  };
  
  const handleShare = () => {
    const title = 'Join MyCasino';
    const text = 'Join MyCasino and earn 50% commission on all players you refer! Start earning passive income today.';
    const url = window.location.origin + '?ref=' + Math.random().toString(36).substring(2, 10);
    
    if (navigator.share) {
      navigator.share({
        title: title,
        text: text,
        url: url,
      })
      .catch(error => console.log('Error sharing:', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      const shareText = encodeURIComponent(text + ' ' + url);
      
      // Try to detect mobile platforms for app-specific sharing
      const userAgent = navigator.userAgent.toLowerCase();
      
      if (userAgent.includes('android')) {
        // Android devices - primarily WhatsApp
        window.open(`https://wa.me/?text=${shareText}`, '_blank');
      } else if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
        // iOS devices
        // Create a temporary input element to allow copying to clipboard
        const input = document.createElement('input');
        input.style.position = 'fixed';
        input.style.opacity = '0';
        input.value = text + ' ' + url;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        
        alert('Link copied to clipboard! Share it with your friends to earn 50% commission on all their deposits.');
      } else {
        // Desktop fallback
        window.open(`https://web.whatsapp.com/send?text=${shareText}`, '_blank');
      }
    }
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          {/* Left section with VIP Logo */}
          <div className="left-section">
            <div className="vip-logo-container">
              <Logo className="logo" />
            </div>
          </div>

          {/* Center section with YOUR LOGO - Now clickable to return home */}
          <div className="center-section">
            <Link to="/" className="center-logo-link">
              <div className="center-logo-text">
                YOUR LOGO
              </div>
            </Link>
          </div>

          {/* Right section with search and actions */}
          <div className="right-section">
            <div className="user-actions">
              <button className="btn btn-text desktop-only" onClick={handleLogin}>Log In</button>
              <button className="btn btn-primary desktop-only" onClick={handleSignup}>Sign Up</button>
            </div>

            <div className={`search-toggle ${isSearchOpen ? 'active' : ''}`}>
              <button className="search-icon-btn" onClick={toggleSearch}>
                <SearchIcon />
              </button>
              <div className="search-container">
                <SearchIcon className="search-icon" />
                <input type="text" placeholder="Search games..." className="search-input" />
                <button className="search-button">Search</button>
              </div>
            </div>

            <button className="mobile-menu-toggle" onClick={toggleMenu}>
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
        
        {/* Mobile Search Bar */}
        <div className={`mobile-search-container ${isSearchOpen ? 'active' : ''}`}>
          <div className="search-wrapper">
            <SearchIcon className="search-icon" />
            <input type="text" placeholder="Search games..." className="search-input" />
            <button className="search-button">Search</button>
            <button className="close-search" onClick={toggleSearch}>
              <CloseIcon />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && isMobile && (
        <div className="mobile-menu-overlay" onClick={closeMenu}></div>
      )}

      {/* Auth Modals */}
      {showAuth && (
        <AuthModals
          initialModal={initialModal}
          onClose={closeAuth}
        />
      )}
    </>
  );
};

export default Header;