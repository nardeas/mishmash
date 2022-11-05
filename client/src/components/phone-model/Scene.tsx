import { Suspense, useEffect } from 'react';
import { ThreeCanvas } from '@remotion/three';
import { AdaptiveDpr, AdaptiveEvents, Environment } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { AbsoluteFill, Sequence, useVideoConfig } from 'remotion';

import PhoneFront from './PhoneFront';
import PhoneBack from './PhoneBack';

export default function Scene() {
  const { width, height } = useVideoConfig();

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
        <Environment preset="night" />
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
      </ThreeCanvas>

      <Sequence from={5}>
        <AbsoluteFill>
          <h1>Hello world</h1>
        </AbsoluteFill>
      </Sequence>
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
  backgroundColor: '#000',
  border: '1px solid #222',
  borderRadius: '16px',
};
