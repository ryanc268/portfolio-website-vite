import React from "react";
import { Song } from "../../global/interfaces";
import { useMusicPlayer } from "../../context/MusicPlayerContext";

interface LibrarySongProps {
  song: Song;
}

const LibrarySong: React.FC<LibrarySongProps> = ({ song }) => {
  const { isPlaying, selectSong } = useMusicPlayer();

  const songSelectHandler = () => {
    selectSong(song, isPlaying);
  };

  return (
    <div
      onClick={songSelectHandler}
      className={`flex items-center p-2 md:p-4 ${
        song.active ? "bg-neutral-600" : ""
      }`}
    >
      <img className="w-1/4 rounded-lg" alt={song.name} src={song.cover}></img>
      <div className="px-4">
        <h3 className="font-montserrat text-sm md:text-base">{song.name}</h3>
        <h4 className="font-montserrat text-xs font-light md:text-sm">
          {song.artist}
        </h4>
      </div>
    </div>
  );
};

export default LibrarySong;
