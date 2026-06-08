import React from 'react';
import './ArtistList.css';

const artists = [
  { id: 1, name: 'Anirudh Ravichander', img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=200&auto=format&fit=crop' },
  { id: 2, name: 'A. R. Rahman', img: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=200&auto=format&fit=crop' },
  { id: 3, name: 'Harris Jayaraj', img: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=200&auto=format&fit=crop' },
  { id: 4, name: 'Yuvan Shankar Raja', img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=200&auto=format&fit=crop' },
  { id: 5, name: 'Ilaiyaraaja', img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=200&auto=format&fit=crop' },
  { id: 6, name: 'Deva', img: 'https://images.unsplash.com/photo-1487180142328-0c4e37023af5?q=80&w=200&auto=format&fit=crop' },
  { id: 7, name: 'Dhina', img: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=200&auto=format&fit=crop' },
  { id: 8, name: 'Vidyasagar', img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=200&auto=format&fit=crop' },
  { id: 9, name: 'D. Imman', img: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=200&auto=format&fit=crop' },
  { id: 10, name: 'G. V. Prakash Kumar', img: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f5f4b7?q=80&w=200&auto=format&fit=crop' },
  { id: 11, name: 'Hiphop Tamizha', img: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=200&auto=format&fit=crop' },
  { id: 12, name: 'Santhosh Narayanan', img: 'https://images.unsplash.com/photo-1446057032654-9d8885db76c6?q=80&w=200&auto=format&fit=crop' }
];

const ArtistList = ({ onArtistSelect }) => {
  return (
    <div className="artist-list-container">
      <h3 className="section-title">Artists you love</h3>
      <div className="artist-scroll hide-scrollbar">
        {artists.map((artist) => (
          <div key={artist.id} className="artist-item" onClick={() => onArtistSelect(artist)}>
            <img src={artist.img} alt={artist.name} className="artist-img" />
            <span className="artist-name">{artist.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistList;
