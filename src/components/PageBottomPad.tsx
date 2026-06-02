import { useMusicPlayer } from "../context/MusicPlayerContext";

const PageBottomPad: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { showMiniPlayer } = useMusicPlayer();

  return (
    <div
      className={`transition-[padding-bottom] duration-300 ease-out ${
        showMiniPlayer ? "max-sm:pb-[var(--mini-player-offset,7.5rem)]" : ""
      }`}
    >
      {children}
    </div>
  );
};

export default PageBottomPad;
