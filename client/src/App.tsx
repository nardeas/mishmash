import { styled } from './styled';
import { useStore } from './store';
import CommandPrompt from './components/CommandPrompt';
import VideoPlayer from './components/VideoPlayer';

export default function App() {
  const ready = useStore((s) => s.ready);

  return (
    <>
      <Wrapper>
        {ready ? (
          <VideoPlayer />
        ) : (
          <Instructions>
            <LogoWrapper>
              <Logo src="/logo.jpeg" />
            </LogoWrapper>

            <InstructionText>⌘ + K to start</InstructionText>
          </Instructions>
        )}
      </Wrapper>
      <CommandPrompt />
    </>
  );
}

const Wrapper = styled('div', {
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const Instructions = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
});

const InstructionText = styled('p', {
  fontFamily: 'Inter',
  fontSize: 24,
  color: '#eee',
  textAlign: 'center',
});

const LogoWrapper = styled('div', {
  padding: 60,
  borderRadius: 16,
  backgroundColor: '#fff',
});

const Logo = styled('img', {
  width: 150,
  height: 150,
});
