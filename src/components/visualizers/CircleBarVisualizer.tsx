import { useEffect, useRef } from "react";
import { VisualizerProps } from "../../global/interfaces";

function isMobile() {
  return window.innerWidth <= 768;
}

const CircleBarVisualizer: React.FC<VisualizerProps> = ({
  audioRef,
  audioContext,
  audioSource,
}: VisualizerProps) => {
  // Increase FFT_SIZE for more bars/better circle coverage
  const FFT_SIZE = 1024;
  // Reduce BAR_WIDTH_FACTOR for sharper lines
  const BAR_WIDTH_FACTOR = 1.5;
  const RADIUS_FACTOR = isMobile() ? 0.15 : 0.2; // Keep the smaller radius
  const BAR_HEIGHT_SCALE = isMobile() ? 0.6 : 0.7; // Keep the reduced height

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D>(null);
  const analyser = useRef<AnalyserNode>(null);

  let animationId = 0;

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

  const startVisualizer = () => {
    const audio = audioRef.current as HTMLMediaElement;

    audioSource.current =
      audioSource.current || audioContext.createMediaElementSource(audio);
    analyser.current = audioContext.createAnalyser();
    audioSource.current.connect(analyser.current);
    analyser.current.connect(audioContext.destination);
    analyser.current.fftSize = FFT_SIZE;

    const bufferLength = analyser.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const canvasWidth = canvasRef.current?.width || window.innerWidth;
    const canvasHeight = canvasRef.current?.height || window.innerHeight;
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;
    const radius = Math.min(canvasWidth, canvasHeight) * RADIUS_FACTOR;

    const animate = () => {
      if (contextRef.current && canvasRef.current && analyser.current) {
        contextRef.current.clearRect(0, 0, canvasWidth, canvasHeight);

        if (!audio.paused) {
          analyser.current.getByteFrequencyData(dataArray);
          drawCircleBars(bufferLength, dataArray, centerX, centerY, radius);
        } else {
          // Optionally draw a static circle when paused
        }
      }
      animationId = requestAnimationFrame(animate);
    };
    animate();
  };

  const drawCircleBars = (
    bufferLength: number,
    dataArray: Uint8Array,
    centerX: number,
    centerY: number,
    radius: number
  ) => {
    if (!contextRef.current) return;
    const ctx = contextRef.current;

    // Define the portion of frequency bins to draw (e.g., lower 80% based on user adjustment)
    const drawRatio = 0.8;
    const maxIndexToDraw = Math.floor(bufferLength * drawRatio);

    // Calculate angle step based on the bars we *will* draw
    const angleStep = (Math.PI * 2) / maxIndexToDraw;

    // Loop only up to maxIndexToDraw
    for (let i = 0; i < maxIndexToDraw; i++) {
      const barHeight = dataArray[i] * BAR_HEIGHT_SCALE;
      const angle = i * angleStep; // Use the adjusted angle step

      const x1 = centerX + Math.cos(angle) * radius;
      const y1 = centerY + Math.sin(angle) * radius;
      const x2 = centerX + Math.cos(angle) * (radius + barHeight);
      const y2 = centerY + Math.sin(angle) * (radius + barHeight);

      // Color based on amplitude/position - adjusted hue range
      const hue = 180 + (dataArray[i] / 255) * 60; // Cyan to Blue range
      const lightness = 40 + (dataArray[i] / 255) * 30;
      ctx.strokeStyle = `hsl(${hue}, 90%, ${lightness}%)`;
      // Apply reduced line width
      ctx.lineWidth = BAR_WIDTH_FACTOR;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
  };

  return (
    <canvas
      className="fixed left-0 top-0 -z-10 h-screen w-screen"
      ref={canvasRef}
    />
  );
};

export default CircleBarVisualizer;
