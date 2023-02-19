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

import logo from "/src/assets/logo192.png";

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
        navigator.mediaSession.setActionHandler("nexttrack", () =>
          skipTrackHandler(TrackDirection.FORWARD)
        );
        navigator.mediaSession.setActionHandler("previoustrack", () =>
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
  }, [currentSong, isPlaying]);

  useEffect(() => {
    mediaSessionTimeHandler();
  }, [songInfo]);

  //Event Handlers
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current?.play();
      if (audioRef.current) audioRef.current.volume = songInfo.volume;
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
  const dragHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) audioRef.current.currentTime = +e.target.value;
    setSongInfo({ ...songInfo, currentTime: +e.target.value });
  };
  const skipTrackHandler = (direction: TrackDirection) => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === TrackDirection.FORWARD) {
      setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === TrackDirection.BACK) {
      if ((currentIndex - 1) % songs.length === -1) {
        setCurrentSong(songs[songs.length - 1]);
        activeLibraryHandler(songs[songs.length - 1]);
        if (isPlaying) audioRef.current?.play();
        return;
      }
      setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
    }
    if (isPlaying) audioRef.current?.play();
  };
  //Add Styles
  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value;
    if (audioRef.current) audioRef.current.volume = value;
    setSongInfo({ ...songInfo, volume: value });
  };

  const uploadCustomSong = (e: React.ChangeEvent<HTMLInputElement>) => {
    //Keeps track to know if any new songs upload so we can move to them
    let songsUploaded = 0;
    if (audioRef.current && e.target.files) {
      for (let i = 0; i < e.target.files.length; i++) {
        const uploadId = e.target.files[i].lastModified.toString();
        //check if the current uploaded song ID matches an id already in the library
        //If exists, skip upload, if it doesn't then add to the front of the library
        const songIncluded = !songs.every((s) => s.id !== uploadId);
        if (!songIncluded) {
          const uploadedSong: Song = {
            name: e.target.files[i].name,
            artist: "",
            year: e.target.files[i].lastModified,
            cover: logo,
            id: uploadId,
            url: "",
            active: false,
            color: ["#3B4E59", "#1B272F"],
            audio: URL.createObjectURL(e.target.files[i]),
          };
          songs.unshift(uploadedSong);
          songsUploaded++;
        }
      }
      if (songsUploaded > 0) {
        setCurrentSong(songs[0]);
        activeLibraryHandler(songs[0]);
      }
    }
  };
  return (
    <div className="flex flex-col items-center justify-between">
      <div className="z-10 flex w-10/12 items-center md:w-1/2">
        <p className="px-2 text-sm md:text-xl">
          {getTime(songInfo.currentTime)}
        </p>
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
          <div
            style={trackAnim}
            className="pointer-events-none absolute top-0 left-0 h-full w-full translate-x-0 bg-zinc-300 p-4"
          ></div>
        </div>
        <p className="px-2 text-sm md:text-xl">
          {songInfo.duration ? getTime(songInfo.duration) : "0:00"}
        </p>
      </div>
      <div className="z-10 flex w-3/4 items-center justify-between pt-8 md:w-1/2">
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
      <div className="flex flex-col items-center justify-between pt-4">
        <label
          className="rounded border border-gray-200 p-1 font-montserrat text-sm hover:bg-indigo-700 md:p-2 md:text-base"
          htmlFor="upload"
        >
          Upload Your Own Music
        </label>
        <input
          className="hidden"
          type="file"
          id="upload"
          onChange={uploadCustomSong}
          multiple
          accept="audio/mp3"
        />
        <FontAwesomeIcon
          className="pt-4"
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
