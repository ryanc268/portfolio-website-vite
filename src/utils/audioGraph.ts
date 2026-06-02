import { MutableRefObject } from "react";

export const connectVisualizationRoute = (
  source: MediaElementAudioSourceNode,
  analyser: AnalyserNode,
  gainNode: GainNode,
) => {
  source.disconnect();
  source.connect(analyser);
  analyser.connect(gainNode);
};

export const connectPlaybackRoute = (
  audioSource: MutableRefObject<MediaElementAudioSourceNode | null>,
  gainNode: GainNode,
  analyser?: AnalyserNode | null,
) => {
  analyser?.disconnect();
  if (!audioSource.current) return;
  audioSource.current.disconnect();
  audioSource.current.connect(gainNode);
};

export const restoreAudioOutput = connectPlaybackRoute;
