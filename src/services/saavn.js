const BASE_URL = 'https://saavn.sumit.co/api';

/**
 * Decodes HTML entities from text strings
 */
const decodeHTMLEntities = (text) => {
  if (!text) return '';
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    return doc.documentElement.textContent || text;
  } catch (e) {
    return text
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&#x27;/g, "'")
      .replace(/&#x2F;/g, '/')
      .replace(/&apos;/g, "'");
  }
};

/**
 * Searches for Tamil songs from the music library
 * @param {string} query - The search term
 * @param {number} limit - Number of results to return
 * @returns {Promise<Array>} List of formatted songs
 */
export const searchSongs = async (query, limit = 40) => {
  try {
    const response = await fetch(`${BASE_URL}/search/songs?query=${encodeURIComponent(query)}&limit=${limit}`);
    const data = await response.json();
    
    if (data.success && data.data && data.data.results) {
      return data.data.results.map(formatSongData);
    }
    return [];
  } catch (error) {
    console.error('Error searching songs:', error);
    return [];
  }
};

/**
 * Gets direct details of a song by ID
 * @param {string} id - The song ID
 * @returns {Promise<Object|null>} Formatted song object
 */
export const getSongDetails = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/songs?id=${id}`);
    const data = await response.json();
    
    if (data.success && data.data && data.data[0]) {
      return formatSongData(data.data[0]);
    }
    return null;
  } catch (error) {
    console.error('Error fetching song details:', error);
    return null;
  }
};

/**
 * Helper to normalize song data across different API responses
 */
const formatSongData = (song) => {
  // Extract high-quality image (usually last in array)
  let imgUrl = 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=200&auto=format&fit=crop';
  if (song.image && Array.isArray(song.image) && song.image.length > 0) {
    imgUrl = song.image[song.image.length - 1].url || song.image[song.image.length - 1].link || imgUrl;
  } else if (typeof song.image === 'string') {
    imgUrl = song.image;
  }

  // Extract high-quality download url (avoiding 320kbps as it often 404s on JioSaavn CDN)
  let audioUrl = '';
  if (song.downloadUrl && Array.isArray(song.downloadUrl) && song.downloadUrl.length > 0) {
    const safeStream = song.downloadUrl.find(d => d.quality === '160kbps') 
                    || song.downloadUrl.find(d => d.quality === '96kbps')
                    || song.downloadUrl[song.downloadUrl.length - 1];
    
    audioUrl = safeStream.url || safeStream.link || '';
  }

  // Extract artists
  let artistName = 'Unknown Artist';
  if (song.artists && song.artists.primary && Array.isArray(song.artists.primary) && song.artists.primary.length > 0) {
    artistName = song.artists.primary.map(a => decodeHTMLEntities(a.name)).join(', ');
  } else if (song.primaryArtists) {
    artistName = typeof song.primaryArtists === 'string' ? decodeHTMLEntities(song.primaryArtists) : song.primaryArtists.map(a => decodeHTMLEntities(a.name)).join(', ');
  }

  return {
    id: song.id,
    title: decodeHTMLEntities(song.name || song.title || 'Untitled'),
    artist: artistName,
    img: imgUrl,
    audioUrl: audioUrl,
    duration: song.duration ? parseInt(song.duration) : 0,
    album: decodeHTMLEntities(song.album?.name || song.album || '')
  };
};

/**
 * Searches for playlists from JioSaavn
 * @param {string} query - The search query
 * @param {number} limit - Number of results to return
 * @returns {Promise<Array>} List of formatted playlist objects
 */
export const searchPlaylists = async (query, limit = 20) => {
  try {
    const response = await fetch(`${BASE_URL}/search/playlists?query=${encodeURIComponent(query)}&limit=${limit}`);
    const data = await response.json();
    
    if (data.success && data.data && data.data.results) {
      return data.data.results.map(playlist => {
        let imgUrl = 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=200&auto=format&fit=crop';
        if (playlist.image && Array.isArray(playlist.image) && playlist.image.length > 0) {
          imgUrl = playlist.image[playlist.image.length - 1].url || playlist.image[playlist.image.length - 1].link || imgUrl;
        } else if (typeof playlist.image === 'string') {
          imgUrl = playlist.image;
        }
        return {
          id: playlist.id,
          title: decodeHTMLEntities(playlist.name || playlist.title || 'Untitled Playlist'),
          img: imgUrl,
          songCount: playlist.songCount || playlist.shares || '0',
          description: decodeHTMLEntities(playlist.description || '')
        };
      });
    }
    return [];
  } catch (error) {
    console.error('Error searching playlists:', error);
    return [];
  }
};

/**
 * Gets details of a playlist including songs by ID
 * @param {string} id - The playlist ID
 * @returns {Promise<Object|null>} Formatted playlist details with songs
 */
export const getPlaylistDetails = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/playlists?id=${id}`);
    const data = await response.json();
    
    if (data.success && data.data) {
      const playlist = data.data;
      let imgUrl = 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=200&auto=format&fit=crop';
      if (playlist.image && Array.isArray(playlist.image) && playlist.image.length > 0) {
        imgUrl = playlist.image[playlist.image.length - 1].url || playlist.image[playlist.image.length - 1].link || imgUrl;
      } else if (typeof playlist.image === 'string') {
        imgUrl = playlist.image;
      }
      return {
        id: playlist.id,
        title: decodeHTMLEntities(playlist.name || playlist.title || 'Untitled Playlist'),
        img: imgUrl,
        description: decodeHTMLEntities(playlist.description || ''),
        songs: playlist.songs ? playlist.songs.map(formatSongData) : []
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching playlist details:', error);
    return null;
  }
};
