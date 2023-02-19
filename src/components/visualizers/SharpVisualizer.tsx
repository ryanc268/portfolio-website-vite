import { useEffect, useRef } from "react";
import { VisualizerProps } from "../../global/interfaces";

const SharpVisualizer: React.FC<VisualizerProps> = ({
  audioRef,
  audioContext,
  audioSource,
}: VisualizerProps) => {
  const FFT_SIZE = 1024;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const contextRef = useRef<CanvasRenderingContext2D>();

  const analyser = useRef<AnalyserNode | null>(null);

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
    audioContext?.resume();
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
          drawSharpVisualizer(bufferLength, barHeight, dataArray);
        }
      }
      animationId = requestAnimationFrame(animate);
    };
    animate();
  };

  const drawSharpVisualizer = (
    bufferLength: number,
    barHeight: number,
    dataArray: Uint8Array
  ) => {
    if (!contextRef.current || !canvasRef.current) return;
    for (let i = 0; i < bufferLength; i++) {
      barHeight = isMobile() ? dataArray[i] * 5 : dataArray[i] * 2.5;
      contextRef.current.save();
      //Move to middle of screen
      contextRef.current.translate(
        canvasRef.current.width / 2,
        canvasRef.current.height / 2
      );
      contextRef.current.rotate(i * 15);
      //Calculate colour
      const hue = 120 + i * 0.4;
      contextRef.current.fillStyle = `hsl(${hue}, 100%, 50%)`;
      contextRef.current.beginPath();
      //draw the shape
      contextRef.current.arc(10, barHeight / 6, barHeight / 8, 0, Math.PI / 6);
      contextRef.current.fill();
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

export default SharpVisualizer;
