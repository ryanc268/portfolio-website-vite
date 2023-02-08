import React, { MutableRefObject, useEffect, useRef } from "react";

interface AudioVisualizerProps {
  isPlaying: boolean;
  audioRef: MutableRefObject<HTMLAudioElement | null>;
}

const audioContext = new AudioContext();

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  isPlaying,
  audioRef,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D>();

  let audioSource: MediaElementAudioSourceNode;
  let analyser: AnalyserNode;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas!.getContext("2d");
    if (!context) throw new Error("Visualizer Could Not Get Canvas Context");
    contextRef.current = context;
    startVisualizer();
    return () => {
      audioSource.disconnect();
      analyser.disconnect();
      audioContext.suspend();
    };
  }, []);

  useEffect(() => {
    audioContext.resume();
  }, [isPlaying]);

  //Event Handlers
  const startVisualizer = () => {
    const audio = audioRef.current as HTMLAudioElement;
    if (!audioSource) {
      audioSource = audioContext.createMediaElementSource(audio);
      analyser = audioContext.createAnalyser();
      audioSource.connect(analyser);
      analyser.connect(audioContext.destination);
      analyser.fftSize = 1024;
    }
    //will be half of fftSize
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const barWidth = canvasRef.current!.width / bufferLength;

    let barHeight: number;
    let x: number;

    const animate = () => {
      x = 0;
      contextRef.current!.clearRect(
        0,
        0,
        canvasRef.current!.width,
        canvasRef.current!.height
      );
      if (!audio.paused) {
        //console.log("animating");
        analyser.getByteFrequencyData(dataArray);
        drawVisualizer(bufferLength, x, barWidth, barHeight, dataArray);
      }
      requestAnimationFrame(animate);
    };
    animate();
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
    <div>
      <canvas
        className="absolute top-0 left-0 -z-10 h-full w-extra"
        ref={canvasRef}
      ></canvas>
    </div>
  );
};

export default AudioVisualizer;
