import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

interface PlayerNavProps {
  libraryStatus: boolean;
  setLibraryStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

const PlayerNav: React.FC<PlayerNavProps> = ({
  libraryStatus,
  setLibraryStatus,
}) => {
  return (
    <div className="flex items-center justify-around text-xs md:text-xl pt-2 font-montserrat">
      <h3>Visualize My Music With My Custom Visualizer</h3>
      <button
        className="z-30 border border-slate-600 bg-zinc-800 p-2 rounded-sm transition-all duration-300"
        onClick={() => setLibraryStatus(!libraryStatus)}
      >
        Library
        <FontAwesomeIcon icon={faMusic} />
      </button>
    </div>
  );
};

export default PlayerNav;
