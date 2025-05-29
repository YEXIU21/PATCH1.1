import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/SlidingBanner.css';

// Import banner images
import banner2 from '../../assets/banners/banner2.jpg';
import banner4 from '../../assets/banners/banner4.jpg';
import banner5 from '../../assets/banners/banner5.jpg';

const SlidingBanner: React.FC = () => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [previousBannerIndex, setPreviousBannerIndex] = useState<number | null>(null);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragDistance, setDragDistance] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  // Banner data
  const banners = [
    { 
      id: 1, 
      image: banner2, 
      title: 'WEEKLY TOURNAMENTS', 
      text: 'Compete for the top prizes in our exclusive weekly tournaments.', 
      buttonText: 'Join Now', 
      link: '/tournaments' 
    },
    { 
      id: 2, 
      image: banner4, 
      title: 'PREMIUM CASINO GAMES', 
      text: 'Experience our selection of high-quality casino games with amazing rewards.', 
      buttonText: 'Play Now', 
      link: '/casino' 
    },
    { 
      id: 3, 
      image: banner5, 
      title: 'VIP REWARDS PROGRAM', 
      text: 'Join our VIP program for exclusive bonuses and personalized offers.', 
      buttonText: 'Learn More', 
      link: '/vip' 
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isDragging) {
        goToNextBanner();
      }
    }, 5000); // Change slide every 5 seconds

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [banners.length, isDragging]);

  // Manual navigation
  const goToBanner = (index: number) => {
    if (index === currentBannerIndex) return;
    
    setPreviousBannerIndex(currentBannerIndex);
    
    if (index > currentBannerIndex || (currentBannerIndex === banners.length - 1 && index === 0)) {
      setSlideDirection('right');
    } else {
      setSlideDirection('left');
    }
    
    setCurrentBannerIndex(index);
    setDragDistance(0);
  };
  
  const goToNextBanner = () => {
    setPreviousBannerIndex(currentBannerIndex);
    setSlideDirection('right');
    setCurrentBannerIndex((prevIndex) => 
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const goToPrevBanner = () => {
    setPreviousBannerIndex(currentBannerIndex);
    setSlideDirection('left');
    setCurrentBannerIndex((prevIndex) => 
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  // Handle swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsDragging(true);
    setDragDistance(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartX.current) return;
    
    touchEndX.current = e.touches[0].clientX;
    const distance = touchEndX.current - touchStartX.current;
    
    // Limit the drag distance to create resistance effect
    const maxDrag = 100;
    const limitedDistance = Math.max(Math.min(distance, maxDrag), -maxDrag);
    
    setDragDistance(limitedDistance);
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) {
      setIsDragging(false);
      setDragDistance(0);
      return;
    }
    
    const swipeDistance = touchEndX.current - touchStartX.current;
    const minSwipeDistance = 50; // Minimum swipe distance to trigger slide change
    
    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        // Swipe right - go to previous slide
        goToPrevBanner();
      } else {
        // Swipe left - go to next slide
        goToNextBanner();
      }
    }
    
    // Reset touch coordinates and drag state
    touchStartX.current = null;
    touchEndX.current = null;
    setIsDragging(false);
    setDragDistance(0);
  };

  // Mouse events for desktop users
  const handleMouseDown = (e: React.MouseEvent) => {
    touchStartX.current = e.clientX;
    setIsDragging(true);
    setDragDistance(0);
    
    // Prevent default behavior like text selection
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!touchStartX.current || !isDragging) return;
    
    touchEndX.current = e.clientX;
    const distance = touchEndX.current - touchStartX.current;
    
    // Limit the drag distance to create resistance effect
    const maxDrag = 100;
    const limitedDistance = Math.max(Math.min(distance, maxDrag), -maxDrag);
    
    setDragDistance(limitedDistance);
  };

  const handleMouseUp = () => {
    handleTouchEnd();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleTouchEnd();
    }
  };

  // Get current banner
  const currentBanner = banners[currentBannerIndex];

  // Calculate transform styles based on drag
  const getSlideStyle = (index: number) => {
    if (index !== currentBannerIndex) return {};
    
    return {
      transform: isDragging ? `translateX(${dragDistance}px)` : 'translateX(0)',
      transition: isDragging ? 'none' : 'transform 0.3s ease-out'
    };
  };
  
  // Determine slide classes based on position and direction
  const getSlideClass = (index: number) => {
    let className = "banner-slide";
    
    if (index === currentBannerIndex) {
      className += " active";
      
      if (isDragging) {
        // When dragging, just use the active class
      } else if (previousBannerIndex !== null) {
        // Add animation class based on slide direction
        className += slideDirection === 'right' ? " slide-in-right" : " slide-in-left";
      }
    } else if (index === previousBannerIndex) {
      // Previous slide gets an exit animation based on direction
      className += slideDirection === 'right' ? " slide-out-left" : " slide-out-right";
    } else if (slideDirection === 'right' && (index === currentBannerIndex + 1 || (currentBannerIndex === banners.length - 1 && index === 0))) {
      // Next slide waiting to enter from right
      className += " next";
    } else if (slideDirection === 'left' && (index === currentBannerIndex - 1 || (currentBannerIndex === 0 && index === banners.length - 1))) {
      // Previous slide waiting to enter from left
      className += " previous";
    }
    
    return className;
  };

  // Get banner content animation class
  const getContentAnimationClass = () => {
    if (isDragging) return '';
    
    if (previousBannerIndex !== null) {
      return slideDirection === 'right' ? 'content-slide-in-right' : 'content-slide-in-left';
    }
    
    return '';
  };

  return (
    <section 
      className={`sliding-banner ${isDragging ? 'dragging' : ''}`}
      ref={sliderRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="banner-slider"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Banner Images with Animation */}
        <div className="banner-images">
          {banners.map((banner, index) => (
            <div 
              key={banner.id} 
              className={getSlideClass(index)}
              style={getSlideStyle(index)}
            >
              <img src={banner.image} alt={banner.title} />
            </div>
          ))}
        </div>

        {/* Banner Content */}
        <div 
          className={`banner-content ${getContentAnimationClass()}`}
          style={{
            transform: isDragging ? `translateX(${dragDistance * 0.5}px)` : undefined,
            transition: isDragging ? 'none' : undefined,
            opacity: isDragging ? 0.8 : 1
          }}
        >
          <h1 className="banner-title">{currentBanner.title}</h1>
          <p className="banner-text">{currentBanner.text}</p>
          <Link to={currentBanner.link} className="btn btn-primary">
            {currentBanner.buttonText}
          </Link>
        </div>

        {/* Indicators */}
        <div className="banner-indicators">
          {banners.map((banner, index) => (
            <button
              key={banner.id}
              className={`indicator ${index === currentBannerIndex ? 'active' : ''}`}
              onClick={() => goToBanner(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SlidingBanner; 