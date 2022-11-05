import { styled } from './styled';
import { useStore } from './store';
import CommandPrompt from './components/CommandPrompt';
import VideoPlayer from './components/VideoPlayer';

export default function App() {
  const ready = useStore((s) => s.ready);

  return (
    <>
      <Wrapper>{ready && <VideoPlayer />}</Wrapper>
      <CommandPrompt />
    </>
  );
}

// ⌘ + K

const Wrapper = styled('div', {
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
