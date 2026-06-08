import React from 'react';
import './MagicShuffle.css';
import { Radio } from 'lucide-react'; // Using Radio as a cast/airplay alternative

const MagicShuffle = ({ onAction }) => {
  return (
    <div className="magic-shuffle-container">
      <h3 className="section-title">Magic Shuffle</h3>
      <div className="magic-card" onClick={() => onAction('Magic Shuffle activated!')}>
        <img 
          src="https://images.unsplash.com/photo-1493225457124-a1a2a5f5f4b7?q=80&w=150&auto=format&fit=crop" 
          alt="Eastside" 
          className="magic-img" 
        />
        <div className="magic-info">
          <div className="magic-title">Eastside</div>
          <div className="magic-artist">Benny Blanco</div>
        </div>
        <div className="magic-action" onClick={(e) => {
          e.stopPropagation();
          onAction('Connecting to wireless device...');
        }}>
          <Radio size={20} strokeWidth={2.5} />
        </div>
      </div>
    </div>
  );
};

export default MagicShuffle;
