import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { RadioGroup } from "@headlessui/react";
import { Visualizer } from "../../global/enums";

interface PlayerNavProps {
  libraryStatus: boolean;
  setLibraryStatus: React.Dispatch<React.SetStateAction<boolean>>;
  visualizer: Visualizer;
  setVisualizer: React.Dispatch<React.SetStateAction<Visualizer>>;
}

const visualizerValues = Object.values(Visualizer)
  .filter((value) => typeof value !== "string")
  .map((value) => value as Visualizer);

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const PlayerNav: React.FC<PlayerNavProps> = ({
  libraryStatus,
  setLibraryStatus,
  visualizer,
  setVisualizer,
}) => {
  return (
    <div className="flex items-center justify-around pt-2 font-montserrat text-xs md:text-xl">
      <div>
        <RadioGroup
          value={visualizer}
          onChange={(e) => setVisualizer(e)}
          className="mt-2"
        >
          <RadioGroup.Label className="sr-only">
            Choose a memory option
          </RadioGroup.Label>
          <div className="flex flex-row justify-center gap-1 md:gap-4 md:px-40">
            {visualizerValues.map((option) => (
              <RadioGroup.Option
                key={option}
                value={option}
                className={({ active, checked }) =>
                  classNames(
                    active ? "ring-2 ring-indigo-500 ring-offset-2" : "",
                    checked
                      ? "border-transparent bg-indigo-600 text-xs hover:bg-indigo-700 md:text-base"
                      : "bg-tr border-gray-200 text-xs hover:bg-indigo-700 md:text-base",
                    "flex items-center justify-center rounded-md border p-2 text-sm font-medium uppercase sm:flex-1"
                  )
                }
              >
                <RadioGroup.Label as="span">
                  {Visualizer[option]}
                </RadioGroup.Label>
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
      <button
        className="z-30 rounded-sm border border-slate-600 bg-zinc-800 p-2 transition-all duration-300"
        onClick={() => setLibraryStatus(!libraryStatus)}
      >
        Library
        <FontAwesomeIcon icon={faMusic} />
      </button>
    </div>
  );
};

export default PlayerNav;
