import React from 'react';
import HistoryItem from '../molecules/HistoryItem';

interface HistoryListProps {
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
  currentlyPlaying: string | null;
}

const HistoryList: React.FC<HistoryListProps> = ({
  history,
  onPlay,
  onPause,
  onDelete,
  onDownload,
  currentlyPlaying
}) => {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">History</h3>
      {history.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          <p>No history items yet.</p>
          <p>Your generated audio will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <HistoryItem
              key={item.id}
              {...item}
              onPlay={onPlay}
              onPause={onPause}
              onDelete={onDelete}
              onDownload={onDownload}
              currentlyPlaying={currentlyPlaying}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryList;
