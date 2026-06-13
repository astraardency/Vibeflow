import React, { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { db, auth } from './services/firebase'
import Header from './components/Header'
import HeroCard from './components/HeroCard'

import VibesList from './components/VibesList'
import SuggestedSongsList from './components/SuggestedSongsList'
import GenresList from './components/GenresList'
import MagicShuffle from './components/MagicShuffle'
import BottomNav from './components/BottomNav'
import { searchSongs, searchPlaylists, getPlaylistDetails } from './services/saavn'
import defaultSongsRaw from './data/songs.js'
const defaultSongs = defaultSongsRaw.filter(song => song.language?.toLowerCase() === 'tamil');
import { defaultPlaylists } from './data/playlists.js'
import AccountSettings from './components/AccountSettings'
import DownloadContainer from './components/DownloadContainer'
import './App.css'
import {
  Play, Pause, SkipForward, ArrowLeft, Heart,
  Search, Plus, Download, Radio, Headphones,
  Sparkles, Check, ChevronDown, ListMusic,
  Home, PlusSquare, BarChart2, Sun, Moon, Maximize2, Minimize2, Monitor
} from 'lucide-react'

function App() {
  // Global States
  const [toastMessage, setToastMessage] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [activeTab, setActiveTab] = useState('home')

  // Redesign States
  const [selectedArtist, setSelectedArtist] = useState(null)
  const [isMelophileOpen, setIsMelophileOpen] = useState(false)
  const [isNowPlayingOpen, setIsNowPlayingOpen] = useState(false)
  const [likedSongs, setLikedSongs] = useState([])
  const [playsCount, setPlaysCount] = useState(0)
  const [listeningActivity, setListeningActivity] = useState(() => {
    try {
      const saved = localStorage.getItem('listening_activity')
      return saved ? JSON.parse(saved) : []
    } catch (e) {
      return []
    }
  })
  const [artistSongs, setArtistSongs] = useState([])
  const [isLoadingArtistSongs, setIsLoadingArtistSongs] = useState(false)

  // Playlist States
  const [playlists, setPlaylists] = useState(() => {
    try {
      const saved = localStorage.getItem('playlists')
      const parsed = saved ? JSON.parse(saved) : [{
        id: 'global-1',
        name: 'Vibeflow Hits',
        creator: 'Admin',
        img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=200&auto=format&fit=crop',
        songs: [],
        createdAt: Date.now()
      }]
      defaultPlaylists.forEach(dp => {
        if (!parsed.find(p => p.id === dp.id)) {
          parsed.push(dp);
        }
      });
      return parsed;
    } catch (e) {
      return [...defaultPlaylists]
    }
  })

  // Fetch playlists from Firestore and merge with local storage
  useEffect(() => {
    let unsubscribeSnapshot = null;

    const setupSnapshot = () => {
      if (unsubscribeSnapshot) unsubscribeSnapshot();
      unsubscribeSnapshot = onSnapshot(collection(db, 'playlists'), (snapshot) => {
        const playlistsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setPlaylists(prev => {
          // Merge local and remote, preferring remote
          const merged = [...playlistsData]
          const remoteIds = new Set(playlistsData.map(p => p.id))
          prev.forEach(p => {
            if (!remoteIds.has(p.id)) {
              merged.push(p)
            }
          })
          localStorage.setItem('playlists', JSON.stringify(merged))
          return merged
        })
      }, (error) => {
        console.error("Error fetching playlists: ", error)
      })
    };

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      // Re-run snapshot setup whether logged in or out, to clear old errors and fetch with new permissions
      setupSnapshot();
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeSnapshot) unsubscribeSnapshot();
    }
  }, [])
  const [selectedPlaylist, setSelectedPlaylist] = useState(null)
  const [playlistSearchQuery, setPlaylistSearchQuery] = useState('')
  const [playlistSearchResults, setPlaylistSearchResults] = useState([])
  const [isSearchingPlaylistSongs, setIsSearchingPlaylistSongs] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newPlaylistName, setNewPlaylistName] = useState('')
  const [newPlaylistImg, setNewPlaylistImg] = useState('')
  const [isAccountSettingsOpen, setIsAccountSettingsOpen] = useState(false)
  const [isDownloadOpen, setIsDownloadOpen] = useState(false)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(-1)
  const [activePlaybackQueue, setActivePlaybackQueue] = useState(defaultSongs)
  const [isLikedSongsOpen, setIsLikedSongsOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark'
  })

  // Search States
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [searchPlaylistsResults, setSearchPlaylistsResults] = useState([])
  const [selectedSaavnPlaylist, setSelectedSaavnPlaylist] = useState(null)
  const [isLoadingSaavnPlaylist, setIsLoadingSaavnPlaylist] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  // Player States
  const [currentTrack, setCurrentTrack] = useState(null)
  const [isDesktopFullscreenOpen, setIsDesktopFullscreenOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoadingSong, setIsLoadingSong] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  // Audio Ref
  const audioRef = useRef(null)

  // PiP Window
  const [pipWindow, setPipWindow] = useState(null)

  const triggerToast = (message) => {
    setToastMessage(message)
    setShowToast(true)
  }

  // Handle Toast timeout
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [showToast])

  // Sync theme variables
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.style.setProperty('--bg-color', '#121215');
      root.style.setProperty('--text-color', '#ffffff');
      root.style.setProperty('--text-secondary', '#b0b0b0');
      root.style.setProperty('--card-bg', '#1d1d23');
      root.style.setProperty('--border-color', 'rgba(255, 255, 255, 0.08)');
      root.style.setProperty('--panel-bg', '#16161a');
      root.style.setProperty('--input-bg', '#222228');
      root.style.setProperty('--input-border', '#2a2a32');
      root.style.setProperty('--hover-bg', 'rgba(255, 255, 255, 0.06)');
      root.style.setProperty('--bar-bg', '#2d2d35');
      root.style.setProperty('--artist-sheet-bg', '#16161a');
      root.style.setProperty('--player-bar-bg', 'rgba(22, 22, 26, 0.85)');
      localStorage.setItem('theme', 'dark');
    } else {
      root.style.setProperty('--bg-color', '#f7f7f9');
      root.style.setProperty('--text-color', '#121212');
      root.style.setProperty('--text-secondary', '#6b6b6b');
      root.style.setProperty('--card-bg', '#ffffff');
      root.style.setProperty('--border-color', '#eef0f3');
      root.style.setProperty('--panel-bg', '#ffffff');
      root.style.setProperty('--input-bg', '#ffffff');
      root.style.setProperty('--input-border', '#e5e5e7');
      root.style.setProperty('--hover-bg', '#f4f5f7');
      root.style.setProperty('--bar-bg', '#e5e5e7');
      root.style.setProperty('--artist-sheet-bg', '#ffffff');
      root.style.setProperty('--player-bar-bg', 'rgba(255, 255, 255, 0.85)');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Escape key to exit fullscreen player
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsDesktopFullscreenOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Update browser tab title and favicon to currently playing song
  useEffect(() => {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }

    if (currentTrack) {
      const play = isPlaying ? '▶ ' : '⏸ ';
      document.title = `${play}${currentTrack.title} • ${currentTrack.artist}`;
      link.href = currentTrack.img || '/vite.svg';
    } else {
      document.title = 'Melophile';
      link.href = '/vite.svg';
    }

    // MediaSession API for OS-level background playback controls
    if ('mediaSession' in navigator && currentTrack) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentTrack.title,
        artist: currentTrack.artist || 'Unknown Artist',
        album: currentTrack.album || 'Unknown Album',
        artwork: [
          { src: currentTrack.img || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=200&auto=format&fit=crop', sizes: '96x96', type: 'image/jpeg' },
          { src: currentTrack.img || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=200&auto=format&fit=crop', sizes: '128x128', type: 'image/jpeg' },
          { src: currentTrack.img || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=200&auto=format&fit=crop', sizes: '256x256', type: 'image/jpeg' }
        ]
      });
    }
  }, [currentTrack, isPlaying]);

  // Bind MediaSession action handlers when play methods are ready
  useEffect(() => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.setActionHandler('play', togglePlay);
      navigator.mediaSession.setActionHandler('pause', togglePlay);
      navigator.mediaSession.setActionHandler('previoustrack', playPreviousSong);
      navigator.mediaSession.setActionHandler('nexttrack', playNextSong);
      
      // Seek handlers for better lock screen widget integration
      navigator.mediaSession.setActionHandler('seekbackward', (details) => {
        const skipTime = details.seekOffset || 10;
        if (audioRef.current) {
          audioRef.current.currentTime = Math.max(audioRef.current.currentTime - skipTime, 0);
        }
      });
      navigator.mediaSession.setActionHandler('seekforward', (details) => {
        const skipTime = details.seekOffset || 10;
        if (audioRef.current) {
          audioRef.current.currentTime = Math.min(audioRef.current.currentTime + skipTime, audioRef.current.duration);
        }
      });
    }
  }, [currentTrack, activePlaybackQueue, currentTrackIndex]);

  // Preload the next track's audio URL to ensure gapless playback and background continuous play
  useEffect(() => {
    if (activePlaybackQueue.length === 0 || currentTrackIndex === -1) return;
    
    let nextIndex = currentTrackIndex + 1;
    if (nextIndex >= activePlaybackQueue.length) {
      nextIndex = 0; // loop back
    }
    
    const nextSong = activePlaybackQueue[nextIndex];
    if (nextSong && !nextSong.audioUrl) {
      const fetchNext = async () => {
        try {
          const queryStr = nextSong.query || `${nextSong.title} ${nextSong.artist}`;
          const results = await searchSongs(queryStr);
          if (results && results.length > 0) {
            const fetchedSong = results[0];
            setActivePlaybackQueue(prev => {
              const newQueue = [...prev];
              // only update if it hasn't been updated already
              if (!newQueue[nextIndex].audioUrl) {
                 newQueue[nextIndex] = { ...newQueue[nextIndex], audioUrl: fetchedSong.audioUrl };
              }
              return newQueue;
            });
          }
        } catch (e) {
          console.error("Failed to preload next track", e);
        }
      };
      fetchNext();
    }
  }, [currentTrackIndex, activePlaybackQueue]);

  // Reset sub-views when tab changes
  useEffect(() => {
    setIsMelophileOpen(false)
    setSelectedArtist(null)
    setSelectedPlaylist(null)
    setIsLikedSongsOpen(false)
    setPlaylistSearchQuery('')
    setPlaylistSearchResults([])
    setSelectedSaavnPlaylist(null)
  }, [activeTab])

  // Real-time debounced search
  useEffect(() => {
    if (activeTab !== 'search') return;

    const delayDebounceFn = setTimeout(() => {
      if (!searchQuery.trim()) {
        const loadTrending = async () => {
          setIsSearching(true)
          const songs = await searchSongs('latest Tamil songs', 100)
          setSearchResults(songs)
          setSearchPlaylistsResults(playlists.filter(p => !p.hidden).map(p => ({
            ...p,
            title: p.name,
            songCount: p.songs?.length || 0
          })))
          setIsSearching(false)
        }
        loadTrending()
      } else {
        const performSearch = async () => {
          setIsSearching(true)
          const songs = await searchSongs(searchQuery, 100)

          // Always show community playlists, optionally bringing matched ones to the front
          const matchedPlaylists = playlists.filter(p =>
            p.name?.toLowerCase().includes(searchQuery.toLowerCase())
          );
          const unmatchedPlaylists = playlists.filter(p =>
            !p.name?.toLowerCase().includes(searchQuery.toLowerCase()) && !p.hidden
          );

          const communityPlaylists = [...matchedPlaylists, ...unmatchedPlaylists].map(p => ({
            ...p,
            title: p.name,
            songCount: p.songs?.length || 0
          }))

          setSearchResults(songs)
          setSearchPlaylistsResults(communityPlaylists)
          setIsSearching(false)
        }
        performSearch()
      }
    }, 400) // 400ms debounce

    return () => clearTimeout(delayDebounceFn)
  }, [activeTab, searchQuery])

  // Load artist songs from JioSaavn when selected
  useEffect(() => {
    if (selectedArtist) {
      const fetchArtistSongs = async () => {
        setIsLoadingArtistSongs(true)
        let query = `${selectedArtist.name} Tamil songs`
        let limit = 40
        const name = selectedArtist.name.toLowerCase()

        if (name.includes('anirudh')) {
          query = 'Anirudh Ravichander Tamil'
          limit = 160
        } else if (name.includes('rahman')) {
          query = 'A.R. Rahman Tamil'
          limit = 1000
        } else if (name.includes('harris')) {
          query = 'Harris Jayaraj Tamil'
          limit = 550
        } else if (name.includes('yuvan')) {
          query = 'Yuvan Shankar Raja Tamil'
          limit = 550
        } else if (name.includes('ilaiyaraaja') || name.includes('ilayaraja')) {
          query = 'Ilaiyaraaja Tamil'
          limit = 950
        } else if (name.includes('deva')) {
          query = 'Deva Tamil hits'
          limit = 500
        } else if (name.includes('dhina')) {
          query = 'Dhina composer Tamil'
          limit = 100
        } else if (name.includes('vidyasagar')) {
          query = 'Vidyasagar Tamil'
          limit = 300
        } else if (name.includes('imman')) {
          query = 'D. Imman Tamil'
          limit = 300
        } else if (name.includes('prakash')) {
          query = 'G.V. Prakash Kumar Tamil'
          limit = 550
        } else if (name.includes('hiphop') || name.includes('tamizha')) {
          query = 'Hiphop Tamizha Tamil'
          limit = 200
        } else if (name.includes('santhosh') || name.includes('narayanan')) {
          query = 'Santhosh Narayanan Tamil'
          limit = 300
        } else if (name.includes('srikanth')) {
          query = 'Srikanth Deva Tamil'
          limit = 100
        }

        const results = await searchSongs(query, limit)

        let filteredResults = [];
        const seenTitles = new Set();

        // For Deva, also post-filter to only songs where artist is actually Deva
        const isDeva = name.includes('deva');

        results.forEach(song => {
          const titleLower = song.title.toLowerCase();
          const artistLower = (song.artist || '').toLowerCase();

          // Skip if Deva filter active and song doesn't belong to Deva
          if (isDeva && !artistLower.includes('deva')) return;

          const isNonOriginal =
            titleLower.includes('lofi') ||
            titleLower.includes('lo-fi') ||
            titleLower.includes('remix') ||
            titleLower.includes('cover') ||
            titleLower.includes('karaoke') ||
            titleLower.includes('instrumental') ||
            titleLower.includes('snippet') ||
            titleLower.includes('teaser') ||
            titleLower.includes('promo') ||
            titleLower.includes('tribute') ||
            titleLower.includes('unplugged') ||
            titleLower.includes('acoustic') ||
            titleLower.includes('reprise') ||
            titleLower.includes('mashup') ||
            titleLower.includes('dj') ||
            titleLower.includes('mix') ||
            titleLower.includes('version') ||
            titleLower.includes('ringtone') ||
            titleLower.includes('bgm');

          if (!isNonOriginal) {
            const normalizedTitle = titleLower.replace(/\s*\(from\s+[^)]+\)/g, '').trim();
            if (!seenTitles.has(normalizedTitle)) {
              seenTitles.add(normalizedTitle);
              filteredResults.push(song);
            }
          }
        });

        // If Deva filter removed everything, fall back without artist filter
        if (isDeva && filteredResults.length === 0) {
          results.forEach(song => {
            const titleLower = song.title.toLowerCase();
            const isNonOriginal =
              titleLower.includes('lofi') || titleLower.includes('lo-fi') ||
              titleLower.includes('remix') || titleLower.includes('cover') ||
              titleLower.includes('karaoke') || titleLower.includes('bgm');
            if (!isNonOriginal) {
              const normalizedTitle = titleLower.replace(/\s*\(from\s+[^)]+\)/g, '').trim();
              if (!seenTitles.has(normalizedTitle)) {
                seenTitles.add(normalizedTitle);
                filteredResults.push(song);
              }
            }
          });
        }

        setArtistSongs(filteredResults)
        setIsLoadingArtistSongs(false)
      }
      fetchArtistSongs()
    } else {
      setArtistSongs([])
    }
  }, [selectedArtist])

  // Toggle favorite/like song
  const toggleLike = (songTitle, e) => {
    if (e) e.stopPropagation();
    if (likedSongs.includes(songTitle)) {
      setLikedSongs(likedSongs.filter(title => title !== songTitle))
      triggerToast('Removed from Liked Songs')
    } else {
      setLikedSongs([...likedSongs, songTitle])
      triggerToast('Added to Liked Songs')
    }
  }

  // Play a song
  const playSong = async (song, index = -1, queueToUse = null) => {
    try {
      setIsLoadingSong(true)
      setIsPlaying(false)
      triggerToast(`Loading "${song.title || song.name}"...`)

      if (queueToUse) {
        setActivePlaybackQueue(queueToUse)
      }

      const list = queueToUse || activePlaybackQueue
      let targetIndex = index;
      if (targetIndex === -1) {
        targetIndex = list.findIndex(s => s.id === song.id || s.title?.toLowerCase() === song.title?.toLowerCase());
      }
      setCurrentTrackIndex(targetIndex);

      let trackToPlay = { ...song }

      // If the song doesn't have an audioUrl, search for it on JioSaavn
      if (!song.audioUrl) {
        const queryStr = song.query || `${song.title} ${song.artist}`
        const results = await searchSongs(queryStr)
        if (results && results.length > 0) {
          trackToPlay = results[0] // take the best match
        } else {
          triggerToast('Could not find stream for this song.')
          setIsLoadingSong(false)
          return;
        }
      }

      setCurrentTrack(trackToPlay)
      setPlaysCount(prev => prev + 1)
      setListeningActivity(prev => {
        const filtered = prev.filter(s => s.title !== trackToPlay.title)
        const updated = [trackToPlay, ...filtered].slice(0, 15)
        localStorage.setItem('listening_activity', JSON.stringify(updated))
        return updated
      })

      // Update audio source and play
      if (audioRef.current) {
        audioRef.current.src = trackToPlay.audioUrl
        audioRef.current.load()

        const playPromise = audioRef.current.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true)
              setIsLoadingSong(false)
            })
            .catch((error) => {
              console.error('Audio play failed:', error)
              triggerToast('Playback failed. Trying again...')
              setIsLoadingSong(false)
            })
        }
      }
    } catch (e) {
      console.error(e)
      triggerToast('Error streaming song.')
      setIsLoadingSong(false)
    }
  }

  // Toggle play/pause
  const togglePlay = () => {
    if (!currentTrack) {
      playSong(defaultSongs[0])
      return
    }

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.error(err))
    }
  }

  // Audio event listeners
  const onTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const onAudioEnded = () => {
    setIsPlaying(false)
    const listToUse = getCurrentTracklist()
    const currentIndex = listToUse.findIndex(s => s.id === currentTrack?.id || s.title === currentTrack?.title)
    if (currentIndex !== -1 && currentIndex < listToUse.length - 1) {
      playSong(listToUse[currentIndex + 1])
    } else {
      playSong(listToUse[0])
    }
  }

  // Playlist Action Handlers
  const handleCreatePlaylist = async (e) => {
    e.preventDefault()
    if (!newPlaylistName.trim()) return
    const creator = localStorage.getItem('username') || 'Anonymous'

    // Generate a temporary ID for local storage
    const tempId = Date.now().toString()

    const newPl = {
      id: tempId,
      name: newPlaylistName.trim(),
      img: newPlaylistImg.trim() || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=200&auto=format&fit=crop',
      songs: [],
      creator: creator,
      createdAt: Date.now()
    }

    // Update local state immediately
    const updatedPlaylists = [...playlists, newPl]
    setPlaylists(updatedPlaylists)
    localStorage.setItem('playlists', JSON.stringify(updatedPlaylists))

    setNewPlaylistName('')
    setNewPlaylistImg('')
    setShowCreateModal(false)
    triggerToast(`Created playlist "${newPl.name}"!`)

    try {
      // Try to sync with Firebase
      const docRef = await addDoc(collection(db, 'playlists'), newPl)
      // We don't need to do anything with docRef, onSnapshot will handle it
    } catch (error) {
      console.error("Error adding playlist to cloud: ", error)
      triggerToast('Saved locally, but error syncing to cloud.')
    }
  }

  const handleDeletePlaylist = async (id, e) => {
    if (e) e.stopPropagation()

    // Update local state immediately
    const updatedPlaylists = playlists.filter(p => p.id !== id)
    setPlaylists(updatedPlaylists)
    localStorage.setItem('playlists', JSON.stringify(updatedPlaylists))

    if (selectedPlaylist && selectedPlaylist.id === id) {
      setSelectedPlaylist(null)
    }
    triggerToast('Playlist deleted.')

    try {
      // Try to sync with Firebase
      await deleteDoc(doc(db, 'playlists', id))
    } catch (error) {
      console.error("Error deleting playlist from cloud: ", error)
    }
  }

  const addSongToPlaylist = async (playlistId, song) => {
    const playlist = playlists.find(p => p.id === playlistId)
    if (!playlist) return

    if (playlist.songs.some(s => s.id === song.id || s.title === song.title)) {
      triggerToast('Song already in playlist!')
      return
    }

    const updatedSongs = [...playlist.songs, song]
    const updatedPlaylist = { ...playlist, songs: updatedSongs }

    // Update local state immediately
    const updatedPlaylists = playlists.map(p => p.id === playlistId ? updatedPlaylist : p)
    setPlaylists(updatedPlaylists)
    localStorage.setItem('playlists', JSON.stringify(updatedPlaylists))
    triggerToast(`Added "${song.title}" to ${playlist.name}!`)

    if (selectedPlaylist && selectedPlaylist.id === playlistId) {
      setSelectedPlaylist(updatedPlaylist)
    }

    try {
      // Try to sync with Firebase
      await updateDoc(doc(db, 'playlists', playlistId), { songs: updatedSongs })
    } catch (error) {
      console.error("Error updating playlist in cloud: ", error)
    }
  }

  const removeSongFromPlaylist = async (playlistId, songId) => {
    const playlist = playlists.find(p => p.id === playlistId)
    if (!playlist) return

    const updatedSongs = playlist.songs.filter(s => s.id !== songId)
    const updatedPlaylist = { ...playlist, songs: updatedSongs }

    // Update local state immediately
    const updatedPlaylists = playlists.map(p => p.id === playlistId ? updatedPlaylist : p)
    setPlaylists(updatedPlaylists)
    localStorage.setItem('playlists', JSON.stringify(updatedPlaylists))
    triggerToast('Song removed from playlist.')

    if (selectedPlaylist && selectedPlaylist.id === playlistId) {
      setSelectedPlaylist(updatedPlaylist)
    }

    try {
      // Try to sync with Firebase
      await updateDoc(doc(db, 'playlists', playlistId), { songs: updatedSongs })
    } catch (error) {
      console.error("Error removing song from cloud: ", error)
    }
  }

  const handlePlaylistSearch = async (e, query = playlistSearchQuery) => {
    if (e) e.preventDefault()
    if (!query.trim()) {
      setPlaylistSearchResults([])
      return
    }
    setIsSearchingPlaylistSongs(true)
    const results = await searchSongs(query)
    setPlaylistSearchResults(results)
    setIsSearchingPlaylistSongs(false)
  }

  // Search action
  const handleSearch = async (e) => {
    if (e) e.preventDefault()
    if (!searchQuery.trim()) return

    setIsSearching(true)
    const songs = await searchSongs(searchQuery, 100)

    // Always show community playlists, optionally bringing matched ones to the front
    const matchedPlaylists = playlists.filter(p =>
      p.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const unmatchedPlaylists = playlists.filter(p =>
      !p.name?.toLowerCase().includes(searchQuery.toLowerCase()) && !p.hidden
    );

    const communityPlaylists = [...matchedPlaylists, ...unmatchedPlaylists].map(p => ({
      ...p,
      title: p.name,
      songCount: p.songs?.length || 0
    }))

    setSearchResults(songs)
    setSearchPlaylistsResults(communityPlaylists)
    setIsSearching(false)
  }

  // Load JioSaavn playlist details or Community Playlist
  const handlePlaylistCardClick = async (playlistId) => {
    // Check if it's a community playlist first
    const communityPlaylist = playlists.find(p => p.id === playlistId);
    if (communityPlaylist) {
      setSelectedSaavnPlaylist({
        id: communityPlaylist.id,
        title: communityPlaylist.name,
        img: communityPlaylist.img,
        description: `Created by @${communityPlaylist.creator}`,
        songs: communityPlaylist.songs || [],
        isCommunity: true,
        isHidden: communityPlaylist.hidden
      });
      return;
    }

    setIsLoadingSaavnPlaylist(true)
    try {
      const details = await getPlaylistDetails(playlistId)
      if (details) {
        setSelectedSaavnPlaylist(details)
      } else {
        triggerToast('Failed to load playlist details.')
      }
    } catch (error) {
      console.error(error)
      triggerToast('Error loading playlist details.')
    } finally {
      setIsLoadingSaavnPlaylist(false)
    }
  }

  // Format progress slider value
  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const mins = Math.floor(time / 60)
    const secs = Math.floor(time % 60)
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  // Format negative/remaining time
  const formatTimeRemaining = (time, duration) => {
    if (isNaN(time) || isNaN(duration)) return '-0:00';
    const remaining = duration - time;
    const mins = Math.floor(remaining / 60)
    const secs = Math.floor(remaining % 60)
    return `-${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  // Handle progress slider change
  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  // Queue and Navigation Helpers
  const getCurrentTracklist = () => {
    return activePlaybackQueue
  }

  const getUpcomingSongs = () => {
    if (!currentTrack || currentTrackIndex === -1) return []
    const currentList = getCurrentTracklist()

    const upcoming = []
    for (let i = 1; i <= 5; i++) {
      const nextIndex = currentTrackIndex + i
      if (nextIndex < currentList.length) {
        upcoming.push(currentList[nextIndex])
      }
    }
    return upcoming
  }

  const playNextSong = () => {
    const list = getCurrentTracklist()
    if (list.length === 0) return

    let nextIndex = currentTrackIndex + 1
    if (nextIndex >= list.length || nextIndex === -1) {
      nextIndex = 0 // loop back
    }
    playSong(list[nextIndex], nextIndex, list)
  }

  const playPreviousSong = () => {
    const list = getCurrentTracklist()
    if (list.length === 0) return

    let prevIndex = currentTrackIndex - 1
    if (prevIndex < 0 || prevIndex >= list.length) {
      prevIndex = list.length - 1 // loop back
    }
    playSong(list[prevIndex], prevIndex, list)
  }

  const shuffleQueue = (queue) => {
    if (!queue || queue.length === 0) return
    const shuffled = [...queue]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    playSong(shuffled[0], 0, shuffled)
    triggerToast('Shuffling tracks!')
  }

  // Mini Player Widget implementation
  const toggleMiniPlayer = async () => {
    if (!('documentPictureInPicture' in window)) {
      triggerToast('Widget is not supported in this browser. Try Chrome or Edge.');
      return;
    }

    if (pipWindow) {
      pipWindow.close();
      return;
    }

    try {
      const pipWin = await window.documentPictureInPicture.requestWindow({
        width: 340,
        height: 220,
      });

      // Copy styles
      [...document.styleSheets].forEach((styleSheet) => {
        try {
          const cssRules = [...styleSheet.cssRules].map((rule) => rule.cssText).join('');
          const style = document.createElement('style');
          style.textContent = cssRules;
          pipWin.document.head.appendChild(style);
        } catch (e) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = styleSheet.href;
          pipWin.document.head.appendChild(link);
        }
      });

      pipWin.addEventListener('pagehide', () => {
        setPipWindow(null);
      });

      setPipWindow(pipWin);
    } catch (e) {
      console.error(e);
      triggerToast('Failed to open Widget');
    }
  };

  const getLikedSongsList = () => {
    const list = []
    const seen = new Set()

    defaultSongs.forEach(song => {
      if (likedSongs.includes(song.title) && !seen.has(song.title)) {
        seen.add(song.title)
        list.push(song)
      }
    })

    listeningActivity.forEach(song => {
      if (likedSongs.includes(song.title) && !seen.has(song.title)) {
        seen.add(song.title)
        list.push(song)
      }
    })

    return list
  }

  // Filter songs for the selected artist
  const getArtistSongs = () => {
    if (!selectedArtist) return []
    return defaultSongs.filter(song =>
      song.artist?.toLowerCase().includes(selectedArtist.name.toLowerCase())
    )
  }

  // Get suggested songs combined with listening activity
  const getSuggestedSongs = () => {
    if (listeningActivity.length === 0) {
      return defaultSongs.slice(0, 15);
    }
    const combined = [...listeningActivity];
    defaultSongs.forEach(song => {
      if (!combined.some(s => s.title === song.title) && combined.length < 15) {
        combined.push(song);
      }
    });
    return combined;
  };

  // Fallback image helper
  const getSongImage = (song) => {
    if (song.img && !song.img.startsWith('images/')) {
      return song.img;
    }
    return `https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=200&auto=format&fit=crop`;
  };

  return (
    <div className="app-container">
      {/* Invisible HTML5 Audio Tag */}
      <audio
        ref={audioRef}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={onAudioEnded}
        playsInline
        preload="auto"
      />

      {/* Global Toast Notification */}
      <div className={`toast ${showToast ? 'show' : ''}`}>
        {toastMessage}
      </div>

      {/* A. DESKTOP LEFT SIDEBAR (Desktop only) */}
      <div className="desktop-sidebar">
        <div className="desktop-logo-container">
          <Radio size={28} className="logo-icon" color="var(--card-orange)" />
          <span className="desktop-logo-text"></span>
        </div>

        <div className="sidebar-menu">
          <button
            className="sidebar-menu-btn focusable"
            tabIndex={0}
            onClick={() => setActiveTab('home')}
          >
            <Home size={18} />
            <span>Home</span>
          </button>
          <button
            className="sidebar-menu-btn focusable"
            tabIndex={0}
            onClick={() => setActiveTab('search')}
          >
            <Search size={18} />
            <span>Search</span>
          </button>
          <button
            className="sidebar-menu-btn focusable"
            tabIndex={0}
            onClick={() => setActiveTab('create')}
          >
            <PlusSquare size={18} />
            <span>Playlists</span>
          </button>
          <button
            className="sidebar-menu-btn focusable"
            tabIndex={0}
            onClick={() => setActiveTab('library')}
          >
            <BarChart2 size={18} />
            <span>Vibe Stats</span>
          </button>

          <button
            className="sidebar-menu-btn theme-toggle-menu-btn focusable"
            tabIndex={0}
            onClick={() => setIsDarkMode(!isDarkMode)}
            style={{ marginTop: 'auto' }}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
      </div>

      {/* Remote navigation handler */}
      {useEffect(() => {
        const handleKey = (e) => {
          const focusables = Array.from(document.querySelectorAll('.focusable'));
          const active = document.activeElement;
          const index = focusables.indexOf(active);
          if (e.key === 'ArrowDown') {
            const next = focusables[(index + 1) % focusables.length];
            next?.focus();
            e.preventDefault();
          } else if (e.key === 'ArrowUp') {
            const prev = focusables[(index - 1 + focusables.length) % focusables.length];
            prev?.focus();
            e.preventDefault();
          } else if (e.key === 'Enter' && active?.click) {
            active.click();
          }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
      }, [])}

      {/* B. MAIN SCROLL PANEL */}
      <div className="main-content-scroll hide-scrollbar">
        {/* Render Header on Home view */}
        {activeTab === 'home' && !selectedArtist && <Header
          onAction={triggerToast}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          openProfile={() => setIsAccountSettingsOpen(true)}
          openDownload={() => setIsDownloadOpen(true)}
        />}

        {/* 1. HOME TAB */}
        {activeTab === 'home' && (
          selectedArtist ? (
            /* Artist Detail Sheet View */
            <div className="artist-detail-view">
              <div className="artist-detail-banner" style={{ backgroundImage: `url(${selectedArtist.img})` }}>
                <div className="artist-banner-overlay"></div>
                <button className="artist-back-btn focusable" tabIndex={0} onClick={() => setSelectedArtist(null)}>
                  <ArrowLeft size={22} color="white" />
                </button>
                <button className="artist-search-btn focusable" tabIndex={0} onClick={() => setActiveTab('search')}>
                  <Search size={22} color="white" />
                </button>
                <h1 className="artist-banner-name">{selectedArtist.name}</h1>
              </div>

              <div className="artist-songs-sheet">
                <div className="drag-handle-bar"></div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div>
                    <h3 className="artist-sheet-title" style={{ margin: 0 }}>Songs</h3>
                    {artistSongs.length > 0 && (
                      <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '500' }}>{artistSongs.length} tracks</span>
                    )}
                  </div>
                  {artistSongs.length > 0 && (
                    <button
                      onClick={() => shuffleQueue(artistSongs)}
                      className="focusable"
                      tabIndex={0}
                      style={{
                        background: 'linear-gradient(135deg, var(--card-orange) 0%, #ff6b9d 100%)',
                        border: 'none',
                        color: 'white',
                        padding: '9px 18px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        boxShadow: '0 4px 14px rgba(245, 149, 74, 0.4)',
                        letterSpacing: '0.3px'
                      }}
                    >
                      ▶ Shuffle Play
                    </button>
                  )}
                </div>

                <div className="artist-songs-list hide-scrollbar">
                  {isLoadingArtistSongs ? (
                    <div className="artist-loading-state">
                      <div className="artist-loading-bars">
                        <span></span><span></span><span></span><span></span><span></span>
                      </div>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '12px' }}>Loading songs...</p>
                    </div>
                  ) : artistSongs.length === 0 ? (
                    <div className="artist-loading-state">
                      <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>No songs found for this artist.</p>
                    </div>
                  ) : (
                    artistSongs.map((song, index) => {
                      const isActive = currentTrack?.title === song.title;
                      return (
                        <div
                          key={song.id || index}
                          className={`artist-song-row focusable ${isActive ? 'active-row' : ''}`}
                          tabIndex={0}
                          onClick={() => playSong(song, index, artistSongs)}
                        >
                          <div className="row-index">
                            {isActive && isPlaying ? (
                              <div className="row-playing-bars">
                                <span></span><span></span><span></span>
                              </div>
                            ) : (
                              <span className="row-index-num">{index + 1}</span>
                            )}
                          </div>
                          <img
                            src={song.img || getSongImage(song)}
                            alt={song.title}
                            className="row-song-img"
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=200&auto=format&fit=crop';
                            }}
                          />
                          <div className="row-song-details">
                            <div className="row-song-title" style={{ color: isActive ? 'var(--card-orange)' : 'var(--text-color)' }}>{song.title}</div>
                            <div className="row-song-artist">{song.artist || selectedArtist.name}</div>
                          </div>
                          <button className="row-like-btn focusable" tabIndex={0} onClick={(e) => toggleLike(song.title, e)}>
                            <Heart
                              size={16}
                              fill={likedSongs.includes(song.title) ? "#f3b1b1" : "none"}
                              stroke={likedSongs.includes(song.title) ? "#f3b1b1" : "#b0b0b0"}
                            />
                          </button>
                          <span className="row-duration">{song.duration ? formatTime(song.duration) : ''}</span>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          ) : isMelophileOpen ? (
            /* Playlist Detail View */
            <div className="playlist-container">
              <div className="playlist-header">
                <button className="playlist-back-btn focusable" tabIndex={0} onClick={() => setIsMelophileOpen(false)}>
                  <ArrowLeft size={22} />
                </button>
                <h3 className="playlist-header-title">Hello Melophile</h3>
              </div>

              <div className="playlist-banner">
                <div className="playlist-banner-overlay"></div>
                <div className="playlist-banner-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%', position: 'relative', zIndex: 1 }}>
                  <div>
                    <span className="playlist-badge">PLAYLIST MIX</span>
                    <h2 className="playlist-banner-title">Melophile's Vibe</h2>
                    <p className="playlist-banner-desc">Curated Tamil melodies and popular hits to explore.</p>
                  </div>
                  <button
                    onClick={() => shuffleQueue(defaultSongs.slice(0, 50))}
                    className="focusable"
                    tabIndex={0}
                    style={{
                      background: 'white',
                      border: 'none',
                      color: 'black',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                    }}
                  >
                    Shuffle Play
                  </button>
                </div>
              </div>

              <div className="playlist-tracklist-header">
                <span># TITLE & ARTIST</span>
                <span>ALBUM</span>
              </div>

              <div className="playlist-songs-list hide-scrollbar">
                {defaultSongs.slice(0, 50).map((song, idx) => (
                  <div
                    key={song.id || idx}
                    className={`playlist-song-item focusable ${currentTrack?.title === song.title ? 'active-track' : ''}`}
                    tabIndex={0}
                    onClick={() => playSong(song, idx, defaultSongs.slice(0, 50))}
                  >
                    <span className="playlist-song-idx">
                      {currentTrack?.title === song.title && isPlaying ? "▶" : idx + 1}
                    </span>
                    <div className="playlist-song-info">
                      <div className="playlist-song-title">{song.title}</div>
                      <div className="playlist-song-artist">{song.artist}</div>
                    </div>
                    <div className="playlist-song-album">{song.movie || 'Single'}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Standard home widgets */
            <>
              <HeroCard onAction={() => setIsMelophileOpen(true)} />
              <VibesList onAction={(msg) => {
                triggerToast(msg)
                playSong({ query: 'lofi hindi mix', title: 'Crossover Vibes', artist: 'Lo-Fi Mix' })
              }} />

              <SuggestedSongsList
                songs={getSuggestedSongs()}
                onSongPlay={playSong}
                currentTrack={currentTrack}
                isPlaying={isPlaying}
                hasActivity={listeningActivity.length > 0}
              />

              <GenresList onAction={(genreName) => {
                triggerToast(`Exploring ${genreName}...`)
                playSong({ query: `${genreName} songs`, title: `${genreName} Mix`, artist: 'Genre Station' })
              }} />

              <MagicShuffle onAction={(msg) => {
                triggerToast(msg)
                const randomSong = defaultSongs[Math.floor(Math.random() * defaultSongs.length)]
                playSong(randomSong)
              }} />
            </>
          )
        )}

        {/* 2. SEARCH TAB */}
        {activeTab === 'search' && (
          selectedSaavnPlaylist ? (
            /* JioSaavn Playlist Detail View */
            <div className="playlist-container">
              <div className="playlist-header">
                <button className="playlist-back-btn focusable" tabIndex={0} onClick={() => setSelectedSaavnPlaylist(null)}>
                  <ArrowLeft size={22} />
                </button>
                <h3 className="playlist-header-title">Playlist</h3>
              </div>

              <div className="playlist-banner" style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.85)), url(${selectedSaavnPlaylist.img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '30px 20px',
                borderRadius: '16px',
                marginBottom: '20px',
                color: 'white'
              }}>
                <div className="playlist-banner-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%' }}>
                  <div>
                    <span className="playlist-badge">{selectedSaavnPlaylist.isCommunity ? 'COMMUNITY MIX' : 'SAAVN MIX'}</span>
                    <h2 className="playlist-banner-title">{selectedSaavnPlaylist.title}</h2>
                    <p className="playlist-banner-desc" style={{ opacity: 0.9 }}>{selectedSaavnPlaylist.description || `${selectedSaavnPlaylist.songs.length} tracks`}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {selectedSaavnPlaylist.isHidden && (
                      <button
                        onClick={() => {
                          const newPl = {
                            id: Date.now().toString(),
                            name: selectedSaavnPlaylist.title,
                            img: selectedSaavnPlaylist.img,
                            songs: selectedSaavnPlaylist.songs,
                            creator: localStorage.getItem('username') || 'Anonymous',
                            createdAt: Date.now()
                          };
                          const updatedPlaylists = [...playlists, newPl];
                          setPlaylists(updatedPlaylists);
                          localStorage.setItem('playlists', JSON.stringify(updatedPlaylists));
                          triggerToast(`Added "${newPl.name}" to your playlists!`);
                        }}
                        className="focusable"
                        tabIndex={0}
                        style={{
                          background: 'rgba(255,255,255,0.2)',
                          border: '1px solid white',
                          color: 'white',
                          padding: '8px 16px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '600',
                          cursor: 'pointer',
                        }}
                      >
                        + Add to Playlists
                      </button>
                    )}
                    {selectedSaavnPlaylist.songs.length > 0 && (
                      <button
                        onClick={() => shuffleQueue(selectedSaavnPlaylist.songs)}
                        className="focusable"
                        tabIndex={0}
                        style={{
                          background: 'white',
                          border: 'none',
                          color: 'black',
                          padding: '8px 16px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                        }}
                      >
                        Shuffle Play
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="playlist-tracklist-header" style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '11px', fontWeight: '700', borderBottom: '1px solid var(--border-color)', marginBottom: '10px', padding: '10px 15px' }}>
                <span># TITLE & ARTIST</span>
                <span>ALBUM</span>
              </div>

              <div className="playlist-songs-list hide-scrollbar">
                {selectedSaavnPlaylist.songs.length === 0 ? (
                  <div className="no-songs-placeholder" style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '14px' }}>
                    No songs available in this playlist.
                  </div>
                ) : (
                  selectedSaavnPlaylist.songs.map((song, idx) => {
                    const isActive = currentTrack?.id === song.id;
                    return (
                      <div
                        key={song.id || idx}
                        className={`playlist-song-item focusable ${isActive ? 'active-track' : ''}`}
                        tabIndex={0}
                        onClick={() => playSong(song, idx, selectedSaavnPlaylist.songs)}
                      >
                        <span className="playlist-song-idx">
                          {isActive && isPlaying ? "▶" : idx + 1}
                        </span>
                        <div className="playlist-song-info">
                          <div className="playlist-song-title">{song.title}</div>
                          <div className="playlist-song-artist">{song.artist}</div>
                        </div>
                        <div className="playlist-song-album">{song.album || 'Single'}</div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          ) : (
            <div className="search-screen">
              <div className="search-header-container">
                <h2 className="search-title">Search</h2>
                <div className="search-profile-avatar"></div>
              </div>
              <form onSubmit={handleSearch} className="search-form">
                <div className="search-input-wrapper">
                  <Search size={20} className="search-box-icon" />
                  <input
                    type="text"
                    placeholder="What do you want to listen to?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input-redesign focusable"
                    tabIndex={0}
                  />
                </div>
              </form>

              {isSearching && (
                <div className="loading-spinner">Searching library...</div>
              )}

              {isLoadingSaavnPlaylist && (
                <div className="loading-spinner">Loading playlist...</div>
              )}

              {!isSearching && !isLoadingSaavnPlaylist && (
                <div className="search-results-list hide-scrollbar">
                  {searchQuery.trim() === '' && searchResults.length === 0 ? (
                    <div className="search-placeholder-center">
                      <div className="search-big-icon-circle">
                        <Search size={64} strokeWidth={1} color="#a0a0a0" />
                      </div>
                      <p className="search-placeholder-text">Search for songs or playlists</p>
                    </div>
                  ) : (
                    <>
                      {/* Playlists Search Results Section */}
                      {searchPlaylistsResults.length > 0 && (
                        <div className="search-playlists-section" style={{ marginBottom: '24px' }}>
                          <h3 className="section-title" style={{ margin: '0 0 var(--spacing-sm) 0', fontSize: '18px', color: 'var(--text-color)' }}>
                            Playlists
                          </h3>
                          <div className="search-playlists-horizontal hide-scrollbar" style={{
                            display: 'flex',
                            gap: '16px',
                            overflowX: 'auto',
                            paddingBottom: '8px',
                            scrollBehavior: 'smooth'
                          }}>
                            {searchPlaylistsResults.map((playlist) => (
                              <div
                                key={playlist.id}
                                className="search-playlist-card focusable"
                                tabIndex={0}
                                onClick={() => handlePlaylistCardClick(playlist.id)}
                                style={{
                                  flex: '0 0 130px',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  gap: '8px'
                                }}
                              >
                                <div style={{ position: 'relative', width: '130px', height: '130px', borderRadius: '12px', overflow: 'hidden' }}>
                                  <img
                                    src={playlist.img}
                                    alt={playlist.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    onError={(e) => {
                                      e.target.src = 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=200&auto=format&fit=crop';
                                    }}
                                  />
                                  <div style={{
                                    position: 'absolute',
                                    bottom: '0',
                                    left: '0',
                                    right: '0',
                                    background: 'linear-gradient(transparent, rgba(0,0,0,0.6))',
                                    padding: '6px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                  }}>
                                    <span style={{ fontSize: '9px', color: 'white', fontWeight: '750', backgroundColor: 'rgba(0,0,0,0.5)', padding: '2px 6px', borderRadius: '4px' }}>
                                      {playlist.songCount} songs
                                    </span>
                                  </div>
                                </div>
                                <div style={{
                                  fontSize: '13px',
                                  fontWeight: '700',
                                  color: 'var(--text-color)',
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  padding: '0 2px'
                                }}>
                                  {playlist.title}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Derived Artists Section */}
                      {(() => {
                        const uniqueArtists = Array.from(new Set(searchResults.map(s => s.artist.split(',')[0].trim()).filter(Boolean))).slice(0, 6);
                        if (uniqueArtists.length > 0 && searchQuery.trim() !== '') {
                          return (
                            <div className="search-playlists-section" style={{ marginBottom: '24px' }}>
                              <h3 className="section-title" style={{ margin: '0 0 var(--spacing-sm) 0', fontSize: '18px', color: 'var(--text-color)' }}>
                                Artists
                              </h3>
                              <div className="search-playlists-horizontal hide-scrollbar" style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '8px' }}>
                                {uniqueArtists.map((artistName, idx) => {
                                  const artistSong = searchResults.find(s => s.artist.includes(artistName));
                                  return (
                                    <div key={idx} onClick={() => setSearchQuery(artistName)} className="search-playlist-card focusable" style={{ flex: '0 0 100px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
                                      <div style={{ width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--card-border, #333)' }}>
                                        <img src={artistSong?.img} alt={artistName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                      </div>
                                      <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-color)', textAlign: 'center', width: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {artistName}
                                      </div>
                                    </div>
                                  )
                                })}
                              </div>
                            </div>
                          )
                        }
                        return null;
                      })()}

                      {/* Derived Movies Section */}
                      {(() => {
                        const uniqueAlbums = Array.from(new Set(searchResults.map(s => s.album).filter(Boolean))).slice(0, 6);
                        if (uniqueAlbums.length > 0 && searchQuery.trim() !== '') {
                          return (
                            <div className="search-playlists-section" style={{ marginBottom: '24px' }}>
                              <h3 className="section-title" style={{ margin: '0 0 var(--spacing-sm) 0', fontSize: '18px', color: 'var(--text-color)' }}>
                                Movies & Albums
                              </h3>
                              <div className="search-playlists-horizontal hide-scrollbar" style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '8px' }}>
                                {uniqueAlbums.map((albumName, idx) => {
                                  const albumSong = searchResults.find(s => s.album === albumName);
                                  return (
                                    <div key={idx} onClick={() => setSearchQuery(albumName)} className="search-playlist-card focusable" style={{ flex: '0 0 130px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                      <div style={{ width: '130px', height: '130px', borderRadius: '12px', overflow: 'hidden' }}>
                                        <img src={albumSong?.img} alt={albumName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                      </div>
                                      <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-color)', width: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {albumName}
                                      </div>
                                    </div>
                                  )
                                })}
                              </div>
                            </div>
                          )
                        }
                        return null;
                      })()}

                      {/* Songs Search Results Section */}
                      <h3 className="section-title" style={{ margin: '0 0 var(--spacing-sm) 0', fontSize: '18px', color: 'var(--text-color)' }}>
                        {searchQuery.trim() === '' ? 'Trending Tamil Songs' : 'Songs'}
                      </h3>
                      {searchResults.map((song, index) => (
                        <div
                          key={song.id || index}
                          className={`search-result-item focusable ${currentTrack?.id === song.id ? 'active-track' : ''}`}
                          tabIndex={0}
                          onClick={() => playSong(song, index, searchResults)}
                        >
                          <img src={song.img} alt={song.title} className="search-result-img" />
                          <div className="search-result-info">
                            <div className="search-result-title">{song.title}</div>
                            <div className="search-result-artist">{song.artist}</div>
                          </div>
                          <div className="search-play-icon">
                            {currentTrack?.id === song.id && isPlaying ? (
                              <Pause size={18} fill="currentColor" />
                            ) : (
                              <Play size={18} fill="currentColor" />
                            )}
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              )}
            </div>
          )
        )}

        {/* 3. PLAYLISTS/CREATE TAB */}
        {activeTab === 'create' && (
          isLikedSongsOpen ? (
            /* Liked Songs Container View */
            <div className="playlist-container">
              <div className="playlist-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <button className="playlist-back-btn focusable" tabIndex={0} onClick={() => setIsLikedSongsOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-color)', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <ArrowLeft size={22} />
                </button>
                <h3 className="playlist-header-title" style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text-color)', margin: 0 }}>Liked Songs</h3>
                <div style={{ width: '40px' }}></div> {/* Spacer to center title */}
              </div>

              <div className="playlist-banner" style={{ background: 'linear-gradient(135deg, #f7d2d2 0%, #ebb4b4 100%)', padding: '30px 20px', borderRadius: '16px', margin: '20px 0', position: 'relative', overflow: 'hidden' }}>
                <div className="playlist-banner-overlay" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.1)' }}></div>
                <div className="playlist-banner-content" style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%' }}>
                  <div>
                    <span className="playlist-badge" style={{ background: 'rgba(255,255,255,0.3)', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold', letterSpacing: '1px' }}>COLLECTION</span>
                    <h2 className="playlist-banner-title" style={{ fontSize: '28px', color: 'white', margin: '10px 0 5px 0' }}>Your Favorites</h2>
                    <p className="playlist-banner-desc" style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px', margin: 0 }}>{likedSongs.length} liked tracks</p>
                  </div>
                  {getLikedSongsList().length > 0 && (
                    <button
                      onClick={() => shuffleQueue(getLikedSongsList())}
                      className="focusable"
                      tabIndex={0}
                      style={{
                        background: 'white',
                        border: 'none',
                        color: '#ebb4b4',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                      }}
                    >
                      Shuffle Play
                    </button>
                  )}
                </div>
              </div>

              <div className="playlist-tracklist-header" style={{ display: 'grid', gridTemplateColumns: '1fr auto', padding: '10px 15px', color: 'var(--text-secondary)', fontSize: '11px', fontWeight: '700', borderBottom: '1px solid #eef0f3', marginBottom: '10px' }}>
                <span>TITLE & ARTIST</span>
                <span>ACTION</span>
              </div>

              <div className="playlist-songs-list hide-scrollbar" style={{ overflowY: 'auto' }}>
                {getLikedSongsList().length === 0 ? (
                  <div className="no-songs-placeholder" style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '14px' }}>
                    No liked songs yet. Like some tracks to see them here!
                  </div>
                ) : (
                  getLikedSongsList().map((song, idx) => (
                    <div
                      key={song.id || idx}
                      className={`playlist-song-item focusable ${currentTrack?.title === song.title ? 'active-track' : ''}`}
                      tabIndex={0}
                      onClick={() => playSong(song, idx, getLikedSongsList())}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 15px', borderRadius: '8px', cursor: 'pointer', marginBottom: '8px' }}
                    >
                      <div className="playlist-song-info" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span className="playlist-song-idx" style={{ color: 'var(--text-secondary)', width: '20px' }}>
                          {currentTrack?.title === song.title && isPlaying ? "▶" : idx + 1}
                        </span>
                        <div>
                          <div className="playlist-song-title" style={{ fontWeight: '500', fontSize: '14px' }}>{song.title}</div>
                          <div className="playlist-song-artist" style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>{song.artist}</div>
                        </div>
                      </div>
                      <button
                        className="remove-song-btn focusable"
                        tabIndex={0}
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleLike(song.title, e)
                        }}
                        style={{ background: 'none', border: 'none', color: '#ff6b6b', cursor: 'pointer', padding: '5px', fontSize: '12px' }}
                      >
                        Unlike
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : selectedPlaylist ? (
            /* Custom Playlist Detail View */
            <div className="playlist-container">
              <div className="playlist-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <button className="playlist-back-btn focusable" tabIndex={0} onClick={() => {
                  setSelectedPlaylist(null)
                  setPlaylistSearchQuery('')
                  setPlaylistSearchResults([])
                }} style={{ background: 'none', border: 'none', color: 'white', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <ArrowLeft size={22} />
                </button>
                <h3 className="playlist-header-title" style={{ fontSize: '18px', fontWeight: '600', color: 'white', margin: 0 }}>{selectedPlaylist.name}</h3>
                <button
                  className="playlist-delete-btn focusable"
                  tabIndex={0}
                  onClick={() => handleDeletePlaylist(selectedPlaylist.id)}
                  style={{ background: 'none', border: 'none', color: '#ff6b6b', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}
                >
                  Delete Playlist
                </button>
              </div>

              <div className="playlist-banner" style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '24px',
                alignItems: 'flex-end',
                padding: '20px 0',
                margin: '20px 0',
              }}>
                {selectedPlaylist.img ? (
                  <img
                    src={selectedPlaylist.img}
                    alt={selectedPlaylist.name}
                    style={{
                      width: '180px',
                      height: '180px',
                      objectFit: 'cover',
                      borderRadius: '12px',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
                    }}
                  />
                ) : (
                  <div style={{
                    width: '180px',
                    height: '180px',
                    background: 'linear-gradient(135deg, var(--card-orange), var(--neon-cyan))',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
                  }}>
                    <ListMusic size={64} color="white" />
                  </div>
                )}

                <div className="playlist-banner-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flex: '1 1 200px' }}>
                  <span className="playlist-badge" style={{ marginBottom: '8px', fontSize: '12px', fontWeight: '700', letterSpacing: '1px', color: 'var(--text-secondary)' }}>COMMUNITY PLAYLIST</span>
                  <h2 className="playlist-banner-title" style={{ fontSize: '32px', fontWeight: '800', color: 'var(--text-color)', margin: '0 0 8px 0', lineHeight: '1.2' }}>{selectedPlaylist.name}</h2>
                  <p className="playlist-banner-desc" style={{ color: 'var(--text-secondary)', margin: '0 0 20px 0', fontSize: '14px' }}>{selectedPlaylist.songs.length} songs • Created by @{selectedPlaylist.creator || 'Anonymous'}</p>

                  {selectedPlaylist.songs.length > 0 && (
                    <button
                      onClick={() => shuffleQueue(selectedPlaylist.songs)}
                      className="focusable"
                      tabIndex={0}
                      style={{
                        background: 'var(--card-orange)',
                        border: 'none',
                        color: 'white',
                        padding: '10px 24px',
                        borderRadius: '24px',
                        fontSize: '13px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        boxShadow: '0 4px 14px rgba(245, 149, 74, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <Play size={16} fill="white" />
                      Shuffle Play
                    </button>
                  )}
                </div>
              </div>

              <div className="playlist-tracklist-header" style={{ display: 'grid', gridTemplateColumns: '1fr auto', padding: '10px 15px', color: 'var(--text-secondary)', fontSize: '11px', fontWeight: '700', borderBottom: '1px solid var(--border-color)', marginBottom: '10px' }}>
                <span>TITLE & ARTIST</span>
                <span>ACTION</span>
              </div>

              <div className="playlist-songs-list hide-scrollbar" style={{ overflowY: 'auto' }}>
                {selectedPlaylist.songs.length === 0 ? (
                  <div className="no-songs-placeholder" style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '14px' }}>
                    No songs in this playlist yet. Add songs below!
                  </div>
                ) : (
                  selectedPlaylist.songs.map((song, idx) => (
                    <div
                      key={song.id || idx}
                      className={`playlist-song-item focusable ${currentTrack?.title === song.title ? 'active-track' : ''}`}
                      tabIndex={0}
                      onClick={() => playSong(song, idx, selectedPlaylist.songs)}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 15px', borderRadius: '8px', cursor: 'pointer', marginBottom: '8px' }}
                    >
                      <div className="playlist-song-info" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span className="playlist-song-idx" style={{ color: 'var(--text-secondary)', width: '20px' }}>
                          {currentTrack?.title === song.title && isPlaying ? "▶" : idx + 1}
                        </span>
                        <div>
                          <div className="playlist-song-title">{song.title}</div>
                          <div className="playlist-song-artist">{song.artist}</div>
                        </div>
                      </div>
                      <button
                        className="remove-song-btn focusable"
                        tabIndex={0}
                        onClick={(e) => {
                          e.stopPropagation()
                          removeSongFromPlaylist(selectedPlaylist.id, song.id)
                        }}
                        style={{ background: 'none', border: 'none', color: '#ff6b6b', cursor: 'pointer', padding: '5px', fontSize: '12px' }}
                      >
                        Remove
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Add Songs Section */}
              <div className="playlist-add-songs-section">
                <h3 className="section-title">Add Songs</h3>
                <form onSubmit={handlePlaylistSearch} className="search-form" style={{ marginBottom: '15px' }}>
                  <div className="search-input-wrapper">
                    <Search size={18} className="search-box-icon" />
                    <input
                      type="text"
                      placeholder="Search for songs to add..."
                      value={playlistSearchQuery}
                      onChange={(e) => setPlaylistSearchQuery(e.target.value)}
                      onKeyUp={(e) => handlePlaylistSearch(e, e.target.value)}
                      className="search-input-redesign focusable"
                      tabIndex={0}
                    />
                  </div>
                </form>

                {isSearchingPlaylistSongs && (
                  <div className="loading-spinner" style={{ color: 'var(--text-secondary)', fontSize: '14px', textAlign: 'center', padding: '20px' }}>Searching library...</div>
                )}

                <div className="playlist-search-results hide-scrollbar" style={{ maxHeight: '250px', overflowY: 'auto' }}>
                  {playlistSearchResults.map((song) => {
                    const isAdded = selectedPlaylist.songs.some(s => s.id === song.id || s.title === song.title)
                    return (
                      <div key={song.id} className="search-result-item focusable" tabIndex={0} style={{ display: 'flex', alignItems: 'center', padding: '8px 10px', borderRadius: '8px', marginBottom: '8px', background: 'var(--card-bg)' }}>
                        <img src={song.img} alt={song.title} className="search-result-img" style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover' }} />
                        <div className="search-result-info" style={{ flex: 1, marginLeft: '10px', overflow: 'hidden' }}>
                          <div className="search-result-title" style={{ fontSize: '14px', color: 'var(--text-color)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{song.title}</div>
                          <div className="search-result-artist" style={{ fontSize: '12px', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{song.artist}</div>
                        </div>
                        <button
                          onClick={() => {
                            if (!isAdded) {
                              addSongToPlaylist(selectedPlaylist.id, song)
                            }
                          }}
                          className="focusable"
                          tabIndex={0}
                          style={{
                            background: isAdded ? 'transparent' : 'var(--card-orange)',
                            border: isAdded ? '1px solid rgba(0,0,0,0.1)' : 'none',
                            color: isAdded ? 'var(--text-color)' : 'white',
                            padding: '6px 12px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            cursor: isAdded ? 'default' : 'pointer',
                            fontWeight: '500'
                          }}
                        >
                          {isAdded ? 'Added' : 'Add'}
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="playlists-screen">
              <div className="playlists-header-container">
                <div>
                  <h2 className="playlists-title">Your Library</h2>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '2px 0 0 0', fontWeight: '500' }}>Tamil music collection</p>
                </div>
                <div className="playlists-profile-avatar"></div>
              </div>

              {/* Hero Create Button */}
              <button className="create-playlist-btn focusable" tabIndex={0} onClick={() => setShowCreateModal(true)}>
                <span>NEW PLAYLIST</span>
              </button>

              {/* Stats Row */}
              <div className="library-stats-row">
                <div className="library-stat-pill">
                  <span className="lib-stat-val">{playlists.filter(p => !p.hidden).length}</span>
                  <span className="lib-stat-label">Playlists</span>
                </div>
                <div className="library-stat-divider"></div>
                <div className="library-stat-pill">
                  <span className="lib-stat-val">{likedSongs.length}</span>
                  <span className="lib-stat-label">Liked</span>
                </div>
                <div className="library-stat-divider"></div>
                <div className="library-stat-pill">
                  <span className="lib-stat-val">{playlists.filter(p => !p.hidden).reduce((acc, p) => acc + p.songs.length, 0)}</span>
                  <span className="lib-stat-label">Saved Songs</span>
                </div>
              </div>

              <h3 className="collection-title">Your Collection</h3>

              <div className="collection-grid">
                {/* Liked Songs Card */}
                <div className="collection-card collection-card--liked focusable" tabIndex={0} onClick={() => setIsLikedSongsOpen(true)}>
                  <div className="collection-card-art liked-card-gradient">
                    <Heart size={32} fill="white" color="white" />
                    <div className="collection-card-art-shine"></div>
                  </div>
                  <div className="collection-card-info">
                    <div className="collection-card-title">Liked Songs</div>
                    <div className="collection-card-desc">{likedSongs.length} songs</div>
                  </div>
                </div>

                {playlists.filter(p => !p.hidden).map((playlist, pIdx) => {
                  const gradients = [
                    'linear-gradient(135deg, #f5954a 0%, #ff6b9d 100%)',
                    'linear-gradient(135deg, #00e5cc 0%, #007cf0 100%)',
                    'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)',
                    'linear-gradient(135deg, #059669 0%, #0284c7 100%)',
                    'linear-gradient(135deg, #dc2626 0%, #f59e0b 100%)',
                  ];
                  const grad = gradients[pIdx % gradients.length];
                  return (
                    <div key={playlist.id} className="collection-card focusable" tabIndex={0} onClick={() => setSelectedPlaylist(playlist)}>
                      <div className="collection-card-art" style={{ background: playlist.img ? `url("${playlist.img}") center/cover no-repeat` : grad }}>
                        {!playlist.img && <ListMusic size={32} color="white" />}
                        <div className="collection-card-art-shine"></div>
                      </div>
                      <div className="collection-card-info">
                        <div className="collection-card-title">{playlist.name}</div>
                        <div className="collection-card-desc">{playlist.songs.length} songs • by @{playlist.creator || 'Anonymous'}</div>
                      </div>
                      {/* <button
                        className="collection-card-delete-btn focusable"
                        tabIndex={0}
                        onClick={(e) => handleDeletePlaylist(playlist.id, e)}
                        title="Delete playlist"
                      >
                        ×
                      </button> */}
                    </div>
                  );
                })}

                {playlists.filter(p => !p.hidden).length === 0 && (
                  <div className="empty-playlists-msg">
                    <ListMusic size={28} color="var(--text-secondary)" />
                    <p>No playlists yet.<br />Tap "New Playlist" to start.</p>
                  </div>
                )}
              </div>
            </div>
          )
        )}

        {/* 4. VIBE STATS TAB */}
        {activeTab === 'library' && (
          <div className="vibe-stats-screen">
            <div className="stats-header-container">
              <h2 className="stats-title">Vibe Stats</h2>
              <div className="stats-profile-avatar"></div>
            </div>

            <div className="stats-grid">
              <div className="stats-card">
                <Headphones size={22} className="stats-card-icon" />
                <div className="stats-card-label">Total Plays</div>
                <div className="stats-card-val">{playsCount} songs</div>
              </div>

              <div className="stats-card">
                <Sparkles size={22} className="stats-card-icon" />
                <div className="stats-card-label">Vibe Tier</div>
                <div className="stats-card-val">Starter</div>
              </div>
            </div>

            <div className="peak-vibe-banner">
              <span className="lightning-icon">⚡</span>
              <div className="peak-vibe-text">
                <span className="peak-vibe-label">PEAK VIBE DAY</span>
                <span className="peak-vibe-val">
                  {playsCount > 0 ? "Today is your peak day!" : "No tracks played yet"}
                </span>
              </div>
            </div>

            <div className="listener-persona-card">
              <div className="persona-banner-overlay"></div>
              <div className="persona-content">
                <span className="persona-label">Listener Persona</span>
                <h2 className="persona-title">THE EXPLORER</h2>
                <p className="persona-desc">Navigating uncharted sounds and artists.</p>
              </div>
              <div className="persona-graphic">
                <img
                  src="https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=200&auto=format&fit=crop"
                  alt="Astronaut Explorer"
                  className="astronaut-img"
                />
              </div>
            </div>

            <div className="weekly-overview-container">
              <h3 className="weekly-title">Weekly Overview</h3>
              <div className="weekly-chart">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
                  <div key={idx} className="chart-column">
                    <div className="chart-bar-bg">
                      <div
                        className="chart-bar-fill"
                        style={{ height: playsCount > 0 && idx === (new Date().getDay() + 6) % 7 ? '70%' : '15%' }}
                      ></div>
                    </div>
                    <span className="chart-day-label">{day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* C. DESKTOP RIGHT NOW PLAYING PANEL (Desktop only) */}
      <div className="desktop-right-panel">
        <h3 className="d-np-title">NOW PLAYING</h3>
        {currentTrack ? (
          <>
            <div className="d-np-disc-container">
              <div className="d-np-disc">
                <img
                  src={getSongImage(currentTrack)}
                  alt={currentTrack.title}
                  className={`d-np-cover-img ${isPlaying ? 'spinning' : ''}`}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=200&auto=format&fit=crop';
                  }}
                />
              </div>
            </div>
            <div className="d-np-info">
              <h4 className="d-np-song-title">{currentTrack.title}</h4>
              <p className="d-np-song-artist">{currentTrack.artist}</p>
            </div>

            <div className="d-np-queue-header">UP NEXT</div>
            <div className="d-np-queue-list hide-scrollbar">
              {getUpcomingSongs().map((song, idx) => (
                <div key={song.id || idx} className="d-np-queue-item focusable" tabIndex={0} onClick={() => playSong(song)}>
                  <img
                    src={getSongImage(song)}
                    alt={song.title}
                    className="d-np-queue-img"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=100&auto=format&fit=crop';
                    }}
                  />
                  <div className="d-np-queue-info">
                    <div className="d-np-queue-title">{song.title}</div>
                    <div className="d-np-queue-artist">{song.artist}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px 10px', color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>
            No track playing. Select a song to start listening.
          </div>
        )}
      </div>

      {/* D. MOBILE SPECIFIC OVERLAYS */}
      {isNowPlayingOpen && currentTrack && (
        <div className="now-playing-fullscreen">
          <div className="now-playing-header">
            <button className="np-back-btn focusable" tabIndex={0} onClick={() => setIsNowPlayingOpen(false)}>
              <ChevronDown size={28} />
            </button>
            <span className="np-header-title">Now Playing</span>
            <button className="np-like-btn focusable" tabIndex={0} onClick={(e) => toggleLike(currentTrack.title, e)}>
              <Heart
                size={24}
                fill={likedSongs.includes(currentTrack.title) ? "#f3b1b1" : "none"}
                stroke={likedSongs.includes(currentTrack.title) ? "#f3b1b1" : "white"}
              />
            </button>
          </div>

          <div className="np-album-container">
            <div className="np-circular-disc">
              <img
                src={getSongImage(currentTrack)}
                alt={currentTrack.title}
                className={`np-cover-img ${isPlaying ? 'spinning' : ''}`}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=300&auto=format&fit=crop';
                }}
              />
            </div>
          </div>

          <div className="np-song-info">
            <h2 className="np-song-title">{currentTrack.title}</h2>
            <p className="np-song-artist">{currentTrack.artist}</p>
          </div>

          <div className="np-next-up-container">
            <div className="np-next-up-card">
              <div className="next-up-icon">
                <ListMusic size={18} />
              </div>
              <div className="next-up-text">
                <span className="next-up-label">NEXT UP</span>
                <span className="next-up-song">
                  {getUpcomingSongs()[0] ? `${getUpcomingSongs()[0].title} • ${getUpcomingSongs()[0].artist}` : 'No upcoming tracks'}
                </span>
              </div>
              <span className="next-up-swipe">Swipe left to skip &lt;</span>
            </div>
          </div>

          <div className="np-progress-section">
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleProgressChange}
              className="np-slider focusable"
              tabIndex={0}
            />
            <div className="np-time-labels">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTimeRemaining(currentTime, duration)}</span>
            </div>
          </div>

          <div className="np-controls">
            <button className="np-control-sub focusable" tabIndex={0} onClick={() => triggerToast('Added to Playlist')}>
              <Plus size={24} />
            </button>
            <button className="np-control-main focusable" tabIndex={0} onClick={playPreviousSong}>
              <SkipForward size={24} style={{ transform: 'rotate(180deg)' }} />
            </button>
            <button className="np-play-pause-btn focusable" tabIndex={0} onClick={togglePlay}>
              {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" />}
            </button>
            <button className="np-control-main focusable" tabIndex={0} onClick={playNextSong}>
              <SkipForward size={24} />
            </button>
            <button className="np-control-sub focusable" tabIndex={0} onClick={() => triggerToast('Song downloaded offline!')}>
              <Download size={24} />
            </button>
          </div>
        </div>
      )}

      {/* E. MOBILE FLOATING MINI PLAYER */}
      {currentTrack && !isNowPlayingOpen && (
        <div className="mini-player focusable" tabIndex={0} onClick={() => setIsNowPlayingOpen(true)}>
          <div className="mini-player-progress-bar">
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleProgressChange}
              onClick={(e) => e.stopPropagation()}
              className="mini-player-slider focusable"
              tabIndex={0}
            />
          </div>
          <div className="mini-player-body">
            <img
              src={getSongImage(currentTrack)}
              alt={currentTrack.title}
              className="mini-player-img"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=100&auto=format&fit=crop';
              }}
            />
            <div className="mini-player-info">
              <div className="mini-player-title">{currentTrack.title}</div>
              <div className="mini-player-artist">{currentTrack.artist}</div>
            </div>
            <div className="mini-player-controls" onClick={(e) => e.stopPropagation()}>
              <button className="player-control-btn focusable" tabIndex={0} onClick={togglePlay}>
                {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
              </button>
              <button
                className="player-control-btn focusable"
                tabIndex={0}
                onClick={playNextSong}
              >
                <SkipForward size={20} fill="currentColor" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE BOTTOM NAVIGATION */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* F. DESKTOP BOTTOM PLAYER BAR (Desktop only) */}
      {currentTrack && (
        <div className="desktop-player-bar">
          <div className="d-player-left">
            <img
              src={getSongImage(currentTrack)}
              alt={currentTrack.title}
              className="d-player-img"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=100&auto=format&fit=crop';
              }}
            />
            <div className="d-player-info">
              <div className="d-player-title">{currentTrack.title}</div>
              <div className="d-player-artist">{currentTrack.artist}</div>
            </div>
          </div>

          <div className="d-player-center">
            <div className="d-player-controls">
              <button className="d-player-icon-btn focusable" tabIndex={0} onClick={playPreviousSong}>
                <SkipForward size={18} style={{ transform: 'rotate(180deg)' }} />
              </button>
              <button
                className="focusable"
                tabIndex={0}
                style={{ backgroundColor: 'white', color: 'black', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer' }}
                onClick={togglePlay}
              >
                {isPlaying ? <Pause size={18} fill="black" /> : <Play size={18} fill="black" style={{ marginLeft: '2px' }} />}
              </button>
              <button className="d-player-icon-btn focusable" tabIndex={0} onClick={playNextSong}>
                <SkipForward size={18} />
              </button>
            </div>

            <div className="d-player-timeline">
              <span className="d-player-time">{formatTime(currentTime)}</span>
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleProgressChange}
                className="d-player-slider focusable"
                tabIndex={0}
              />
              <span className="d-player-time">{formatTimeRemaining(currentTime, duration)}</span>
            </div>
          </div>

          <div className="d-player-right">
            <button className="d-player-icon-btn focusable" tabIndex={0} onClick={(e) => toggleLike(currentTrack.title, e)}>
              <Heart
                size={18}
                fill={likedSongs.includes(currentTrack.title) ? "#f3b1b1" : "none"}
                stroke={likedSongs.includes(currentTrack.title) ? "#f3b1b1" : "white"}
              />
            </button>
            <button className="d-player-icon-btn focusable" tabIndex={0} onClick={() => triggerToast('Downloaded offline!')}>
              <Download size={18} />
            </button>
            <button className="d-player-icon-btn focusable" tabIndex={0} onClick={toggleMiniPlayer} title="Widget">
              <Monitor size={18} />
            </button>
            <button className="d-player-icon-btn focusable" tabIndex={0} onClick={() => setIsDesktopFullscreenOpen(true)} title="Fullscreen">
              <Maximize2 size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Desktop Immersive Fullscreen Player */}
      {isDesktopFullscreenOpen && currentTrack && (
        <div className="desktop-fullscreen-player fadeIn">
          {/* Blurred Background */}
          <div
            className="fullscreen-bg-blur"
            style={{ backgroundImage: `url(${getSongImage(currentTrack)})` }}
          />
          <div className="fullscreen-overlay" />

          {/* Header */}
          <div className="fullscreen-header">
            <div className="fullscreen-logo">
              <Radio size={20} className="logo-icon" color="var(--card-orange)" />
              {/* <span style={{ color: 'white' }}></span> */}
            </div>
            <button className="fullscreen-close-btn" onClick={() => setIsDesktopFullscreenOpen(false)} title="Close Fullscreen (Esc)">
              <Minimize2 size={24} />
            </button>
          </div>

          {/* Main Content Body */}
          <div className="fullscreen-body">
            {/* Left side: Album Art */}
            <div className="fullscreen-body-left">
              <div className="fullscreen-album-wrapper">
                <img
                  src={getSongImage(currentTrack)}
                  alt={currentTrack.title}
                  className={`fullscreen-album-img ${isPlaying ? 'spinning' : ''}`}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop';
                  }}
                />
              </div>
            </div>

            {/* Right side: Controls & Queue */}
            <div className="fullscreen-body-right">
              <div className="fullscreen-track-details">
                <h1 className="fullscreen-title">{currentTrack.title}</h1>
                <p className="fullscreen-artist">{currentTrack.artist}</p>
              </div>

              {/* Timeline */}
              <div className="fullscreen-timeline-container">
                <div className="fullscreen-time-labels">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTimeRemaining(currentTime, duration)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleProgressChange}
                  className="fullscreen-timeline-slider"
                />
              </div>

              {/* Playback Controls */}
              <div className="fullscreen-controls-row">
                <button className="fullscreen-icon-btn" onClick={(e) => toggleLike(currentTrack.title, e)}>
                  <Heart
                    size={22}
                    fill={likedSongs.includes(currentTrack.title) ? "#ff6b6b" : "none"}
                    stroke={likedSongs.includes(currentTrack.title) ? "#ff6b6b" : "white"}
                  />
                </button>

                <button className="fullscreen-icon-btn" onClick={playPreviousSong}>
                  <SkipForward size={24} style={{ transform: 'rotate(180deg)' }} />
                </button>

                <button className="fullscreen-play-btn" onClick={togglePlay}>
                  {isPlaying ? <Pause size={28} fill="black" /> : <Play size={28} fill="black" style={{ marginLeft: '4px' }} />}
                </button>

                <button className="fullscreen-icon-btn" onClick={playNextSong}>
                  <SkipForward size={24} />
                </button>

                <button className="fullscreen-icon-btn" onClick={() => shuffleQueue(activePlaybackQueue)}>
                  <Sparkles size={20} />
                </button>
              </div>

              {/* Volume Row */}
              <div className="fullscreen-volume-row">
                <Headphones size={18} style={{ opacity: 0.6 }} />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  defaultValue="1"
                  onChange={(e) => {
                    if (audioRef.current) {
                      audioRef.current.volume = parseFloat(e.target.value);
                    }
                  }}
                  className="fullscreen-volume-slider"
                  title="Volume"
                />
              </div>

              {/* Up Next Section */}
              <div className="fullscreen-queue-section">
                <div className="fullscreen-queue-header">UP NEXT</div>
                <div className="fullscreen-queue-list hide-scrollbar">
                  {getUpcomingSongs().map((song, idx) => (
                    <div key={song.id || idx} className="fullscreen-queue-item" onClick={() => playSong(song)}>
                      <img
                        src={getSongImage(song)}
                        alt={song.title}
                        className="fullscreen-queue-img"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=100&auto=format&fit=crop';
                        }}
                      />
                      <div className="fullscreen-queue-info">
                        <div className="fullscreen-queue-title">{song.title}</div>
                        <div className="fullscreen-queue-artist">{song.artist}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Create Playlist Modal/Dialog */}
      {showCreateModal && (
        <div className="modal-overlay" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(8px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div className="modal-content" style={{
            background: 'var(--panel-bg)',
            border: '1px solid var(--border-color)',
            padding: '24px',
            borderRadius: '16px',
            maxWidth: '400px',
            width: '100%',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
          }}>
            <h3 style={{ color: 'var(--text-color)', fontSize: '18px', fontWeight: '600', marginBottom: '16px', margin: 0 }}>Create New Playlist</h3>
            <form onSubmit={handleCreatePlaylist}>
              <input
                type="text"
                placeholder="Playlist name"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--input-bg)',
                  border: '1px solid var(--input-border)',
                  borderRadius: '8px',
                  padding: '12px',
                  color: 'var(--text-color)',
                  marginTop: '16px',
                  marginBottom: '12px',
                  outline: 'none',
                  fontSize: '14px'
                }}
                autoFocus
              />
              <input
                type="text"
                placeholder="Playlist Image URL (optional)"
                value={newPlaylistImg}
                onChange={(e) => setNewPlaylistImg(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--input-bg)',
                  border: '1px solid var(--input-border)',
                  borderRadius: '8px',
                  padding: '12px',
                  color: 'var(--text-color)',
                  marginBottom: '20px',
                  outline: 'none',
                  fontSize: '14px'
                }}
              />
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-color)',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    background: 'var(--card-orange)',
                    border: 'none',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Account Settings Container */}
      {isAccountSettingsOpen && <AccountSettings onClose={() => setIsAccountSettingsOpen(false)} />}

      {/* Download Settings Container */}
      {isDownloadOpen && <DownloadContainer onClose={() => setIsDownloadOpen(false)} />}

      {/* Mini Player React Portal */}
      {pipWindow && createPortal(
        <div style={{ 
          background: 'var(--panel-bg, #1e1e1e)', 
          height: '100vh', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          padding: '20px',
          boxSizing: 'border-box'
        }}>
          <img 
            src={getSongImage(currentTrack)} 
            alt={currentTrack?.title}
            style={{ width: '100px', height: '100px', borderRadius: '12px', objectFit: 'cover', marginBottom: '16px', boxShadow: '0 8px 16px rgba(0,0,0,0.3)' }} 
          />
          <div style={{ color: 'var(--text-color, #fff)', fontWeight: 'bold', textAlign: 'center', fontSize: '15px', marginBottom: '4px', width: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {currentTrack?.title || 'No Track Playing'}
          </div>
          <div style={{ color: 'var(--text-secondary, #aaa)', fontSize: '12px', marginBottom: '20px', width: '100%', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {currentTrack?.artist || 'Unknown Artist'}
          </div>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <button onClick={playPreviousSong} style={{ background: 'none', border: 'none', color: 'var(--text-color, #fff)', cursor: 'pointer', display: 'flex' }}>
              <SkipForward size={22} style={{ transform: 'rotate(180deg)' }} />
            </button>
            <button onClick={togglePlay} style={{ background: 'var(--card-orange, #f5954a)', border: 'none', color: 'white', width: '48px', height: '48px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(245, 149, 74, 0.4)' }}>
              {isPlaying ? <Pause size={22} fill="white" /> : <Play size={22} fill="white" style={{ marginLeft: '4px' }} />}
            </button>
            <button onClick={playNextSong} style={{ background: 'none', border: 'none', color: 'var(--text-color, #fff)', cursor: 'pointer', display: 'flex' }}>
              <SkipForward size={22} />
            </button>
          </div>
        </div>,
        pipWindow.document.body
      )}
    </div>
  )
}

export default App
