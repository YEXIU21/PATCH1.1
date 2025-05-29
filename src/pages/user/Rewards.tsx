import React from 'react';
import '../../styles/user/Rewards.css';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StarIcon from '@mui/icons-material/Star';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

const Rewards: React.FC = () => {
  const rewardLevels = [
    {
      level: 'Bronze',
      points: '0 - 999',
      benefits: ['5% Weekly Cashback', 'Daily Free Spins x5', 'Monthly Bonus up to PHP 50']
    },
    {
      level: 'Silver',
      points: '1,000 - 4,999',
      benefits: ['7.5% Weekly Cashback', 'Daily Free Spins x10', 'Monthly Bonus up to PHP 100', 'Priority Support']
    },
    {
      level: 'Gold',
      points: '5,000 - 19,999',
      benefits: ['10% Weekly Cashback', 'Daily Free Spins x20', 'Monthly Bonus up to PHP 250', 'Priority Support', 'Personal Account Manager']
    },
    {
      level: 'Platinum',
      points: '20,000+',
      benefits: ['15% Weekly Cashback', 'Daily Free Spins x50', 'Monthly Bonus up to PHP 500', 'VIP Support 24/7', 'Personal Account Manager', 'Exclusive VIP Events']
    }
  ];

  return (
    <div className="rewards-container">
      <div className="rewards-header">
        <EmojiEventsIcon className="rewards-icon" />
        <h1>My Rewards</h1>
      </div>
      
      <div className="rewards-summary">
        <div className="rewards-card">
          <div className="rewards-card-header">
            <h2>Your Current Status</h2>
          </div>
          <div className="rewards-card-content">
            <div className="rewards-status">
              <div className="rewards-level">
                <StarIcon />
                <h3>Silver</h3>
              </div>
              <div className="rewards-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '35%' }}></div>
                </div>
                <div className="progress-text">
                  <span>1,750 / 5,000 points to Gold</span>
                </div>
              </div>
            </div>
            <div className="rewards-points">
              <div className="points-item">
                <span className="points-label">Current Points</span>
                <span className="points-value">1,750</span>
              </div>
              <div className="points-item">
                <span className="points-label">Points to Next Level</span>
                <span className="points-value">3,250</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="rewards-levels">
        <h2>Loyalty Levels</h2>
        <div className="levels-grid">
          {rewardLevels.map((level, index) => (
            <div key={index} className={`level-card ${level.level.toLowerCase()}`}>
              <div className="level-header">
                <h3>{level.level}</h3>
                <span className="level-points">{level.points} Points</span>
              </div>
              <div className="level-benefits">
                <h4>Benefits</h4>
                <ul>
                  {level.benefits.map((benefit, i) => (
                    <li key={i}>{benefit}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="rewards-actions">
        <button className="btn btn-primary">
          <CardGiftcardIcon />
          Claim Rewards
        </button>
      </div>
    </div>
  );
};

export default Rewards; 