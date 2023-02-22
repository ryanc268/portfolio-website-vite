import { useEffect, useRef } from "react";
import { VisualizerProps } from "../../global/interfaces";
import chaosRune from "/src/assets/smoke.png";
import fireRune from "/src/assets/fire.png";
import unidHerb from "/src/assets/unid.png";

const RunescapeVisualizer: React.FC<VisualizerProps> = ({
  audioRef,
  audioContext,
  audioSource,
}: VisualizerProps) => {
  //Only use doubles or halves
  const FFT_SIZE = 256;

  const DATA_ARRAY_COEFFICIENT = isMobile() ? 2 : 2;

  const BASE = isMobile() ? 20 : 10;

  const DIVISOR = isMobile() ? 5 : 1.5;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const contextRef = useRef<CanvasRenderingContext2D>();

  const analyser = useRef<AnalyserNode>();

  const ChaosRuneImg = new Image();
  ChaosRuneImg.src = chaosRune;

  const FireRuneImg = new Image();
  FireRuneImg.src = fireRune;

  const UnidHerbImg = new Image();
  UnidHerbImg.src = unidHerb;

  let animationId = 0;

  function isMobile() {
    return window.innerWidth <= 768;
  }

  //Initial Page load
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!context) throw new Error("Visualizer Could Not Get Canvas Context");
    contextRef.current = context;
    startVisualizer();
    return () => {
      audioSource.current?.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, []);

  //Event Handlers
  const startVisualizer = () => {
    const audio = audioRef.current as HTMLMediaElement;

    audioSource.current =
      audioSource.current || audioContext.createMediaElementSource(audio);
    analyser.current = audioContext.createAnalyser();
    audioSource.current.connect(analyser.current);
    analyser.current.connect(audioContext.destination);
    analyser.current.fftSize = FFT_SIZE;

    //will be half of fftSize
    const bufferLength = analyser.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    let barHeight: number;

    const animate = () => {
      if (contextRef.current && canvasRef.current) {
        contextRef.current.clearRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        if (!audio.paused && analyser.current) {
          analyser.current.getByteFrequencyData(dataArray);
          drawRunescapeVisualizer(bufferLength, barHeight, dataArray);
        }
      }
      animationId = requestAnimationFrame(animate);
    };
    animate();
  };

  const drawRunescapeVisualizer = (
    bufferLength: number,
    barHeight: number,
    dataArray: Uint8Array
  ) => {
    if (!contextRef.current || !canvasRef.current) return;
    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i] / DATA_ARRAY_COEFFICIENT;
      contextRef.current.save();
      contextRef.current.translate(
        canvasRef.current.width / 2,
        canvasRef.current.height / 2
      );
      // contextRef.current.rotate((i * Math.PI * 10) / bufferLength);
      contextRef.current.rotate(i * 5);

      contextRef.current.drawImage(
        ChaosRuneImg,
        0,
        barHeight,
        barHeight / 3,
        barHeight / 3
      );

      contextRef.current.rotate(i * 12);

      contextRef.current.drawImage(
        FireRuneImg,
        0,
        barHeight,
        barHeight / 4.5,
        barHeight / 4.5
      );

      contextRef.current.restore();
    }

    for (let i = bufferLength; i > 0; i--) {
      barHeight =
        dataArray[i] >= BASE
          ? dataArray[i] * DIVISOR < BASE
            ? BASE
            : dataArray[i] * DIVISOR
          : 0;
      contextRef.current?.save();
      contextRef.current.translate(
        canvasRef.current.width / 2,
        canvasRef.current.height / 2
      );
      contextRef.current.rotate(i);
      contextRef.current.drawImage(
        UnidHerbImg,
        50,
        0,
        barHeight / 9,
        barHeight / 9
      );
      contextRef.current.restore();
    }
  };

  return (
    <canvas
      className="fixed top-0 left-0 -z-10 h-screen w-screen"
      ref={canvasRef}
    />
  );
};

export default RunescapeVisualizer;
