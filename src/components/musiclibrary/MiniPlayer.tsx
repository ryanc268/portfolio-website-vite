import { useLayoutEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faPause,
  faPlay,
  faVolumeDown,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useMusicPlayer } from "../../context/MusicPlayerContext";
import { TrackDirection } from "../../global/enums";

const MiniPlayer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    currentSong,
    isPlaying,
    volume,
    togglePlay,
    skipTrack,
    changeVolume,
    closeMiniPlayer,
  } = useMusicPlayer();

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const syncOffset = () => {
      const mobile = window.matchMedia("(max-width: 639px)").matches;
      if (!mobile) {
        document.documentElement.style.removeProperty("--mini-player-offset");
        return;
      }

      document.documentElement.style.setProperty(
        "--mini-player-offset",
        `${el.getBoundingClientRect().height}px`,
      );
    };

    syncOffset();

    const observer = new ResizeObserver(syncOffset);
    observer.observe(el);

    const mediaQuery = window.matchMedia("(max-width: 639px)");
    mediaQuery.addEventListener("change", syncOffset);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener("change", syncOffset);
      document.documentElement.style.removeProperty("--mini-player-offset");
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-zinc-800/98 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-2xl backdrop-blur-md sm:inset-x-auto sm:right-4 sm:bottom-4 sm:w-[min(100vw-2rem,24rem)] sm:rounded-xl sm:border sm:pb-3"
    >
      <button
        type="button"
        onClick={closeMiniPlayer}
        className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white sm:top-2.5 sm:right-2.5"
        aria-label="Close player and stop music"
      >
        <FontAwesomeIcon icon={faXmark} className="text-sm" />
      </button>

      <div className="mx-auto flex max-w-lg items-center gap-3 pr-8 sm:max-w-none sm:pr-10">
        <Link
          to={currentSong.url || "/music"}
          className="shrink-0 overflow-hidden rounded-lg"
        >
          <img
            src={currentSong.cover}
            alt={currentSong.name}
            className="h-14 w-14 object-cover sm:h-12 sm:w-12"
          />
        </Link>

        <div className="min-w-0 flex-1">
          <Link
            to={currentSong.url || "/music"}
            className="block truncate font-montserrat text-sm text-white hover:text-cyan-custom"
          >
            {currentSong.name}
          </Link>
          {currentSong.artist && (
            <p className="truncate text-xs text-white/55">{currentSong.artist}</p>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-1 text-white/90 sm:gap-2">
          <button
            type="button"
            onClick={() => skipTrack(TrackDirection.BACK)}
            className="flex h-11 w-11 items-center justify-center rounded-full transition hover:bg-white/10"
            aria-label="Previous track"
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          <button
            type="button"
            onClick={() => void togglePlay()}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-custom/15 text-cyan-custom transition hover:bg-cyan-custom/25"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
          </button>
          <button
            type="button"
            onClick={() => skipTrack(TrackDirection.FORWARD)}
            className="flex h-11 w-11 items-center justify-center rounded-full transition hover:bg-white/10"
            aria-label="Next track"
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </div>
      </div>

      <div className="mx-auto mt-2 flex max-w-lg items-center gap-2 px-1 sm:max-w-none">
        <FontAwesomeIcon
          icon={faVolumeDown}
          className="shrink-0 text-sm text-white/70"
        />
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => changeVolume(+e.target.value)}
          className="h-8 w-full cursor-pointer"
          aria-label="Volume"
        />
      </div>
    </div>
  );
};

export default MiniPlayer;
