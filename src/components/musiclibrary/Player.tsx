import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
  faVolumeDown,
} from "@fortawesome/free-solid-svg-icons";
import { TrackDirection } from "../../global/enums";
import { useMusicPlayer } from "../../context/MusicPlayerContext";

import logo from "/src/assets/logo192.png";

const Player = () => {
  const [activeVolume, setActiveVolume] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const {
    audioRef,
    currentSong,
    isPlaying,
    volume,
    songs,
    setCurrentSong,
    setSongs,
    togglePlay,
    skipTrack,
    changeVolume,
    setActiveSongInLibrary,
  } = useMusicPlayer();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const syncTime = () => {
      setCurrentTime(audio.currentTime);
      if (Number.isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    syncTime();
    audio.addEventListener("timeupdate", syncTime);
    audio.addEventListener("loadedmetadata", syncTime);

    return () => {
      audio.removeEventListener("timeupdate", syncTime);
      audio.removeEventListener("loadedmetadata", syncTime);
    };
  }, [audioRef, currentSong.audio]);

  const getTime = (time: number) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextTime = +e.target.value;
    if (audioRef.current) {
      audioRef.current.currentTime = nextTime;
    }
    setCurrentTime(nextTime);
  };

  const animationPercentage =
    duration > 0 ? Math.round((currentTime / duration) * 100) : 0;

  const trackAnim = {
    transform: `translateX(${animationPercentage}%)`,
  };

  const uploadCustomSong = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let songsUploaded = 0;
    if (audioRef.current && e.target.files) {
      const tempSongs = [...songs];
      for (let i = 0; i < e.target.files.length; i++) {
        const uploadId = e.target.files[i].lastModified.toString();
        const songOkay =
          songs.every((s) => s.id !== uploadId) &&
          e.target.files[i].type === "audio/mpeg";
        if (songOkay) {
          const uploadedSong = {
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
          tempSongs.unshift(uploadedSong);
          songsUploaded++;
        }
      }
      if (songsUploaded > 0) {
        setSongs(tempSongs);
        const firstSong = tempSongs[0];
        await setCurrentSong(firstSong);
        setActiveSongInLibrary(firstSong);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-between md:pb-20 2xl:pb-0">
      <div className="z-10 flex w-10/12 items-center md:w-1/2">
        <p className="px-2 text-sm md:text-xl">{getTime(currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,
          }}
          className="relative h-2 w-full overflow-hidden rounded-2xl md:h-4"
        >
          <input
            className="w-full cursor-pointer appearance-none bg-transparent"
            min={0}
            max={duration || 0}
            value={currentTime}
            onChange={dragHandler}
            type="range"
          />
          <div
            style={trackAnim}
            className="pointer-events-none absolute top-0 left-0 h-full w-full translate-x-0 bg-zinc-300 p-4"
          ></div>
        </div>
        <p className="px-2 text-sm md:text-xl">
          {duration ? getTime(duration) : "0:00"}
        </p>
      </div>
      <div className="z-10 flex w-3/4 items-center justify-between pt-8 md:w-1/2 md:pt-4 2xl:pt-8">
        <FontAwesomeIcon
          onClick={() => skipTrack(TrackDirection.BACK)}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={() => void togglePlay()}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => skipTrack(TrackDirection.FORWARD)}
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
            onChange={(e) => changeVolume(+e.target.value)}
            value={volume}
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
