// app.jsx — Praline (refined edition)
// Hero (rotating text + image) → Marquee → Signatures → InteractiveMenu
// → CTA reserve → TestimonialBand → Footer  + floating WhatsApp button

function App() {
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS);

  React.useEffect(() => {
    document.documentElement.setAttribute('data-palette', t.palette);
    const map = {
      cormorant: "'Cormorant Garamond', 'Times New Roman', serif",
      italiana:  "'Italiana', 'Cormorant Garamond', serif",
      dmserif:   "'DM Serif Display', 'Cormorant Garamond', serif",
    };
    document.documentElement.style.setProperty('--serif', map[t.display] || map.cormorant);
  }, [t.palette, t.display]);

  useReveal();

  return (
    <div style={{ position:'relative' }}>
      {t.showGrain && <Grain />}

      <Nav />
      <main>
        <Hero variant={t.hero} />
        <Marquee />
        <Signatures />
        <InteractiveMenu />
        <CTA kind="reserve" />
        <TestimonialBand />
      </main>
      <Footer />

      <WhatsAppButton />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Palette" />
        <TweakColor
          label="Mood"
          value={t.palette}
          options={[
            ['#F4EDE0','#8B5E3C','#2A1D10'],
            ['#F8F4EB','#7A5436','#23170B'],
            ['#EFE2CC','#A26333','#221404'],
            ['#E9DFCE','#6B4423','#1B1108'],
          ]}
          onChange={(v) => {
            const map = [
              ['cream',  ['#F4EDE0','#8B5E3C','#2A1D10']],
              ['ivory',  ['#F8F4EB','#7A5436','#23170B']],
              ['amber',  ['#EFE2CC','#A26333','#221404']],
              ['mocha',  ['#E9DFCE','#6B4423','#1B1108']],
            ];
            const match = map.find(([_, arr]) => JSON.stringify(arr) === JSON.stringify(v));
            setTweak('palette', match ? match[0] : 'cream');
          }}
        />
        <TweakSection label="Hero" />
        <TweakRadio label="Variant" value={t.hero}
          options={['split','centered','editorial']}
          onChange={(v) => setTweak('hero', v)} />
        <TweakSection label="Serif" />
        <TweakRadio label="Font" value={t.display}
          options={['cormorant','italiana','dmserif']}
          onChange={(v) => setTweak('display', v)} />
        <TweakSection label="Texture" />
        <TweakToggle label="Paper grain" value={t.showGrain}
          onChange={(v) => setTweak('showGrain', v)} />
      </TweaksPanel>
    </div>
  );
}

function Grain() {
  return (
    <div aria-hidden="true" className="grain-overlay" style={{
      position:'fixed', inset: 0, pointerEvents:'none', zIndex: 40,
      opacity: 0.06, mixBlendMode:'multiply',
      backgroundImage: 'url("data:image/svg+xml;utf8,' +
        encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.16 0 0 0 0 0.10 0 0 0 0 0.05 0 0 0 0.7 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>`) +
        '")',
    }}/>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
