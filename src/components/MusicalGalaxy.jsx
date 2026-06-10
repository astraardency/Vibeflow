import React, { useState, useRef, useEffect } from 'react';
import './MusicalGalaxy.css';
import { Music } from 'lucide-react';

// 8 specific Tamil artists requested by the user
const artists = [
  { name: 'A.R. Rahman', img: 'https://c.saavncdn.com/artists/AR_Rahman_20230828071840_500x500.jpg', color: 'rgba(255, 107, 107, 0.6)' },
  { name: 'Anirudh', img: 'https://c.saavncdn.com/artists/Anirudh_Ravichander_004_20250124071753_500x500.jpg', color: 'rgba(78, 205, 196, 0.6)' },
  { name: 'Ilaiyaraaja', img: 'https://c.saavncdn.com/artists/Ilaiyaraaja_20230828071840_500x500.jpg', color: 'rgba(69, 183, 209, 0.6)' },
  { name: 'Yuvan Shankar', img: 'https://c.saavncdn.com/artists/Yuvan_Shankar_Raja_20230828071840_500x500.jpg', color: 'rgba(249, 202, 36, 0.6)' },
  { name: 'Harris Jayaraj', img: 'https://c.saavncdn.com/artists/Harris_Jayaraj_500x500.jpg', color: 'rgba(104, 109, 224, 0.6)' },
  { name: 'G.V. Prakash', img: 'https://c.saavncdn.com/artists/GV_Prakash_Kumar_500x500.jpg', color: 'rgba(255, 121, 121, 0.6)' },
  { name: 'Hip Hop Tamizha', img: 'https://c.saavncdn.com/artists/Hiphop_Tamizha_500x500.jpg', color: 'rgba(186, 220, 88, 0.6)' },
  { name: 'Santhosh N.', img: 'https://c.saavncdn.com/artists/Santhosh_Narayanan_500x500.jpg', color: 'rgba(224, 86, 253, 0.6)' },
];

const MusicalGalaxy = ({ onArtistSelect }) => {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedMsg, setSelectedMsg] = useState('');
  
  // Refs for drag tracking
  const dragStartX = useRef(0);
  const prevRotation = useRef(0);
  const rafRef = useRef(null);

  // Auto-rotation effect
  useEffect(() => {
    if (!isDragging) {
      const animate = () => {
        // Slowly subtract to rotate clockwise
        setRotation((prev) => prev - 0.15);
        rafRef.current = requestAnimationFrame(animate);
      };
      rafRef.current = requestAnimationFrame(animate);
    }
    
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isDragging]);

  // Pointer event handlers for drag/swipe
  const handlePointerDown = (e) => {
    setIsDragging(true);
    // Support both mouse and touch
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    dragStartX.current = clientX;
    prevRotation.current = rotation;
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const deltaX = clientX - dragStartX.current;
    // Map swipe distance to rotation degrees
    setRotation(prevRotation.current + deltaX * 0.5);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handleArtistClick = (artist) => {
    // Show popup message
    setSelectedMsg(`Exploring songs by ${artist.name}`);
    
    // Call parent handler
    if (onArtistSelect) {
      onArtistSelect({
        name: artist.name,
        img: artist.img
      });
    }

    // Hide popup after 3 seconds
    setTimeout(() => {
      setSelectedMsg('');
    }, 3000);
  };

  return (
    <div className="musical-galaxy-wrapper">
      <div className="galaxy-header">
        <h3 className="section-title">Musical Galaxy</h3>
        <p className="galaxy-subtitle">Spin the galaxy to explore your favorite artists</p>
      </div>
      
      {/* Container handles pointer events for dragging */}
      <div 
        className="galaxy-interactive-area"
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
      >
        {/* The rotating orbit */}
        <div 
          className="galaxy-orbit" 
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {/* Static center planet with counter-rotation */}
          <div 
            className="galaxy-center-planet"
            style={{ transform: `rotate(${-rotation}deg)` }}
          >
            <Music size={24} color="white" fill="white" />
          </div>

          {/* Artist Planets */}
          {artists.map((artist, index) => {
            // Distribute 8 artists evenly across 360 degrees
            const angle = (index * 360) / artists.length;
            
            return (
              <div
                key={artist.name}
                className="galaxy-planet focusable"
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation(); // prevent drag trigger
                  handleArtistClick(artist);
                }}
                style={{
                  // 1. Rotate to the angle
                  // 2. Translate out to the orbit radius (120px)
                  // 3. Counter-rotate by (-angle - rotation) so the image stays upright
                  transform: `rotate(${angle}deg) translateX(120px) rotate(${-angle - rotation}deg)`,
                  boxShadow: `0 0 20px ${artist.color}, inset 0 0 10px rgba(255,255,255,0.8)`
                }}
              >
                <img src={artist.img} alt={artist.name} draggable="false" />
                <span className="planet-label">{artist.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Popup Card for selection feedback */}
      <div className={`galaxy-popup ${selectedMsg ? 'show' : ''}`}>
        {selectedMsg}
      </div>
    </div>
  );
};

export default MusicalGalaxy;
