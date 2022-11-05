import { Suspense, useEffect } from 'react';
import { ThreeCanvas } from '@remotion/three';
import { AdaptiveDpr, AdaptiveEvents, Environment } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

import {
  AbsoluteFill,
  Audio,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

import PhoneFront from './PhoneFront';
import PhoneBack from './PhoneBack';
import VideoText from '../VideoText';

export default function Scene() {
  const { width, height, durationInFrames, fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [
      durationInFrames / 4 + 10,
      durationInFrames / 4 + 60,
      durationInFrames - 20,
      durationInFrames - 10,
    ],
    [0, 1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    },
  );

  const textAnimation = spring({
    frame: frame - (durationInFrames / 4 + 10),
    fps,
    config: { damping: 200, mass: 3 },
    durationInFrames: 10,
  });

  const translateX = interpolate(textAnimation, [0, 1], [-0.2, 0]);

  return (
    <AbsoluteFill style={container}>
      <ThreeCanvas linear width={width} height={height}>
        <ambientLight intensity={1} />
        <directionalLight intensity={0.4} />
        <Suspense fallback={null}>
          <PhoneFront />
          <PhoneBack />
          <Camera />
        </Suspense>
        <Environment preset="studio" />
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
      </ThreeCanvas>

      <Sequence>
        <AbsoluteFill
          style={{
            transform: `translateX(${translateX * 100}%)`,
            opacity,
            left: '52%',
            width: '50%',
            height: '100%',
            paddingLeft: 72,
            paddingRight: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <VideoText />
        </AbsoluteFill>
      </Sequence>

      {/* <Audio src={`data:audio/wav;base64,${testAudioBase64}`} /> */}
    </AbsoluteFill>
  );
}

const CAMERA_DISTANCE = 1;

function Camera() {
  const camera = useThree((state) => state.camera);

  useEffect(() => {
    camera.position.set(0, 0, CAMERA_DISTANCE);
    camera.near = 0.2;
    camera.far = Math.max(5000, CAMERA_DISTANCE * 2);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return null;
}

const container: React.CSSProperties = {
  background: 'linear-gradient(to bottom, #060606, #000000)',
  borderRadius: '16px',
  border: '1px solid rgba(255, 255, 255, 0.03)',
};
