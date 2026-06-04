import React from "react";
import { Song } from "../../global/interfaces";
import LibrarySong from "./LibrarySong";

interface LibraryProps {
  songs: Song[];
  libraryStatus: boolean;
}

const Library: React.FC<LibraryProps> = ({ songs, libraryStatus }) => {
  return (
    <div
      className={`library fixed left-0 top-0 z-20 mt-24 h-screen w-screen -translate-x-full overflow-x-hidden bg-zinc-800 pb-24 transition-transform duration-500 md:mt-20 md:w-1/5 md:pb-28 md:transition-all 2xl:w-1/6 ${
        libraryStatus
          ? "z-40 translate-x-0 opacity-100 md:z-20 md:shadow-2xl md:shadow-zinc-400"
          : ""
      }`}
    >
      <div className="flex-1 items-center">
        {songs.map((song) => (
          <LibrarySong song={song} key={song.id} />
        ))}
      </div>
    </div>
  );
};

export default Library;
