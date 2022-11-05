import { Player } from '@remotion/player';
import * as constants from '../constants';
import { useStore } from '../store';
import Scene from './phone-model/Scene';

export default function VideoPlayer() {
  const setPlayer = useStore((s) => s.setPlayer);
  const width = constants.VIDEO_WIDTH;
  const height = width * constants.ASPECT_RATIO;

  return (
    <Player
      ref={setPlayer}
      loop
      autoPlay
      component={Scene}
      durationInFrames={constants.DURATION_IN_FRAMERS}
      fps={constants.FPS}
      compositionWidth={width}
      compositionHeight={height}
    />
  );
}
