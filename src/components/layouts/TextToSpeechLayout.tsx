import React from "react";
import TextToSpeechForm from "../organisms/TextToSpeechForm";
import HistoryList from "../organisms/HistoryList";
import AudioPlayer from "../atoms/AudioPlayer";

interface TextToSpeechLayoutProps {
  apiKey: string;
  setApiKey: (value: string) => void;
  model: string;
  setModel: (value: string) => void;
  text: string;
  setText: (value: string) => void;
  voice: string;
  setVoice: (value: string) => void;
  speed: number;
  setSpeed: (value: number) => void;
  onSubmit: () => void;
  isLoading: boolean;
  audioUrl: string;
  error: string;
  history: Array<{
    id: number;
    text: string;
    model: string;
    voice: string;
    speed: number;
    timestamp: string;
    audioUrl: string;
  }>;
  onPlay: (url: string) => void;
  onPause: () => void;
  onDelete: (id: number) => void;
  onDownload: (url: string) => void;
  onEnded: () => void;
  currentlyPlaying: string | null;
}

const TextToSpeechLayout: React.FC<TextToSpeechLayoutProps> = ({
  apiKey,
  setApiKey,
  model,
  setModel,
  text,
  setText,
  voice,
  setVoice,
  speed,
  setSpeed,
  onSubmit,
  isLoading,
  audioUrl,
  error,
  history,
  onPlay,
  onPause,
  onDelete,
  onDownload,
  onEnded,
  currentlyPlaying
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Text-to-Speech Client</h2>
        <TextToSpeechForm
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
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
        {error && (
          <div
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-4"
            role="alert"
          >
            <p>{error}</p>
          </div>
        )}
        <h3 className="text-xl font-semibold my-4">Audio Player</h3>
        <AudioPlayer src={audioUrl} onEnded={onEnded} className="w-full mt-4" />
        <HistoryList
          history={history}
          onPlay={onPlay}
          onPause={onPause}
          onDelete={onDelete}
          onDownload={onDownload}
          currentlyPlaying={currentlyPlaying}
        />
      </div>
    </div>
  );
};

export default TextToSpeechLayout;
