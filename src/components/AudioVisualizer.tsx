import { useEffect, useState } from "react";
import { Visualizer } from "../global/enums";
import { useMusicPlayer } from "../context/MusicPlayerContext";
import BasicVisualizer from "./visualizers/BasicVisualizer";
import BlockVisualizer from "./visualizers/BlockVisualizer";
import PartyVisualizer from "./visualizers/PartyVisualizer";
import SharpVisualizer from "./visualizers/SharpVisualizer";
import ChaosVisualizer from "./visualizers/ChaosVisualizer";
import WaveformVisualizer from "./visualizers/WaveformVisualizer";
import ReflectedBarVisualizer from "./visualizers/ReflectedBarVisualizer";
import CircleBarVisualizer from "./visualizers/CircleBarVisualizer";

interface AudioVisualizerProps {
  isPlaying: boolean;
  visualizer: Visualizer;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  isPlaying,
  visualizer,
}) => {
  const {
    audioRef,
    getAudioContext,
    audioSourceRef,
    gainNodeRef,
    ensureAudioGraph,
  } = useMusicPlayer();
  const [graphReady, setGraphReady] = useState(false);

  useEffect(() => {
    if (!isPlaying) {
      setGraphReady(false);
      return;
    }

    ensureAudioGraph();
    const ctx = getAudioContext();
    if (ctx.state === "suspended") {
      void ctx.resume();
    }
    setGraphReady(gainNodeRef.current !== null);
  }, [ensureAudioGraph, gainNodeRef, getAudioContext, isPlaying]);

  if (!isPlaying || !graphReady || !gainNodeRef.current) {
    return null;
  }

  const visualizerProps = {
    audioRef,
    audioContext: getAudioContext(),
    audioSource: audioSourceRef,
    gainNode: gainNodeRef.current,
  };

  switch (visualizer) {
    case Visualizer.BASIC:
      return <BasicVisualizer {...visualizerProps} />;
    case Visualizer.WAVEFORM:
      return <WaveformVisualizer {...visualizerProps} />;
    case Visualizer.PARTY:
      return <PartyVisualizer {...visualizerProps} />;
    case Visualizer.SHARP:
      return <SharpVisualizer {...visualizerProps} />;
    case Visualizer.BLOCK:
      return <BlockVisualizer {...visualizerProps} />;
    case Visualizer.CHAOS:
      return <ChaosVisualizer {...visualizerProps} />;
    case Visualizer.CIRCLE_BAR:
      return <CircleBarVisualizer {...visualizerProps} />;
    case Visualizer.REFLECTED_BAR:
      return <ReflectedBarVisualizer {...visualizerProps} />;
    default:
      return <BasicVisualizer {...visualizerProps} />;
  }
};

export default AudioVisualizer;
