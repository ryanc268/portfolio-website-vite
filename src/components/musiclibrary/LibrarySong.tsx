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
  const songSelectHandler = async () => {
    //const selectedSong = songs.filter((state) => state, id === id);
    await setCurrentSong(song);

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
      className={`flex items-center p-2 md:p-4 ${song.active ? "bg-neutral-600" : ""}`}
    >
      <img className="w-1/4 md:w-1/4 rounded-lg" alt={song.name} src={song.cover}></img>
      <div className="pl-2">
        <h3 className="text-sm md:text-lg">{song.name}</h3>
        <h4 className="text-xs md:text-base italic">{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
