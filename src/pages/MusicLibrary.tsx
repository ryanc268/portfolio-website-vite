import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Player from "../components/musiclibrary/Player";
import PlayableSong from "../components/musiclibrary/PlayableSong";
import Library from "../components/musiclibrary/Library";
import PlayerNav from "../components/musiclibrary/PlayerNav";
import AudioVisualizer from "../components/AudioVisualizer";
import { pageAnimation } from "../utils/Animation";
import { useMusicPlayer } from "../context/MusicPlayerContext";

export const MusicLibrary: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const url = location.pathname;

  const {
    audioRef,
    songs,
    setSongs,
    currentSong,
    setCurrentSong,
    isPlaying,
    visualizer,
    setVisualizer,
    libraryStatus,
    setLibraryStatus,
  } = useMusicPlayer();

  useEffect(() => {
    if (url === "/music") return;

    const matchedSong = songs.find((song) => song.url === url);
    if (matchedSong) {
      setCurrentSong((prev) =>
        prev.id === matchedSong.id ? prev : matchedSong,
      );
      setSongs((prev) => {
        if (prev.find((song) => song.id === matchedSong.id)?.active) {
          return prev;
        }
        return prev.map((song) => ({
          ...song,
          active: song.id === matchedSong.id,
        }));
      });
      return;
    }

    if (url.startsWith("/music/")) {
      navigate("/music", { replace: true });
    }
    // Only re-sync when the route changes.
  }, [url, navigate]);

  return (
    <>
      <motion.div
        className="m-0 p-0"
        variants={pageAnimation}
        initial="hidden"
        animate="show"
        exit="exit"
      >
        <div
          className={`overflow-hidden transition-all duration-500 ${
            libraryStatus ? "md:ml-80" : ""
          }`}
        >
          <PlayerNav
            libraryStatus={libraryStatus}
            setLibraryStatus={setLibraryStatus}
            visualizer={visualizer}
            setVisualizer={setVisualizer}
          />
          <PlayableSong currentSong={currentSong} isPlaying={isPlaying} />
          <Player />
          <Library
            audioRef={audioRef}
            songs={songs}
            setCurrentSong={setCurrentSong}
            isPlaying={isPlaying}
            setSongs={setSongs}
            libraryStatus={libraryStatus}
          />
          <AudioVisualizer isPlaying={isPlaying} visualizer={visualizer} />
        </div>
      </motion.div>
    </>
  );
};
