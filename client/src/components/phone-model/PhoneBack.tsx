import { spring } from 'remotion';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

import PhoneModel from './PhoneModel';

export default function PhoneBack() {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const revealAnimation = spring({
    frame: frame - durationInFrames / 4,
    fps,
    config: { damping: 200, mass: 3 },
    durationInFrames: 50,
  });

  const translateX = interpolate(revealAnimation, [0, 1], [0, -0.2]);
  const scale = interpolate(revealAnimation, [0, 1], [0, 1]);

  return (
    <PhoneModel
      scale={scale}
      rotation={[0, 0, 0]}
      position={[translateX, 0, 0]}
    />
  );
}
