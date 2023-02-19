import React, { MutableRefObject } from "react";
import { Song } from "../../global/interfaces";

interface LibrarySongProps {
  song: Song;
  songs: Song[];
  setCurrentSong: React.Dispatch<React.SetStateAction<Song>>;
  id: string;
  audioRef: MutableRefObject<HTMLAudioElement | null>;
  isPlaying: boolean;
  setSongs: React.Dispatch<React.SetStateAction<Song[]>>;
}

const LibrarySong: React.FC<LibrarySongProps> = ({
  song,
  songs,
  setCurrentSong,
  id,
  audioRef,
  isPlaying,
  setSongs,
}) => {
  const songSelectHandler = () => {
    //const selectedSong = songs.filter((state) => state, id === id);
    setCurrentSong(song);

    const newSongs = songs.map((song) => {
      if (song.id === id) {
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
    if (isPlaying) audioRef.current?.play();
  };
  return (
    <div
      onClick={songSelectHandler}
      className={`flex items-center p-2 md:p-4 ${
        song.active ? "bg-neutral-600" : ""
      }`}
    >
      <img
        className="w-1/4 rounded-lg"
        alt={song.name}
        src={song.cover}
      ></img>
      <div className="px-4">
        <h3 className="font-montserrat text-sm md:text-base">
          {song.name}
        </h3>
        <h4 className="font-montserrat text-xs font-light md:text-sm">
          {song.artist}
        </h4>
      </div>
    </div>
  );
};

export default LibrarySong;
