import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { Visualizer } from "../global/enums";

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
  const FFT_SIZE = 1024; //1024

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
  }, [isPlaying, visualizer]);

  useEffect(() => {
    if (didLoad.current && isPlaying) {
      startVisualizer();
      audioContext!.resume();
    }
  }, [audioContext]);

  function isMobile() {
    return window.innerWidth <= 768;
  }

  //Event Handlers
  const startVisualizer = () => {
    //setAudioContext();
    const audio = audioRef.current as HTMLAudioElement;

    if (!audioSource.current) {
      audioSource.current = audioContext!.createMediaElementSource(audio);
      analyser.current = audioContext!.createAnalyser();
      audioSource.current.connect(analyser.current);
      analyser.current.connect(audioContext!.destination);
      analyser.current.fftSize = FFT_SIZE;
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
          switch (visualizer) {
            case Visualizer.BASIC:
              drawBasicVisualizer(
                bufferLength,
                x,
                barWidth,
                barHeight,
                dataArray
              );
              break;
            case Visualizer.PARTY:
              drawPartyVisualizer(
                bufferLength,
                x,
                barWidth,
                barHeight,
                dataArray
              );
              break;
            case Visualizer.SHARP:
              drawSharpVisualizer(
                bufferLength,
                x,
                barWidth,
                barHeight,
                dataArray
              );
              break;
            case Visualizer.BLOCK:
              drawBlockVisualizer(
                bufferLength,
                x,
                barWidth,
                barHeight,
                dataArray
              );
              break;
            default:
              drawBasicVisualizer(
                bufferLength,
                x,
                barWidth,
                barHeight,
                dataArray
              );
              break;
          }
        }
      }
      requestAnimationFrame(animate);
    };
    if (isPlaying) animate();
  };

  const drawBasicVisualizer = (
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
      x += barWidth * 1.2;
    }
  };

  const drawPartyVisualizer = (
    bufferLength: number,
    x: number,
    barWidth: number,
    barHeight: number,
    dataArray: Uint8Array
  ) => {
    for (let i = 0; i < bufferLength; i++) {
      barHeight = isMobile() ? dataArray[i] * 2.1 : dataArray[i] * 1.4;
      contextRef.current!.save();
      //Move to middle of screen
      contextRef.current!.translate(
        canvasRef.current!.width / 2,
        canvasRef.current!.height / 2
      );
      contextRef.current!.rotate(i * bufferLength * 4);
      //Calculate colour
      const hue = 250 + i * 2;
      contextRef.current!.fillStyle = `hsl(${hue}, 100%, 50%)`;
      contextRef.current!.beginPath();
      //draw the shape
      contextRef.current!.arc(
        0,
        barHeight / 1.5,
        barHeight / 150,
        0,
        Math.PI * 2
      );
      contextRef.current!.fill();
      contextRef.current!.restore();
    }
  };

  const drawSharpVisualizer = (
    bufferLength: number,
    x: number,
    barWidth: number,
    barHeight: number,
    dataArray: Uint8Array
  ) => {
    for (let i = 0; i < bufferLength; i++) {
      barHeight = isMobile() ? dataArray[i] * 5 : dataArray[i] * 2.5;
      contextRef.current!.save();
      //Move to middle of screen
      contextRef.current!.translate(
        canvasRef.current!.width / 2,
        canvasRef.current!.height / 2
      );
      contextRef.current!.rotate(i * 15);
      //Calculate colour
      const hue = 120 + i * 0.4;
      contextRef.current!.fillStyle = `hsl(${hue}, 100%, 50%)`;
      contextRef.current!.beginPath();
      //draw the shape
      contextRef.current!.arc(10, barHeight / 6, barHeight / 8, 0, Math.PI / 6);
      contextRef.current!.fill();
      contextRef.current!.restore();
    }
  };

  const drawBlockVisualizer = (
    bufferLength: number,
    x: number,
    barWidth: number,
    barHeight: number,
    dataArray: Uint8Array
  ) => {
    contextRef.current!.lineCap = "square";
    contextRef.current!.shadowOffsetX = 4;
    contextRef.current!.shadowOffsetY = 2;
    contextRef.current!.shadowBlur = 5;
    contextRef.current!.shadowColor = "black";
    for (let i = 0; i < bufferLength; i++) {
      barHeight = isMobile() ? dataArray[i] / 1.75 : dataArray[i] / 3;
      contextRef.current!.save();
      //Move to middle of screen
      contextRef.current!.translate(
        canvasRef.current!.width / 2,
        canvasRef.current!.height / 2
      );
      contextRef.current!.rotate(i * 6);
      contextRef.current!.lineWidth = barHeight / 4;
      contextRef.current!.beginPath();
      contextRef.current!.moveTo(0, 0);
      contextRef.current!.lineTo(0, barHeight);
      contextRef.current!.stroke();

      contextRef.current!.lineWidth = barHeight / 5;
      contextRef.current!.strokeStyle = `rgba(150,150,150,1)`;
      contextRef.current!.beginPath();
      contextRef.current!.moveTo(0, 0);
      contextRef.current!.lineTo(0, barHeight);
      contextRef.current!.stroke();

      contextRef.current!.restore();
    }
  };

  return (
    <canvas
      className="fixed top-0 left-0 -z-10 h-screen w-screen"
      ref={canvasRef}
    />
  );
};

export default AudioVisualizer;
