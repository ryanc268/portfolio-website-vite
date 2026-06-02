import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { Visualizer } from "../../global/enums";

interface PlayerNavProps {
  libraryStatus: boolean;
  setLibraryStatus: React.Dispatch<React.SetStateAction<boolean>>;
  visualizer: Visualizer;
  setVisualizer: React.Dispatch<React.SetStateAction<Visualizer>>;
}

const visualizerOptions: { value: Visualizer; label: string }[] = [
  { value: Visualizer.BASIC, label: "Basic" },
  { value: Visualizer.WAVEFORM, label: "Waveform" },
  { value: Visualizer.PARTY, label: "Party" },
  { value: Visualizer.SHARP, label: "Sharp" },
  { value: Visualizer.BLOCK, label: "Block" },
  { value: Visualizer.CHAOS, label: "Chaos" },
  { value: Visualizer.CIRCLE_BAR, label: "Circle" },
  { value: Visualizer.REFLECTED_BAR, label: "Reflected" },
];

const libraryButtonClass =
  "shrink-0 rounded-sm border border-slate-600 bg-zinc-800 px-3 py-2 text-sm text-white/95 transition-all duration-300 hover:border-white/30 hover:bg-zinc-700 active:scale-[0.98]";

const pushTransition =
  "transition-transform duration-500 motion-reduce:transition-none";

const PlayerNav: React.FC<PlayerNavProps> = ({
  libraryStatus,
  setLibraryStatus,
  visualizer,
  setVisualizer,
}) => {
  const labelPushedOff = libraryStatus
    ? "-translate-x-[100vw] opacity-0 md:translate-x-0 md:opacity-100"
    : "translate-x-0 opacity-100";

  const tabsPushedOff = libraryStatus
    ? "translate-x-[100vw] md:translate-x-0"
    : "translate-x-0";

  return (
    <div className="relative px-4 pt-1 font-montserrat sm:pt-2 md:px-20 2xl:px-60">
      <div className="relative z-[60] mb-2 flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1 overflow-hidden">
          <p
            className={`text-sm font-medium whitespace-nowrap text-white transition-[transform,opacity] duration-500 motion-reduce:transition-none md:text-base ${labelPushedOff}`}
          >
            Visualizer
          </p>
        </div>
        <button
          type="button"
          className={libraryButtonClass}
          onClick={() => setLibraryStatus(!libraryStatus)}
          aria-pressed={libraryStatus}
          aria-label={libraryStatus ? "Close library" : "Open library"}
        >
          Library&nbsp;
          <FontAwesomeIcon icon={faMusic} />
        </button>
      </div>

      <div
        className={`relative overflow-hidden md:overflow-visible ${libraryStatus ? "z-10" : "z-[60]"}`}
      >
        <div className={`${pushTransition} ${tabsPushedOff}`}>
          <div
            className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden"
            role="tablist"
            aria-label="Visualizer options"
          >
          {visualizerOptions.map(({ value, label }) => {
            const isActive = visualizer === value;
            return (
              <button
                key={value}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setVisualizer(value)}
                className={`shrink-0 snap-start rounded-full px-4 py-2 text-xs whitespace-nowrap transition md:px-5 md:text-sm ${
                  isActive
                    ? "bg-cyan-custom font-medium text-[#1b1b1b]"
                    : "border border-white/20 bg-zinc-800 text-white/95 hover:border-cyan-custom/40 hover:bg-zinc-700 hover:text-white"
                }`}
              >
                {label}
              </button>
            );
          })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerNav;
