import { useEffect, useRef } from "react";
import { VisualizerProps } from "../../global/interfaces";

const BasicVisualizer: React.FC<VisualizerProps> = ({
  isPlaying,
  audioRef,
  audioContext,
  audioSource,
}) => {
  const FFT_SIZE = 1024; //1024

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const contextRef = useRef<CanvasRenderingContext2D>();

  let analyser = useRef<AnalyserNode | null>(null);

  let animationId = 0;

  //Initial Page load
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas!.getContext("2d");
    if (!context) throw new Error("Visualizer Could Not Get Canvas Context");
    contextRef.current = context;
    startVisualizer();
    audioContext!.resume();
    return () => {
      audioSource.current!.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, []);

  //Event Handlers
  const startVisualizer = () => {
    const audio = audioRef.current as HTMLMediaElement;

    audioSource.current =
      audioSource.current || audioContext!.createMediaElementSource(audio);
    analyser.current = audioContext!.createAnalyser();
    audioSource.current.connect(analyser.current);
    analyser.current.connect(audioContext!.destination);
    analyser.current.fftSize = FFT_SIZE;

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
          drawBasicVisualizer(bufferLength, x, barWidth, barHeight, dataArray);
        }
      }
      animationId = requestAnimationFrame(animate);
    };
    animate();
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
  return (
    <canvas
      className="fixed top-0 left-0 -z-10 h-screen w-screen"
      ref={canvasRef}
    />
  );
};

export default BasicVisualizer;
