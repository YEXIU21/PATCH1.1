import React, { useEffect, useState } from 'react';
import '../../styles/components/LiveBets.css';
import RefreshIcon from '@mui/icons-material/Refresh';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

// Import game images
import sweetBonanza from '../../assets/games/sweetbonaza.png';
import superAce from '../../assets/games/superace.png';
import sugarRush from '../../assets/games/sugarrush.jpg';
import gatesOfOlympus from '../../assets/games/gatesofolympus.jpg';
import fortuneGems from '../../assets/games/fortunegems.jpg';
import cashBonanza from '../../assets/games/cashbonanza.png';

interface BetData {
  id: number;
  game: string;
  user: string;
  wager: number;
  win: number | null;
}

const LiveBets: React.FC = () => {
  // Initial mock data for live bets
  const initialBets: BetData[] = [
    { id: 1, game: 'Sugar Rush 1000', user: 'User49****', wager: 279.00, win: 125.00 },
    { id: 2, game: 'Sweet Bonanza 1000', user: 'User13****', wager: 449.00, win: null },
    { id: 3, game: 'Cash Bonanza', user: 'User3****', wager: 686.00, win: null },
    { id: 4, game: 'Starlight Princess 1000', user: 'User21****', wager: 93.00, win: 785.00 },
    { id: 5, game: 'Super Ace', user: 'User85****', wager: 67.00, win: 997.00 }
  ];

  const [liveBets, setLiveBets] = useState<BetData[]>(initialBets);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Simulate new bets coming in periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const games = ['Gates of Olympus 1000', 'Sugar Rush 1000', 'Sweet Bonanza 1000', 'Cash Bonanza', 'Starlight Princess 1000', 'Super Ace'];
      const newBet: BetData = {
        id: Math.floor(Math.random() * 10000),
        game: games[Math.floor(Math.random() * games.length)],
        user: `User${Math.floor(Math.random() * 100)}****`,
        wager: parseFloat((Math.random() * 1000).toFixed(2)),
        win: Math.random() > 0.5 ? parseFloat((Math.random() * 1500).toFixed(2)) : null,
      };
      
      setLiveBets(prev => [newBet, ...prev.slice(0, 4)]);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    
    // Generate new bets
    const newBets = initialBets.map(bet => ({
      ...bet,
      id: Math.floor(Math.random() * 10000),
      wager: parseFloat((Math.random() * 1000).toFixed(2)),
      win: Math.random() > 0.5 ? parseFloat((Math.random() * 1500).toFixed(2)) : null,
    }));
    
    setTimeout(() => {
      setLiveBets(newBets);
      setIsRefreshing(false);
    }, 1000);
  };

  // Function to get the appropriate game image
  const getGameImage = (gameName: string) => {
    if (gameName.includes('Gates of Olympus')) return gatesOfOlympus;
    if (gameName.includes('Sugar Rush')) return sugarRush;
    if (gameName.includes('Sweet Bonanza')) return sweetBonanza;
    if (gameName.includes('Cash Bonanza')) return cashBonanza;
    if (gameName.includes('Super Ace')) return superAce;
    if (gameName.includes('Starlight Princess')) return fortuneGems;
    return sweetBonanza; // Default fallback
  };

  return (
    <div className="live-bets-container">
      <div className="live-bets-header">
        <div className="live-bets-title">
          <LocalFireDepartmentIcon className="fire-icon" /> Live Bets
        </div>
        <button 
          className={`refresh-button ${isRefreshing ? 'refreshing' : ''}`} 
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          <RefreshIcon className="refresh-icon" /> Refresh
        </button>
      </div>
      
      <div className="live-bets-table">
        <div className="table-header">
          <div className="table-cell game-column">Game</div>
          <div className="table-cell wager-column">Wager</div>
          <div className="table-cell win-column">Win</div>
        </div>
        
        <div className="table-body">
          {liveBets.map((bet) => (
            <div key={bet.id} className="table-row">
              <div className="table-cell game-column">
                <div className="game-info-cell">
                  <div className="game-icon">
                    <img src={getGameImage(bet.game)} alt={bet.game} />
                  </div>
                  <div className="game-details">
                    <div className="game-name">{bet.game}</div>
                    <div className="user-name">{bet.user}</div>
                  </div>
                </div>
              </div>
              <div className="table-cell wager-column">
                PHP {bet.wager.toFixed(2)}
              </div>
              <div className={`table-cell win-column ${bet.win === null ? 'loss' : 'win'}`}>
                {bet.win !== null ? `PHP ${bet.win.toFixed(2)}` : 'PHP 0.00'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveBets; 