import React, { useRef, useEffect } from 'react';

interface AudioPlayerProps {
  src: string;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  className?: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, onPlay, onPause, className = '', onEnded }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('play', onPlay || (() => {}));
      audio.addEventListener('pause', onPause || (() => {}));
      return () => {
        audio.removeEventListener('play', onPlay || (() => {}));
        audio.removeEventListener('pause', onPause || (() => {}));
      };
    }
  }, [onPlay, onPause]);

  return (
    <audio 
      ref={audioRef}
      className={`w-full ${className}`}
      onEnded={onEnded}
      controls
      src={src}
    />
  );
};

export default AudioPlayer;
