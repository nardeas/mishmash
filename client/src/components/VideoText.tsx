import { useStore } from '../store';

const MAX_TEXT_LENGTH = 250;

export default function VideoText() {
  const text = useStore((s) => s.text);

  if (!text) return null;

  return (
    <p
      style={{
        fontFamily: 'Inter',
        fontSize: 32,
        fontWeight: 500,
        lineHeight: 1.3,
        background: 'linear-gradient(rgb(23 236 198), rgb(24 112 224))',
        whiteSpace: 'pre-wrap',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
    >
      {text.length > MAX_TEXT_LENGTH
        ? `${capitalizeFirstLetter(text.slice(0, MAX_TEXT_LENGTH))}...`
        : capitalizeFirstLetter(text)}
    </p>
  );
}

function capitalizeFirstLetter(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
