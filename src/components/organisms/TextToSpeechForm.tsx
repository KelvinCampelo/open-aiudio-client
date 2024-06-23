import React from 'react';
import InputField from '../atoms/InputField';
import Select from '../atoms/Select';
import TextArea from '../atoms/TextArea';
import RangeInput from '../atoms/RangeInput';
import Button from '../atoms/Button';

interface TextToSpeechFormProps {
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
}

const TextToSpeechForm: React.FC<TextToSpeechFormProps> = ({
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
}) => {
  const models = ['tts-1', 'tts-1-hd'];
  const voices = ['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer'];

  return (
    <div className="space-y-4">
      <InputField
        type="password"
        placeholder="Enter API Key"
        value={apiKey}
        onChange={setApiKey}
      />
      <Select
        value={model}
        onChange={setModel}
        options={models.map(m => ({ value: m, label: m }))}
        placeholder="Select model"
      />
      <TextArea
        value={text}
        onChange={setText}
        placeholder="Enter text to convert to speech (max 4096 characters)"
        maxLength={4096}
      />
      <Select
        value={voice}
        onChange={setVoice}
        options={voices.map(v => ({ value: v, label: v }))}
        placeholder="Select voice"
      />
      <RangeInput
        id="speed"
        label="Speed"
        min={0.25}
        max={4}
        step={0.25}
        value={speed}
        onChange={setSpeed}
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
