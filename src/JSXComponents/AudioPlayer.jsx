import React, { useRef, useState, useEffect } from 'react';

const AudioPlayer = ({ src }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      setProgress((currentTime / duration) * 100);
    }
  };

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div>
      <audio
        ref={audioRef}
        src={src}
        onEnded={handleEnded}
        onTimeUpdate={handleTimeUpdate}
      />
      <button onClick={togglePlayPause}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <div>
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={(e) => {
            const newProgress = e.target.value;
            if (audioRef.current) {
              audioRef.current.currentTime = (newProgress / 100) * audioRef.current.duration;
            }
            setProgress(newProgress);
          }}
        />
      </div>
      <div>
        <label>Volume:</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
