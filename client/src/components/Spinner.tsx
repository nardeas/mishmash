import { keyframes, styled } from '../styled';

const rotateAnim = keyframes({
  from: {
    transform: 'rotate(0deg)',
  },
  to: {
    transform: 'rotate(359deg)',
  },
});

const Spinner = styled('div', {
  width: 20,
  height: 20,
  flexShrink: 0,
  borderStyle: 'solid',
  borderRadius: '50%',
  animation: `${rotateAnim} 0.6s infinite linear`,
  borderColor: 'rgba(255, 255, 255, 0.3)',
  borderTopColor: 'rgba(255, 255, 255, 0.8)',
});

export default Spinner;
