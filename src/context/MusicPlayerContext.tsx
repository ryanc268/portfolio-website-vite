import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLocation } from "react-router-dom";
import data from "../assets/data/data";
import { Song } from "../global/interfaces";
import { TrackDirection, Visualizer } from "../global/enums";
import MiniPlayer from "../components/musiclibrary/MiniPlayer";

const DEFAULT_VOLUME = 0.4;

const createInitialLibraryState = () => {
  const songs = data();
  const currentSong = songs.find((song) => song.active) ?? songs[0];
  return { songs, currentSong };
};

const initialLibrary = createInitialLibraryState();

interface MusicPlayerContextValue {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  audioSourceRef: React.MutableRefObject<MediaElementAudioSourceNode | null>;
  gainNodeRef: React.MutableRefObject<GainNode | null>;
  getAudioContext: () => AudioContext;
  ensureAudioGraph: () => void;
  songs: Song[];
  setSongs: React.Dispatch<React.SetStateAction<Song[]>>;
  currentSong: Song;
  setCurrentSong: React.Dispatch<React.SetStateAction<Song>>;
  isPlaying: boolean;
  volume: number;
  visualizer: Visualizer;
  setVisualizer: React.Dispatch<React.SetStateAction<Visualizer>>;
  libraryStatus: boolean;
  setLibraryStatus: React.Dispatch<React.SetStateAction<boolean>>;
  togglePlay: () => Promise<void>;
  skipTrack: (direction: TrackDirection) => void;
  changeVolume: (volume: number) => void;
  setActiveSongInLibrary: (song: Song) => void;
  showMiniPlayer: boolean;
  closeMiniPlayer: () => void;
}

const MusicPlayerContext = createContext<MusicPlayerContextValue | null>(null);

export const useMusicPlayer = () => {
  const context = useContext(MusicPlayerContext);
  if (!context) {
    throw new Error("useMusicPlayer must be used within MusicPlayerProvider");
  }
  return context;
};

export const MusicPlayerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioSourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const shouldPlayRef = useRef(false);
  const isTrackTransitionRef = useRef(false);
  const miniPlayerDismissedRef = useRef(false);
  const volumeRef = useRef(DEFAULT_VOLUME);

  const location = useLocation();
  const isOnMusicPage = location.pathname.startsWith("/music");

  const [songs, setSongs] = useState<Song[]>(() => initialLibrary.songs);
  const [currentSong, setCurrentSong] = useState<Song>(
    () => initialLibrary.currentSong,
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const [visualizer, setVisualizer] = useState(Visualizer.BASIC);
  const [libraryStatus, setLibraryStatus] = useState(false);
  const [showMiniPlayer, setShowMiniPlayer] = useState(false);

  const closeMiniPlayer = useCallback(() => {
    miniPlayerDismissedRef.current = true;
    shouldPlayRef.current = false;
    isTrackTransitionRef.current = false;
    audioRef.current?.pause();
    setIsPlaying(false);
    setShowMiniPlayer(false);
  }, []);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
    return audioContextRef.current;
  }, []);

  const applyVolume = useCallback((nextVolume: number) => {
    volumeRef.current = nextVolume;
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = nextVolume;
    } else if (audioRef.current) {
      audioRef.current.volume = nextVolume;
    }
    setVolume(nextVolume);
  }, []);

  const ensureAudioGraph = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const ctx = getAudioContext();

    if (!gainNodeRef.current) {
      gainNodeRef.current = ctx.createGain();
      gainNodeRef.current.gain.value = volumeRef.current;
      gainNodeRef.current.connect(ctx.destination);
    }

    if (!audioSourceRef.current) {
      audioSourceRef.current = ctx.createMediaElementSource(audio);
      audioSourceRef.current.connect(gainNodeRef.current);
      audio.volume = 1;
    }

    if (ctx.state === "suspended") {
      void ctx.resume();
    }
  }, [getAudioContext]);

  const setActiveSongInLibrary = useCallback((song: Song) => {
    setSongs((prev) => {
      if (prev.find((item) => item.id === song.id)?.active) {
        return prev;
      }
      return prev.map((item) => ({
        ...item,
        active: item.id === song.id,
      }));
    });
  }, []);

  const advanceToSong = useCallback(
    (nextSong: Song, continuePlaying: boolean) => {
      isTrackTransitionRef.current = true;
      shouldPlayRef.current = continuePlaying;
      setCurrentSong(nextSong);
      setActiveSongInLibrary(nextSong);
    },
    [setActiveSongInLibrary],
  );

  const togglePlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      shouldPlayRef.current = false;
      audio.pause();
      return;
    }

    shouldPlayRef.current = true;
    ensureAudioGraph();

    try {
      await audio.play();
    } catch (error) {
      console.error("Unable to play audio:", error);
      shouldPlayRef.current = false;
      setIsPlaying(false);
    }
  }, [ensureAudioGraph]);

  const skipTrack = useCallback(
    (direction: TrackDirection) => {
      if (songs.length === 0) return;

      const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
      const safeIndex = currentIndex === -1 ? 0 : currentIndex;

      const nextIndex =
        direction === TrackDirection.FORWARD
          ? (safeIndex + 1) % songs.length
          : safeIndex === 0
            ? songs.length - 1
            : safeIndex - 1;

      advanceToSong(songs[nextIndex], shouldPlayRef.current);
    },
    [advanceToSong, currentSong.id, songs],
  );

  const changeVolume = useCallback(
    (nextVolume: number) => {
      applyVolume(nextVolume);
    },
    [applyVolume],
  );

  const songEndHandler = useCallback(() => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const safeIndex = currentIndex === -1 ? 0 : currentIndex;
    const nextSong = songs[(safeIndex + 1) % songs.length];
    advanceToSong(nextSong, true);
  }, [advanceToSong, currentSong.id, songs]);

  const handleCanPlay = useCallback(() => {
    ensureAudioGraph();

    if (shouldPlayRef.current) {
      isTrackTransitionRef.current = false;
      void audioRef.current?.play().catch(() => {
        shouldPlayRef.current = false;
        setIsPlaying(false);
      });
    } else {
      isTrackTransitionRef.current = false;
    }

    if (isOnMusicPage && currentSong.url) {
      window.history.replaceState(null, "", currentSong.url);
    }
  }, [currentSong.url, ensureAudioGraph, isOnMusicPage]);

  const handlePlay = useCallback(() => {
    shouldPlayRef.current = true;
    miniPlayerDismissedRef.current = false;
    setIsPlaying(true);
  }, []);

  const handlePause = useCallback(() => {
    if (isTrackTransitionRef.current) return;
    shouldPlayRef.current = false;
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volumeRef.current;
    }
  }, []);

  useEffect(() => {
    if (isOnMusicPage) {
      setShowMiniPlayer(false);
      return;
    }

    if (isPlaying && !miniPlayerDismissedRef.current) {
      setShowMiniPlayer(true);
    }
  }, [isOnMusicPage, isPlaying]);

  useEffect(() => {
    if (!("mediaSession" in navigator)) return;

    try {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentSong.name,
        artist: currentSong.artist,
        artwork: [
          { src: currentSong.cover, sizes: "96x96", type: "image/jpg" },
          { src: currentSong.cover, sizes: "128x128", type: "image/jpg" },
          { src: currentSong.cover, sizes: "192x192", type: "image/jpg" },
          { src: currentSong.cover, sizes: "256x256", type: "image/jpg" },
          { src: currentSong.cover, sizes: "384x384", type: "image/jpg" },
          { src: currentSong.cover, sizes: "512x512", type: "image/jpg" },
        ],
      });
    } catch {
      console.log("Error with MediaSession metadata on current device");
    }
  }, [currentSong]);

  useEffect(() => {
    if (!("mediaSession" in navigator)) return;

    const onPlay = () => void togglePlay();
    const onPause = () => void togglePlay();
    const onNext = () => skipTrack(TrackDirection.FORWARD);
    const onPrev = () => skipTrack(TrackDirection.BACK);

    try {
      navigator.mediaSession.setActionHandler("play", onPlay);
      navigator.mediaSession.setActionHandler("pause", onPause);
      navigator.mediaSession.setActionHandler("nexttrack", onNext);
      navigator.mediaSession.setActionHandler("previoustrack", onPrev);
    } catch {
      console.log("Error with MediaSession handlers on current device");
    }

    return () => {
      try {
        navigator.mediaSession.setActionHandler("play", null);
        navigator.mediaSession.setActionHandler("pause", null);
        navigator.mediaSession.setActionHandler("nexttrack", null);
        navigator.mediaSession.setActionHandler("previoustrack", null);
      } catch {
        /* ignore cleanup errors */
      }
    };
  }, [skipTrack, togglePlay]);

  const value = useMemo(
    () => ({
      audioRef,
      audioSourceRef,
      gainNodeRef,
      getAudioContext,
      ensureAudioGraph,
      songs,
      setSongs,
      currentSong,
      setCurrentSong,
      isPlaying,
      volume,
      visualizer,
      setVisualizer,
      libraryStatus,
      setLibraryStatus,
      togglePlay,
      skipTrack,
      changeVolume,
      setActiveSongInLibrary,
      showMiniPlayer,
      closeMiniPlayer,
    }),
    [
      changeVolume,
      closeMiniPlayer,
      currentSong,
      ensureAudioGraph,
      getAudioContext,
      isPlaying,
      libraryStatus,
      setActiveSongInLibrary,
      showMiniPlayer,
      skipTrack,
      songs,
      togglePlay,
      visualizer,
      volume,
    ],
  );

  return (
    <MusicPlayerContext.Provider value={value}>
      {children}
      <audio
        ref={audioRef}
        src={currentSong.audio}
        onCanPlay={handleCanPlay}
        onEnded={songEndHandler}
        onPlay={handlePlay}
        onPause={handlePause}
      />
      {showMiniPlayer && !isOnMusicPage && <MiniPlayer />}
    </MusicPlayerContext.Provider>
  );
};
