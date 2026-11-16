import { VideoPlayer } from '@videojs/react/video';
import { MuxVideo } from '@videojs/react/media/mux-video';
import { EcrinSkin } from './EcrinSkin';
import type { SkinId } from './skins';

/** Mux asset used for the demo (Mux animated demo). Swap for any playback ID. */
export const DEMO_PLAYBACK_ID = 'VZtzUzGRv02OhRnZCxcNg49OilvolTqdnFLEqBsTwaxU';

type Props = { skin: SkinId; onSelectSkin: (id: SkinId) => void };

export function EcrinPlayer({ skin, onSelectSkin }: Props) {
  return (
    <VideoPlayer>
      <EcrinSkin skin={skin} onSelectSkin={onSelectSkin}>
        <MuxVideo source={{ playbackId: DEMO_PLAYBACK_ID }} poster={`https://image.mux.com/${DEMO_PLAYBACK_ID}/thumbnail.jpg?time=20&width=1280`} crossOrigin="anonymous" playsInline preload="metadata" />
      </EcrinSkin>
    </VideoPlayer>
  );
}

