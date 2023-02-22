import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { Visualizer } from "../global/enums";
import BasicVisualizer from "./visualizers/BasicVisualizer";
import BlockVisualizer from "./visualizers/BlockVisualizer";
import PartyVisualizer from "./visualizers/PartyVisualizer";
import SharpVisualizer from "./visualizers/SharpVisualizer";
import ChaosVisualizer from "./visualizers/ChaosVisualizer";
// import RunescapeVisualizer from "./visualizers/RunescapeVisualizer";

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

  const didLoad = useRef<boolean>(false);

  //TODO: Fix - AudioContext was not allowed to start. It must be resumed (or created) after a user gesture on the page
  useEffect(() => {
    if (didLoad.current && isPlaying) audioContext.resume();
    else didLoad.current = true;
  }, [isPlaying]);

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
      case Visualizer.CHAOS:
        return (
          <ChaosVisualizer
            audioRef={audioRef}
            audioContext={audioContext}
            audioSource={audioSource}
          />
        );
      // case Visualizer.RS:
      //   return (
      //     <RunescapeVisualizer
      //       audioRef={audioRef}
      //       audioContext={audioContext}
      //       audioSource={audioSource}
      //     />
      //   );
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
