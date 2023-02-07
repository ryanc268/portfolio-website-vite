import React, { MutableRefObject, useEffect, useRef } from "react";

const audioContext = new AudioContext();

interface AudioVisualizerProps {
  isPlaying: boolean;
  audioRef: MutableRefObject<HTMLAudioElement | null>;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  isPlaying,
  audioRef,
}) => {
  const canvasRef = useRef();
  const contextRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    contextRef.current = context;

    startVisualizer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    audioContext.resume();
  }, [isPlaying]);

  //Event Handlers
  const startVisualizer = () => {
    const audio = audioRef.current;
    const audioSource = audioContext.createMediaElementSource(audio);
    const analyser = audioContext.createAnalyser();
    audioSource.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 1024;
    //will be half of fftSize
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const barWidth = canvasRef.current.width / bufferLength;

    let barHeight;
    let x;

    const animate = () => {
      x = 0;
      contextRef.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
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

  const drawVisualizer = (bufferLength, x, barWidth, barHeight, dataArray) => {
    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i] / 1.7;
      //top of the bar design
      contextRef.current.fillStyle = "#666666";
      contextRef.current.fillRect(
        x,
        canvasRef.current.height - barHeight - 3,
        barWidth,
        barHeight > 0 ? 2 : 0
      );
      //main bar design
      contextRef.current.fillStyle = "#333333";
      contextRef.current.fillRect(
        x,
        canvasRef.current.height - barHeight,
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
