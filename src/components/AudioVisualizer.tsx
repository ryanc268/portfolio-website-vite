import React, { MutableRefObject, useRef, useState } from "react";
import { Visualizer } from "../global/enums";
import BasicVisualizer from "./visualizers/BasicVisualizer";
import BlockVisualizer from "./visualizers/BlockVisualizer";
import PartyVisualizer from "./visualizers/PartyVisualizer";
import SharpVisualizer from "./visualizers/SharpVisualizer";

interface AudioVisualizerProps {
  isPlaying: boolean;
  audioRef: MutableRefObject<HTMLAudioElement | null>;
  visualizer: Visualizer;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  isPlaying,
  audioRef,
  visualizer,
}) => {
  const [audioContext] = useState<AudioContext>(new AudioContext());

  const audioSource = useRef<MediaElementAudioSourceNode | null>(null);

  const renderVizualizer = () => {
    switch (visualizer) {
      case Visualizer.BASIC:
        return (
          <BasicVisualizer
            audioRef={audioRef}
            audioContext={audioContext}
            audioSource={audioSource}
          />
        );
      case Visualizer.PARTY:
        return (
          <PartyVisualizer
            audioRef={audioRef}
            audioContext={audioContext}
            audioSource={audioSource}
          />
        );
      case Visualizer.SHARP:
        return (
          <SharpVisualizer
            audioRef={audioRef}
            audioContext={audioContext}
            audioSource={audioSource}
          />
        );
      case Visualizer.BLOCK:
        return (
          <BlockVisualizer
            audioRef={audioRef}
            audioContext={audioContext}
            audioSource={audioSource}
          />
        );
      default:
        return (
          <BasicVisualizer
            audioRef={audioRef}
            audioContext={audioContext}
            audioSource={audioSource}
          />
        );
    }
  };

  return <>{isPlaying && renderVizualizer()}</>;
};

export default AudioVisualizer;
