import React, { useEffect, useState } from 'react';
import coverCard from '../../assets/images/COVER-CARD.png';

interface CardProps {
  size: number;
  top: number;
  left: number;
  rotation: number;
  opacity: number;
}

const CardBackground: React.FC = () => {
  const [cards, setCards] = useState<CardProps[]>([]);
  
  useEffect(() => {
    // Generate random card positions
    const cardCount = 70; // Increased number of cards to display
    const newCards: CardProps[] = [];
    
    for (let i = 0; i < cardCount; i++) {
      newCards.push({
        size: Math.random() * 80 + 40, // Random size between 40px and 120px
        top: Math.random() * 100, // Random position from 0% to 100% of viewport height
        left: Math.random() * 100, // Random position from 0% to 100% of viewport width
        rotation: Math.random() * 360, // Random rotation between 0 and 360 degrees
        opacity: Math.random() * 0.15 + 0.08, // Random opacity between 0.08 and 0.23
      });
    }
    
    setCards(newCards);
  }, []);
  
  const containerStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    pointerEvents: 'none',
    overflow: 'hidden',
  };
  
  return (
    <div style={containerStyle}>
      {cards.map((card, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            top: `${card.top}%`,
            left: `${card.left}%`,
            width: `${card.size}px`,
            height: `${card.size * 1.4}px`, // Maintain card aspect ratio
            backgroundImage: `url(${coverCard})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            transform: `rotate(${card.rotation}deg)`,
            opacity: card.opacity,
            pointerEvents: 'none',
          }}
        />
      ))}
    </div>
  );
};

export default CardBackground; 