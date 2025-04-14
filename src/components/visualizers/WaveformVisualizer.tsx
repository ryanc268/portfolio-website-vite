import { useEffect, useRef } from "react";
import { VisualizerProps } from "../../global/interfaces";

const WaveformVisualizer: React.FC<VisualizerProps> = ({
  audioRef,
  audioContext,
  audioSource,
}: VisualizerProps) => {
  // Using a larger FFT size for more detail in the waveform
  const FFT_SIZE = 2048;

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
    // Ensure audio output is connected
    analyser.current.connect(audioContext.destination);
    analyser.current.fftSize = FFT_SIZE;

    const bufferLength = analyser.current.fftSize;
    const dataArray = new Uint8Array(bufferLength);

    // Calculate dimensions once
    const canvasWidth = canvasRef.current?.width || window.innerWidth;
    const canvasHeight = canvasRef.current?.height || window.innerHeight;

    const animate = () => {
      if (
        contextRef.current &&
        canvasRef.current &&
        analyser.current &&
        !audio.paused
      ) {
        analyser.current.getByteTimeDomainData(dataArray); // Get waveform data
        drawWaveform(bufferLength, dataArray, canvasWidth, canvasHeight);
      } else if (contextRef.current && canvasRef.current) {
        // Clear canvas if paused
        contextRef.current.clearRect(0, 0, canvasWidth, canvasHeight);
      }
      animationId = requestAnimationFrame(animate);
    };
    animate();
  };

  const drawWaveform = (
    bufferLength: number,
    dataArray: Uint8Array,
    canvasWidth: number,
    canvasHeight: number
  ) => {
    if (!contextRef.current) return;
    const ctx = contextRef.current;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Apply the softened style
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "rgb(64, 224, 208)"; // Softer teal color
    ctx.shadowColor = "rgba(64, 224, 208, 0.5)";
    ctx.shadowBlur = 2;

    ctx.beginPath();

    const sliceWidth = (canvasWidth * 1.0) / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0; // Normalize data (0-255 -> 0-2)
      const y = (v * canvasHeight) / 2;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    ctx.lineTo(canvasWidth, canvasHeight / 2);
    ctx.stroke();

    // Reset shadow
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
  };

  return (
    <canvas
      className="fixed left-0 top-0 -z-10 h-screen w-screen"
      ref={canvasRef}
    />
  );
};

export default WaveformVisualizer;
