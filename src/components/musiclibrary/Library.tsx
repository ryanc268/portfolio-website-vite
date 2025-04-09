import React, { MutableRefObject } from "react";
import { Song } from "../../global/interfaces";
import LibrarySong from "./LibrarySong";

interface LibraryProps {
  songs: Song[];
  setCurrentSong: React.Dispatch<React.SetStateAction<Song>>;
  audioRef: MutableRefObject<HTMLAudioElement | null>;
  isPlaying: boolean;
  setSongs: React.Dispatch<React.SetStateAction<Song[]>>;
  libraryStatus: boolean;
}

const Library: React.FC<LibraryProps> = ({
  songs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs,
  libraryStatus,
}) => {
  return (
    <div
      className={`Library fixed left-0 top-0 z-20 mt-24 h-screen w-screen -translate-x-full overflow-x-hidden bg-zinc-800 pb-24 transition-all duration-500 md:mt-20 md:w-1/5 md:pb-28 2xl:w-1/6 ${
        libraryStatus
          ? "translate-x-0 opacity-100 md:opacity-80 md:shadow-2xl md:shadow-zinc-400"
          : ""
      }`}
    >
      <div className="flex-1 items-center">
        {songs.map((song) => (
          <LibrarySong
            songs={songs}
            setCurrentSong={setCurrentSong}
            song={song}
            id={song.id}
            key={song.id}
            audioRef={audioRef}
            isPlaying={isPlaying}
            setSongs={setSongs}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
