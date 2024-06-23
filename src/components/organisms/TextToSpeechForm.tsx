import React from 'react';
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';
import { DeleteIcon } from '@/icons';

interface TextToSpeechFormProps {
  apiKey: string;
  setApiKey: (value: string) => void;
  clearApiKey: () => void;
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
}

const TextToSpeechForm: React.FC<TextToSpeechFormProps> = ({
  apiKey,
  setApiKey,
  clearApiKey,
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
}) => {
  const models = ['tts-1', 'tts-1-hd'];
  const voices = ['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer'];

  return (
    <div>
      <FormField
        type="password"
        label="API Key"
        value={apiKey}
        className="w-full flex flex-wrap gap-2 [&>*:nth-child(1)]:w-full [&>*:nth-child(2)]:flex-1"
        onChange={setApiKey}
        placeholder="Enter API Key"
      >
        {apiKey && (<Button onClick={clearApiKey} icon={<DeleteIcon />} className="w-12" />)}
      </FormField>
      <FormField
        type="select"
        label="Model"
        value={model}
        onChange={setModel}
        options={models.map(m => ({ value: m, label: m }))}
      />
      <FormField
        type="textarea"
        label="Text"
        value={text}
        onChange={setText}
        placeholder="Enter text to convert to speech (max 4096 characters)"
        maxLength={4096}
      />
      <FormField
        type="select"
        label="Voice"
        value={voice}
        onChange={setVoice}
        options={voices.map(v => ({ value: v, label: v }))}
      />
      <FormField
        type="range"
        id="speed"
        label="Speed"
        value={speed}
        onChange={setSpeed}
        min={0.25}
        max={4}
        step={0.25}
      />
      <Button
        onClick={onSubmit}
        disabled={!apiKey || !text || isLoading}
        className="w-full"
      >
        {isLoading ? 'Generating...' : 'Generate Speech'}
      </Button>
    </div>
  );
};

export default TextToSpeechForm;
