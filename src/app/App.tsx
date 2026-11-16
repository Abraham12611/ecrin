import { useState } from 'react';
import { EcrinPlayer } from '../player/EcrinPlayer';
import { SKIN_IDS, SKINS, resolveInitialSkin, saveSkin, type SkinId } from '../player/skins';

export function App() {
  const [skin, setSkin] = useState<SkinId>(() => resolveInitialSkin());
  const select = (next: SkinId) => {
    setSkin(next); // presentation only: never touches the media source
    saveSkin(next);
  };

  return (
    <main className="stage" data-ecrin-stage={skin}>
      <header className="stage-head">
        <p className="stage-kicker">The art of playback</p>
        <h1 className="stage-title">ÉCRIN</h1>
        <p className="stage-lede">
          One Video.js v10 player in five craft-inspired skins. Open <strong>Settings → Appearance</strong> and switch while the video plays.
        </p>
      </header>

      <section className="stage-player" aria-label="ÉCRIN player">
        <EcrinPlayer skin={skin} onSelectSkin={select} />
      </section>

      <nav className="stage-skins" aria-label="Skins">
        {SKIN_IDS.map((id) => (
          <span key={id} className="stage-skin" data-active={id === skin || undefined}>
            <b>{SKINS[id].label}</b>
            <i>{SKINS[id].description}</i>
          </span>
        ))}
      </nav>

      <footer className="stage-foot">
        <p>
          Independent craft interpretation. No house marks or monograms. Apache-2.0 · Built on Video.js v10.
        </p>
      </footer>
    </main>
  );
}
