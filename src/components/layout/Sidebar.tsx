import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../../styles/Sidebar.css';

// Import icons
import HomeIcon from '@mui/icons-material/Home';
import CasinoIcon from '@mui/icons-material/Casino';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import SlotsIcon from '@mui/icons-material/VideogameAsset';
import PokerIcon from '@mui/icons-material/Style';
import BingoIcon from '@mui/icons-material/Filter9Plus';
import FishingIcon from '@mui/icons-material/Waves';
import SportIcon from '@mui/icons-material/SportsSoccer';
import SpecialtyGameIcon from '@mui/icons-material/EmojiEvents';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ChatIcon from '@mui/icons-material/Chat';
import GetAppIcon from '@mui/icons-material/GetApp';
import CloseIcon from '@mui/icons-material/Close';
import ShareIcon from '@mui/icons-material/Share';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import VipIcon from '@mui/icons-material/Whatshot';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TrophyIcon from '@mui/icons-material/EmojiEvents';
import NotificationsIcon from '@mui/icons-material/Notifications';
import GroupIcon from '@mui/icons-material/Group';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

// Import profile image
import ProfilePicture from '../../assets/images/ProfilePicture.jpg';

// Import Auth components
import AuthModals from '../auth/AuthModals';

const Sidebar: React.FC = () => {
  const [isPWAInstalled, setIsPWAInstalled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({
    games: false,
    support: false
  });
  const [showAuth, setShowAuth] = useState(false);
  const [initialModal, setInitialModal] = useState<'login' | 'signup' | 'forgotPassword' | null>(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsPWAInstalled(true);
    }

    // Listen for app installed event
    window.addEventListener('appinstalled', () => {
      setIsPWAInstalled(true);
    });

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Add click outside listener to close profile dropdown
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('appinstalled', () => {
        setIsPWAInstalled(true);
      });
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const closeMobileMenu = () => {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar && isMobile) {
      sidebar.classList.remove('active');
    }
  };

  // Toggle profile dropdown
  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  // Handle login button click
  const handleLogin = () => {
    setInitialModal('login');
    setShowAuth(true);
    closeMobileMenu();
  };

  // Handle signup button click
  const handleSignup = () => {
    setInitialModal('signup');
    setShowAuth(true);
    closeMobileMenu();
  };

  // Close auth modals
  const closeAuth = () => {
    setShowAuth(false);
    setInitialModal(null);
  };

  // Share functionality
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

  const toggleSection = (section: string) => {
    setCollapsedSections({
      ...collapsedSections,
      [section]: !collapsedSections[section]
    });
  };

  const mainNavLinks = [
    { name: 'Home', link: '/', icon: <HomeIcon /> },
    { name: 'Casino', link: '/casino', icon: <CasinoIcon /> },
    { 
      name: 'Promotions', 
      link: '/promotions', 
      icon: <CardGiftcardIcon />, 
      badge: { text: 'NEW', variant: 'success' }
    },
    { 
      name: 'Affiliate Program', 
      link: '/affiliate', 
      icon: <MonetizationOnIcon />, 
      badge: { text: 'HOT', variant: 'warning' }
    },
  ];

  const gameCategories = [
    { name: 'Bingo', link: '/bingo', icon: <BingoIcon /> },
    { name: 'Poker', link: '/poker', icon: <PokerIcon /> },
    { name: 'Slot', link: '/slots', icon: <SlotsIcon /> },
    { name: 'Casino', link: '/casino', icon: <CasinoIcon /> },
    { name: 'Fishing', link: '/fishing', icon: <FishingIcon /> },
    { name: 'Sport', link: '/sport', icon: <SportIcon /> },
    { name: 'Specialty Game', link: '/specialty-game', icon: <SpecialtyGameIcon /> },
  ];

  const supportLinks = [
    { name: 'Support & FAQ', link: '/support', icon: <HelpOutlineIcon /> },
    { name: 'Chat Support', link: '#', icon: <ChatIcon />, onClick: () => window.open('https://m.me/yourcasinopagename', '_blank') },
    { name: isPWAInstalled ? 'APP INSTALLED' : 'DOWNLOAD NOW', link: '/download', icon: <GetAppIcon /> },
  ];

  return (
    <>
      <aside className="sidebar">
        {isMobile && (
          <div className="mobile-sidebar-header">
            <button className="close-sidebar-btn" onClick={closeMobileMenu}>
              <CloseIcon />
            </button>
          </div>
        )}

        {/* Mobile Auth Buttons - Only visible on mobile */}
        {isMobile && (
          <div className="mobile-auth-buttons">
            <button className="mobile-login-btn" onClick={handleLogin}>
              <LoginIcon />
              <span>Login</span>
            </button>
            <button className="mobile-signup-btn" onClick={handleSignup}>
              <PersonAddIcon />
              <span>Sign Up</span>
            </button>
          </div>
        )}

        {/* User Status */}
        <div className="user-status" onClick={toggleProfileDropdown} ref={profileDropdownRef}>
          <div className="user-avatar">
            <img src={ProfilePicture} alt="User" />
            <span className="status-indicator online"></span>
          </div>
          <div className="user-info">
            <div className="user-name">Player VIP</div>
            <div className="user-balance">₱1,250.00</div>
          </div>
          <div className="profile-dropdown-icon">
            {showProfileDropdown ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          </div>
          
          {/* Profile Dropdown */}
          {showProfileDropdown && (
            <div className="profile-dropdown">
              <div className="mobile-dropdown-header">
                <button className="close-dropdown-btn" onClick={() => setShowProfileDropdown(false)}>
                  <CloseIcon />
                </button>
              </div>
            
              <div className="profile-header">
                <div className="profile-avatar">
                  <div className="profile-initial">U</div>
                </div>
                <div className="profile-details">
                  <div className="profile-name">User</div>
                  <div className="profile-level">Player VIP</div>
                </div>
              </div>
              
              <div className="profile-balance-section">
                <div className="balance-label">Balance</div>
                <div className="balance-amount">₱1,250.00</div>
                <Link to="/wallet" className="quick-deposit-btn" onClick={() => setShowProfileDropdown(false)}>
                  Deposit
                </Link>
              </div>
              
              <div className="profile-menu">
                <Link to="/account" className="profile-menu-item" onClick={() => setShowProfileDropdown(false)}>
                  <AccountCircleIcon />
                  <span>My Account</span>
                </Link>
                <Link to="/wallet" className="profile-menu-item" onClick={() => setShowProfileDropdown(false)}>
                  <WalletIcon />
                  <span>My Wallet</span>
                </Link>
                <Link to="/rewards" className="profile-menu-item" onClick={() => setShowProfileDropdown(false)}>
                  <TrophyIcon />
                  <span>My Rewards</span>
                </Link>
                <Link to="/settings" className="profile-menu-item" onClick={() => setShowProfileDropdown(false)}>
                  <SettingsIcon />
                  <span>Settings</span>
                </Link>
              </div>
              
              <div className="profile-footer">
                <button className="logout-button">
                  <LogoutIcon />
                  <span>Logout</span>
                </button>
              </div>
              
              <Link to="/poker" className="profile-menu-item poker-link" onClick={() => setShowProfileDropdown(false)}>
                <PokerIcon />
                <span>Poker</span>
              </Link>
            </div>
          )}
        </div>

        {/* Main Navigation */}
        <div className="sidebar-section main-nav">
          <ul className="nav-list">
            {mainNavLinks.map((item) => (
              <li key={item.name} className="nav-item">
                <Link 
                  to={item.link} 
                  className={`nav-link ${isActive(item.link) ? 'active' : ''}`}
                  onClick={isMobile ? closeMobileMenu : undefined}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {item.name}
                  {item.badge && (
                    <span className={`nav-badge ${item.badge.variant}`}>
                      {item.badge.text}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Game Categories */}
        <div className="sidebar-section">
          <h3 
            className="sidebar-title" 
            onClick={() => toggleSection('games')}
          >
            Game Categories
            <span className="toggle-icon">
              {collapsedSections.games ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
            </span>
          </h3>
          {!collapsedSections.games && (
            <ul className="category-list">
              {gameCategories.map((category) => (
                <li key={category.name} className="category-item">
                  <Link 
                    to={category.link} 
                    className={`category-link ${isActive(category.link) ? 'active' : ''}`}
                    onClick={isMobile ? closeMobileMenu : undefined}
                  >
                    <span className="category-icon">{category.icon}</span>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="sidebar-section">
          <h3 
            className="sidebar-title"
            onClick={() => toggleSection('support')}
          >
            Support & Tools
            <span className="toggle-icon">
              {collapsedSections.support ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
            </span>
          </h3>
          {!collapsedSections.support && (
            <ul className="quick-links">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  {link.onClick ? (
                    <div 
                      className="quick-link" 
                      onClick={() => {
                        if (isMobile) closeMobileMenu();
                        link.onClick?.();
                      }}
                    >
                      <span className="quick-link-icon">{link.icon}</span>
                      {link.name}
                    </div>
                  ) : (
                    <Link 
                      to={link.link} 
                      className={`quick-link ${isActive(link.link) ? 'active' : ''}`}
                      onClick={isMobile ? closeMobileMenu : undefined}
                    >
                      <span className="quick-link-icon">{link.icon}</span>
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Refer & Earn Section */}
        <div className="refer-earn-container">
          <div className="refer-earn-section">
            <div className="refer-earn-header">
              <ShareIcon />
              <span>Refer & Earn</span>
            </div>
            <p className="refer-earn-text">Get 50% commission on all referred players!</p>
            <button className="refer-earn-button" onClick={handleShare}>
              <ShareIcon />
              Share & Earn Now
            </button>
          </div>
        </div>
      </aside>

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

export default Sidebar;