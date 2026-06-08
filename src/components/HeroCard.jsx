import React from 'react';
import './HeroCard.css';
import { Music } from 'lucide-react';

const HeroCard = ({ onAction }) => {
  return (
    <div className="hero-card-container" onClick={() => onAction('Opening Melophile Music Mix...')}>
      <div className="hero-card">
        <div className="hero-content">
          <h2 className="hero-title">Hello Melophile</h2>
          <p className="hero-subtitle">Ready to explore some amazing tunes today?</p>
        </div>
        <div className="hero-icon">
          <Music size={24} strokeWidth={2.5} />
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
