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

const withActiveSong = (songs: Song[], songId: string): Song[] => {
  if (songs.find((song) => song.id === songId)?.active) return songs;
  return songs.map((song) => ({ ...song, active: song.id === songId }));
};

const getTrackIndex = (songs: Song[], songId: string) => {
  const index = songs.findIndex((song) => song.id === songId);
  return index === -1 ? 0 : index;
};

interface MusicPlayerContextValue {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  audioSourceRef: React.MutableRefObject<MediaElementAudioSourceNode | null>;
  gainNodeRef: React.MutableRefObject<GainNode | null>;
  getAudioContext: () => AudioContext;
  ensureAudioGraph: () => void;
  songs: Song[];
  setSongs: React.Dispatch<React.SetStateAction<Song[]>>;
  currentSong: Song;
  isPlaying: boolean;
  volume: number;
  visualizer: Visualizer;
  setVisualizer: React.Dispatch<React.SetStateAction<Visualizer>>;
  libraryStatus: boolean;
  setLibraryStatus: React.Dispatch<React.SetStateAction<boolean>>;
  togglePlay: () => Promise<void>;
  skipTrack: (direction: TrackDirection) => void;
  changeVolume: (volume: number) => void;
  selectSong: (song: Song, continuePlaying?: boolean) => void;
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
  const currentSongIdRef = useRef(initialLibrary.currentSong.id);

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

  currentSongIdRef.current = currentSong.id;

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

  const changeVolume = useCallback((nextVolume: number) => {
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

  const playAudio = useCallback(
    async (onlyIfWanted = false) => {
      if (onlyIfWanted && !shouldPlayRef.current) {
        isTrackTransitionRef.current = false;
        return;
      }

      const audio = audioRef.current;
      if (!audio) return;

      if (!onlyIfWanted) {
        shouldPlayRef.current = true;
      }

      ensureAudioGraph();

      const ctx = getAudioContext();
      if (ctx.state === "suspended") {
        await ctx.resume();
      }

      try {
        await audio.play();
      } catch (error) {
        console.error("Unable to play audio:", error);
        shouldPlayRef.current = false;
        isTrackTransitionRef.current = false;
        setIsPlaying(false);
      }
    },
    [ensureAudioGraph, getAudioContext],
  );

  const pausePlayback = useCallback(() => {
    isTrackTransitionRef.current = false;
    shouldPlayRef.current = false;
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const advanceToSong = useCallback((nextSong: Song, continuePlaying: boolean) => {
    if (nextSong.id === currentSongIdRef.current) {
      setSongs((prev) => withActiveSong(prev, nextSong.id));
      return;
    }

    isTrackTransitionRef.current = true;
    shouldPlayRef.current = continuePlaying;
    if (continuePlaying) {
      setIsPlaying(true);
    }
    setCurrentSong(nextSong);
    setSongs((prev) => withActiveSong(prev, nextSong.id));
  }, []);

  const togglePlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      pausePlayback();
      return;
    }

    await playAudio();
  }, [pausePlayback, playAudio]);

  const songAtOffset = useCallback(
    (fromId: string, direction: TrackDirection) => {
      if (songs.length === 0) return null;
      const index = getTrackIndex(songs, fromId);
      const nextIndex =
        direction === TrackDirection.FORWARD
          ? (index + 1) % songs.length
          : index === 0
            ? songs.length - 1
            : index - 1;
      return songs[nextIndex];
    },
    [songs],
  );

  const skipTrack = useCallback(
    (direction: TrackDirection) => {
      const nextSong = songAtOffset(currentSongIdRef.current, direction);
      if (nextSong) {
        advanceToSong(nextSong, shouldPlayRef.current);
      }
    },
    [advanceToSong, songAtOffset],
  );

  const selectSong = useCallback(
    (song: Song, continuePlaying?: boolean) => {
      const shouldContinue =
        continuePlaying ?? (shouldPlayRef.current || isPlaying);
      advanceToSong(song, shouldContinue);
    },
    [advanceToSong, isPlaying],
  );

  const songEndHandler = useCallback(() => {
    const nextSong = songAtOffset(currentSongIdRef.current, TrackDirection.FORWARD);
    if (nextSong) {
      advanceToSong(nextSong, true);
    }
  }, [advanceToSong, songAtOffset]);

  const handleCanPlay = useCallback(() => {
    void playAudio(true);

    if (isOnMusicPage && currentSong.url) {
      window.history.replaceState(null, "", currentSong.url);
    }
  }, [currentSong.url, isOnMusicPage, playAudio]);

  const handlePlay = useCallback(() => {
    shouldPlayRef.current = true;
    isTrackTransitionRef.current = false;
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

    const onPlay = () => void playAudio();
    const onPause = () => pausePlayback();
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
  }, [pausePlayback, playAudio, skipTrack]);

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
      isPlaying,
      volume,
      visualizer,
      setVisualizer,
      libraryStatus,
      setLibraryStatus,
      togglePlay,
      skipTrack,
      changeVolume,
      selectSong,
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
      selectSong,
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
        onLoadedData={() => void playAudio(true)}
        onEnded={songEndHandler}
        onPlay={handlePlay}
        onPause={handlePause}
      />
      {showMiniPlayer && !isOnMusicPage && <MiniPlayer />}
    </MusicPlayerContext.Provider>
  );
};
