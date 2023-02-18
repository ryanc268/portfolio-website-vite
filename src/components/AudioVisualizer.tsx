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
  const [audioContext, setAudioContext] = useState<AudioContext>(
    new AudioContext()
  );

  let audioSource = useRef<MediaElementAudioSourceNode | null>(null);

  const renderVizualizer = () => {
    switch (visualizer) {
      case Visualizer.BASIC:
        return (
          <BasicVisualizer
            isPlaying={isPlaying}
            audioRef={audioRef}
            audioContext={audioContext}
            audioSource={audioSource}
          />
        );
      case Visualizer.PARTY:
        return (
          <PartyVisualizer
            isPlaying={isPlaying}
            audioRef={audioRef}
            audioContext={audioContext}
            audioSource={audioSource}
          />
        );
      case Visualizer.SHARP:
        return (
          <SharpVisualizer
            isPlaying={isPlaying}
            audioRef={audioRef}
            audioContext={audioContext}
            audioSource={audioSource}
          />
        );
      case Visualizer.BLOCK:
        return (
          <BlockVisualizer
            isPlaying={isPlaying}
            audioRef={audioRef}
            audioContext={audioContext}
            audioSource={audioSource}
          />
        );
      default:
        return (
          <BasicVisualizer
            isPlaying={isPlaying}
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
