import React, { MutableRefObject, useEffect, useRef, useState } from "react";

interface AudioVisualizerProps {
  isPlaying: boolean;
  audioRef: MutableRefObject<HTMLAudioElement | null>;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  isPlaying,
  audioRef,
}) => {
  const didLoad = useRef<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const contextRef = useRef<CanvasRenderingContext2D>();

  const [audioContext, setAudioContext] = useState<AudioContext>();

  let audioSource = useRef<MediaElementAudioSourceNode | null>(null);
  let analyser = useRef<AnalyserNode | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas!.getContext("2d");
    if (!context) throw new Error("Visualizer Could Not Get Canvas Context");
    contextRef.current = context;
  }, []);

  useEffect(() => {
    if (didLoad.current) {
      setAudioContext(new AudioContext());
    } else didLoad.current = true;
  }, [isPlaying]);

  useEffect(() => {
    if (didLoad.current && isPlaying) {
      startVisualizer();
      audioContext!.resume();
    }
  }, [audioContext]);

  //Event Handlers
  const startVisualizer = () => {
    //setAudioContext();
    const audio = audioRef.current as HTMLAudioElement;

    if (!audioSource.current) {
      audioSource.current = audioContext!.createMediaElementSource(audio);
      analyser.current = audioContext!.createAnalyser();
      audioSource.current.connect(analyser.current);
      analyser.current.connect(audioContext!.destination);
      analyser.current.fftSize = 1024;
    }
    //will be half of fftSize
    const bufferLength = analyser.current!.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const barWidth = canvasRef.current!.width / bufferLength;

    let barHeight: number;
    let x: number;

    const animate = () => {
      x = 0;
      if (contextRef.current && canvasRef.current) {
        contextRef.current.clearRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        if (!audio.paused) {
          analyser.current!.getByteFrequencyData(dataArray);
          drawVisualizer(bufferLength, x, barWidth, barHeight, dataArray);
        }
      }
      requestAnimationFrame(animate);
    };
    if (isPlaying) animate();
  };

  const drawVisualizer = (
    bufferLength: number,
    x: number,
    barWidth: number,
    barHeight: number,
    dataArray: Uint8Array
  ) => {
    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i] / 1.7;
      //top of the bar design
      contextRef.current!.fillStyle = "#666666";
      contextRef.current!.fillRect(
        x,
        canvasRef.current!.height - barHeight - 3,
        barWidth,
        barHeight > 0 ? 2 : 0
      );
      //main bar design
      contextRef.current!.fillStyle = "#333333";
      contextRef.current!.fillRect(
        x,
        canvasRef.current!.height - barHeight,
        barWidth,
        barHeight
      );
      x += barWidth;
    }
  };

  return (
    <canvas
      className="fixed top-0 left-0 -z-10 h-screen w-extra"
      ref={canvasRef}
    />
  );
};

export default AudioVisualizer;
