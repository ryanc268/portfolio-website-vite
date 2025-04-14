import { useEffect, useRef } from "react";
import { VisualizerProps } from "../../global/interfaces";

const ReflectedBarVisualizer: React.FC<VisualizerProps> = ({
  audioRef,
  audioContext,
  audioSource,
}: VisualizerProps) => {
  const FFT_SIZE = 1024;
  const BAR_HEIGHT_SCALE = 1.5;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D>(null);
  const analyser = useRef<AnalyserNode>(null);

  let animationId = 0;

  // Function to handle resizing
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas && contextRef.current) {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!context || !canvas)
      throw new Error("Visualizer Could Not Get Canvas Context");
    contextRef.current = context;

    // Initial resize
    resizeCanvas();

    startVisualizer();

    // Add resize listener
    window.addEventListener("resize", resizeCanvas);

    return () => {
      audioSource.current?.disconnect();
      cancelAnimationFrame(animationId);
      // Remove resize listener on cleanup
      window.removeEventListener("resize", resizeCanvas);
    };
    // Intentionally empty dependency array
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

    const animate = () => {
      // Recalculate dimensions and related values inside the loop
      const canvas = canvasRef.current;
      const ctx = contextRef.current;
      const analyserNode = analyser.current;

      if (ctx && canvas && analyserNode) {
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const barWidth = (canvasWidth / bufferLength) * 1.2;
        const centerY = canvasHeight / 2;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        if (!audio.paused) {
          analyserNode.getByteFrequencyData(dataArray);
          // Pass recalculated values
          drawReflectedBars(
            bufferLength,
            dataArray,
            barWidth,
            canvasHeight,
            centerY
          );
        } else {
          // Clear when paused
        }
      }
      animationId = requestAnimationFrame(animate);
    };
    animate();
  };

  const drawReflectedBars = (
    bufferLength: number,
    dataArray: Uint8Array,
    barWidth: number,
    canvasHeight: number,
    centerY: number
  ) => {
    if (!contextRef.current) return;
    const ctx = contextRef.current;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const barHeight = dataArray[i] / BAR_HEIGHT_SCALE * 3;

      // Color based on amplitude
      const hue = 250 + (dataArray[i] / 255) * 60; // Blue/Purple range
      const lightness = 30 + (dataArray[i] / 255) * 40;
      ctx.fillStyle = `hsl(${hue}, 95%, ${lightness}%)`;

      // Draw top bar
      ctx.fillRect(x, centerY - barHeight, barWidth, barHeight);
      // Draw reflected bottom bar
      ctx.fillRect(x, centerY, barWidth, barHeight);

      x += barWidth * 1.1; // Move to next bar position with small gap
    }
  };

  return (
    <canvas
      className="fixed left-0 top-0 -z-10 h-screen w-screen"
      ref={canvasRef}
    />
  );
};

export default ReflectedBarVisualizer;
