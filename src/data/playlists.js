// This file can be used to store predefined community playlists or user playlist structures.
// Currently, active user playlists are stored dynamically in Firebase Firestore.

export const defaultPlaylists = [
  {
    id: "pl_1",
    name: "Tamil Hits 2024",
    creator: "Admin",
    img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=200&auto=format&fit=crop",
    createdAt: Date.now(),
    songs: [
      {
        id: "s_1",
        title: "Why This Kolaveri Di",
        artist: "Anirudh Ravichander",
        img: "images/Anirudh Ravichander/Why This Kolaveri Di.jpg"
      }
    ]
  },
  {
    id: "pl_2",
    name: "A.R. Rahman Classics",
    creator: "MusicLover",
    img: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=200&auto=format&fit=crop",
    createdAt: Date.now(),
    songs: []
  }
];

export default defaultPlaylists;
