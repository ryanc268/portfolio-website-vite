import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { Visualizer } from "../global/enums";
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
  audioRef: MutableRefObject<HTMLAudioElement | null>;
  visualizer: Visualizer;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  isPlaying,
  audioRef,
  visualizer,
}) => {
  const [audioContext] = useState<AudioContext>(() => {
    try {
      const context = new AudioContext();
      console.log("AudioContext created successfully", context.state);
      return context;
    } catch (error) {
      console.error("Failed to create AudioContext:", error);
      throw error;
    }
  });

  const audioSource = useRef<MediaElementAudioSourceNode | null>(null);

  const didLoad = useRef<boolean>(false);

  useEffect(() => {
    const handleStateChange = () => {
      console.log("AudioContext state changed:", audioContext.state);
    };

    // Add state change listener
    audioContext.onstatechange = handleStateChange;

    return () => {
      audioContext.onstatechange = null;
    };
  }, [audioContext]);

  useEffect(() => {
    if (didLoad.current && isPlaying) {
      try {
        console.log("Attempting to resume AudioContext...");
        audioContext
          .resume()
          .then(() => {
            console.log("AudioContext resumed successfully");
          })
          .catch((error) => {
            console.error("Failed to resume AudioContext:", error);
          });
      } catch (error) {
        console.error("Error in AudioContext resume:", error);
      }
    } else {
      didLoad.current = true;
    }
  }, [isPlaying]);

  // Add error handling for audio processing
  useEffect(() => {
    const handleAudioError = (error: Event) => {
      console.error("Audio processing error:", error);
      if (error instanceof ErrorEvent) {
        console.error("Error message:", error.message);
      }
    };

    audioContext.addEventListener("error", handleAudioError);

    return () => {
      audioContext.removeEventListener("error", handleAudioError);
    };
  }, [audioContext]);

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
      case Visualizer.WAVEFORM:
        return (
          <WaveformVisualizer
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
      case Visualizer.CIRCLE_BAR:
        return (
          <CircleBarVisualizer
            audioRef={audioRef}
            audioContext={audioContext}
            audioSource={audioSource}
          />
        );
      case Visualizer.REFLECTED_BAR:
        return (
          <ReflectedBarVisualizer
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
