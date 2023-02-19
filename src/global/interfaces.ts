import { MutableRefObject } from "react";

export interface Song {
  name: string;
  artist: string;
  year: number;
  url: string;
  cover: string;
  id: string;
  active: boolean;
  color: string[];
  audio: string;
}

export interface SongInfo {
  currentTime: number;
  duration: number;
  animationPercerntage: number;
  volume: number;
  animationPercentage?: number;
}

export interface VisualizerProps {
  audioRef: MutableRefObject<HTMLAudioElement | null>;
  audioContext: AudioContext;
  audioSource: MutableRefObject<MediaElementAudioSourceNode | null>;
}
