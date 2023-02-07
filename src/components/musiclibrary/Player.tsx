import React, { useState, useEffect, MutableRefObject } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
  faVolumeDown,
} from "@fortawesome/free-solid-svg-icons";
import { Song, SongInfo } from "../../global/interfaces";
import { TrackDirection } from "../../global/enums";

interface PlayerProps {
  audioRef: MutableRefObject<HTMLAudioElement | null>;
  currentSong: Song;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setSongInfo: React.Dispatch<React.SetStateAction<SongInfo>>;
  songInfo: SongInfo;
  songs: Song[];
  setCurrentSong: React.Dispatch<React.SetStateAction<Song>>;
  setSongs: React.Dispatch<React.SetStateAction<Song[]>>;
}

const Player: React.FC<PlayerProps> = ({
  audioRef,
  currentSong,
  isPlaying,
  setIsPlaying,
  setSongInfo,
  songInfo,
  songs,
  setCurrentSong,
  setSongs,
}) => {
  const [activeVolume, setActiveVolume] = useState(false);
  const activeLibraryHandler = (nextPrev: Song) => {
    const newSongs = songs.map((song) => {
      if (song.id === nextPrev.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSongs);
  };

  //attach media session events / data every time currentSong is updated
  useEffect(() => {
    if ("mediaSession" in navigator) {
      try {
        navigator.mediaSession.setActionHandler("play", () =>
          playSongHandler()
        );
        navigator.mediaSession.setActionHandler("pause", () =>
          playSongHandler()
        );
        navigator.mediaSession.setActionHandler("nexttrack", async () =>
          skipTrackHandler(TrackDirection.FORWARD)
        );
        navigator.mediaSession.setActionHandler("previoustrack", async () =>
          skipTrackHandler(TrackDirection.BACK)
        );
        navigator.mediaSession.metadata = new MediaMetadata({
          title: currentSong.name,
          artist: currentSong.artist,
          artwork: [
            {
              src: currentSong.cover,
              sizes: "96x96",
              type: "image/jpg",
            },
            {
              src: currentSong.cover,
              sizes: "128x128",
              type: "image/jpg",
            },
            {
              src: currentSong.cover,
              sizes: "192x192",
              type: "image/jpg",
            },
            {
              src: currentSong.cover,
              sizes: "256x256",
              type: "image/jpg",
            },
            {
              src: currentSong.cover,
              sizes: "384x384",
              type: "image/jpg",
            },
            {
              src: currentSong.cover,
              sizes: "512x512",
              type: "image/jpg",
            },
          ],
        });
        mediaSessionTimeHandler();
      } catch {
        console.log("Error with MediaSession (Generic) on current device");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong, isPlaying]);

  useEffect(() => {
    mediaSessionTimeHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [songInfo]);

  //Event Handlers
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current?.play();
      audioRef.current!.volume = songInfo.volume;
      setIsPlaying(!isPlaying);
    }
  };
  const getTime = (time: number) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  //TODO: fix this
  const mediaSessionTimeHandler = () => {
    try {
      navigator.mediaSession.setPositionState({
        duration: songInfo.duration || 0,
        position: songInfo.currentTime || 0,
      });
    } catch {
      console.log(
        "Error with MediaSession (setPositionState()) on current device"
      );
    }
  };
  //TODO: fix any
  const dragHandler = (e: any) => {
    audioRef.current!.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };
  const skipTrackHandler = async (direction: TrackDirection) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === TrackDirection.FORWARD) {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === TrackDirection.BACK) {
      if ((currentIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1]);
        activeLibraryHandler(songs[songs.length - 1]);
        if (isPlaying) audioRef.current?.play();
        return;
      }
      await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
    }
    if (isPlaying) audioRef.current?.play();
  };
  //Add Styles
  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };

  //TODO: fix any
  const changeVolume = (e: any) => {
    let value = e.target.value;
    audioRef.current!.volume = value;
    setSongInfo({ ...songInfo, volume: value });
  };
  return (
    <div className="flex flex-col items-center justify-between">
      <div className="flex w-10/12 items-center pt-4 md:w-1/2">
        <p className="px-2 text-sm md:text-xl">{getTime(songInfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,
          }}
          className="relative h-2 w-full overflow-hidden rounded-2xl md:h-4"
        >
          <input
            className="w-full cursor-pointer appearance-none bg-transparent"
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
            type="range"
          />
          <div style={trackAnim} className="bg-zinc-300 translate-x-0 w-full h-full absolute top-0 left-0 p-4 pointer-events-none"></div>
        </div>
        <p className="px-2 text-sm md:text-xl">
          {songInfo.duration ? getTime(songInfo.duration) : "0:00"}
        </p>
      </div>
      <div className="flex w-3/4 items-center justify-between pt-8 md:w-1/2">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler(TrackDirection.BACK)}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler(TrackDirection.FORWARD)}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
      <div className="pt-8">
        <FontAwesomeIcon
          onClick={() => setActiveVolume(!activeVolume)}
          icon={faVolumeDown}
          size="2x"
        />
        {activeVolume && (
          <input
            onChange={changeVolume}
            value={songInfo.volume}
            max="1"
            min="0"
            step="0.01"
            type="range"
          />
        )}
      </div>
    </div>
  );
};

export default Player;
