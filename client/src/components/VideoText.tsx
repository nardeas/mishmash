import { useStore } from '../store';

const MAX_TEXT_LENGTH = 250;

export default function VideoText() {
  const text = useStore((s) => s.text);

  return (
    <p
      style={{
        fontFamily: 'Inter',
        fontSize: 32,
        fontWeight: 500,
        lineHeight: 1.3,
        background: 'linear-gradient(to bottom, #ec17bb, #e09318)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        whiteSpace: 'pre-wrap',
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
