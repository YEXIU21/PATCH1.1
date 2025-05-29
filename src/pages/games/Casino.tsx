import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/games/Casino.css';

// Import game images
import sweetBonanza from '../../assets/games/sweetbonaza.png';
import superAce from '../../assets/games/superace.png';
import sugarRush from '../../assets/games/sugarrush.jpg';
import luckyFortunes from '../../assets/games/luckyfortunes.png';
import gatesOfOlympus from '../../assets/games/gatesofolympus.jpg';
import fortuneGems from '../../assets/games/fortunegems.jpg';
import cashBonanza from '../../assets/games/cashbonanza.png';
import banner2 from '../../assets/banners/banner2.jpg';

const Casino: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeProvider, setActiveProvider] = useState('all');

  // Function to handle playing a game
  const handlePlayGame = (gameId: number, gameTitle: string) => {
    console.log(`Playing game: ${gameTitle} (ID: ${gameId})`);
    // Here you would navigate to the game or launch the game in a modal/iframe
    alert(`Opening game: ${gameTitle}`);
  };

  // Function to handle playing a demo
  const handlePlayDemo = (gameId: number, gameTitle: string) => {
    console.log(`Playing demo for: ${gameTitle} (ID: ${gameId})`);
    // Here you would launch the demo version
    alert(`Opening demo for: ${gameTitle}`);
  };

  const categories = [
    { id: 'all', name: 'All Games' },
    { id: 'slots', name: 'Slots' },
    { id: 'table-games', name: 'Table Games' },
    { id: 'live-casino', name: 'Live Casino' },
    { id: 'jackpots', name: 'Jackpots' },
  ];

  const providers = [
    { id: 'all', name: 'All Providers' },
    { id: 'pragmatic', name: 'Pragmatic Play' },
    { id: 'evolution', name: 'Evolution' },
    { id: 'netent', name: 'NetEnt' },
    { id: 'playtech', name: 'Playtech' },
  ];

  const games = [
    { id: 1, title: 'Sweet Bonanza', category: 'slots', image: sweetBonanza, provider: 'pragmatic', isNew: false, isFeatured: true },
    { id: 2, title: 'Gates of Olympus', category: 'slots', image: gatesOfOlympus, provider: 'pragmatic', isNew: false, isFeatured: true },
    { id: 3, title: 'Cash Bonanza', category: 'slots', image: cashBonanza, provider: 'pragmatic', isNew: true, isFeatured: false },
    { id: 4, title: 'Super Ace', category: 'table-games', image: superAce, provider: 'evolution', isNew: false, isFeatured: false },
    { id: 5, title: 'Fortune Gems', category: 'slots', image: fortuneGems, provider: 'netent', isNew: false, isFeatured: false },
    { id: 6, title: 'Lucky Fortunes', category: 'jackpots', image: luckyFortunes, provider: 'playtech', isNew: true, isFeatured: false },
    { id: 7, title: 'Sugar Rush', category: 'slots', image: sugarRush, provider: 'pragmatic', isNew: true, isFeatured: true },
  ];

  // Filter games based on active category and provider
  const filteredGames = games.filter(game => {
    const categoryMatch = activeCategory === 'all' || game.category === activeCategory;
    const providerMatch = activeProvider === 'all' || game.provider === activeProvider;
    return categoryMatch && providerMatch;
  });

  // Featured games
  const featuredGames = games.filter(game => game.isFeatured);
  
  // New games
  const newGames = games.filter(game => game.isNew);

  return (
    <div className="casino-page">
      <div className="page-header">
        <h1 className="page-title">Casino Games</h1>
        <p className="page-description">Explore our wide selection of premium casino games from top providers worldwide.</p>
      </div>

      <div className="featured-banner">
        <img src={banner2} alt="Casino Games" className="banner-image" />
        <div className="banner-content">
          <h2 className="banner-title">WEEKLY TOURNAMENTS</h2>
          <p className="banner-text">Compete for the top prizes in our exclusive weekly tournaments.</p>
          <button className="btn btn-primary join-now-btn">JOIN NOW</button>
        </div>
      </div>

      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Featured Games</h2>
          <button className="refresh-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 4v6h-6"></path>
              <path d="M1 20v-6h6"></path>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"></path>
              <path d="M20.49 15a9 9 0 0 1-14.85 3.36L1 14"></path>
            </svg>
            Refresh
          </button>
        </div>
        <div className="game-grid">
          {featuredGames.map(game => (
            <div 
              key={game.id} 
              className="game-card"
              onClick={() => handlePlayGame(game.id, game.title)}
            >
              <div className="game-image-container">
                <img src={game.image} alt={game.title} className="game-image" />
                <div className="game-overlay">
                  <button 
                    className="play-btn"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the card click
                      handlePlayGame(game.id, game.title);
                    }}
                  >
                    Play Now
                  </button>
                  <button 
                    className="demo-btn"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the card click
                      handlePlayDemo(game.id, game.title);
                    }}
                  >
                    Demo
                  </button>
                </div>
              </div>
              <div className="game-info">
                <h3 className="game-title">{game.title}</h3>
                <p className="game-provider">{providers.find(p => p.id === game.provider)?.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2 className="section-title">New Games</h2>
          <Link to="/casino/new" className="section-link">View All</Link>
        </div>
        <div className="game-grid">
          {newGames.map(game => (
            <div 
              key={game.id} 
              className="game-card"
              onClick={() => handlePlayGame(game.id, game.title)}
            >
              <div className="game-image-container">
                <img src={game.image} alt={game.title} className="game-image" />
                <div className="game-overlay">
                  <button 
                    className="play-btn"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the card click
                      handlePlayGame(game.id, game.title);
                    }}
                  >
                    Play Now
                  </button>
                  <button 
                    className="demo-btn"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the card click
                      handlePlayDemo(game.id, game.title);
                    }}
                  >
                    Demo
                  </button>
                </div>
                <div className="game-badge new-badge">NEW</div>
              </div>
              <div className="game-info">
                <h3 className="game-title">{game.title}</h3>
                <p className="game-provider">{providers.find(p => p.id === game.provider)?.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Browse Games</h2>
        </div>
        
        <div className="filters-container">
          <div className="filter-group">
            <label className="filter-label">Categories:</label>
            <div className="filter-tabs">
              {categories.map(category => (
                <button 
                  key={category.id}
                  className={`filter-tab ${activeCategory === category.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          
          <div className="filter-group">
            <label className="filter-label">Providers:</label>
            <div className="filter-tabs">
              {providers.map(provider => (
                <button 
                  key={provider.id}
                  className={`filter-tab ${activeProvider === provider.id ? 'active' : ''}`}
                  onClick={() => setActiveProvider(provider.id)}
                >
                  {provider.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="games-container">
          {filteredGames.length > 0 ? (
            <div className="game-grid">
              {filteredGames.map(game => (
                <div 
                  key={game.id} 
                  className="game-card"
                  onClick={() => handlePlayGame(game.id, game.title)}
                >
                  <div className="game-image-container">
                    <img src={game.image} alt={game.title} className="game-image" />
                    <div className="game-overlay">
                      <button 
                        className="play-btn"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent triggering the card click
                          handlePlayGame(game.id, game.title);
                        }}
                      >
                        Play Now
                      </button>
                      <button 
                        className="demo-btn"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent triggering the card click
                          handlePlayDemo(game.id, game.title);
                        }}
                      >
                        Demo
                      </button>
                    </div>
                    {game.isNew && <div className="game-badge new-badge">NEW</div>}
                  </div>
                  <div className="game-info">
                    <h3 className="game-title">{game.title}</h3>
                    <p className="game-provider">{providers.find(p => p.id === game.provider)?.name}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-games-message">
              <p>No games match your current filters. Please try different filter options.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Casino; 