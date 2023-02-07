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
      className={`Library fixed left-0 top-24 h-full w-full -translate-x-full overflow-x-hidden overflow-y-scroll bg-zinc-800 transition-all duration-500 md:w-1/5 2xl:w-1/6 ${
        libraryStatus
          ? "translate-x-0 opacity-100 md:shadow-2xl md:shadow-zinc-400"
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
