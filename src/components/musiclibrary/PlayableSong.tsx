import React from "react";
//Dynamic Meta Tag Content
import Helmet from "react-helmet";
import { Song } from "../../global/interfaces";

interface PlayableSongProps {
  currentSong: Song;
  isPlaying: boolean;
}

const PlayableSong: React.FC<PlayableSongProps> = ({
  currentSong,
  isPlaying,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-10 text-center">
      <Helmet>
        <title>
          {(isPlaying ? "\u25B6" : "\u25A0") +
            " - " +
            currentSong.name +
            " (" +
            currentSong.year +
            ")"}
        </title>
        <meta
          name="description"
          content="Hear all of my old and new music projects in one convenient music library!"
        />
        <meta
          property="og:title"
          content={`Ryan's Music Library - ${currentSong.name}`}
        />
        <meta
          property="og:description"
          content="Hear all of my old and new music projects in one convenient music library!"
        />
        <meta property="og:url" content="https://www.ryancoppa.com/music" />
        <meta
          name="twitter:title"
          content={`Ryan's Music Library - ${currentSong.name}`}
        />
        <meta
          name="twitter:description"
          content="Hear all of my old and new music projects in one convenient music library!"
        />
      </Helmet>
      <img
        className={`w-80 rounded-full md:w-96 ${
          isPlaying ? "animate-spin-slow" : ""
        }`}
        alt={currentSong.name}
        src={currentSong.cover}
      ></img>
      <h2 className="pt-4 font-montserrat font-normal text-lg md:text-4xl">
        {currentSong.name}
      </h2>
      <h3 className="p-2 font-montserrat font-light text-sm md:text-lg">
        {currentSong.artist} ({currentSong.year})
      </h3>
    </div>
  );
};

export default PlayableSong;