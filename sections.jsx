// sections.jsx — Praline pastry shop sections
// Editorial luxury layout — uses CSS vars from index.html

const PHOTO = {
  hero: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=1200&q=80&auto=format&fit=crop",
  signature1: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80&auto=format&fit=crop", // éclair
  signature2: "https://images.unsplash.com/photo-1612203985729-70726954388c?w=800&q=80&auto=format&fit=crop", // tarts
  signature3: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80&auto=format&fit=crop", // macarons
  atelier: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1100&q=80&auto=format&fit=crop", // café
  gallery1: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800&q=80&auto=format&fit=crop", // croissant
  gallery2: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80&auto=format&fit=crop", // mille-feuille
  gallery3: "https://images.unsplash.com/photo-1464195244916-405fa0a82545?w=800&q=80&auto=format&fit=crop", // strawberry tart
  gallery4: "https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?w=800&q=80&auto=format&fit=crop", // bread
  gallery5: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=800&q=80&auto=format&fit=crop", // pastry
  gallery6: "https://images.unsplash.com/photo-1604152135912-04a022e23696?w=800&q=80&auto=format&fit=crop", // display
  gallery7: "https://images.unsplash.com/photo-1610450949065-1f2841536c88?w=800&q=80&auto=format&fit=crop", // chocolate
  gallery8: "https://images.unsplash.com/photo-1606101273945-e9eba91c0dc4?w=800&q=80&auto=format&fit=crop", // hand pastry
  founder: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80&auto=format&fit=crop" // chef
};

// ─── Reveal-on-scroll hook ───────────────────────────────────────────────────
function useReveal() {
  React.useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {if (e.isIntersecting) {e.target.classList.add('in');io.unobserve(e.target);}});
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// ─── Logo wordmark ───────────────────────────────────────────────────────────
function Wordmark({ size = 22 }) {
  return (
    <span className="serif" style={{
      fontFamily: 'var(--serif)', fontSize: size, lineHeight: 1, letterSpacing: '0.02em',
      fontStyle: 'italic', fontWeight: 400, color: 'var(--ink)'
    }}>
      Praline
      <span style={{ display: 'inline-block', width: 3, height: 3, borderRadius: 3, background: 'var(--accent)', marginLeft: 6, transform: 'translateY(-6px)' }} />
    </span>);

}

// ─── Nav ─────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const links = [
  ['Pâtisseries', '#patisseries'],
  ['La carte', '#carte'],
  ['Cadeaux & événements', 'cadeaux.html']];

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? 'rgba(244,237,224,0.78)' : 'transparent',
      WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(160%)' : 'none',
      backdropFilter: scrolled ? 'blur(16px) saturate(160%)' : 'none',
      borderBottom: scrolled ? '1px solid var(--line-2)' : '1px solid transparent',
      transition: 'background .35s ease, backdrop-filter .35s ease, border-color .35s ease'
    }}>
      <div className="wrap" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: scrolled ? 64 : 80, transition: 'height .35s ease'
      }}>
        <a href="#" aria-label="Praline — accueil" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Wordmark size={26} />
        </a>
        <nav style={{ display: 'flex', gap: 36, alignItems: 'center' }} className="nav-links">
          {links.map(([label, href]) =>
          <a key={href} href={href} style={{
            fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 500,
            color: 'var(--ink-soft)', letterSpacing: '0.02em',
            transition: 'color .2s ease'
          }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--ink)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--ink-soft)'}>
              {label}
            </a>
          )}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <a href="#reserver" className="nav-cta" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '10px 18px', borderRadius: 999,
            background: 'var(--ink)', color: 'var(--paper)',
            fontFamily: 'var(--sans)', fontSize: 12, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase',
            transition: 'transform .2s ease, background .2s ease'
          }}
          onMouseEnter={(e) => {e.currentTarget.style.background = 'var(--accent)';}}
          onMouseLeave={(e) => {e.currentTarget.style.background = 'var(--ink)';}}>
            Réserver
            <span style={{ width: 5, height: 5, borderRadius: 5, background: 'var(--paper)' }} />
          </a>
          <button aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            onClick={() => setOpen((o) => !o)} className="nav-burger" style={{
            background: 'transparent', border: 0, padding: 10, display: 'none',
            width: 44, height: 44, alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', gap: 5
          }}>
            <span style={{
              display: 'block', width: 22, height: 1.2, background: 'var(--ink)',
              transition: 'transform .3s ease',
              transform: open ? 'translateY(3px) rotate(45deg)' : 'none'
            }} />
            <span style={{
              display: 'block', width: 22, height: 1.2, background: 'var(--ink)',
              transition: 'transform .3s ease',
              transform: open ? 'translateY(-3px) rotate(-45deg)' : 'none'
            }} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className="nav-drawer" style={{
        position: 'fixed', inset: 0, top: scrolled ? 64 : 80, zIndex: 49,
        background: 'var(--bg)', display: 'none',
        opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity .3s ease',
      }}>
        <nav style={{
          padding: '40px 28px', display: 'flex', flexDirection: 'column', gap: 4,
        }}>
          {links.map(([label, href]) =>
            <a key={href} href={href} onClick={() => setOpen(false)} style={{
              fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 32,
              color: 'var(--ink)', padding: '18px 0',
              borderBottom: '1px solid var(--line-2)', letterSpacing: '-0.01em',
            }}>{label}</a>
          )}
          <a href="#reserver" onClick={() => setOpen(false)} style={{
            marginTop: 32, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            gap: 10, padding: '18px 22px', borderRadius: 999,
            background: 'var(--ink)', color: 'var(--paper)',
            fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 500,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            minHeight: 56,
          }}>
            Réserver une table
            <span style={{ width: 5, height: 5, borderRadius: 5, background: 'var(--paper)' }} />
          </a>
        </nav>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .nav-links { display: none !important; }
          .nav-cta { display: none !important; }
          .nav-burger { display: inline-flex !important; }
          .nav-drawer { display: block !important; }
        }
      `}</style>
    </header>);

}

// ─── HERO ────────────────────────────────────────────────────────────────────
function Hero({ variant = 'split' }) {
  if (variant === 'centered') return <HeroCentered />;
  if (variant === 'editorial') return <HeroEditorial />;
  return <HeroSplit />;
}

function HeroSplit() {
  // Rotating editorial frames — text, image, spec card
  const frames = [
  {
    text: "Une maison de pâtisserie née à Dakar, fondée sur la précision parisienne et le terroir sénégalais. Beurre AOP, mangue Kent, bissap, vanille de Madagascar.",
    image: PHOTO.hero,
    alt: "Croissant artisanal",
    card: { eyebrow: 'Pièce signature', title: 'Croissant au beurre noisette', sub: '72\u00a0heures · 27 plis · Beurre Échiré' }
  },
  {
    text: "Une pâtisserie pensée comme un atelier d'auteur — où chaque pièce porte le nom de son artisan, où l'on travaille en petite quantité, au rythme des saisons sénégalaises et des humeurs du beurre.",
    image: PHOTO.atelier,
    alt: "L'atelier des Almadies",
    card: { eyebrow: "L'atelier", title: 'Villa Néma, Almadies', sub: '14 artisans · 3 fournées par jour' }
  }];

  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % frames.length), 10000);
    return () => clearInterval(t);
  }, []);
  // Slower, more cinematic transitions
  const FADE = 'opacity 2.2s cubic-bezier(.4,0,.2,1)';
  const KEN = 'transform 12s cubic-bezier(.2,.7,.2,1)';

  return (
    <section className="hero-split" style={{
      position: 'relative', minHeight: '100svh', paddingTop: 80,
      background: 'var(--bg)'
    }}>
      <div className="wrap hero-grid" style={{
        display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 56,
        alignItems: 'center', minHeight: 'calc(100svh - 80px)', paddingBottom: 48
      }}>
        <div style={{ paddingRight: 8 }}>
          <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 36 }}>
            <span style={{ width: 36, height: 1, background: 'var(--ink-soft)' }} />
            <span className="eyebrow">Maison · Dakar · MMXXI</span>
          </div>

          <h1 className="serif reveal d1" style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(72px, 12vw, 200px)',
            lineHeight: 0.92, margin: 0, letterSpacing: '-0.022em',
            fontWeight: 400, color: 'var(--ink)'
          }}>
            Pra<span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>line</span>
          </h1>

          <p className="serif reveal d2" style={{
            fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 300,
            fontSize: 'clamp(20px, 2.2vw, 30px)',
            color: 'var(--ink-soft)', margin: '20px 0 0 4px', letterSpacing: '0.005em'
          }}>
            Pâtisserie d'auteur — par Awa Diouf
          </p>

          {/* Rotating description — stacked, crossfaded */}
          <div className="reveal d3" style={{
            position: 'relative', maxWidth: 460, marginTop: 40, marginLeft: 4,
            minHeight: 130
          }}>
            {frames.map((f, i) =>
            <p key={i} style={{
              position: 'absolute', inset: 0,
              fontFamily: 'var(--sans)', fontSize: 15.5, lineHeight: 1.7,
              color: 'var(--ink-soft)', margin: 0, fontWeight: 400,
              opacity: i === idx ? 1 : 0,
              transition: FADE,
              pointerEvents: i === idx ? 'auto' : 'none'
            }}>{f.text}</p>
            )}
          </div>

          <div className="reveal d4" style={{ display: 'flex', alignItems: 'center', gap: 28, marginTop: 44 }}>
            <a href="#patisseries" style={{
              display: 'inline-flex', alignItems: 'center', gap: 14,
              padding: '14px 22px 14px 24px', borderRadius: 999,
              background: 'var(--ink)', color: 'var(--paper)',
              fontSize: 13, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase'
            }}>
              Découvrir la carte
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <path d="M1 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#carte" style={{
              fontSize: 13, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase',
              color: 'var(--ink-soft)', borderBottom: '1px solid var(--line)', paddingBottom: 4
            }}>La carte du jour</a>
          </div>

          {/* Frame indicator */}
          <div className="reveal d4" style={{
            display: 'flex', alignItems: 'center', gap: 14, marginTop: 80
          }}>
            {frames.map((_, i) =>
            <button key={i} onClick={() => setIdx(i)} aria-label={`Frame ${i + 1}`} style={{
              background: 'transparent', border: 0, padding: 0, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 10
            }}>
                <span style={{
                position: 'relative', display: 'block', overflow: 'hidden',
                width: i === idx ? 56 : 22, height: 2, background: 'var(--line)',
                transition: 'width .6s cubic-bezier(.2,.7,.2,1)'
              }}>
                  <span style={{
                  position: 'absolute', inset: 0, background: 'var(--ink)',
                  transform: i === idx ? 'scaleX(1)' : 'scaleX(0)',
                  transformOrigin: 'left',
                  transition: i === idx ? 'transform 8s linear' : 'transform .3s ease'
                }} />
                </span>
                <span style={{
                fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500,
                color: i === idx ? 'var(--ink)' : 'var(--ink-mute)'
              }}>{String(i + 1).padStart(2, '0')}</span>
              </button>
            )}
          </div>
        </div>

        {/* Image side — rotating crossfade */}
        <div className="reveal d2" style={{ position: 'relative' }}>
          <div style={{
            position: 'relative', aspectRatio: '4/5', borderRadius: 2,
            boxShadow: 'var(--shadow-lift)', overflow: 'hidden',
            background: 'var(--bg-2)'
          }}>
            {frames.map((f, i) =>
            <img key={i} src={f.image} alt={f.alt} style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%', objectFit: 'cover',
              opacity: i === idx ? 1 : 0,
              transform: i === idx ? 'scale(1.06)' : 'scale(1.0)',
              transition: `${FADE}, ${KEN}`
            }} />
            )}

            {/* Stamp (static) */}
            <div style={{
              position: 'absolute', top: 22, left: 22, zIndex: 2,
              width: 86, height: 86, borderRadius: 999,
              border: '1px solid rgba(255,255,255,.7)', color: 'rgba(255,255,255,.92)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 14, lineHeight: 1.1, textAlign: 'center',
              backdropFilter: 'blur(2px)'
            }}>
              <div>
                <div style={{ fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase', fontStyle: 'normal', marginBottom: 4 }}>Carte du jour</div>
                №&nbsp;<span style={{ fontSize: 18 }}>42</span>
              </div>
            </div>
          </div>

          {/* Floating spec card — rotates with frame */}
          <div className="reveal d4 hero-spec" style={{
            position: 'absolute', right: -8, bottom: -28,
            background: 'var(--paper)', padding: '16px 22px', borderRadius: 2,
            boxShadow: 'var(--shadow-soft)', minWidth: 240, maxWidth: 280,
            borderLeft: '2px solid var(--accent)', overflow: 'hidden'
          }}>
            <div style={{ position: 'relative', minHeight: 64 }}>
              {frames.map((f, i) =>
              <div key={i} style={{
                position: 'absolute', inset: 0,
                opacity: i === idx ? 1 : 0,
                transition: 'opacity 1.2s cubic-bezier(.4,0,.2,1)',
                pointerEvents: i === idx ? 'auto' : 'none'
              }}>
                  <div className="eyebrow" style={{ marginBottom: 8 }}>{f.card.eyebrow}</div>
                  <div className="serif" style={{ fontFamily: 'var(--serif)', fontSize: 22, lineHeight: 1.1, marginBottom: 4 }}>
                    {f.card.title}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--ink-mute)' }}>{f.card.sub}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll" style={{
        position: 'absolute', left: '50%', bottom: 24, transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
        color: 'var(--ink-mute)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase'
      }}>
        <span></span>
        <span style={{
          display: 'block', width: 1, height: 40, background: 'linear-gradient(to bottom, var(--ink-mute), transparent)'
        }} />
      </div>

      <style>{`
        @media (max-width: 980px) {
          .hero-split .hero-grid > div:first-child h1 { font-size: 22vw !important; }
        }
        @media (max-width: 880px) {
          .hero-split .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
        }
        @media (max-width: 720px) {
          .hero-split { min-height: auto !important; padding-top: 88px !important; padding-bottom: 40px !important; }
          .hero-split .hero-grid { min-height: 0 !important; padding-bottom: 16px !important; gap: 22px !important; }
          .hero-split h1 { font-size: clamp(64px, 21vw, 108px) !important; }
          .hero-split p.serif { font-size: 17px !important; margin-top: 14px !important; }
          .hero-split .reveal { margin-bottom: 22px !important; }
          .hero-split .reveal.d3 { min-height: 110px !important; margin-top: 18px !important; }
          .hero-split .reveal.d3 > p { font-size: 14.5px !important; line-height: 1.65 !important; }
          .hero-split .reveal.d4 { margin-top: 24px !important; }
          .hero-split .reveal.d4:last-of-type { margin-top: 36px !important; }
          .hero-spec { right: 8px !important; bottom: -14px !important; min-width: 0 !important; max-width: 68% !important; padding: 10px 14px !important; }
          .hero-spec .serif { font-size: 16px !important; }
          .hero-spec .eyebrow { font-size: 9px !important; }
          .hero-scroll { display: none !important; }
        }
      `}</style>
    </section>);

}

function HeroCentered() {
  return (
    <section style={{ position: 'relative', minHeight: '100vh', paddingTop: 140, paddingBottom: 80, background: 'var(--bg)' }}>
      <div className="wrap" style={{ textAlign: 'center', maxWidth: 1100, margin: '0 auto' }}>
        <div className="reveal" style={{ display: 'inline-flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
          <span style={{ width: 28, height: 1, background: 'var(--ink-soft)' }} />
          <span className="eyebrow">Maison · Dakar · MMXXI</span>
          <span style={{ width: 28, height: 1, background: 'var(--ink-soft)' }} />
        </div>
        <h1 className="serif reveal d1" style={{
          fontFamily: 'var(--serif)', fontSize: 'clamp(80px, 16vw, 240px)', lineHeight: 0.9, margin: 0,
          letterSpacing: '-0.022em', fontWeight: 400
        }}>
          Pra<span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>line</span>
        </h1>
        <p className="serif reveal d2" style={{
          fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 'clamp(20px,2.4vw,28px)',
          color: 'var(--ink-soft)', margin: '14px 0 0'
        }}>
          Pâtisserie d'auteur, à Dakar
        </p>
        <div className="reveal d3" style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 64,
          maxWidth: 980, margin: '64px auto 0'
        }}>
          <div className="zoom" style={{ aspectRatio: '4/5', overflow: 'hidden', boxShadow: 'var(--shadow-lift)' }}>
            <img src={PHOTO.hero} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="zoom" style={{ aspectRatio: '4/5', overflow: 'hidden', boxShadow: 'var(--shadow-lift)' }}>
            <img src={PHOTO.signature1} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </div>
    </section>);

}

function HeroEditorial() {
  return (
    <section style={{ position: 'relative', minHeight: '100vh', paddingTop: 120, background: 'var(--bg)' }}>
      <div className="wrap">
        <div className="reveal" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
          <span className="eyebrow">№ 042 — Édition d'Avril</span>
          <span className="eyebrow">Dakar, Sénégal</span>
        </div>
        <hr className="rule" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 32, marginTop: 32, alignItems: 'end' }}>
          <p className="reveal" style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--ink-soft)', maxWidth: 280 }}>
            Pâtisserie fondée en 2021, à la croisée de la France et du Sénégal. Service au comptoir, sur réservation et à emporter.
          </p>
          <h1 className="serif reveal d1" style={{
            fontFamily: 'var(--serif)', fontSize: 'clamp(64px, 9vw, 140px)',
            lineHeight: 0.92, margin: 0, textAlign: 'center', letterSpacing: '-0.02em'
          }}>
            Pra<span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>line</span>
          </h1>
          <p className="serif reveal d2" style={{
            fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 18, textAlign: 'right',
            color: 'var(--ink-soft)', maxWidth: 240, marginLeft: 'auto'
          }}>
            « Le geste juste, la matière vraie, la patience nécessaire. »
          </p>
        </div>
        <div className="reveal d3 zoom" style={{
          marginTop: 56, aspectRatio: '16/8', overflow: 'hidden', boxShadow: 'var(--shadow-lift)'
        }}>
          <img src={PHOTO.hero} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>
    </section>);

}

// ─── Marquee strip ───────────────────────────────────────────────────────────
function Marquee() {
  const items = ['Beurre Échiré', 'Mangue Kent', 'Vanille de Madagascar', 'Bissap', 'Fève de Tonka',
  'Chocolat Valrhona', 'Fleur d\'oranger', 'Cacao du Cameroun', 'Noix de Coco Casamance',
  'Pistache de Sicile', 'Citron Yuzu', 'Beurre AOP'];
  const row =
  <div style={{ display: 'flex', gap: 48, paddingRight: 48, whiteSpace: 'nowrap' }}>
      {items.map((t, i) =>
    <span key={i} className="serif" style={{
      fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 28,
      color: i % 2 ? 'var(--ink-mute)' : 'var(--ink)', display: 'inline-flex', alignItems: 'center', gap: 48
    }}>
          {t}
          <span style={{ width: 6, height: 6, borderRadius: 6, background: 'var(--accent)' }} />
        </span>
    )}
    </div>;

  return (
    <div className="marquee-band" style={{
      borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)',
      background: 'var(--bg-2)', padding: '22px 0', overflow: 'hidden'
    }}>
      <div style={{ display: 'flex', animation: 'drift 50s linear infinite', width: 'max-content' }}>
        {row}{row}
      </div>
      <style>{`
        @media (max-width:720px) {
          .marquee-band { padding: 16px 0 !important; }
          .marquee-band span.serif { font-size: 20px !important; gap: 28px !important; }
          .marquee-band > div { gap: 28px !important; }
        }
      `}</style>
    </div>);

}

// ─── Manifesto ───────────────────────────────────────────────────────────────
function Manifesto() {
  return (
    <section id="maison" style={{ padding: '160px 0', background: 'var(--bg)' }}>
      <div className="wrap" style={{ maxWidth: 1100 }}>
        <div className="reveal" style={{ marginBottom: 64 }}>
          <span className="eyebrow">— Notre philosophie</span>
        </div>
        <p className="serif reveal d1" style={{
          fontFamily: 'var(--serif)', fontWeight: 300,
          fontSize: 'clamp(28px, 4vw, 56px)', lineHeight: 1.15,
          letterSpacing: '-0.01em', margin: 0, color: 'var(--ink)',
          textWrap: 'balance'
        }}>
          Une pâtisserie pensée comme un atelier d'auteur — où chaque pièce
          porte le nom de son artisan, où l'on travaille <em style={{ color: 'var(--accent)' }}>en petite quantité</em>,
          au rythme des saisons sénégalaises et des humeurs du beurre.
        </p>

        <div className="reveal d3" style={{
          marginTop: 80, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 56
        }}>
          {[
          ['Matière', 'Beurre AOP de Charente, farines françaises T45 & T55, fruits locaux des marchés HLM et Sandaga.'],
          ['Méthode', 'Pâtes feuilletées au tour double, ganaches montées au laser thermique, sucre travaillé à la main.'],
          ['Mesure', 'Trois fournées par jour, jamais plus. Ce qui reste devient le goûter de l\'équipe.']].
          map(([h, t], i) =>
          <div key={i}>
              <div className="serif" style={{
              fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 22,
              color: 'var(--accent)', marginBottom: 14, letterSpacing: '-0.01em'
            }}>— {h}</div>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--ink-soft)', margin: 0 }}>{t}</p>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @media (max-width:880px){
          #maison div[style*="grid-template-columns: repeat(3"] {
            grid-template-columns: 1fr !important; gap: 32px !important;
          }
        }
      `}</style>
    </section>);

}

// ─── Signature pastries ──────────────────────────────────────────────────────
function Signatures() {
  const items = [
  {
    n: '01',
    name: 'L\'Éclair Bissap',
    desc: 'Pâte à choux craquelin, crème légère à l\'hibiscus de Kaolack, glaçage miroir grenat.',
    price: '3 800 CFA',
    photo: PHOTO.signature1
  },
  {
    n: '02',
    name: 'Tarte Mangue & Tonka',
    desc: 'Sablé breton au beurre noisette, ganache montée tonka, mangue Kent rôtie à la fleur d\'oranger.',
    price: '4 500 CFA',
    photo: PHOTO.signature2
  },
  {
    n: '03',
    name: 'Macaron Café Touba',
    desc: 'Coque amande lisse, ganache au café Touba poivré, cœur de chocolat Valrhona Tanariva.',
    price: '1 200 CFA',
    photo: PHOTO.signature3
  }];


  return (
    <section id="patisseries" style={{ padding: '140px 0 160px', background: 'var(--paper)', borderTop: '1px solid var(--line-2)', borderBottom: '1px solid var(--line-2)' }}>
      <div className="wrap">
        <div className="reveal" style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', marginBottom: 80, gap: 40, flexWrap: 'wrap' }}>
          <div>
            <span className="eyebrow">— La carte du printemps</span>
            <h2 className="serif" style={{
              fontFamily: 'var(--serif)', fontSize: 'clamp(48px, 7vw, 96px)', lineHeight: 0.95,
              margin: '20px 0 0', letterSpacing: '-0.02em', fontWeight: 400
            }}>
              Pièces<br /><em style={{ color: 'var(--accent)' }}>signature</em>
            </h2>
          </div>
          <p style={{ maxWidth: 380, fontSize: 14, lineHeight: 1.7, color: 'var(--ink-soft)', margin: 0 }}>
            Une sélection renouvelée chaque saison. Les pièces sont confectionnées
            à l'atelier des Almadies le matin même, livrées en boutique à 8h30.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40 }} className="sig-grid">
          {items.map((it, i) =>
          <article key={i} className={`reveal d${i + 1} sig-card`} style={{ position: 'relative' }}>
              <div className="zoom sig-photo" style={{
              aspectRatio: '4/5', overflow: 'hidden', marginBottom: 24, background: 'var(--bg-2)'
            }}>
                <img src={it.photo} alt={it.name} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="sig-meta" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
                <span className="eyebrow" style={{ color: 'var(--ink-mute)', flex: 'none' }}>{it.n}</span>
                <span style={{ flex: 1, borderTop: '1px dashed var(--line)', marginBottom: 4 }} />
                <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink-soft)', letterSpacing: '0.02em', whiteSpace: 'nowrap', flex: 'none' }}>{it.price}</span>
              </div>
              <h3 className="serif" style={{
              fontFamily: 'var(--serif)', fontSize: 30, lineHeight: 1.1, margin: '14px 0 12px',
              fontWeight: 400, letterSpacing: '-0.01em'
            }}>{it.name}</h3>
              <p style={{ fontSize: 13.5, lineHeight: 1.7, color: 'var(--ink-soft)', margin: 0, maxWidth: 360 }}>
                {it.desc}
              </p>
            </article>
          )}
        </div>

        <div className="reveal" style={{ textAlign: 'center', marginTop: 80 }}>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('praline:expand-menu'))}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 14,
              fontSize: 12, fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'var(--ink)', paddingBottom: 8,
              background: 'transparent', border: 0, borderBottom: '1px solid var(--ink)',
              cursor: 'pointer', fontFamily: 'var(--sans)'
            }}>
            Voir les 42 pièces de la carte
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
              <path d="M1 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
      <style>{`
        @media (max-width:980px) {
          .sig-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width:720px) {
          #patisseries { padding: 64px 0 72px !important; }
          #patisseries h2 { font-size: clamp(40px, 11vw, 64px) !important; }
          #patisseries .reveal:first-child { margin-bottom: 40px !important; }
          .sig-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
          .sig-photo { aspect-ratio: 5/4 !important; margin-bottom: 16px !important; }
          .sig-card h3 { font-size: 22px !important; margin: 10px 0 8px !important; }
          .sig-card p { font-size: 13px !important; line-height: 1.6 !important; }
          .sig-meta .eyebrow { font-size: 10px !important; }
          .sig-meta span:last-child { font-size: 12px !important; }
        }
      `}</style>
    </section>);

}

// ─── Atelier editorial spread ────────────────────────────────────────────────
function Atelier() {
  return (
    <section id="atelier" style={{ padding: '160px 0', background: 'var(--bg)' }}>
      <div className="wrap">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="atelier-grid">
          <div className="reveal zoom" style={{ position: 'relative' }}>
            <div style={{ aspectRatio: '4/5', overflow: 'hidden', boxShadow: 'var(--shadow-lift)' }}>
              <img src={PHOTO.atelier} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{
              position: 'absolute', bottom: -20, left: -20,
              padding: '14px 18px', background: 'var(--bg)', boxShadow: 'var(--shadow-soft)',
              borderLeft: '2px solid var(--accent)'
            }}>
              <div className="eyebrow" style={{ marginBottom: 6 }}>L'atelier — Ngor</div>
              <div className="serif" style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 16, color: 'var(--ink)' }}>
                14°45'N · 17°31'O
              </div>
            </div>
          </div>

          <div className="reveal d2" style={{ paddingLeft: 8 }}>
            <span className="eyebrow">— Chapitre I</span>
            <h2 className="serif" style={{
              fontFamily: 'var(--serif)', fontSize: 'clamp(40px, 5vw, 72px)',
              lineHeight: 1.02, margin: '20px 0 32px', letterSpacing: '-0.02em', fontWeight: 400
            }}>
              Une maison à deux<br />
              <em style={{ color: 'var(--accent)' }}>rivages.</em>
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--ink-soft)', margin: '0 0 22px', maxWidth: 480 }}>
              Awa Diouf rentre à Dakar en 2021 après dix ans dans les laboratoires
              parisiens — Cédric Grolet, Pierre Hermé, Ladurée. Elle ouvre Praline
              dans une villa coloniale des Almadies, blanchie à la chaux, ouverte
              sur l'Atlantique.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--ink-soft)', margin: 0, maxWidth: 480 }}>
              Sa pâtisserie est française dans la technique, sénégalaise dans
              l'âme. Le bissap remplace la framboise. La mangue Kent éclipse
              l'abricot. Le café Touba parfume la ganache. Et chaque samedi matin,
              les croissants partent en quinze minutes.
            </p>

            <div style={{ display: 'flex', gap: 48, marginTop: 56, paddingTop: 32, borderTop: '1px solid var(--line)' }}>
              <div>
                <div className="serif" style={{ fontFamily: 'var(--serif)', fontSize: 44, lineHeight: 1, color: 'var(--ink)', fontWeight: 400 }}>14</div>
                <div className="eyebrow" style={{ marginTop: 8 }}>Artisans</div>
              </div>
              <div>
                <div className="serif" style={{ fontFamily: 'var(--serif)', fontSize: 44, lineHeight: 1, color: 'var(--ink)', fontWeight: 400 }}>72<span style={{ color: 'var(--accent)', fontSize: 24 }}>h</span></div>
                <div className="eyebrow" style={{ marginTop: 8 }}>Fermentation</div>
              </div>
              <div>
                <div className="serif" style={{ fontFamily: 'var(--serif)', fontSize: 44, lineHeight: 1, color: 'var(--ink)', fontWeight: 400 }}>03</div>
                <div className="eyebrow" style={{ marginTop: 8 }}>Adresses</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width:880px) {
          .atelier-grid { grid-template-columns: 1fr !important; gap: 64px !important; }
        }
      `}</style>
    </section>);

}

// ─── Gallery ─────────────────────────────────────────────────────────────────
function Gallery() {
  return (
    <section style={{ padding: '120px 0 140px', background: 'var(--paper)' }}>
      <div className="wrap">
        <div className="reveal" style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24, marginBottom: 64 }}>
          <div>
            <span className="eyebrow">— Galerie</span>
            <h2 className="serif" style={{
              fontFamily: 'var(--serif)', fontSize: 'clamp(40px, 6vw, 80px)', lineHeight: 0.98,
              margin: '20px 0 0', letterSpacing: '-0.02em', fontWeight: 400
            }}>
              La vie à la <em style={{ color: 'var(--accent)' }}>maison</em>
            </h2>
          </div>
          <a href="#" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            fontSize: 12, fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'var(--ink)', borderBottom: '1px solid var(--ink)', paddingBottom: 6
          }}>
            Suivre @praline.dakar
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 9l6-6M9 3v6H3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gridAutoRows: '60px',
          gap: 18
        }} className="gallery-grid">
          {[
          [PHOTO.gallery1, 'span 5', 'span 6', 'Croissant'],
          [PHOTO.gallery2, 'span 4', 'span 4', 'Mille-feuille'],
          [PHOTO.gallery3, 'span 3', 'span 5', 'Tarte fraise'],
          [PHOTO.gallery5, 'span 4', 'span 5', 'Choux praliné'],
          [PHOTO.gallery6, 'span 5', 'span 4', 'Vitrine'],
          [PHOTO.gallery7, 'span 3', 'span 5', 'Chocolat noir'],
          [PHOTO.gallery8, 'span 7', 'span 6', 'En cuisine'],
          [PHOTO.gallery4, 'span 5', 'span 6', 'Pain au levain']].
          map(([src, colSpan, rowSpan, caption], i) =>
          <figure key={i} className={`zoom reveal d${i % 4 + 1}`} style={{
            gridColumn: colSpan, gridRow: rowSpan, margin: 0, position: 'relative', overflow: 'hidden',
            background: 'var(--bg-2)'
          }}>
              <img src={src} alt={caption} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <figcaption style={{
              position: 'absolute', left: 14, bottom: 12,
              fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 13,
              color: 'rgba(255,255,255,.92)', letterSpacing: '0.02em',
              textShadow: '0 1px 8px rgba(0,0,0,.5)'
            }}>
                — {caption}
              </figcaption>
            </figure>
          )}
        </div>
      </div>
      <style>{`
        @media (max-width:880px) {
          .gallery-grid { grid-template-columns: repeat(6, 1fr) !important; grid-auto-rows: 80px !important; }
          .gallery-grid figure:nth-child(odd) { grid-column: span 6 !important; grid-row: span 4 !important; }
          .gallery-grid figure:nth-child(even) { grid-column: span 6 !important; grid-row: span 5 !important; }
        }
      `}</style>
    </section>);

}

// ─── Press / quote ───────────────────────────────────────────────────────────
function Press() {
  return (
    <section style={{ padding: '120px 0', background: 'var(--bg)' }}>
      <div className="wrap" style={{ maxWidth: 1000, textAlign: 'center' }}>
        <div className="reveal" style={{ marginBottom: 36 }}>
          <span className="eyebrow">— On en parle</span>
        </div>
        <blockquote className="serif reveal d1" style={{
          fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 300,
          fontSize: 'clamp(24px, 3.4vw, 44px)', lineHeight: 1.25,
          margin: 0, color: 'var(--ink)', letterSpacing: '-0.005em', textWrap: 'balance'
        }}>
          « À Dakar, Awa Diouf a inventé une nouvelle grammaire de la pâtisserie
          — où le bissap dialogue avec le beurre, et le sucre se fait discret. »
        </blockquote>
        <div className="reveal d2" style={{ marginTop: 40, display: 'flex', justifyContent: 'center', gap: 36, flexWrap: 'wrap' }}>
          {['Le Monde — Goûts', 'Vogue Paris', 'Jeune Afrique', 'Monocle', 'Apollo Magazine'].map((p) =>
          <span key={p} style={{
            fontFamily: 'var(--serif)', fontSize: 15, color: 'var(--ink-mute)', letterSpacing: '0.04em'
          }}>{p}</span>
          )}
        </div>
      </div>
    </section>);

}

// ─── Visit ───────────────────────────────────────────────────────────────────
function Visit() {
  return (
    <section id="visiter" style={{ padding: '140px 0 160px', background: 'var(--bg-2)' }}>
      <div className="wrap">
        <div className="reveal" style={{ marginBottom: 80 }}>
          <span className="eyebrow">— Nous rendre visite</span>
          <h2 className="serif" style={{
            fontFamily: 'var(--serif)', fontSize: 'clamp(48px, 7vw, 96px)', lineHeight: 0.96,
            margin: '20px 0 0', letterSpacing: '-0.02em', fontWeight: 400
          }}>
            Trois adresses,<br />une seule <em style={{ color: 'var(--accent)' }}>main</em>.
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 32 }} className="visit-grid">
          {[
          { n: '01', name: 'Les Almadies', addr: 'Route de la Corniche\nVilla Néma, Dakar', hours: 'Mar–Dim · 7h30 — 19h00', tag: 'Boutique mère' },
          { n: '02', name: 'Plateau', addr: 'Rue Carnot, 14\nImmeuble Saint-Louis', hours: 'Lun–Sam · 8h00 — 18h30', tag: 'Comptoir & salon' },
          { n: '03', name: 'Ngor Atelier', addr: 'Corniche Ouest\nAccès artisans', hours: 'Sur réservation', tag: 'Atelier & événements' }].
          map((a, i) =>
          <article key={i} className={`reveal d${i + 1}`} style={{
            background: 'var(--paper)', padding: '36px 32px', position: 'relative',
            borderTop: '2px solid var(--accent)'
          }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 28 }}>
                <span className="eyebrow" style={{ color: 'var(--ink-mute)' }}>{a.n}</span>
                <span style={{
                fontSize: 10, fontFamily: 'var(--sans)', fontWeight: 500, letterSpacing: '.16em', textTransform: 'uppercase',
                color: 'var(--accent)', background: 'transparent', border: '1px solid var(--accent)', padding: '4px 10px', borderRadius: 999
              }}>{a.tag}</span>
              </div>
              <h3 className="serif" style={{
              fontFamily: 'var(--serif)', fontSize: 36, margin: 0, lineHeight: 1, letterSpacing: '-0.01em', fontWeight: 400
            }}>{a.name}</h3>
              <p style={{ marginTop: 24, fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                {a.addr}
              </p>
              <hr className="rule" style={{ margin: '24px 0' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{
                width: 6, height: 6, borderRadius: 6, background: '#5ea16a', display: 'inline-block',
                animation: 'blink 2s ease-in-out infinite'
              }} />
                <span style={{ fontSize: 13, color: 'var(--ink)', fontWeight: 500 }}>Ouvert · </span>
                <span style={{ fontSize: 13, color: 'var(--ink-soft)' }}>{a.hours}</span>
              </div>
              <a href="#" style={{
              marginTop: 28, display: 'inline-flex', alignItems: 'center', gap: 10,
              fontSize: 12, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase',
              color: 'var(--ink)', borderBottom: '1px solid var(--ink)', paddingBottom: 4
            }}>
                Itinéraire
                <svg width="12" height="10" viewBox="0 0 14 10" fill="none">
                  <path d="M1 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </article>
          )}
        </div>
      </div>
      <style>{`
        @media (max-width:980px) { .visit-grid { grid-template-columns: 1fr !important; gap: 20px !important; } }
      `}</style>
    </section>);

}

// ─── Footer ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: 'var(--ink)', color: '#E4D8C2', padding: '120px 0 56px', position: 'relative' }}>
      <div className="wrap">
        <div className="reveal foot-wordmark" style={{
          fontFamily: 'var(--serif)', fontSize: 'clamp(72px, 18vw, 280px)', lineHeight: 0.86,
          letterSpacing: '-0.03em', color: '#F4EDE0', margin: 0
        }}>
          Pra<em style={{ color: 'var(--accent-2)' }}>line</em>.
        </div>

        <div style={{
          marginTop: 80, display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 40,
          borderTop: '1px solid rgba(255,255,255,.12)', paddingTop: 48
        }} className="foot-grid">
          <div>
            <div style={{
              fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 22, marginBottom: 16, color: '#F4EDE0'
            }}>
              Lettre de la maison
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: 'rgba(244,237,224,.62)', margin: '0 0 20px', maxWidth: 360 }}>
              Une fois par mois — les nouvelles pièces, les invités de l'atelier,
              les recettes d'Awa. Pas de spam, jamais.
            </p>
            <form onSubmit={(e) => e.preventDefault()} style={{
              display: 'flex', gap: 0, borderBottom: '1px solid rgba(255,255,255,.3)', maxWidth: 380, paddingBottom: 4
            }}>
              <input type="email" placeholder="adresse@email.com" style={{
                flex: 1, background: 'transparent', border: 0, outline: 'none',
                color: '#F4EDE0', fontSize: 14, fontFamily: 'var(--sans)', padding: '10px 0'
              }} />
              <button style={{
                background: 'transparent', border: 0, color: 'var(--accent-2)',
                fontSize: 12, fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase'
              }}>S'inscrire →</button>
            </form>
          </div>

          {[
          ['Maison', ['Histoire', 'Atelier', 'Presse', 'Carrières']],
          ['Boutique', ['Carte', 'Commander', 'Réserver une table', 'Carte cadeau']],
          ['Suivre', ['Instagram']]].
          map(([t, items], i) =>
          <div key={i}>
              <div className="eyebrow" style={{ color: 'var(--accent-2)', marginBottom: 18 }}>{t}</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {items.map((x) =>
              <li key={x}><a href="#" style={{ fontSize: 14, color: '#F4EDE0', opacity: .78 }}>{x}</a></li>
              )}
              </ul>
            </div>
          )}
        </div>

        <div style={{
          marginTop: 96, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,.12)',
          display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
          fontSize: 11, color: 'rgba(244,237,224,.5)', letterSpacing: '0.1em', textTransform: 'uppercase'
        }}>
          <span>© MMXXVI Praline SARL — Dakar, Sénégal</span>
          <span>Conditions · Mentions légales · Cookies</span>
          <span>Designed with intention.</span>
        </div>
      </div>
      <style>{`
        @media (max-width:980px) { .foot-grid { grid-template-columns: 1fr 1fr !important; gap: 48px !important; } }
        @media (max-width:720px) {
          footer { padding: 56px 0 32px !important; }
          .foot-wordmark { font-size: clamp(48px, 18vw, 80px) !important; }
          .foot-grid { margin-top: 40px !important; padding-top: 28px !important; gap: 28px !important; }
          .foot-grid > div:first-child .serif { font-size: 18px !important; margin-bottom: 12px !important; }
          .foot-grid > div:first-child p { font-size: 12.5px !important; margin-bottom: 14px !important; }
          .foot-grid ul { gap: 6px !important; }
          .foot-grid ul li a { font-size: 13px !important; }
          .foot-grid .eyebrow { margin-bottom: 12px !important; }
          footer > div > div:last-child { margin-top: 40px !important; padding-top: 18px !important; font-size: 10px !important; }
        }
        @media (max-width:560px) { .foot-grid { grid-template-columns: 1fr !important; gap: 24px !important; } }
      `}</style>
    </footer>);

}

// Export for app.jsx
Object.assign(window, {
  useReveal, Nav, Hero, Marquee, Manifesto, Signatures, Atelier, Gallery, Press, Visit, Footer, Wordmark
});