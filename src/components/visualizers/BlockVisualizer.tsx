import { useEffect, useRef } from "react";
import { VisualizerProps } from "../../global/interfaces";

const BlockVisualizer: React.FC<VisualizerProps> = ({
  isPlaying,
  audioRef,
  audioContext,
  audioSource,
}) => {
  const FFT_SIZE = 1024;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const contextRef = useRef<CanvasRenderingContext2D>();

  let analyser = useRef<AnalyserNode | null>(null);

  let animationId = 0;

  function isMobile() {
    return window.innerWidth <= 768;
  }

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

    let barHeight: number;

    const animate = () => {
      console.log("Block");
      if (contextRef.current && canvasRef.current) {
        contextRef.current.clearRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        if (!audio.paused) {
          analyser.current!.getByteFrequencyData(dataArray);
          drawBlockVisualizer(bufferLength, barHeight, dataArray);
        }
      }
      animationId = requestAnimationFrame(animate);
    };
    animate();
  };

  const drawBlockVisualizer = (
    bufferLength: number,
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

export default BlockVisualizer;
