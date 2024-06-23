"use client"
import React, { useState } from 'react';
import TextToSpeechLayout from './layouts/TextToSpeechLayout';

interface HistoryItem {
  id: number;
  text: string;
  model: string;
  voice: string;
  speed: number;
  timestamp: string;
  audioUrl: string;
}

const TextToSpeechClient: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [text, setText] = useState('');
  const [model, setModel] = useState('tts-1');
  const [voice, setVoice] = useState('alloy');
  const [speed, setSpeed] = useState(1);
  const [audioUrl, setAudioUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);

  const generateSpeech = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('https://api.openai.com/v1/audio/speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          input: text,
          voice,
          speed,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to generate speech');
      }

      const audioBlob = await response.blob();
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);

      const newHistoryItem: HistoryItem = {
        id: Date.now(),
        text,
        model,
        voice,
        speed,
        timestamp: new Date().toLocaleString(),
        audioUrl: url,
      };
      setHistory(prevHistory => [newHistoryItem, ...prevHistory]);
    } catch (error) {
      console.error('Error generating speech:', error);
      setError((error as Error).message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnded = () => {
    setCurrentlyPlaying(null);
  };

  const handlePlay = (url: string) => {
    if (currentlyPlaying) {
      const audio = new Audio(currentlyPlaying);
      audio.pause();
    }
    const newAudio = new Audio(url);
    newAudio.onended = handleEnded;
    newAudio.play();
    setCurrentlyPlaying(url);
  };

  const handlePause = () => {
    if (currentlyPlaying) {
      const audio = new Audio(currentlyPlaying);
      audio.pause();
      setCurrentlyPlaying(null);
    }
  };

  const handleDelete = (id: number) => {
    setHistory(prevHistory => prevHistory.filter(item => item.id !== id));
  };

  const handleDownload = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = 'audio.mp3';
    link.click();
  };

  return (
    <TextToSpeechLayout
      apiKey={apiKey}
      setApiKey={setApiKey}
      model={model}
      setModel={setModel}
      text={text}
      setText={setText}
      voice={voice}
      setVoice={setVoice}
      speed={speed}
      setSpeed={setSpeed}
      onSubmit={generateSpeech}
      isLoading={isLoading}
      audioUrl={audioUrl}
      error={error}
      history={history}
      onPlay={handlePlay}
      onPause={handlePause}
      onDelete={handleDelete}
      onDownload={handleDownload}
      onEnded={handleEnded}
      currentlyPlaying={currentlyPlaying}
    />
  );
};

export default TextToSpeechClient;
