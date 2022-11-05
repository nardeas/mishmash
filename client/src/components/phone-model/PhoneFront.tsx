import { spring } from 'remotion';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

import { usePhoneModelColor } from './hooks';
import PhoneModel from './PhoneModel';

export default function PhoneFront() {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  usePhoneModelColor();

  const entranceAnimation = spring({
    frame,
    fps,
    config: { damping: 200, mass: 3 },
    durationInFrames: durationInFrames / 4,
  });

  const revealAnimation = spring({
    frame: frame - durationInFrames / 4 - 10,
    fps,
    config: { damping: 200, mass: 3 },
    durationInFrames: 50,
  });

  const rotateY = interpolate(
    entranceAnimation,
    [0, 1],
    [-Math.PI, Math.PI * 5],
  );

  const translateY = interpolate(entranceAnimation, [0, 1], [-4, 0]);
  const translateX = interpolate(revealAnimation, [0, 1], [0, -0.7]);

  return (
    <PhoneModel
      scale={entranceAnimation}
      rotation={[0, rotateY, 0]}
      position={[translateX, translateY, 0]}
    />
  );
}
