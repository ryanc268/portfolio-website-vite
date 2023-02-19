import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Player from "../components/musiclibrary/Player";
import PlayableSong from "../components/musiclibrary/PlayableSong";
import Library from "../components/musiclibrary/Library";
import PlayerNav from "../components/musiclibrary/PlayerNav";
import AudioVisualizer from "../components/AudioVisualizer";
import { pageAnimation } from "../utils/Animation";
//Animations
import { motion } from "framer-motion";

import data from "../assets/data/data";
import { Song, SongInfo } from "../global/interfaces";
import ScrollTop from "../utils/ScrollTop";
import { Visualizer } from "../global/enums";

export const MusicLibrary: React.FC = () => {
  //Ref
  const audioRef = useRef<HTMLAudioElement>(null);
  //States
  const [songs, setSongs] = useState<Song[]>(data());
  const [currentSong, setCurrentSong] = useState<Song>(songs[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [visualizer, setVisualizer] = useState<Visualizer>(Visualizer.BASIC);
  const [songInfo, setSongInfo] = useState<SongInfo>({
    currentTime: 0,
    duration: 0,
    animationPercerntage: 0,
    volume: 0.4,
  });
  const [libraryStatus, setLibraryStatus] = useState(false);
  //Event Handlers;
  //TODO: fix any
  const timeUpdateHandler = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    const current = e.currentTarget.currentTime;
    const duration = e.currentTarget.duration;
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);
    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration,
      animationPercentage: animation,
    });
  };
  const songEndHandler = async () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    //updates the library to reflect that the next autoplayed song is "selected"
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    const newSongs = songs.map((song) => {
      if (song.id === songs[(currentIndex + 1) % songs.length].id) {
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

  const audioLoadReady = () => {
    if (isPlaying) audioRef.current?.play();
    //Replace the url for meta tag / linking purposes but specifically not cause a reload

    //TODO: the "" was null before. Make sure it doesn't break anything
    window.history.replaceState(null, "", `${currentSong.url}`);
  };

  const location = useLocation();
  const navigate = useNavigate();
  const url = location.pathname;

  //On load this figures out if the user is looking for a specific song to load up initially
  //If it doesn't exist, redirect to the default music page

  useEffect(() => {
    const currentSong = songs.filter((song) => song.url === url);
    if (currentSong.length !== 0) {
      songs.forEach((song) => {
        if (song.active === true) song.active = false;
      });
      currentSong[0].active = true;
      setCurrentSong(currentSong[0]);
    } else if (url.includes("/music/")) {
      navigate("/music");
    }
  }, [url]);

  return (
    <motion.div
      className="m-0 p-0"
      variants={pageAnimation}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <div
        className={`overflow-hidden transition-all duration-500 ${
          libraryStatus ? "md:ml-80" : ""
        }`}
      >
        <PlayerNav
          libraryStatus={libraryStatus}
          setLibraryStatus={setLibraryStatus}
          visualizer={visualizer}
          setVisualizer={setVisualizer}
        />
        <PlayableSong currentSong={currentSong} isPlaying={isPlaying} />
        <Player
          audioRef={audioRef}
          setIsPlaying={setIsPlaying}
          isPlaying={isPlaying}
          currentSong={currentSong}
          setSongInfo={setSongInfo}
          songInfo={songInfo}
          songs={songs}
          setCurrentSong={setCurrentSong}
          setSongs={setSongs}
        />
        <Library
          audioRef={audioRef}
          songs={songs}
          setCurrentSong={setCurrentSong}
          isPlaying={isPlaying}
          setSongs={setSongs}
          libraryStatus={libraryStatus}
        />
        <audio
          onTimeUpdate={timeUpdateHandler}
          onLoadedMetadata={timeUpdateHandler}
          ref={audioRef}
          src={currentSong.audio}
          onEnded={songEndHandler}
          onLoadedData={audioLoadReady}
        ></audio>
        <AudioVisualizer
          isPlaying={isPlaying}
          audioRef={audioRef}
          visualizer={visualizer}
        />
      </div>
      <ScrollTop />
    </motion.div>
  );
};
